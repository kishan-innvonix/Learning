import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Logo from "./Logo";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useAuth();

  return (
    <nav className="border-b">
      <div className="flex justify-between items-center px-10 py-3">
        <Link className="text-xl" to="/">
          <Logo />
        </Link>
        {user ? (
          <div className="flex gap-4">
            <Link className="text-xl font-medium" to="/dashboard">
              Dashboard
            </Link>
            <Link
              onClick={() => logout()}
              className="text-xl font-medium text-red-500"
              to="/"
            >
              Logout
            </Link>
          </div>
        ) : (
          <Link className="text-xl font-medium" to="/signup">
            Signup
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
