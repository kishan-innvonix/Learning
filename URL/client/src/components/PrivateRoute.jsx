import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const { user } = useAuthContext();

  return user ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoute;
