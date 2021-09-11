import React, {useState, useEffect} from 'react'
import {Badge, Descriptions, Tabs, Typography, Divider, Card, Avatar} from 'antd'
import axios from 'axios'
import PersonalInfo from './PersonalInfo'
import Spinner from '../General/loadingSpinner'
import VirtualRecognitions from './VirtualRecognitions'
import Badges from './Badges'
import {SketchOutlined, UserOutlined} from '@ant-design/icons';
import '../components.css'
const { TabPane } = Tabs;
const { Title } = Typography;

const EmployeeProfile = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    useEffect(() => {
        const id = 1
        const cycleID = 1
        const getInfo = async () => {
            const {data} = await (axios.get(`http://localhost:3001/employee/profile/${id}/${cycleID}`))
            setData(data)
            setLoading(false)
        } 
        getInfo()
    }, [])

    if(loading)
        return <Spinner/>

    return(
        <div>
            <Card className='semi-back'> </Card>
            <Card className='semi-lower'>
                <Avatar size={260} style={{backgroundColor: '#000090', marginLeft:'37%', marginRight:'35%', top:'-140px', fontSize:'110px'}} > {data.personalInfo[0].first_name.slice(0,1) +data.personalInfo[0].last_name.slice(0,1) } </Avatar>
                <Card style={{ borderColor: 'white', top:'-110px'}}>
                <Tabs defaultActiveKey="1" centered='true' size='large' tabBarGutter={50}>
                    <TabPane
                     
                    tab={
                        <span style={{fontSize:'25px'}}>
                        Personal Info
                        </span>
                    }
                    key="1"
                    >
                        <div className='profile-components'>
                        <PersonalInfo data={{personalInfo: data.personalInfo, departments: data.departments, practice: data.practice}}/> 
                        </div>
                    </TabPane>
                    <TabPane
    
                    tab={
                        <span style={{fontSize:'25px'}}>
                        Badges
                        </span>
                    }
                    key="2"
                    >
                        <div className='profile-components'>
                         <Badges data={data.badges}/>
                         </div>
                    </TabPane>
                    <TabPane
    
                    tab={
                        <span style={{fontSize:'25px'}}>
                        Virtual Recognitions
                        </span>
                    }
                    key="3"
                    >
                        <div className='profile-components'>
                         <VirtualRecognitions data={data.virtual_recognitions}/>
                         </div>
                    </TabPane>
            
                </Tabs>
                </Card>
            </Card>
            {/* <Title className= "title" style={{fontSize: '35px'}}>Employee Profile</Title>
            <Divider className="title-divider"/> */}
        {/* <div style={{width:'100%' , display: 'flex', flexWrap: 'wrap'}}> */}
            {/* <Row justify='center' align='top' width='800px'>
                <PersonalInfo data={{personalInfo: data.personalInfo, departments: data.departments, practice: data.practice}}/>
            </Row>  */}
        {/* </div> */}
        </div>
    )
}

export default EmployeeProfile

 {/* <Col>
                    <VirtualRecognitions data={data.virtual_recognitions}/>
                </Col> */}
            
            {/* <Row justify='center' align='top' gutter={[40,8]}>
                <Col>
                    <Badges data={data.badges}/>
                </Col>
            </Row>     */}