import React  from 'react';
import 'antd/dist/antd.css';
import '../components.css';

function DisableSwitch (props){
  return (
    <div style={{display:'flex', flexDirection: 'row',  marginTop: '30px'}}>
      {
        props.current == 0 ?  <h3> This Cycle has Ended </h3> : <h3> This Cycle is Currently Running</h3>
      }
     
    </div>
  )
}

export default DisableSwitch
