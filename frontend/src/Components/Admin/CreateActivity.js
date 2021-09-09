import 'antd/dist/antd.css';
import {useState} from 'react';
import axios from 'axios';
import {Button, Card, Form, Input, InputNumber, Select, Space, Spin, Switch, Typography,} from 'antd';

const {Option} = Select;
const {Title} = Typography;
const {TextArea} = Input;


function CreateActivity() {

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = async () => {

    try {
      const values = await form.validateFields();
      setMessage(null)
      setError(null)
      setLoading(true);
      console.log('Success:', values);
      const post = await axios({
        method: 'post',
        url: 'http://localhost:3001/admin/newActivity',
        data: {
          adminID: 1,
          ...values
        }
      });

      setMessage(post.data)
      setLoading(false)
    } catch (e) {
      setMessage(null)
      setLoading(false)
      if (e.errorFields)
        setError("Please fill all input fields")
      else
        setError("Oops, There seems to be a network problem, please try again :/")
      console.log('Failed:', e);
    }
  };
  return (
        <Card title={<Title level={3}>New Activity</Title>}>
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
            {message &&
            <Title level={5} style={{marginLeft: '120px', marginTop: '20px', color: 'green'}}>{message}</Title>}
            {error && <Title level={5} style={{marginLeft: '120px', marginTop: '20px', color: 'red'}}>{error}</Title>}

            <Button type="primary" onClick={onSubmit} style={{marginLeft: '300px', marginTop: '40px', width: '150px'}}>
              Create Activity
            </Button>
          </Form>
      </Spin>
    </Space>
        </Card>
  );

}

export default CreateActivity;
