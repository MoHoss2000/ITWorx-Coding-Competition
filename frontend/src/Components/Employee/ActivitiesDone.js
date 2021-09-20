import React , {useState} from 'react';
import 'antd/dist/antd.css';
import { List, Card} from 'antd';
import '../components.css';
import ActivityListItem from './ActivityListItem'
import ActivityCard from './ActivityCard'


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
                    <ActivityListItem activity={item} setActivity={setActivity} setIsModalVisible={setIsModalVisible}/>

                )}
               
            />
        </Card>
        <ActivityCard activity={activity} isModalVisible={isModalVisible}  setIsModalVisible={setIsModalVisible}/>
        </div>
        )
}

export default ActivitiesDone;