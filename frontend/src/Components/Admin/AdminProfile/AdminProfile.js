import React, {useState, useEffect,useContext} from 'react'
import axios from 'axios'
import { UserContext } from '../../../Context';
import {Tabs, Card, Avatar, Spin, Descriptions,Button} from 'antd'
import NetworkError from '../../NetworkError';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;
const AdminProfile = () => {

    const {id, cycleId } = useContext(UserContext)
    const [data, setData] = useState([])
    const [error, setError] = useState(false)
   

    useEffect(() => {
             axios.get(`http://localhost:3001/admin/profile/${id}`)
             .then((res)=>{
                console.log(res.data)
                setData(res.data)
             }).catch((err)=>{
                 setError(true)

             })
    }, [])

    if(error){
        return <NetworkError/>
    }
    if(data===null){
        return(<Spin size='large'/>)
    }
    
    return(
       <Card
        style={{marginTop:'100px',marginLeft:'10%', marginRight:'10%', textAlign:'center'}}
        cover={<Avatar size={260} style={{marginLeft:'40%', marginRight:'50%'}}>  </Avatar>}
        alt={<UserOutlined/>}>
           <Descriptions column={1} bordered>
            <Descriptions.Item label="Name: ">{data.first_name + " " + data.last_name}</Descriptions.Item>
            <Descriptions.Item label="Email: ">{data.username}</Descriptions.Item>
         </Descriptions> 
         <div style={{textAlign:'center', marginTop:'20px'}}>
         <Button style={{}} type='primary'><Link to="/changePassword" >Change Password</Link></Button>
         </div>
         </Card>
      
    )
}

export default AdminProfile;