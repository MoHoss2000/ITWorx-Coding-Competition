import React, { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import axios from 'axios'

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 120,
  strokeWidth: 6
};

const renderTime = (dimension, time) => {
  return (
     
    <div className="time-wrapper">
      <div className="time">{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

export default function Clock() {
    const [start_time, setStartTime] = useState('')
    const [end_time, setEndTime] = useState('')
    const [loading, setLoading ] = useState(true)
    const [current, setCurrent ] = useState(true)

    useEffect(() => {
        const getTime= async () => {
            const {data} = await(axios.get('http://localhost:3001/time'))
            console.log(data)
            if (data.length == 0){
                setCurrent(false)
                setLoading(false)
                return
            }
            
            let start = Date.now() / 1000
            setStartTime(start)

            let end = data[0].end_date.slice(0,10)
            end = new Date(end) 
            end.setDate(end.getDate() + 1);
            end = Date.parse(end) /1000
            setEndTime(end)
            setLoading(false)
        }
        getTime()
    },[])
  
  if(loading)
         return <div> </div>

  else{
    let remainingTime;
    let days;
    let daysDuration;
    console.log(current)
    if (current) {
       remainingTime = end_time - start_time;
       console.log(remainingTime)
       days = Math.ceil(remainingTime / daySeconds);
       daysDuration = days * daySeconds;
    }
    else {
       remainingTime = 0;
       days = Math.ceil(remainingTime / daySeconds);
       console.log(days)
       daysDuration = days * daySeconds;
    }
    return (
        
      <div className="App">
          
        <CountdownCircleTimer
          {...timerProps}
          colors={[["#7E2E84"]]}
          duration={daysDuration}
          initialRemainingTime={remainingTime}

        >
          {({ elapsedTime }) =>
            renderTime("days", getTimeDays(daysDuration - elapsedTime))
          }
        </CountdownCircleTimer>
        <CountdownCircleTimer
          {...timerProps}
          colors={[["#D14081"]]}
          duration={daySeconds}
          initialRemainingTime={remainingTime % daySeconds}
          onComplete={(totalElapsedTime) => [
            remainingTime - totalElapsedTime > hourSeconds
          ]}
        >
          {({ elapsedTime }) =>
            renderTime("hours", getTimeHours(daySeconds - elapsedTime))
          }
        </CountdownCircleTimer>
        <CountdownCircleTimer
          {...timerProps}
          colors={[["#EF798A"]]}
          duration={hourSeconds}
          initialRemainingTime={remainingTime % hourSeconds}
          onComplete={(totalElapsedTime) => [
            remainingTime - totalElapsedTime > minuteSeconds
          ]}
        >
          {({ elapsedTime }) =>
            renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))
          }
        </CountdownCircleTimer>
        <CountdownCircleTimer
          {...timerProps}
          colors={[["#218380"]]}
          duration={minuteSeconds}
          initialRemainingTime={remainingTime % minuteSeconds}
          onComplete={(totalElapsedTime) => [
            remainingTime - totalElapsedTime > 0
          ]}
        >
          {({ elapsedTime }) =>
            renderTime("seconds", getTimeSeconds(elapsedTime))
          }
        </CountdownCircleTimer>
      </div>
    );}
 
    
}
