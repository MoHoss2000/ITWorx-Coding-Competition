import React , {useState} from 'react';
import 'antd/dist/antd.css';
import { List, Card, Avatar} from 'antd';
import '../../components.css';
import { Link } from 'react-router-dom';
import ActivityListItem from '../../Employee/ActivityListItem'
import ActivityCard from '../../Employee/ActivityCard'


const ActivitiesDone = (props) =>{
    const [activity,setActivity]=useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false);
    console.log(props.data)


    
    return(
        <div className="site-card-border-less-wrapper">
        <Card className ={props.className} bordered={false} >
            <List
                size="small" 
                scroll
                itemLayout="horizontal"
                dataSource={props.data}
                renderItem={item => (
                    
                <List.Item
                    actions={[<Link to={`/activities/${item.id}`}> View Activity </Link>]}
                >
                    <List.Item.Meta
                    avatar={
                        <Avatar src="/activity.png" />
                      }
                    title={<a href="https://ant.design">{item.name}</a>}
                    description= {item.description}
                    />
                </List.Item>
                )}
               
            />
        </Card>
        <ActivityCard activity={activity} isModalVisible={isModalVisible}  setIsModalVisible={setIsModalVisible}/>
        </div>
        )
}

export default ActivitiesDone;