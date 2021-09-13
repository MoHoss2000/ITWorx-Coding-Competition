import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Tabs, Card, Avatar} from 'antd'
import AdminPersonalInfo from './AdminPersonalInfo';
import Spinner from '../../General/loadingSpinner';
const { TabPane } = Tabs;
const AdminProfile = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    useEffect(() => {
        const id = 1
        const getData = async () => {
            const res = await axios.get(`http://localhost:3001/admin/profile/${id}`)
            setData(res.data)
            setLoading(false)
        }
        getData()
    }, [])

    if(loading)
        return <Spinner/>

    return(
        <div>
            <Card className='semi-back'></Card>
            <Card className='semi-lower'>
                <Avatar size={260} style={{backgroundColor: '#000090', marginLeft:'37%', marginRight:'35%', top:'-140px', fontSize:'110px'}} > {data.first_name.slice(0,1) + data.last_name.slice(0,1) } </Avatar>
                <Card style={{ borderColor: 'white', top:'-110px'}}>
                    <Tabs defaultActiveKey="1" centered='true' size='large' tabBarGutter={50}>
                        <TabPane tab={<span style={{fontSize:'25px'}}>Personal Info</span>}key="1">
                            <div className='profile-components'>
                                <AdminPersonalInfo data={data}/> 
                            </div>
                        </TabPane>
                    </Tabs>
                </Card>
            </Card>
        </div>
    )
}

export default AdminProfile