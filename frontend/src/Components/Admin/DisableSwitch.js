import React , {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import '../components.css';
import { Modal, Button, Space, Switch, Alert  } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios'
const { confirm } = Modal;


function DisableSwitch (props){
  const [text, setText] = useState("Disable Cycle")
  const [alert, setAlert] = useState(<></>);
  const [enabled, setEnabled] = useState(true)

  useEffect(()=>{
  }, [text])

  function Confirm() {
    confirm({
      title: 'Are you sure you want to disable this cycle? ',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone',
      onOk() {
            disable() 
      },
      onCancel() {
        setEnabled(true)
      },
    });
  }
  const disable = async () => {
    console.log("hi");
    var cycleID=1
    try{
       
       const res = (await axios.patch(`http://localhost:3001/admin/cycle/disable/${cycleID}`))
    
        console.log('SUCCESS');
        onChange()
        setAlert(<Alert closable='true' message="Cycle disabled successfully" type="success" />);
  }
     catch(e) {
        setAlert(<Alert closable='true' message="Failed to disable cycle, please try again" type="error" />);
    };
};  
  const onChange = ()=>{
    console.log("heyyyy")
    setText("Cycle Disabled")
    setEnabled(false)
  }
  return (
    <div style={{display:'flex', flexDirection: 'row',  marginTop: '30px'}}>
      {
        props.current== 0 ?  <h3> This Cycle has Ended </h3> : <h3> This Cycle is Currently Running</h3>
      }
     
    </div>
  )
}

export default DisableSwitch
