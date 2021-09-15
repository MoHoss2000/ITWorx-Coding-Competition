import React, { createContext, useState } from "react";

export const UserContext = createContext();

// This context provider is passed to any component requiring the context
export const UserProvider = ({ children }) => {

  const [id, setId] = useState(null);
  const [token, setToken] = useState(null);
  const [cycleId, setCycleId] = useState(null);
  const [type, setType] = useState(null);
  const [targetPath, setTargetPath] = useState("")
 

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


