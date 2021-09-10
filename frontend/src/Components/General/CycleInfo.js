import React , {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../components.css';
import { Card, Typography, Divider } from 'antd';
import axios from 'axios';
const { Title } = Typography;

const CycleInfo = () =>{
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [name, setName] = useState("")
    const [cycleID, setCycleID] = useState("")
    const [adminID, setAdminID] = useState("")


    useEffect(() => {
        const getTime = async () => {
            const cycleID = 1
            const res = (await axios.get(`http://localhost:3001/admin/cycle/view/${cycleID}`))
            setStartDate(res.data.start_date)
            setEndDate(res.data.end_date)
            var name = res.data.first_name+ ' ' + res.data.last_name
            setName(name)
            setAdminID(res.data.id)
            setCycleID(res.data.CycleID)
        }
        getTime()
    }, [])
return(
 <div>
    <Card className="activities-card" >
         <Title level={4}> Cycle Information </Title>
        <Divider className="small-divider"/>
        <p> <b> Cycle ID: </b> {cycleID} </p>
         <p> <b>Start Date: </b> {startDate} </p>
         <p> <b>End Date: </b> {endDate} </p>
         <p> <b> Cycle Was Created By: </b><a> {name} </a> </p>
          </Card>
</div>
)
}
export default CycleInfo