import React from 'react'
import {Card, Button, Avatar, Row, Col} from 'antd'
import {UserOutlined} from '@ant-design/icons'

const AdminPersonalInfo = (props) => {
    const data = props.data


    return (
        <div>
            <Card className="info-card">
                <Row gutter={[16,8]}>
                    <Col style={{display: 'flex', flexDirection: 'column'}}>
                        <Avatar size={120} style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                    </Col>
                    <Col>
                        <div>
                            <p><b>User Information</b></p>
                            <p><b>Name: </b>{data.first_name + " " + data.last_name}</p>
                            <p><b>Email: </b>{data.username}</p>
                        </div>
                    </Col>
                <Col>
                    <Button type='primary' style={{color: 'white', marginTop: '30px', left: '-10px', margin: '5px', top: '-10px'}}>Change Password</Button>
                    <Button type='primary' style={{color: 'white', marginTop: '10px', left: '-10px', margin: '5px', top: '-10px'}}>Edit data</Button>
                </Col>
                </Row>
            </Card>
        </div>
    )
}
export default AdminPersonalInfo