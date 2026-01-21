import React, { useContext } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import styles from "./Home.module.css";
import { UserContext } from "../context/userContext";

const Home = () => {
  const activeStyle = ({ isActive }) => ({
    color: isActive ? "red" : "",
    textDecoration: isActive ? "none" : "",
  });
  
  const user = useContext(UserContext)

  return (
    <>
      <h1>Hello {user}</h1>
      <div className={styles.links}>
        <Link to="/form">Form page</Link>
        <Link to="/effect">Side Effect</Link>
        <NavLink style={activeStyle} to="/temp1">
          Temp1
        </NavLink>
        <NavLink style={activeStyle} to="/temp2">
          Temp2
        </NavLink>
      </div>
      <Outlet />
    </>
  );
};

export default Home;
