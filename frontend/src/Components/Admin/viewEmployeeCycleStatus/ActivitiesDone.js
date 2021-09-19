import React from 'react';
import 'antd/dist/antd.css';
import { List, Card, Avatar} from 'antd';
import '../../components.css';



const ActivitiesDone = (props) =>{
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
                    actions={[<a key="list-loadmore-more">View Activity</a>]}
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
        </div>
        )
}

export default ActivitiesDone;