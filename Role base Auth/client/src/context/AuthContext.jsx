import { useReducer, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");

  const [token, setToken] = useState(accessToken);

  console.log("Auth: ", token);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
