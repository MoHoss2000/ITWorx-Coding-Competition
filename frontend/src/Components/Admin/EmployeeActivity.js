import 'antd/dist/antd.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import EmployeeListItem from './EmployeeListItem'
import { 
  Typography,
  List,
  Card,
  Select, 
  Input,
  Button,  
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
const { Option } = Select;
const { Title, Text } = Typography;
const { Search } = Input;

const tabList = [
    {
      key: 'All Employees',
      tab: 'All Employees',
    },
    {
      key: 'Pending',
      tab: 'Pending',
    },
    {
      key: 'Assigned',
      tab: 'Assigned',
    },
    {
      key: 'Completed',
      tab: 'Completed',
    },
  ];

function EmployeeActivity({id}) {
  
  const [employees, setEmployees] = useState(null)
  const[displayed , setDisplayed ]=useState(null)
  const [tab, setTab]=useState('All Employees')
  const [ loading, setLoading ] = useState(true)
  const [error, setError] = useState(null)
  
  const onTabChange= async (key) =>{

      setTab(key)
      if (key==="All Employees"){
         setDisplayed(employees);
      }
      else if (key==="Pending"){
        setDisplayed( employees.filter((employee)=> employee.status==='P'))
      }
      else if (key==="Assigned"){
        setDisplayed( employees.filter((employee)=> employee.status==='A'))
     }
     else{
        setDisplayed( employees.filter((employee)=> employee.status==='C'))

     }

  }
  const onSearch = (value) => {

    setTab('All Employees')
    const filteredEmployees  = employees.filter((employee) => {
        console.log(value)
        const prefix= value.toLowerCase()
        if(employee.first_name.toLowerCase().startsWith(prefix) || 
           employee.last_name.toLowerCase().startsWith(prefix)){
        return employee
        }
     })
    setDisplayed(filteredEmployees)

  };
  useEffect(() => {

    console.log('GETTING EMPLOYEES');
    console.log("id"+ id)
    setError(null)
    axios(
      {
        method: 'get',
        url: 'http://localhost:3001/admin/viewEmployeeActivity',
        headers: {},
        params: {
          activityId: id,
          cycleId: 1
        }
      }).then((res) => {
      console.log(res.data[0])
      setEmployees(res.data[0])
      setDisplayed(res.data[0])
      setLoading(false)
      
    })
      .catch((e) => {
        setError("Oops there seems to be a problem connecting to the network")
        console.log(e)


      })

  }, []);
  if(loading){
      return(
      <Card
       style={{marginLeft: '10%', marginRight: '10%'}}   
        loading={true}
      > 
      </Card>)
    
  
  }

  return (
    
    <Card
    style={{marginLeft: '10%', marginRight: '10%'}}       
      tabList={tabList}
      activeTabKey={tab}
      onTabChange={ key => {
        onTabChange(key)
      }}
    extra={<Search placeholder="search employees" onSearch={onSearch} style={{ width: 200 }} /> }
     title={
        <div style={{ display: "flex", flexDirection :'row'}}>
        <UserOutlined  style={{ fontSize: '140%' }} />
        <Title level={3} style={{ marginLeft:'20px'}}>Employees</Title>
    </div>}>
    
    <List
    itemLayout="vertical"
    size="large"
    pagination={{
      pageSize: 3,
    }}
    dataSource={displayed}
    renderItem={employee => (
      <EmployeeListItem employee={employee} activityId={id}/>
    )}
  />
    </Card>
  )
}

export default EmployeeActivity;
