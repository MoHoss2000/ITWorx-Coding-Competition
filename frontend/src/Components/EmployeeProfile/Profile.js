import React, {useState, useEffect,useContext} from 'react'
import axios from 'axios'
import {UserContext} from "../../Context";
import NetworkError from '../NetworkError';
import { Redirect , Link} from 'react-router-dom';
import { 
    Descriptions,
    Card,
    Button, 
    Avatar 
  } from 'antd';
import { UserOutlined } from '@ant-design/icons';



const Profile= ()=> {
    const {id, cycleId }=useContext(UserContext)
    const [loading, setLoading] = useState(true)
    const[personalInfo, setPersonalInfo]=useState(null)
    const[departments, setDepartments]=useState([])
    const[practices, setPractices]=useState([])
    const [data, setData] = useState([])
    const [error, setError] = useState(false)
    let employeeDepartments = ''
    let employeePractice = ''

    for(let i = 0 ; i < departments.length ; i++){
       if(i == departments.length - 1){
         employeeDepartments += departments[i].name }
        else{
        employeeDepartments += `${departments[i].name} - ` }
    }

    for(let i = 0 ; i < practices.length ; i++){
        if(i == practices.length - 1){
            employeePractice += practices[i].name}
        else{
            employeePractice += `${practices[i].name} - `}
     }

    useEffect(() => {

            axios.get(`http://localhost:3001/employee/profile/${id}/${cycleId}`)
            .then((res)=>{
                console.log(res)
                setData(res.data)
                setPersonalInfo(res.data.personalInfo[0])
                setDepartments(res.data.departments)
                setPractices(res.data.practice)
                console.log(data)
                setLoading(false)
            }).catch((e)=>{
                setError(true)
                console.log(e)
            })
           
            
         
    }, [])
    if(error){
        return <NetworkError/>
    }
    if(personalInfo===null){
        return(<h1>loading</h1>)
    }

    return(
    <Card
    cover={<Avatar size={260} style={{marginLeft:'40%', margingRight:'50%'}} 
    src='../../../../public/markzuck.jpg'>  </Avatar>}
    alt={<UserOutlined/>}>
       <Descriptions column={1} bordered>
        <Descriptions.Item label="Name: ">{personalInfo.first_name + " " + personalInfo.last_name}</Descriptions.Item>
        <Descriptions.Item label="username: ">{personalInfo.username}</Descriptions.Item>
        <Descriptions.Item label="Developer">{personalInfo.is_developer == 1 ? 'Yes' : 'No'}</Descriptions.Item>
        <Descriptions.Item label="Departments: ">{employeeDepartments}</Descriptions.Item> 
        <Descriptions.Item label="Practices: ">{employeePractice}</Descriptions.Item>   
     </Descriptions> 
     <div style={{textAlign:'center', marginTop:'20px'}}>
     <Button style={{}} type='primary'><Link to="/changePassword" className="btn btn-primary">Change Password</Link></Button>
     </div>
     
            
       </Card>
    )

}

export default Profile;