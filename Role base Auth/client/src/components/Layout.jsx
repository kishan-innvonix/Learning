import React from "react";
import Navbar from "./Navbar";

const Layout = React.memo(({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex">{children}</main>
    </div>
  );
});

export default Layout;
