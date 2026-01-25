import React from "react";
import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./components/NotFound";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./hooks/useAuthContext";
import CustomUrl from "./pages/CustomUrl";
import UrlDeactivated from "./pages/UrlDeactivated";

const App = () => {
  const { user } = useAuthContext();

  return (
    <Suspense fallback={<h1>Loding...</h1>}>
      <Toaster />
      <Routes>
        {/* public route */}
        <Route path="/" element={<Home />} />
        <Route path="/bad/:id" element={<UrlDeactivated />} />

        {/* private route */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/urls" element={<CustomUrl /> } />
        </Route>

        {/* Auth route */}
        <Route
          path="/login"
          element={user ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to={"/"} /> : <Register />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
