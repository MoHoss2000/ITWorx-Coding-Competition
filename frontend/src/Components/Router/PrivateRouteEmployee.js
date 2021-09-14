import   React, { useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import {UserContext} from "../../Context";



const PrivateRouteEmployee = ({path, component: Component, ...rest}) => {

    const {id} = useContext(UserContext);
   
   
  return (
         <Route {...rest} path={path} render={() => {   
          return id ?
         <Component /> :
         <Redirect to={'/'} />
         }}/>
  )
}


export default PrivateRouteEmployee;