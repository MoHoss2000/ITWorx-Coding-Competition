import React, { useState, useEffect } from 'react'
import { Row, Card, Col, Button, Spin } from 'antd';
import axios from 'axios'
import badge_icons, { getBadgeIcon } from '../Helpers/badge_icons';

// span determines no of badges in each row of the grid:
// span value | no of columns
//     12     |     2
//      8     |     3
//      6     |     4
//      4     |     6
//      3     |     8


// for general use, set data to the array of badges
// and you can use span to determine no of columns
// all other props are used in admin mode
const BadgesDisplay = ({data, setVisible, setSelectedData,
     setNewBadgeMode, setData, adminMode = false, span = 8}) => {
    
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
            async () => {
                badge.enabled = !badge.enabled;

                await axios.patch(`http://localhost:3001/admin/badge/${badge.id}`, badge);
                // window.location.reload();
                const res = await axios.get('http://localhost:3001/admin/badges')
                // console.log(res);
                setData(res.data)

            }
        }>
            {badge.enabled ? 'Disable' : 'Enable'}
        </Button>
    }

    return (
        <div  style={{margin: '20px 20px 20px 40px'}}>
        <Row gutter={[8, 16]}>
         {/* <div style={{ margin:'0 15% 0 15%'}}>  */}
            {  data.map((badge, index) => (
                    <Col span={span} >
                        
                        <Card size='small' style={{ borderRadius: 30, width:'350px',backgroundColor: badge.enabled ? '#ffffff' : '#E7E7E7' }} hoverable='true' 
                        actions={
                            adminMode ? [<EditBadgeButton badge={badge} />, <ToggleBadgeStatus badge={badge} />] : null} headStyle={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }} title={<h2>{badge.name}</h2>}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
                                <img width='170' height='170' src={getBadgeIcon(badge.points_needed)}></img>
                                <h1>{badge.type == 'developers' ? 'Developers' : 'All Employees'}</h1>

                                <h5>{badge.description}</h5>
                                <h2 style={{ textAlign: "center" }}>Points Needed <br /> {badge.points_needed}</h2>
                            </div>

                        </Card>
                    </Col>
                ))}
            {/* </div> */}
        </Row>
        </div>
    );

}



export default BadgesDisplay