import { useReducer, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
    case "UPDATE":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { user: null };
  }
};

const AuthContextProvider = ({ children }) => {
  const user = localStorage.getItem("user");
  let initialState = null;
  if (user) {
    initialState = JSON.parse(user);
  }

  //   const initialState = JSON.parse(localStorage.getItem("user")) || null;

  const [state, dispatch] = useReducer(reducer, { user: initialState });

  console.log("Auth: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
