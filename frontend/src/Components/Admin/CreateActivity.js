import 'antd/dist/antd.css';
import {useState, useContext} from 'react';
import axios from 'axios';
import {Alert,Button, Card, Form, Input,Divider, InputNumber, Select, Space, Spin, Switch, Typography,} from 'antd';
import {UserContext} from "../../Context";

const {Option} = Select;
const {Title} = Typography;
const {TextArea} = Input;


function CreateActivity() {
  const {id}=useContext(UserContext)
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({});
  const [error, setError] = useState(null);

  const onSubmit = async () => {

    try {
      const values = await form.validateFields();
      setResponse({})
      setError(null)
      setLoading(true);
      console.log('Success:', values);
      const post = await axios({
        method: 'post',
        url: 'http://localhost:3001/admin/newActivity',
        data: {
          adminID: id,
          ...values
        }
      });

      setResponse(post.data)
      setLoading(false)
    } catch (e) {
      setResponse({})
      setLoading(false)
      if (e.errorFields)
        setError("Please fill all input fields")
      else
        setError("Oops, There seems to be a network problem, please try again :/")
      console.log('Failed:', e);
    }
  };


  return (
<div>
  <div style={{display: 'flex', flexWrap: 'wrap'}}>
  <h1 className="title">Create New Activity </h1>


  </div>
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
              <InputNumber min={5}/>
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
              <Switch checked='false'/>
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
                <TextArea placeholder="Enter activity description here" style={{height: '100px'}} allowClear/>
              </Form.Item>

            </Card>
           

            { response.status===0 && <Alert message={response.message} type="warning"/>}
            { response.status===1 && <Alert message={response.message} type="success" /> }
            {error && <Alert message={error} type="error" /> }


            <div style={{textAlign:'center'}}>
            <Button type="primary" onClick={onSubmit} style={{ marginTop: '40px', width: '150px'}}>
              Create Activity
            </Button>
            </div>

          </Form>
      </Spin>
    </Space>
        </Card>
        </div>
  );

}

export default CreateActivity;
