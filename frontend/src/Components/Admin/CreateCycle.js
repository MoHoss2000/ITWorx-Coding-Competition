import 'antd/dist/antd.css';
import {useState, useContext} from 'react';
import axios from 'axios';
import { Divider } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import {UserContext} from "../../Context";
import {
    Spin,
    Typography,
    DatePicker,
    Form,
    Card,
    Button,
    Alert
  } from 'antd';
  const { Title } = Typography;
  const { RangePicker } = DatePicker;

function CreateCycle() {

  const {id,cycleId}=useContext(UserContext)
    const [form] = Form.useForm();
    const [loading, setLoading]= useState(false);
    const [response, setResponse]= useState({});
    const [error, setError]= useState(false);

    const onSubmit  = async () => {
        
        try {
          const values = await form.validateFields();
          console.log(values.dates[0].format("YYYY-MM-DD"))
          console.log(values.dates[1].format("YYYY-MM-DD"))
          setResponse({})
          setError(false)
          setLoading(true);
          console.log('Success:', values);
          const post = await axios({
            method: 'post',
            url: 'http://localhost:3001/admin/newCycle',
            data: {
                 adminID:id, 
                 start_date:values.dates[0].format("YYYY-MM-DD"),
                 end_date:values.dates[1].format("YYYY-MM-DD")
                }
          });
         console.log(post)
          setResponse(post.data)
          setLoading(false)
        } catch (e) {
          setResponse({})
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
            name="dates"
            label="Cycle dates"
            rules={[
                {
                  required: true,
                  message: 'Please Specify cycle dates ',
                },
              ]}>
              <RangePicker />
            </Form.Item>
            { response.status===0 && <Alert message={response.message} type="warning"/>}
            { response.status===1 && <Alert message={response.message} type="success" /> }
            {error && <Alert message={error} type="error" /> }

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
