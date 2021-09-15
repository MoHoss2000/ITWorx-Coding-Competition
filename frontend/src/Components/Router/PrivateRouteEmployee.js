import   React, { useState, useContext, useEffect} from "react";
import {Route, Redirect} from "react-router-dom";
import {UserContext} from "../../Context";



const PrivateRouteEmployee = ({path, component: Component, ...rest}) => {

    const {id, type, setId, setToken, setCycleId, setType, setTargetPath, targetPath} = useContext(UserContext)
    const [login, setLogin] = useState(true)
    const [authorized, setAuthorized] = useState(true)

    useEffect(() =>{
      
       let user = localStorage.getItem("user")
       console.log(user)
        if(!(user))
          setLogin(false)

        else if(!id ){
          const {accessToken, cycleID, id ,type}= JSON.parse(user)
          console.log(JSON.parse(user))
          setId(id)
          setToken(accessToken)
          setCycleId(cycleID)
          setType(type)
        }
      }
       test();
    //  }, [])

        

      useEffect (() =>{
        if (type)
            if(type === 'admin')
               setAuthorized(false)
      }, [type])

  return (
         <Route {...rest} path={path} render={() => {   
           setTargetPath(path)
          if( login )
           return authorized? <Component /> :<Redirect to= {'/unauthorized'} />
          else 
          return <Redirect to={'/'} />
         }}/>
  )
}


export default PrivateRouteEmployee;