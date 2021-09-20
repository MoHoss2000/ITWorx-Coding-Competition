import { Form, Input, Button, Card } from 'antd';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../Context';
import ChangePasswordResult from './ChangePasswordResult';

const ChangePassword = () => {

  const {id, type} = useContext(UserContext)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    
  }, [])

  const reset = () => {
    setSuccess(null)
  }

  const onFinish = async ({ currentPassword, newPassword, confirmPassword }) => {
    try{
       await axios.patch(`http://localhost:3001/changepassword/${id}`, {
        currentPassword,
        newPassword,
        confirmPassword,
        type
      })
      setSuccess(true)
    }catch{
      setSuccess(false)
    }
  
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

const form = 
  <Card id="change-password">
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
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Old Password"
        name="currentPassword"
        rules={[
          {
            required: true,
            message: 'Please input your old password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="New Password"
        name="newPassword"
        rules={[
          {
            required: true,
            message: 'Please input your new password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        dependencies={['newPassword']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}

      >
        <Input.Password />
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
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {
        (success === true || success === false) ? <ChangePasswordResult pass={reset} success={success}/> : form
      }
      
    </div>
  );
};

export default ChangePassword