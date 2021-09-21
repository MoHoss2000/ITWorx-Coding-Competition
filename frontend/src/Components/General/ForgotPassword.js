import React, { useState } from 'react';
import axios from 'axios';
import { Card, Input, Form, Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [success, setSuccess] = useState(null)

  const submitForm = async ({username}) => {
    try {
      await axios.post('http://localhost:3001/resetPassword', { email: username });
      setSuccess(true)
    } catch (e) {
      setSuccess(false)
    }
  }
const form = <Card style={{margin: '0 auto'}} id="change-password">
        <Form
          style={{ width: '90%' }}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={submitForm}
          autoComplete="off"
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
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
  return (
    success ? 
     <Result
      status="success"
      title="An email has been sent. Please check your inbox"
      extra={[
        <Button type="primary" key="console">
          <Link to="/">Back</Link>
        </Button>,
      ]}
    />
    : success === false ?
    <Result
      status="warning"
      title="Invalid email address"
      extra={[
        <Button onClick={() => setSuccess(null)} type="primary" key="console">
          <Link to="/forgotpassword">Back</Link>
        </Button>,
      ]}
    />
    :
    form
    
  );
}
export default ForgotPassword;
