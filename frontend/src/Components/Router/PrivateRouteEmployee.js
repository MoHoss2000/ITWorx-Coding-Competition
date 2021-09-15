import   React, { useState, useContext, useEffect} from "react";
import {Route, Redirect} from "react-router-dom";
import {UserContext} from "../../Context";



const PrivateRouteEmployee = ({path, component: Component, ...rest}) => {

    const {id, type, setId, setToken, setCycleId, setType, setTargetPath, targetPath} = useContext(UserContext)
    const [login, setLogin] = useState(true)
    const [authorized, setAuthorized] = useState(true)

    useEffect(() =>{
    if(id){
      setLogin(true)
    }
    setTargetPath(path)
    },[])


   

  return (
         <Route {...rest} path={path} render={() => {   
          
          if( login )
           return authorized? <Component /> :<Redirect to= {'/unauthorized'} />
          else 
          return <Redirect to={'/'} />
         }}/>
  )
}


export default PrivateRouteEmployee;