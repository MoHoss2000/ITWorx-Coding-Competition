import   React, { useContext, useState, useEffect} from "react";
import {Route, Redirect} from "react-router-dom";
import  {UserContext} from "../../Context";



const PrivateRouteAdmin = ({path, component: Component, ...rest}) => {

  const {id, type, setId, setToken, setCycleId, setType, setTargetPath} = useContext(UserContext)
  const [login, setLogin] = useState(true)
  const [authorized, setAuthorized] = useState(true)
  let user
  useEffect(() =>{
     user = localStorage.getItem("user")
      if(!(user))
        setLogin(false)

      else if(!id ){
        const {accessToken, cycleID, id , message,type}= JSON.parse(user)
        setId(id)
        setToken(accessToken)
        setCycleId(cycleID)
        setType(type)
    
      }

    }, [])

    useEffect (() =>{
      if (type)
          if(type === 'employee')
             setAuthorized(false)
    }, [type])
       
   return( 
      <Route {...rest} path={path} render={() => {
      setTargetPath(path)
      if( login )
           return authorized? <Component /> :<Redirect to= {'/unauthorized'} />
      else 
          return <Redirect to={'/'} />
   }}/>)



  }

export default PrivateRouteAdmin;
