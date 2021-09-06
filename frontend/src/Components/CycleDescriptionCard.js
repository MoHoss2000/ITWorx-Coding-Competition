import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Card } from 'antd';
import axios from 'axios';

function DescriptionCard(){
const [description, setDescription] = useState("")
    useEffect(() => {
        axios.get('http://localhost:3001/employee/cycles/view')
            .then((data) =>{
                console.log(data)
                setDescription(data)
              })
              .catch((e) => {
                console.warn(e.message)
              })
    
    }, []);
    return(
    <Card size="small" title="Description"  style={{ "width": "700" }}>
      <p>{}</p>
    </Card>
    )
}

export default DescriptionCard;