import 'antd/dist/antd.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import {Alert,Button, Card, Divider, Form, Input, InputNumber, Select, Space, Spin, Switch, Typography,} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const {Option} = Select;
const {Title} = Typography;
const {TextArea} = Input;


function EditActivity() {
    
  const {id} = useParams();
  const [form] = Form.useForm();
  const [activity, setActivity] = useState(null)
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState({});
  const [error, setError] = useState(null);
  
  useEffect(() => {
      
    if(activity===null){return}
    const {name,points,type,description,virtual_recognition,enabled}=activity
    form.setFieldsValue({
      name,points,type,description,virtual_recognition,enabled
    });
    setLoading(false)
  },[activity]);

  useEffect(() => {

    console.log('GETTING ACTIVITY');
    console.log("id "+ id)
    setError(null)
    axios(
      {
        method: 'get',
        url: 'http://localhost:3001/admin/viewActivity',
        headers: {},
        params: {
          id,
          CycleId: 1
        }
      }).then((res) => {
      console.log(res.data[0][0])
      setActivity(res.data[0][0])
    })
      .catch((e) => {
        setError("Oops there seems to be a problem connecting to the network")
        console.log(e)
     })
  }, []);

  const onSubmit = async () => {

    try {
      const values = await form.validateFields();
      setResponse({})
      setError(null)
      setLoading(true);
      console.log('Success:', values);
      const post = await axios({
        method: 'post',
        url: 'http://localhost:3001/admin/editActivity',
        data: {
          ActivityId:id,
          adminID: 1,
          ...values
        }
      });
      console.log(post)
      setResponse(post.data)
      setLoading(false)
    } catch (e) {
      console.log(e)
      setResponse({})
      setLoading(false)
      if (e.errorFields)
        setError("Please fill all input fields")
      else
        setError("Oops, There seems to be a network problem, please try again :/")
      console.log('Failed:', e);
    }
  };
  if(activity===null){
          
     return (<Card title={<Title level={3}>Edit Activity</Title>}>
             <LoadingOutlined style={{ fontSize: 50 }} spin />
            </Card>)
  }

  return (
    <div> 
      <h1 className="title"> Edit Activity </h1>
      <Divider className="title-divider"/>
    <Card title={<Title level={3}></Title>} style={{marginLeft: '10%', marginRight: '10%'}}>
    <Space size="large" style={{display: 'block'}}>
      <Spin spinning={loading} size={"large"} style={{margin: 0}} delay={400}>

          <Form form={form} name="New Activity">
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: 'Activity Name',
                },
              ]}
            >
              <Input placeholder="Please input activity name"/>
            </Form.Item>

            <Form.Item
              name="points"
              label="points"
              rules={[
                {
                  required: true,
                  message: 'Please Specify number of points (must be a number)',
                },
              ]}
            >
              <InputNumber />
            </Form.Item>

            <Form.Item
              name="type"
              label="Type"
              rules={[
                {
                  required: true,
                  message: 'Please specify activity type!',
                },
              ]}
            >
              <Select placeholder="select Activity Type" style={{width: 200}}>
                <Option value="Developer">Developer</Option>
                <Option value="Non-Developer">Non-Developer</Option>
              </Select>
            </Form.Item>

            <Form.Item name="virtual_recognition" label="Virtual Recognition available" valuePropName="checked">
              <Switch />
            </Form.Item>

            <Form.Item name="enabled" label="Enabled" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Card type="inner" title="Description" style={{marginTop: '20px'}}>


              <Form.Item
                name="description"
                rules={[
                  {
                    required: true,
                    message: 'Description is required',
                  },
                ]}
              >
            <TextArea placeholder="Enter activity description here"  value={activity.description}style={{height: '100px'}} allowClear/>
              </Form.Item>

            </Card>

           { response.status===0 && <Alert message={response.message} type="warning"/>}
           { response.status===1 && <Alert message={response.message} type="success" /> }
            {error && <Alert message={error} type="error" /> }

            <Button type="primary" onClick={onSubmit} style={{marginLeft: '300px', marginTop: '40px', width: '150px'}}>
              Update Activity
            </Button>
          </Form>
      </Spin>
    </Space>
        </Card>

        </div>
  );

}

export default EditActivity;
