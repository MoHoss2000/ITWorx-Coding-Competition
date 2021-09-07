import React, {useState, useEffect} from 'react'
import { Row, Card, Col,Button } from 'antd';
import axios from 'axios'
import Spinner from '../Components/General/loadingSpinner'

const Badges = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    // const [sort, setSort] = useState({})
    // const [filter, setFilter] = useState({})
    useEffect(() => {
        const getBadges = async () => {
            const res = (await axios.get('http://localhost:3001/admin/badges'))
            console.log(res);
            setData(res.data)
            setLoading(false)
        }

        getBadges();
    }, [])
    


    if(loading)
        return <Spinner/>


    console.log(data)
    return (
        <>
        <h1 className="title">Badges</h1>
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