import   React, { useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import  {UserContext} from "../../Context";



const PrivateRouteAdmin = ({path, component: Component, ...rest}) => {

    const {id} = useContext(UserContext);
       
   return <Route {...rest} path={path} render={() => {
      return id ?
      //if isAdmin wrap around consumer tag and pass id/cycle-id
      <Component /> :
      <Redirect to={'/'} />
  }}/>
}


export default PrivateRouteAdmin;