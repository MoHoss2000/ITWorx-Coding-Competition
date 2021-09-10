import React , {useState} from 'react';
import 'antd/dist/antd.css';
import '../components.css';
import { Switch } from 'antd';


function DisableSwitch (){
  
  return (
    <Switch  checkedChildren="Cycle Enabled" unCheckedChildren="Cycle Disabled" defaultChecked style={{width: 50}}/>
  )
}

export default DisableSwitch
