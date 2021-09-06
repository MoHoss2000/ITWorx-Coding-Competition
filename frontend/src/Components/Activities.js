import react ,{useEffect, useState} from 'react';
import ReactDOM from "react-dom";

function fetchPost () {
  return fetch('http://localhost:3001/admin/getActivities')
    .then((res) => res.json())
}

function Activities() {
   const[loading, setLoading] = useState(true)
   useEffect(() => {
    setLoading(true)

    fetchPost()
      .then((data) => {
        console.log(data)
        setLoading(false)
      })
      .catch((e) => {
        console.warn(e.message)
        setLoading(true)
      })
  }, [])


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