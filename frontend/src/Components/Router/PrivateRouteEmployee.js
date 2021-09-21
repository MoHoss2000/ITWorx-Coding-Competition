import React, {useContext} from "react";
import {Redirect, Route} from "react-router-dom";
import {UserContext} from "../../Context";


const PrivateRouteEmployee = ({path, component: Component, ...rest}) => {

  const {id,type } = useContext(UserContext)
 


  return (
    <Route {...rest} path={path} render={() => {
      // setTargetPath(path)
      if (id)
        return type==='employee' ? <Component/> : <Redirect to={'/unauthorized'}/>
      else
        return <Redirect to={'/'}/>
    }}/>
  )
}


export default PrivateRouteEmployee;
