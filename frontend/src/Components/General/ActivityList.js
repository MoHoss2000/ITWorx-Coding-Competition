import React , {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import { List, Card , Button, Avatar, Typography, Divider, Spin , Modal} from 'antd';
import axios from 'axios'
import ActivityCard from '../Employee/ActivityCard'
import '../components.css';
import { PropertySafetyFilled, SketchOutlined } from '@ant-design/icons';
import DisplayActivities from '../Admin/DisplayActivities';
import ActivityListItem from '../Admin/ActivityListItem';
import { useParams, Link } from 'react-router-dom';
const { Title } = Typography;

function ActivityList({id, className}) {
    const [loading, setLoading] = useState(true) 
    const [overview, setOverview] = useState([])
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [activity, setActivity] = useState(null)
    const [visible, setVisible] = useState(false);
   const [isModalVisible, setIsModalVisible] = useState(false);


    useEffect(() => {
        
        axios.get( `http://localhost:3001/admin/getActivities/${id}`
        ).then((res) =>{         
                setData(res.data)
                setOverview(res.data.slice(0,3))
                setLoading(false)  
                console.log(res)             
              })
              .catch((e) => {
                setError("Oops there seems to be a problem connecting to the network. Please try again later")
                console.log(e)
         })
    
    }, []);

    if(loading)
        return <Spin large/>
        
    return(
    <div className="site-card-border-less-wrapper">
    <Card className ={className} bordered={false} loading={loading}>
    <Title level={4}> Cycle Activities </Title>
        <Divider className="small-divider"/>
        <List
            size="small"
            itemLayout="horizontal"
            dataSource={overview}
            renderItem={item => (
            <List.Item          
                extra={<Button type="link" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                  >
                    <SketchOutlined />
                    <Link to={`/activities/${item.id}`} style={{  marginLeft: 5 }}>
                      View Activity
                    </Link>
                  </Button>}
                 >
            
                <List.Item.Meta
                avatar={
                    <Avatar src="/activity.png" />
                  }
                title={item.name || item.title}
                description= {item.description}
                />
            </List.Item>
            )}
           
        />
        <>
            <Button style={{left: '7%', top:"10px"}}type='primary' onClick={() => setVisible(true)}>
                View All Cycle Activities
            </Button>
            <Modal
                title="Cycle Activities"
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={1000}
            >
                <DisplayActivities activities={data}/>
            </Modal>
         </>
    </Card>
    <ActivityCard activity={activity} isModalVisible={isModalVisible}  setIsModalVisible={setIsModalVisible}/>
    </div>
    )
}
  
export default ActivityList