import   React, { useState, useContext, useEffect} from "react";
import {Route, Redirect} from "react-router-dom";
import {UserContext} from "../../Context";



const PrivateRouteEmployee = ({path, component: Component, ...rest}) => {

    const {id, setId, setToken, setCycleId, setType, setTargetPath} = useContext(UserContext)
    const [login, setLogin] = useState(true)
    let user
    useEffect(() =>{
       user = localStorage.getItem("user")
        if(!(user))
          setLogin(false)
        else if(!id ){
          setLogin(false)
          
        }

      }, [])
  return (
         <Route {...rest} path={path} render={() => {   
           console.log(path)
           setTargetPath(path)
           return login?
            <Component />
           :<Redirect to={'/'} />
         }}/>
  )
}


export default PrivateRouteEmployee;