import 'antd/dist/antd.css';
import {useState} from 'react';
import axios from 'axios';
import { Divider } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import {
    Spin,
    Typography,
    DatePicker,
    Form,
    Card,
    Button,
  } from 'antd';
  const { Title } = Typography;

function CreateCycle() {

    const [form] = Form.useForm();
    const [loading, setLoading]= useState(false);
    const [message, setMessage]= useState(null);
    const [error, setError]= useState(null);

    const onSubmit  = async () => {
        
        try {
          const values = await form.validateFields();
          const {start_date, end_date} = values;
          setMessage(null)
          setError(null)
          setLoading(true);
          console.log('Success:', values);
          const post = await axios({
            method: 'post',
            url: 'http://localhost:3001/admin/newCycle',
            data: {
                 adminID:1, 
                 start_date:start_date.format("YYYY-MM-DD"),
                 end_date: end_date.format("YYYY-MM-DD")
                }
          });
        
          setMessage(post.data)
          setLoading(false)
        } catch (e) {
          setMessage(null)
          setLoading(false)
          if(e.errorFields){
          setError("Please fill all input fields")
          }
          else{
          setError("Oops, There seems to be a network problem, please try again :/")
          }
          console.log('Failed:', e);
        }
      };
    return (
      <div >
      
            <h1 className="title">Create New Cycle </h1>
            <Divider className="title-divider"/>
            <div className ='centered-component'>
            <Spin spinning={loading} delay={400} >
            <Card title={
                <div style={{ display: "flex", flexDirection :'row'}}>
                <SyncOutlined  style={{ fontSize: '140%' }} />
                <Title level={3} style={{ marginLeft:'20px'}}>New Cycle</Title>
                </div>}  
                style={{  marginTop:'50px',marginBottom:'50px'}}>
                    
            <Form form={form} name="New Activity">
            <Form.Item 
            name="start_date"
            label="Start Date"
            rules={[
                {
                  required: true,
                  message: 'Please Specify start date ',
                },
              ]}>
                  <DatePicker />
            </Form.Item>
            <Form.Item 
            name="end_date"
            label="End Date"
            rules={[
                {
                  required: true,
                  message: 'Please Specify end date ',
                },
              ]}>
                  <DatePicker />
            </Form.Item>
            { message && <Title level={5} style={{ marginLeft:'120px', marginTop:'20px', color:'green'}}>{message}</Title> }
            { error && <Title level={5} style={{  marginLeft:'120px', marginTop:'20px', color:'red'}}>{error}</Title> }
            <Button type="primary" onClick={onSubmit} style={{ marginLeft:'300px',  marginTop:'40px', width:'150px'}} >
                  Create Cycle 
            </Button>
            </Form>
            </Card>
            </Spin>
            </div>
     </div>    
    );

}

export default CreateCycle;
