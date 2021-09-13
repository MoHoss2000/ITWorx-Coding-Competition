import React, { useState, useEffect } from 'react'
import { Row, Card, Col, Button, Spin , Divider} from 'antd';
import axios from 'axios'
// import Spinner from '../General/loadingSpinner'
import FloatingBox from './floatingbox/FloatingBox';
import BadgesDisplay from '../BadgesDisplay';

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


    return (
        <>
            <div>
                <h1 className="title">Badges</h1>
                <Divider className="title-divider"/>
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

            <BadgesDisplay adminMode={true} data={data} setNewBadgeMode={setNewBadgeMode}
                setVisible={setVisible} setSelectedData={setSelectedData} setData={setData} />

            <FloatingBox
                visible={visible} newBadge={newBadgeMode} setVisible={setVisible} data={selectedData} setData={setData}
            />
        </>
    );

}



export default Badges