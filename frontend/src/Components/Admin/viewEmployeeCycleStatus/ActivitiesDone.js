import React , {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import { List, Card , Button, Avatar, Typography, Divider} from 'antd';
import axios from 'axios'
import '../../components.css';
const { Title } = Typography;


const ActivitiesDone = (props) =>{
    console.log(props.data)


    
    return(
        <div className="site-card-border-less-wrapper">
        <Card className ={props.className} bordered={false} >
            <List
                size="small" 
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