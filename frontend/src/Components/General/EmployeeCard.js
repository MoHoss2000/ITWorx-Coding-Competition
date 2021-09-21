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
            <h3 style={{fontSize:'35px', marginTop: '20%'}}> Employee </h3>
            <div class="card__details">
            <ul>
            <li><b>Name: </b> <br/> {props.data.first_name + ' ' + props.data.last_name}</li>
            <li style={{fontSize:'15px'}}> <b>Email:  <br/> </b> {props.data.username}</li>
            <li> <b>Developer:  </b> {developer}</li>
            </ul>
        </div>   
        </div>
        </div>
        </div>
    </div>
    )
        
    
    
}
export default EmployeeCard