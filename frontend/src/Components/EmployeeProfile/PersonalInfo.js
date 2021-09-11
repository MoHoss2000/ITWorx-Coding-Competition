import React from 'react'
import {Typography, Card, Button, Badge, Row, Col} from 'antd'
import {SketchOutlined, UserOutlined} from '@ant-design/icons';
const { Title } = Typography;

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
                    
                    <Col>
                    <div style={{ right:'-110px'}}>
                         <Title level={2}>{personalInfo.first_name + " " + personalInfo.last_name}</Title>
                         <Title level={5}><b>Email: </b>{personalInfo.username}</Title>
                         <Title level={5}> <b>Developer: </b> {isDeveloper}</Title>
                         <Title level={5}><b>Departments: </b>{employeeDepartments}</Title>
                         <Title level={5}><b>Practices: </b>{employeePractice}</Title>
        

                    </div>
                    
                   
                    
                    </Col>
                <Col>
                <Badge.Ribbon text="Earned Points" size ={20} color="black" style={{right:'-145px', top:'-5px', fontSize: '18px'}}>
                    <Card style={{ backgroundColor: '#ffd600', width:'200px', right:'-210px'}} >
                    <div style={{display:'flex', flexDirection:'column'}}>
                            <SketchOutlined style={{color: "black", fontSize: "60px"}}/>
                            <span style={{fontWeight: 'bold', fontSize: '20px', textAlign: 'center'}}>{personalInfo.points +' Points'} </span>
                        </div>
                        
                    </Card>
                </Badge.Ribbon>

                <Button type='primary' style={{color: 'white', marginTop: '10px', marginLeft: '10px' ,right:'-170px'}}>Change Password</Button>
                    <Button type='primary' style={{color: 'white', marginTop: '10px', marginLeft: '30px', right:'-170px'}}>Edit data</Button>
                </Col>
                </Row>
            </Card>
            
        </div>
    )
}
export default PersonalInfo