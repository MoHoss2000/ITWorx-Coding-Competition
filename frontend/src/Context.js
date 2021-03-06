import React, {createContext, useState} from "react";

export const UserContext = createContext();

// This context provider is passed to any component requiring the context
export const UserProvider = ({children}) => {

  const user = localStorage.getItem("user") || "{}"
  const parsedUser = JSON.parse(user)
  const [id, setId] = useState(parsedUser.id || null);
  const [token, setToken] = useState(parsedUser.accessToken || null);
  const [cycleId, setCycleId] = useState(parsedUser.cycleID || null);
  const [type, setType] = useState(parsedUser.type || null);
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


