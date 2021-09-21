import React , {useState, useEffect, useContext} from 'react';
import 'antd/dist/antd.css';
import { List, Card , Avatar, Spin } from 'antd';
import axios from 'axios'
import { Link } from 'react-router-dom';
import '../components.css';
import { UserContext } from '../../Context';

const PendingList = () => {
    const [loading, setLoading] = useState(true) 
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const {cycleId} = useContext(UserContext)

    useEffect(() => {
        axios.get( `http://localhost:3001/admin/pending/${cycleId}`
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
        return <Spin large />
        
    return(
    <div className="site-card-border-less-wrapper">
    <Card bordered={false} loading={loading}
           >
        <List
            size="small"
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
            <List.Item
            actions={[<Link to={`/activities/${item.id}`}> View Activity </Link>]}
            >
                <List.Item.Meta
                
                avatar={
                    <Avatar src="/activity.png" />
                  }
                title={item.name || item.title}
                description = {item.description}
                />
            </List.Item>
            )}
           
        />
        
    </Card>
    </div>
    )
}
  
export default PendingList