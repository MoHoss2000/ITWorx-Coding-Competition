import react ,{useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import axios from 'axios';



function fetchPost () {
  return fetch('http://localhost:3001/admin/getActivities')
    .then((res) => res.json())
}

function Activities() {
    const[loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        axios.get('http://localhost:3001/admin/getActivities')
            .then((data) =>{
                console.log(data)
                setLoading(false)
              })
              .catch((e) => {
                console.warn(e.message)
                setLoading(true)
              })
    
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
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