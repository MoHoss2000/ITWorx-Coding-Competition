import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

// This context provider is passed to any component requiring the context
export const UserProvider = ({ children }) => {

  const [id, setId] = useState(null);
  const [token, setToken] = useState(null);
  const [cycleId, setCycleId] = useState(1);
  const [type, setType] = useState(null);
  const [targetPath, setTargetPath] = useState("")

  useEffect(() =>{
      
    let user = localStorage.getItem("user")
     if(user){
      const {accessToken, cycleID, id , message,type}= JSON.parse(user)
      
      setId(id)
      setToken(accessToken)
      setCycleId(cycleID)
      setType(type)

     }
   }, [])


  return (
    <UserContext.Provider
      value={{
      id,
      setId,
      token,
      setToken,
      cycleId,
      setCycleId,
       type,
       setType,
       targetPath,
       setTargetPath
      }}
    >
      {children}
    </UserContext.Provider>
  );
};


