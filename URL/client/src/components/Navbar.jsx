import React, { useEffect } from "react";
import { LogOut } from 'lucide-react'
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Logo from "./Logo";
import { useAuth } from "../hooks/useAuth";

const Navbar = React.memo(() => {
  
  const { user } = useAuthContext();
  const { logout } = useAuth();

  return (
    <nav className="border-b">
      <div className="flex justify-between items-center px-4 sm:px-10 py-3">
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
              className="text-xl font-medium flex items-center gap-1 text-red-500"
              to="/"
            >
              <span className="hidden sm:block">Logout</span> <LogOut size={20}/> 
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
});

export default Navbar;
