import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import '../components.css';
import { Card } from 'antd';
import axios from 'axios';

function DescriptionCard(){
const [description, setDescription] = useState("")
const [startTime, setStartTime] = useState("")
const [endTime, setEndTime] = useState("")
    useEffect(() => {
        axios.get('http://localhost:3001/employee/cycles/view')
            .then((data) =>{
                console.log(data)
                setDescription(data.description)
                setStartTime(data.startTime)
                setEndTime(data.setEndTime)
              })
              .catch((e) => {
                console.warn(e.message)
              })
    
    }, []);
    return(
    <Card size="small" title="Description"  style={{ "width": "700" }}>
      <p>{description}</p>
      <p> {startTime} </p>
      <p> {endTime} </p>
    </Card>
    )
}

export default DescriptionCard;