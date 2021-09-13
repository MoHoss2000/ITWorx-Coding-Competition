import React from 'react'
import {Descriptions, Card, Button, Avatar, Row, Col} from 'antd'
import {SketchOutlined, UserOutlined} from '@ant-design/icons'
const PersonalInfo = (props) => {
    const personalInfo = props.data.personalInfo[0]
    const departments = props.data.departments
    const isDeveloper = personalInfo.is_developer == 1 ? 'Yes' : 'No'
    const practice = props.data.practice
    let employeeDepartments = ''
    let employeePractice = ''
    
    for(let i = 0 ; i < departments.length ; i++)
        if(i == departments.length - 1)
            employeeDepartments += departments[i].name
        else
            employeeDepartments += `${departments[i].name} - `

    for(let i = 0 ; i < practice.length ; i++)
        if(i == practice.length - 1)
            employeePractice += practice[i].name
        else
            employeePractice += `${practice[i].name} - `

    return (
        <div>
            <Card className="info-card">
                <Row gutter={[16,8]}>
                    <Col style={{display: 'flex', flexDirection: 'column'}}>
                    <Avatar size={120} style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                    <Button type='primary' style={{color: 'white', marginTop: '30px', left: '-10px'}}>Change Password</Button>
                    <Button type='primary' style={{color: 'white', marginTop: '10px', left: '-10px'}}>Edit data</Button>
                    </Col>
                    <Col>
                    <div>
                        <p><b>User Information</b></p>
                        <p><b>Name: </b>{personalInfo.first_name + " " + personalInfo.last_name}</p>
                        <p><b>Email: </b>{personalInfo.username}</p>
                        <p><b>Developer: </b>{isDeveloper}</p>
                        <p><b>Departments: </b>{employeeDepartments}</p>
                        <p><b>Practices: </b>{employeePractice}</p>
                    </div>
                    </Col>
                <Col>
                <div style={{display:'flex', flexDirection:'column'}}>
                    <span style={{fontWeight: 'bold', fontSize: '20px', textAlign: 'center'}}>Earned Points</span>
                    <SketchOutlined style={{color: "#0782CF", fontSize: "60px"}}/>
                    <span style={{fontWeight: 'bold', fontSize: '20px', textAlign: 'center'}}>{personalInfo.points}</span>
                </div>
                </Col>
                </Row>
            </Card>
        </div>
    )
}
export default PersonalInfo