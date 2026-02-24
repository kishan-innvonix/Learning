import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./components/auth/Register";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import { useEffect, useState } from "react";
import Login from "./components/auth/Login";

const App = () => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/register"
        element={token ? <Navigate to={"/dashboard"} /> : <Register />}
      />
      <Route
        path="/login"
        element={token ? <Navigate to={"/dashboard"} /> : <Login />}
      />
      <Route
        path="/dashboard"
        element={!token ? <Navigate to={"/login"} /> : <Dashboard />}
      />
    </Routes>
  );
};

export default App;
