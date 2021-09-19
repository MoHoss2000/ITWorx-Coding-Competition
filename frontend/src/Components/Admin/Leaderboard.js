import React , {useState, useEffect, useContext} from 'react';
import 'antd/dist/antd.css';
import {Tabs, Spin} from 'antd';
import axios from 'axios'
import '../components.css';
import { UserOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import EmployeeLeaderboard from './EmployeeLeaderboard';
import DepartmentLeaderboard from './DepartmentLeaderboard';
import PracticeLeaderboard from './PracticeLeaderboard';
import { UserContext } from '../../Context';
import { ExportExcel } from './ExportExcel';
const { TabPane } = Tabs;

function Leaderboard (){
    const {cycleId} = useContext(UserContext)
    const [employeeRanks, setEmployeeRank] = useState([])
    const [employeeRanksExcel, setEmployeeRankExcel] = useState([])
    const [departmentRanks, setDepartmentRank] = useState([])
    const [departmentRanksExcel, setDepartmentRankExcel] = useState([])
    const [practiceRanks, setPracticeRank] = useState([])
    const [practiceRanksExcel, setPracticeRankExcel] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {

        const getPracticeLeaderboard = async () => {
            const res = (await axios.get(`http://localhost:3001/leaderboard/practice/${cycleId}`))
            let filteredData = []
            console.log(res.data)
            for(let i = 0 ; i < res.data.length ; i++){   
                res.data[i].rank = i+1
                res.data[i].key = i
                filteredData.push({Rank: res.data[i].rank, Practice: res.data[i].name, Points: res.data[i].TotalPoints, NumberOfEmployees: res.data[i].numberOfEmployees, Points_Per_Employee: res.data[i].pointsPerEmployee})
            }
            setPracticeRankExcel(filteredData)
            setPracticeRank(res.data)

            setLoading(false)
           
        }

        const getDepartmentLeaderboard = async () => {
            let filteredData = []
            const res = (await axios.get(`http://localhost:3001/leaderboard/department/${cycleId}`))
            for(let i = 0 ; i < res.data.length ; i++){
                res.data[i].rank = i+1
                res.data[i].key = i
                filteredData.push({Rank: res.data[i].rank, Department: res.data[i].name, Weighted_points: res.data[i].WeightedPoints, Number_Of_Employees: res.data[i].numberOfEmployees})
            } 
            setDepartmentRankExcel(filteredData)
            setDepartmentRank(res.data)
            setLoading(false)
         
        }
        const getEmployeeLeaderboard = async () => {
            const res = (await axios.get(`http://localhost:3001/leaderboard/employee/${cycleId}`))
            let filteredData = []
            for(let i = 0 ; i < res.data.length ; i++){
                res.data[i].key = i
                res.data[i].rank = i + 1
                if(res.data[i].is_developer)
                    res.data[i].developer = 'Developer'
                else
                    res.data[i].developer = 'Non-developer'

                filteredData.push({Rank: res.data[i].rank, Name: res.data[i].name, Points: res.data[i].points, Role: res.data[i].developer})
            }
            setEmployeeRankExcel(filteredData)
            setEmployeeRank(res.data)           
        }
        getEmployeeLeaderboard()

        getDepartmentLeaderboard()

        getPracticeLeaderboard()
    }, [])

    if(loading)
        return <Spin large/>

    return(
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <Tabs defaultActiveKey="1" centered='true' size='large' tabBarGutter={50} >
                <TabPane
                    tab={<span > <UserOutlined /> Employee  </span> }
                    key="1"
                >
                <EmployeeLeaderboard data={employeeRanks}/>
                </TabPane>

                
                <TabPane
                    tab={<span > <UsergroupAddOutlined /> Department </span> }
                    key="2"
                >
                <DepartmentLeaderboard  data={departmentRanks}/>
                </TabPane>

                <TabPane
                    tab={<span> <UsergroupAddOutlined /> Practice </span> }
                    key="3"
                >
                <PracticeLeaderboard data={practiceRanks}/>
                </TabPane>
               
            </Tabs>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <ExportExcel csvData={[employeeRanksExcel, departmentRanksExcel, practiceRanksExcel]} fileName="Leaderboard" buttonText="Download Leaderboards"></ExportExcel>
            </div>
            
        </div>
    )
}
export default Leaderboard; 