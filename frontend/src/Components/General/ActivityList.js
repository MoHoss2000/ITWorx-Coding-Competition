import React , {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import { List, Card , Button, Avatar, Typography, Divider, Spin } from 'antd';
import axios from 'axios'
import '../components.css';
const { Title } = Typography;

function ActivityList({id}) {
    const [loading, setLoading] = useState(true) 
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    
    useEffect(() => {
        
        axios.get( `http://localhost:3001/admin/getActivities/${id}`
        ).then((res) =>{         
                setData(res.data.slice(0,3))
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
    <Card className ="activities-card" bordered={false} loading={loading}>
    <Title level={4}> Cycle Activities </Title>
        <Divider className="small-divider"/>
        <List
            size="small"
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
            <List.Item
                actions={[<a key="list-loadmore-more">View Activity</a>]}
            >
                <List.Item.Meta
                avatar={
                    <Avatar src="./activity.png" />
                  }
                title={<a href="https://ant.design">{item.title}</a>}
                description= {item.description}
                />
            </List.Item>
            )}
           
        />
        <Button type="primary" className="view-all-button"> View All Activities</Button>
    </Card>
    </div>
    )
}
  
export default ActivityList