import 'antd/dist/antd.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import EmployeeListItem from './EmployeeListItem'
import { 
  Typography,
  List,
  Card,
  Input,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
const { Title } = Typography;
const { Search } = Input;

const tabList = [  
    {
      key: 'Assigned',
      tab: 'Assigned',
    },
    {
      key: 'Pending',
      tab: 'Pending',
    },
    {
      key: 'Completed',
      tab: 'Completed',
    },
    {
      key: 'All Employees',
      tab: 'All Employees',
    }
  ];

function EmployeeActivity({id, setError }) {
  
  
  const [employees, setEmployees] = useState(null)
  const[displayed , setDisplayed ]=useState(null)
  const [tab, setTab]=useState('Assigned')
  const [ loading, setLoading ] = useState(true)
 
  
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
      setDisplayed(res.data[0].filter((employee)=> employee.status==='A'))
      setLoading(false)
      
    })
      .catch((e) => {
        setError(false)
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
      pageSize: 5,
    }}
    dataSource={displayed}
    renderItem={employee => (
      <EmployeeListItem employee={employee} activityId={id} />
    )}
  />
    </Card>
  )
}

export default EmployeeActivity;
