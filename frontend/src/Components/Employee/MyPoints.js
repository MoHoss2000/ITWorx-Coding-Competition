import React from 'react';
import 'antd/dist/antd.css';
import '../components.css';
import { Card, Typography, Divider } from 'antd';
const { Title } = Typography;

const MyPoints = (props) =>{
   console.log(props.data)
  

return(
    <div className='my-points' >
        130 Points
    </div>
  
)
        
    
    
}
export default MyPoints