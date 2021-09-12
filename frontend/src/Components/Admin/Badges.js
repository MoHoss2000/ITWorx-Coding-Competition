import React, { useState, useEffect } from 'react'
import { Row, Card, Col, Button, Spin } from 'antd';
import axios from 'axios'
// import Spinner from '../General/loadingSpinner'
import FloatingBox from './floatingbox/FloatingBox';

const Badges = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [selectedData, setSelectedData] = useState([])
    const [visible, setVisible] = useState(false)
    const [newBadgeMode, setNewBadgeMode] = useState(false);

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

    
    const EditBadgeButton = (props) => {
        return <Button size='large' onClick={() => {
            setNewBadgeMode(false);
            setSelectedData(props.badge);
            setVisible(true);
        }}>Edit</Button>
    }

    const ToggleBadgeStatus = (props) => {
        const badge = props.badge;
        return <Button size='large' onClick={
            async ()=>{
                badge.enabled = !badge.enabled;

                await axios.patch(`http://localhost:3001/admin/badge/${badge.id}`, badge);
                // window.location.reload();
                const res = await axios.get('http://localhost:3001/admin/badges')
                // console.log(res);
                setData(res.data)
            
            }
        }> 
            {badge.enabled? 'Disable': 'Enable' }
        </Button>
    }

    // console.log('DATA ' + data)
    return (
        <>
            <div>
                <h1 className="title">Badges</h1>
                <div style={{ display: "flex", flexDirection: 'row-reverse' }}>
                    <Button type='primary' size='large' shape='round' onClick={
                        () => {
                            setNewBadgeMode(true);
                            setSelectedData(null);
                            setVisible(true);
                        }
                    } > Add New Badge</Button>
                </div>
            </div>

            <Row gutter={[16, 16]}>
                {
                    data.map((badge, index) => (
                        <Col span={8}>
                            <Card style={{borderRadius: 40, backgroundColor: badge.enabled? '#ffffff':'#E7E7E7'}} hoverable='true' actions={[<EditBadgeButton badge={badge}/>, <ToggleBadgeStatus badge ={badge}/>]} headStyle={{display:'flex', alignItems: 'center', flexDirection: 'column'}} title={<h2>{badge.name}</h2>}>
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
                visible={visible} newBadge={newBadgeMode} setVisible={setVisible} data={selectedData} setData={setData}
            />
        </>
    );

}



export default Badges