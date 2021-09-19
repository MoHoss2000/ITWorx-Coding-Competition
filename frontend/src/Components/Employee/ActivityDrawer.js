import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Typography, Divider, Button, Card, Drawer, Result,Popconfirm, message } from 'antd';
import {UserContext} from "../../Context";
import { FileDoneOutlined,UserOutlined, SketchOutlined ,ToolFilled ,SketchCircleFilled,SmileOutlined} from '@ant-design/icons';
const {Title, Text}=Typography 

const ActivityDrawer= ({activity,visible, setVisible})=>{

  const {id, cycleId }=useContext(UserContext)
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

   const showPopconfirm = () => {
      setShowConfirm(true);
   };
   const handleCancel = () => {
     setShowConfirm(false); 
   };
   const onClose = () => {
     setVisible(false);
  };
  const assignEmployee= async ()=>{

       
    try{
      setConfirmLoading(true);
      const assign= await axios({
         method: 'post',
         url: 'http://localhost:3001/employee/assignActivity',
         data: {
             EmployeeId : id, 
             ActivityId : activity.id, 
             CycleId : cycleId
         }
       });
     activity.status='A';
     setShowConfirm(false);
     message.success('You have successfully enrolled in this activity');
     console.log(assign)
    }
    catch(e){
      message.error('Opps, there seems to have been an error performing you request');
       console.log(e)           
    }
    setConfirmLoading(false);

}
  const popconfirm = (<Popconfirm
    okText='Yes'
    okButtonProps={{ loading: confirmLoading }}
    visible={showConfirm}
    onCancel={handleCancel}
    title="Are you sure you want to participate in this Activity,
    this action will be visible to admins and employees"
    onConfirm={assignEmployee}>
    <Button onClick={showPopconfirm} type="primary">Participate</Button>
  </Popconfirm> )

     
    const action =()=> {
        if (activity.status==='A' ||activity.status==='P' ){
            return (<Result
            icon={<SmileOutlined />}
            title="You are currently participating in this activity!"
            />)
        }
         else if(activity.status==='C'){
               return(<Result
                  icon={ <SketchCircleFilled /> }
                  title={`You have completed this activity ${activity.quantity} times in this cycle!`}
                  extra={popconfirm}
                />)
        }  
        else{
            return(
                <Result
                  icon={  <UserOutlined /> }
                  title="Increase you ranking, Participate in this activity!"
                  extra={popconfirm}
                />
           )

        }  
    }
        return (
            <Drawer width={800}
            title={
               <div style={{ display: "flex", flexDirection :'row'}}>
                 <FileDoneOutlined style={{ fontSize: '140%' }} />
                 <Title level={3} style={{ marginLeft:'20px'}}>{activity.name}</Title>
              </div>}
              placement="right" onClose={onClose} visible={visible}
              >
                 <Card type="inner"
                    title={ <Title level={4} style={{ marginLeft:'20px'}}>Description</Title>}
                     style={{marginTop: '20px'}}
                     extra={<div>
                      <Text style={{fontSize: '140%'}} strong >Points: </Text>
                      <Text style={{fontSize: '140%'}}>{activity.points}</Text>
                      <SketchOutlined style={{fontSize: '180%',marginLeft:'10px', color:"#87CEFA" }}/>
                     </div> }>
                   <Text style={{fontSize:'150%', marginLeft:'20px'}}italic>{activity.description}</Text>
                 </Card> 
                 {action()}
              </Drawer>
 )

}
export default ActivityDrawer;
