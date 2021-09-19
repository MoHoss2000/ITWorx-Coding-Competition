import { Form, Input, Button, Card } from 'antd';
import axios from 'axios';
import React, { useEffect } from 'react';

import { Link, useParams } from 'react-router-dom';

const ResetPassword = () => {

  const { token } = useParams();

  useEffect(() => {
    
  }, [])


  const onFinish = async ({ currentPassword, newPassword, confirmPassword }) => {
    console.log(currentPassword, newPassword, token);
    try{
      var res = await axios.patch('http://localhost:3001/newpassword', {
        // "oldPassword": currentPassword,
        "newPassword": newPassword,
        "token": token,
      });

      window.alert(res.data);
    } catch(e){
      // window.alert(e.response);
      window.alert(e.response.data.message)

    }


  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
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
          {/* <Form.Item
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
          </Form.Item> */}

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
    </div>
  );
};

export default ResetPassword