import React , {useState} from 'react';
import 'antd/dist/antd.css';
import { List, Card, Button} from 'antd';
import '../components.css';
import ActivityListItem from './ActivityListItem'
import ActivityCard from './ActivityCard'
import { Link } from 'react-router-dom'

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
                itemLayout="vertical"
                dataSource={props.data}
                renderItem={item => (
                    <ActivityListItem activity={item} setActivity={setActivity} setIsModalVisible={setIsModalVisible}/>
                )}    
            />
            <Button style={{margin:'30px'}}> <Link to='/myActivities'> View All Of My Activities </Link> </Button>
        </Card>
        <ActivityCard activity={activity} isModalVisible={isModalVisible}  setIsModalVisible={setIsModalVisible}/>
        </div>
        )
}

export default ActivitiesDone;