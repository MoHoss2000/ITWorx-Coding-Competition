import { useContext, useState } from 'react';
import { Form, Input, Button, Alert, Row, Col , Avatar} from 'antd';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { UserContext } from '../../Context';
import Axios from 'axios';
import { Card } from '@material-ui/core';
import '../components.css'
const Login = () => {
    const history = useHistory()
    const {type, targetPath, setId, setToken, setCycleId, setType} = useContext(UserContext);
    const [failed, setFailed] = useState(false)

  const onFinish = ({username, password}) => {
    Axios.post('http://localhost:3001/login', {
      username,
      password
    }).then((response) => {
      if(response.data == 'Wrong username!') throw new Error()
      const {accessToken, cycleID, id, type} = response.data
      setId(id)
      setToken(accessToken)
      setCycleId(cycleID)
      setType(type)
      let user = {id, accessToken, cycleID, type}
      localStorage.setItem("user", JSON.stringify(user));
      (targetPath === "") ? history.replace(type === 'employee' ? '/employee/home' : '/admin/home') : history.replace(targetPath)

    }).catch((e) => {
        setFailed(true)
    })
  };
  console.log(failed)

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if(type === 'employee')
    <Redirect to={'/employee/home'}/>

   else if(type === 'admin')
     <Redirect to={'/admin/home'}/>

  return (
    <div className='login-background' > 
    <div className="login" >
    <div className='avatar-login'>
         <Avatar size={120} style ={{backgroundColor: 'black'}} icon={<UserOutlined />} />
    </div>
    <Form
      className="login-form"
      name="basic"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="on"
    >
      <Form.Item
        label="Email"
        name="username" 
        rules={[
          {
            required: true,
            message: 'Please input your email!',
            type: 'email',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 11,
          span: 4,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 10,
          span: 16,
        }}
      >
        <Link to="/forgotpassword">Forgot Password ?</Link>
        
      </Form.Item>

      {
        failed
        ?
        <Alert
        message="Error"
        description="Wrong email or password!"
        type="error"
        showIcon
        />
        :
        null
    }
    </Form> 
    </div>
    </div>
  );
};

export default Login