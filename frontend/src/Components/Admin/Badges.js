import React, { useState, useEffect } from 'react'
import { Row, Card, Col, Button, Spin } from 'antd';
import axios from 'axios'
// import Spinner from '../General/loadingSpinner'
import FloatingBox from './components/floatingbox/FloatingBox';

const Badges = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [selectedData, setSelectedData] = useState([])
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const getBadges = async () => {
            try {
                const res = (await axios.get('http://localhost:3001/admin/badges'))
                // console.log(res);
                setData(res.data)
            } catch (e) {
                setData(null);
            }

            setLoading(false)

        }
        getBadges();
    }, [])

    if (data == null)
        return 'An error occured';

    if (loading)
        return <Spin size='large' />



    // console.log('DATA ' + data)
    return (
        <>
            <div>
                <h1 className="title">Badges</h1>
                <div style={{ display: "flex", flexDirection: 'row-reverse' }}>
                    <Button type='primary' size='large' shape='round'>Create New Badge</Button>
                </div>
            </div>

            <Row gutter={[16, 16]}>
                {
                    data.map((badge, index) => (
                        <Col span={8}>
                            <Card style={{borderRadius: 40, backgroundColor: badge.enabled? 'ffffff':'#E7E7E7'}} hoverable='true' actions={[<Button size='large' onClick={() => {
                                setSelectedData(badge);
                                console.log(`selected is: ${selectedData}`);
                                setVisible(true);
                            }}>Edit</Button>, <Button size='large'> {badge.enabled? 'Disable': 'Enable'} </Button>]} headStyle={{display:'flex', alignItems: 'center', flexDirection: 'column'}} title={<h2>{badge.name}</h2>}>
                                <div style={{ display: "flex", flexDirection: "column" , alignItems: 'center'}}>
                                    <img width='100' height='100' src='/badge.png'></img>
                                    <h1>{badge.type == 'developers' ? 'Developers' : 'All Employees'}</h1>

                                    <h5>{badge.description}</h5>
                                    <h2 style={{textAlign:"center"}}>Points Needed <br /> {badge.points_needed}</h2>
                                </div>

                            </Card>
                        </Col>
                    ))}
            </Row>

            <FloatingBox
                visible={visible} setVisible={setVisible} data={selectedData} seteData={setData}
            />
        </>
    );
}

export default Badges