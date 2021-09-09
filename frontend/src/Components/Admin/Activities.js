import React, {useEffect, useState} from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import {Button, Card, Divider} from 'antd';
import {CarryOutOutlined, SketchOutlined} from '@ant-design/icons';
import {Link,} from 'react-router-dom'


function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('GETTING ACTIVITIES');
    axios.get('http://localhost:3001/admin/getActivities')
      .then((res) => {
        setActivities(res.data)
        setLoading(false)
      })
      .catch((e) => {
        setError(true)
        console.warn(e.message)

      })

  }, []);
  if (error) {
    return (
      <div>
        <h1> ACTIVITIES</h1>
        <h3>Error fetching data</h3>
      </div>
    )
  }
  if (activities === []) {
    return <p>Loading</p>
  }

  return (

    <div>


      <h1> ACTIVITIES</h1>
      {

        activities.map(({id, name, description}) => (
          <Card key={id} title={name} type="inner" loading={loading}
                extra={<Button type="primary" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                >
                  <SketchOutlined/>
                  <Link to={`/activities/${id}`} style={{color: 'white', marginLeft: 5}}>
                    View Activity
                  </Link>
                </Button>}
                style={{width: 800, marginTop: 20}}
                hoverable='true'>
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <CarryOutOutlined style={{fontSize: '250%'}}/>
              <Divider type="vertical" style={{height: '50px', marginLeft: '20px'}}/>
              <h5 style={{marginLeft: '20px'}}>{description}</h5>
            </div>
          </Card>

        ))}

    </div>
  );
}


export default Activities;
