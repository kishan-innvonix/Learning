import React from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Layout>
      <div className="flex items-center w-full justify-center bg-white text-black">
        <div className="text-center flex flex-col gap-4">
          <h1 className="text-9xl font-light leading-none">404</h1>
          <p className="text-2xl font-light text-gray-500">Page not found</p>
          <Link
            to={"/"}
            className="border px-2 py-1 rounded hover:bg-black hover:text-white transition ease font-bold"
          >
            GO Back
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
