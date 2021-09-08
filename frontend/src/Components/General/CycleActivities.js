import React , {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import { List } from 'antd';
import Spinner from './loadingSpinner'

const ActivityList = () => {
    const [loading, setLoading] = useState(true) 
    const [data, setData] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        axios(
        {
            method: 'get',
            url: 'http://localhost:3001/admin/viewActivity',
            headers: {}, 
            data: { id, 
                    CycleId : 1 }
        }).then((res) =>{          
                setData(res.data)
                setLoading(false)               
              })
              .catch((e) => {
                setError("Oops there seems to be a problem connecting to the network. Please try again later")
                console.log(e)
                
                
         })
    
    }, []);

    if(loading)
        return <Spinner />
        
    return(
    <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
        <List.Item
            actions={[<a key="list-loadmore-more">more</a>]}
        >
            <List.Item.Meta
              title={<a href="https://ant.design">{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
             />
        </List.Item>
        )}
    />
    )
}
  
