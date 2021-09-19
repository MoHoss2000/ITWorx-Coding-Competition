import 'antd/dist/antd.css';
import React, {useState} from 'react';
import axios from 'axios';
import { 
  Typography,
  List,
  Button,  
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

function EmployeeListItem({employee , activityId}) {
    //const [id]= useState(employee.id);
    const [loading, setLoading]=useState(false)

    const buttonRender =(status)=>{

        if(status===null){
            return (<Button type="primary" onClick={assignEmployee} ghost> Assign Employee </Button>)
        }
        else if(status==='A' || status==='P'){
            return (<Button type="primary" onClick={markAsComplete} > Mark As Complete</Button>)
        }
        else {
            return (<Button type="primary" onClick={removeCompletion} danger ghost> Remove completion</Button>)
        }
    }

    const assignEmployee= async ()=>{

     
       try{
        console.log("employee list item")
       // console.log(id)
        setLoading(true)
         const assign= await axios({
            method: 'post',
            url: 'http://localhost:3001/admin/assignActivity',
            data: {
                EmployeeId : employee.id, 
                ActivityId : activityId, 
                CycleId : 1
            }
          });
        employee.status='A';
        setLoading(false)
        console.log(assign)
       }
       catch(e){
           console.log(e)
            
       }

   }
   const markAsComplete= async ()=>{

     
    try{
        console.log("employee list item")
       // console.log(id)
     setLoading(true)

      const assign= await axios({
         method: 'post',
         url: 'http://localhost:3001/admin/markActivityAsComplete',
         data: {
             EmployeeId : employee.id, 
             ActivityId : activityId, 
             CycleId : 1
         }
       });
     employee.status='C';
     setLoading(false)
     console.log(assign)
    }
    catch(e){
        console.log(e)
         
    }

}
const removeCompletion= async ()=>{

     
    try{
        console.log("employee list item")
        //console.log(id)
     setLoading(true)
      const assign= await axios({
         method: 'post',
         url: 'http://localhost:3001/admin/removeActivityCompletion',
         data: {
             EmployeeId : employee.id, 
             ActivityId : activityId, 
             CycleId : 1
         }
       });
     employee.status='A';
     setLoading(false)
     console.log(assign)
    }
    catch(e){
        console.log(e)
         
    }

}
    return (
        <List.Item
        key={employee.id} 
        extra= {buttonRender(employee.status)} >
       
        <List.Item.Meta
          avatar={<UserOutlined />}  
          title={
          <Title level={5} >{employee.first_name + " "+ employee.last_name}</Title> }
          
        />
       <div style={{ display: "flex", direction: "row", marginTop:'10px' }} >
    
        <Text style={{ marginRight:'10px' }} mark>Status:</Text>
        <Text > 
        {employee.status===null && "Unassigned"}
        {employee.status==='A' && "Assigned"}
        {employee.status==='P' && "Pending"}
        {employee.status==='C' && "Complete"}</Text> 
        </div>
      </List.Item>
    )
    
}

export default EmployeeListItem;