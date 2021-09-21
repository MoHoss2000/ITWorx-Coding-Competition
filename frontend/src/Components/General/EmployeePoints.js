import React from 'react';
import 'antd/dist/antd.css';
import './css.css';
const MyPoints = (props) =>{

   const points = props.data.points ? props.data.points : 0
  

return(
    <div className='btn'>
        <div className="glow"></div>
        <p className='points'> {points} </p>
            <div className="orb">
            	<div className="shine"></div>
                
            	<div className="light"></div>
            </div>
           
    </div>
)
        
    
    
}
export default MyPoints