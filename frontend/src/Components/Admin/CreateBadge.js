import React, {useState, useEffect} from 'react'
import { Form,Button, Spin, Input, InputNumber, Select, Switch, Alert } from 'antd';
import axios from 'axios'

const {Option} = Select;




const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
    size:'large',
    layout:'vertical'
};
  
  /* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
/* eslint-enable no-template-curly-in-string */

const CreateBadge = () => {
    const [alert, setAlert] = useState(<></>);

    const onFinish = (values) => {
        console.log(values);
        axios.post('http://localhost:3001/admin/badge',
            {...values}
        )
        .then((res) => {
            console.log('SUCCESS');
            setAlert(<Alert closable='true' message="Badge created successfully" type="success" />);
        })
        .catch((err) => {
            setAlert(<Alert closable='true' message="An error occured" type="error" />);
        });
    };  
    
    return (
        <div>
            {alert}
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item name={['name']} label="Ttile" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['description']} label="Description" rules={[{ required: true }]}>
                <Input.TextArea />
            </Form.Item>
            <Form.Item name={['type']} label="Type" rules={[{required: true}]}>
                <Select>
                    <Option value="developers">Developers Only</Option>
                    <Option value="all">All Employees</Option>
                </Select>
            </Form.Item>
            <Form.Item name={['points']} label="Points Needed" rules={[{ type: 'number', min: 0, required:true }]}>
                <InputNumber />
            </Form.Item>
            <Form.Item  initialValue={true} name={['enabled']} label="Enable Badge">
                <Switch defaultChecked='true'/>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                Submit
                </Button>
            </Form.Item>
            </Form>
        </div>
    );
};

export default CreateBadge