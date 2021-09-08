import React, {useState, useEffect} from 'react'
import { Row, Card, Col,Button, Spin } from 'antd';
import axios from 'axios'
// import Spinner from '../General/loadingSpinner'

const Badges = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    // const [sort, setSort] = useState({})
    // const [filter, setFilter] = useState({})
    useEffect(() => {
        const getBadges = async () => {
            try{
                const res = (await axios.get('http://localhost:3001/admin/badges'))
                console.log(res);
                setData(res.data)
            } catch(e){
                setData(null);
            }

            setLoading(false)

        }


        getBadges();
    }, [])
    
    if(data == null)
        return 'An error occured';

    if(loading)
        return <Spin size='large' />



    console.log('DATA ' + data)
    return (
        <>
        <div>
            <h1 className="title">Badges</h1>
            <div style={{display:"flex", flexDirection:'row-reverse'}}>
                <Button type='primary' size='large' shape='round'>Create New Badge</Button>
            </div>
        </div>

        <Row gutter={[16, 16]}>
        {    
            data.map((badge) => (
                <Col span={8}>
                    <Card hoverable='true' actions={[<Button size='large'>Edit</Button>, <Button size='large' >Disable</Button>]} title={<h1>{badge.name}</h1>}>
                        <img width='100' height='100' src='/badge.png'></img>
                        <h1>{badge.type == 'developers' ? 'Developers': 'All Employees'}</h1>
                        <h5>{badge.description}</h5>
                        <h2>Points Needed: {badge.points_needed}</h2>
                    </Card>
                </Col>
            ))}
        </Row>
        </>
      );
}

export default Badges