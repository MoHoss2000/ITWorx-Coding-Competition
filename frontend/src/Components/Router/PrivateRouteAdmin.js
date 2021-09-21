import React, {useContext} from "react";
import {Redirect, Route} from "react-router-dom";
import {UserContext} from "../../Context";


const PrivateRouteAdmin = ({path, component: Component, ...rest}) => {

  const {id , type} = useContext(UserContext)

  return (
    <Route {...rest} path={path} render={() => {
      if (id)
        return type==='admin' ? <Component/> : <Redirect to={'/unauthorized'}/>
      else
        return <Redirect to={'/'}/>
    }}/>)


}

export default PrivateRouteAdmin;
