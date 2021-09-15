import React, {useContext, useEffect, useState} from "react";
import {Redirect, Route} from "react-router-dom";
import {UserContext} from "../../Context";


const PrivateRouteAdmin = ({path, component: Component, ...rest}) => {

  const {type, setTargetPath} = useContext(UserContext)
  const [login, setLogin] = useState(true)
  const [authorized, setAuthorized] = useState(true)


  useEffect(() => {
    setTargetPath(path)
  }, [])
  
  useEffect(() => {
    if (type) {
      if (type === 'employee') {
        setAuthorized(false)
      }
    }
  }, [type])

  return (
    <Route {...rest} path={path} render={() => {
      // setTargetPath(path)
      if (login)
        return authorized ? <Component/> : <Redirect to={'/unauthorized'}/>
      else
        return <Redirect to={'/'}/>
    }}/>)


}

export default PrivateRouteAdmin;
