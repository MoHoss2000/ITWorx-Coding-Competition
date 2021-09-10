import React from 'react'
import {Descriptions, Card, Button} from 'antd'
import {SketchOutlined} from '@ant-design/icons';

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
            <Card style={{height: '340px', width: '690px'}} className="info-card">
        
                <Descriptions column={1} style={{width: '45%'}} title="User Information">
                    <Descriptions.Item label="Name">{personalInfo.first_name + " " + personalInfo.last_name}</Descriptions.Item>
                
                    <Descriptions.Item label="Email">{personalInfo.username}</Descriptions.Item>
            
                    <Descriptions.Item label="Developer">{isDeveloper}</Descriptions.Item>

                    <Descriptions.Item label="Departments">{employeeDepartments}</Descriptions.Item>

                    <Descriptions.Item label="Practices">{employeePractice}</Descriptions.Item>
                </Descriptions>

                <Button style={{color: '#0782CF', marginRight: '20px'}}>Change Password</Button>
                <Button style={{color: '#0782CF', marginRight: '20px'}}>Edit data</Button>
                <div style={{position: 'relative', left: '50%', top:'-250px', display:'flex', flexDirection:'column', width: '200px'}}>
                    <span style={{fontWeight: 'bold', fontSize: '30px', textAlign: 'center'}}>Earned Points</span>
                    <SketchOutlined style={{color: "#0782CF", fontSize: "100px"}}/>
                    <span style={{fontWeight: 'bold', fontSize: '30px', textAlign: 'center'}}>{personalInfo.points}</span>
                </div>
            </Card>
        </div>
    )
}
export default PersonalInfo