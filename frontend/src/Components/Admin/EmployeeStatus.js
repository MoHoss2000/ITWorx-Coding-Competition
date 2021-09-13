import React, { useEffect, useState } from 'react'
import EmployeeProfile from '../EmployeeProfile/EmployeeProfile'
import { List, Card , Button, Avatar} from 'antd';
import Spinner from '../General/loadingSpinner'
import axios from 'axios';
const EmployeeStatus = () =>{
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    useEffect(() => {
        const getCompletedActivities = async() => {
            const employeeID = 1
            const cycleID = 1
            const res = await axios.get(`http://localhost:3001/employee/activities/completed/${employeeID}/${cycleID}`)
            setData(res.data)
            setLoading(false)
        }
        getCompletedActivities()
    }, [])
    return(
        <div>
            <EmployeeProfile/>
            <div className="site-card-border-less-wrapper">
                <Card className ="activities-card" bordered={false} loading={loading}
                    title={<span style={{"marginLeft": "285px", "fontSize": "20px", "color": "rgb(0, 153, 204)" }}> Completed Activities</span>} >
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
       
        </Card>
        </div>
    </div>
    )
}
export default EmployeeStatus