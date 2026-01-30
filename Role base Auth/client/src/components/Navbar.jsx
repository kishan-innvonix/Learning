import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useAuth } from "../hooks/useAuth";

const Navbar = React.memo(() => {
  
  const { token } = useAuthContext();
  const { logout } = useAuth();

  return (
    <nav className="border-b">
      <div className="flex justify-between items-center px-4 sm:px-10 py-3">
        <Link className="text-xl" to="/">
          Logo
        </Link>
        {token ? (
          <div className="flex items-center gap-3 md:gap-4">
            <Link className="text-xl font-medium" to="/dashboard">
              all Users
            </Link>
            <Link
              onClick={() => logout()}
              className="text-xl font-medium flex items-center gap-1 text-red-500"
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
});

export default Navbar;
