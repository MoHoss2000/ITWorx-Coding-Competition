import react ,{useEffect, useState} from 'react'
import axios from 'axios';


function Activities() {
    const[loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        console.log('GETTING ACTIVITIES');
        axios.get('http://localhost:3001/employee/cycles/view')
            .then((data) =>{
                console.log(data)
                setLoading(false)
              })
              .catch((e) => {
                console.warn(e.message)
                setLoading(true)
              })
    
    }, []);

  if (loading === true) {
    return <p>Loading</p>
  }
  return (
    <div>
       <h1> Activity Received</h1> 
    </div>
  );
}


export default Activities