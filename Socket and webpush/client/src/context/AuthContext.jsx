import { useReducer, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const id = JSON.parse(localStorage.getItem("userId"));

  const [token, setToken] = useState(accessToken);
  const [userId, setUserId] = useState(id);

  console.log("Auth: ", token);

  return (
    <AuthContext.Provider value={{ token, setToken, userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
