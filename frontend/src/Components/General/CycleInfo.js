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
    const [id, setId] = useState("")


    useEffect(() => {
        const getTime = async () => {
            const cycleID = 1
            const res = (await axios.get(`http://localhost:3001/admin/cycle/view/${cycleID}`))
            console.log(res.data)
            setStartDate(res.data.start_date)
            setEndDate(res.data.end_date)
            console.log(res.data.first_name)
            var name = res.data.first_name+ ' ' + res.data.last_name
            console.log(name)
            setName(name)
            setId(res.data.id)
        }
        getTime()
    }, [])
return(
 <div>
    <Card className="activities-card" style={{ width: '700px'}}>
         <Title level={4}> Cycle Information </Title>
        <Divider className="small-divider"/>
         <p> <b>Start Date: </b> {startDate} </p>
         <p> <b>End Date: </b> {endDate} </p>
         <p> <b> Cycle Was Created By: </b><a> {name} </a> </p>
          </Card>
</div>
)
}
export default CycleInfo