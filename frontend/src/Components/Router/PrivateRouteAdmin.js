import React, {useContext, useEffect, useState} from "react";
import {Redirect, Route} from "react-router-dom";
import {UserContext} from "../../Context";


const PrivateRouteAdmin = ({path, component: Component, ...rest}) => {

  const {id , type, setTargetPath} = useContext(UserContext)
  const [login, setLogin] = useState(true)
  const [authorized, setAuthorized] = useState(true)


  return (
    <Route {...rest} path={path} render={() => {
      // setTargetPath(path)
      if (id)
        return type==='admin' ? <Component/> : <Redirect to={'/unauthorized'}/>
      else
        return <Redirect to={'/'}/>
    }}/>)


}

export default PrivateRouteAdmin;
