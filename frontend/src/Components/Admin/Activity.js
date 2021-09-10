import 'antd/dist/antd.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Card} from 'antd';
import {useParams} from "react-router-dom";


function Activity() {

  const [activity, setActivity] = useState(null)
  const [error, setError] = useState(null)
  const {id} = useParams();

  useEffect(() => {

    console.log('GETTING ACTIVITY');
    setError(null)
    axios(
      {
        method: 'get',
        url: 'http://localhost:3001/admin/viewActivity',
        headers: {},
        data: {
          id,
          CycleId: 1
        }
      }).then((res) => {
      console.log(res.data)
      setActivity(res.data)
    })
      .catch((e) => {
        setError("Oops there seems to be a problem connecting to the network")
        console.log(e)


      })

  }, []);

  return (

    <Card
      style={{width: '800px'}}
      title="MY ACTIVITY">
test

    </Card>


  )


}

export default Activity;
