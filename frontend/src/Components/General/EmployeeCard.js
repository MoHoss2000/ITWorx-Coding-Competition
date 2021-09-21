import React from 'react';
import 'antd/dist/antd.css';
import '../components.css';
import { Typography } from 'antd';
const { Title } = Typography;

const EmployeeCard = (props) =>{
    const developer = props.data.is_developer ? 'Yes' : 'No'
    return(
        <div class="container">
        <div class="card">
        <div class="box">
            <div class="content">
            <h2 style={{fontSize:'95px'}}>{props.data.id}</h2>
            <h3 style={{fontSize:'35px', marginTop: '35%'}}> Employee </h3>
            <div class="card__details">
            <li><b>Name: </b> {props.data.first_name + ' ' + props.data.last_name}</li>
            <li> <b>Email: </b> {props.data.username}</li>
            <li> <b>Developer: </b> {developer}</li>
        </div>   
        </div>
        </div>
        </div>
    </div>
    )
        
    
    
}
export default EmployeeCard