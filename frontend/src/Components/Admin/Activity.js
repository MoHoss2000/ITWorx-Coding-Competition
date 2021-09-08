
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import react ,{useEffect, useState} from 'react';
import axios from 'axios';
import { Card } from 'antd';



function Activity(id) {

    const [activities, setActivity] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {

        console.log('GETTING ACTIVITY');
        setError(null)
        axios(
        {
            method: 'get',
            url: 'http://localhost:3001/admin/viewActivity',
            headers: {}, 
            data: { id, 
            CycleId : 1 }
        }).then((res) =>{ 
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
    style={{ width: '800px' }}
    title="MY ACTIVITY">
    
  
   </Card>

   
  )

    

}

export default Activity;