import React, { useEffect, useState,useContext } from 'react';
import {UserContext} from "../../Context";
import axios from 'axios';
import { Progress,  Typography ,Spin, Space } from 'antd';
const { Text } = Typography;

const ProgressBar = ()=>{

    const {id, cycleId }=useContext(UserContext)
    const[points , setPoints]=useState(null)
    const[percentage , setPercentage]=useState(null)
    const[error , setError]=useState(false)

    useEffect(() => {

        axios(
          {
            method: 'get',
            url: 'http://localhost:3001/employee/badges',
            headers: {},
            params: {
              employeeId: id,
              cycleId
            }
         }) .then((res) => {
           console.log(res)
           const pointsNeeded=res.data.nextBadge.points_needed
           const employeePoints=res.data.pointsInCycle
           setPoints(pointsNeeded-employeePoints)       
           setPercentage(100 - ((pointsNeeded-employeePoints)/pointsNeeded)*100)        
          })
          .catch((e) => {
            setError(true)
          })
        })

    if(error){
        return(
        <div>
          <Progress percent={50} showInfo={false} />
          <Text type="secondary">Error loading data</Text>
        </div>
        )
    }
    if(percentage===null){
        return(
            <Space size="middle">
               <Spin size="small" />
            </Space> )
    }

    return(
    <div style={{width:300}}>
    <Progress percent={percentage}  />
    <Text  type="secondary">{points} points left for next badge!</Text>
    </div>)

}
export default ProgressBar;