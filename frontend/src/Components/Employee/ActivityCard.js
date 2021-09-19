import 'antd/dist/antd.css';
import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {UserContext} from "../../Context";
import { Result, Modal,Typography, Card, Button, message,Popconfirm} from 'antd';
import { FileDoneOutlined, SketchOutlined ,ToolFilled ,SketchCircleFilled,SmileOutlined} from '@ant-design/icons';
const { Title, Text } = Typography;

const flex ={ display: "flex", direction: "row", marginTop:'10px'  }

function ActivityCard({activity, isModalVisible,  setIsModalVisible}) {

 const {id, cycleId }=useContext(UserContext)
 const [showConfirm, setShowConfirm] = useState(false)
 const [confirmLoading, setConfirmLoading] = useState(false);

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showPopconfirm = () => {
    setShowConfirm(true);
 };
 const handlePopConfirmCancel = () => {
   setShowConfirm(false); 
 };


  const submitActivity= async ()=>{

     
    try{
     setConfirmLoading(true);
      const assign= await axios({
         method: 'post',
         url: 'http://localhost:3001/employee/activities/submitActivity',
         data: {
             employeeId : id, 
             activityId : activity.id, 
             cycleID:cycleId 
         }
       });
     activity.status='P';
     message.success('Admin notified!');
     setConfirmLoading(false);
    //console.log(assign)
    }
    catch(e){
      message.error('Opps, there seems to have been an error performing you request');
      // console.log(e)
         
    }

}
const popconfirm = (<Popconfirm
  okText='Yes'
  okButtonProps={{ loading: confirmLoading }}
  visible={showConfirm}
  onCancel={handlePopConfirmCancel}
  title="Taking this action will notify the admin that you have done this activity"
  onConfirm={submitActivity}>
  <Button onClick={showPopconfirm} type="primary">Submit</Button>
</Popconfirm> )

  const action =()=> {
      if (activity.status==='A'){
          return (<Result
          icon={<SmileOutlined />}
          title="Notify the admin if you have completed this activity!"
          extra={popconfirm} />)
      }
      else if (activity.status==='P'){
        return (<Result
            icon={<ToolFilled /> }
            title="Admin is reviewing your activity" />)
     }
     else{
       return(<Result
                icon={ <SketchCircleFilled /> }
                title={`You have completed this activity ${activity.quantity} time(s) in this cycle!`} />)
     } }

   if(activity===null){
      return (<h1></h1>)
    }
  const title= (<div style={{ display: "flex", flexDirection :'row'}}>
                  <FileDoneOutlined style={{ fontSize: '140%' }} />
                  <Title level={3} style={{ marginLeft:'20px'}}>{activity.name}</Title>
                </div>)
                
  const extra=(<div>
                 <Text style={{fontSize: '140%'}} strong >Points: </Text>
                 <Text style={{fontSize: '140%'}}>{activity.points}</Text>
                 <SketchOutlined style={{fontSize: '180%',marginLeft:'10px', color:"#87CEFA" }}/></div>)

  return (
    <div>
    
    <Modal
    title={title} 
    extra={extra}
    visible={isModalVisible} 
    onCancel={handleCancel}
    style={{width: '800px'}}
    footer={null}>
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
    </Modal>
    
    </div>)}
    
    export default ActivityCard;