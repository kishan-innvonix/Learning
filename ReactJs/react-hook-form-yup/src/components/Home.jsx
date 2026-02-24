import { Link } from "react-router-dom";

const Home = () => {
  const token = localStorage.getItem("token");
  return (
    <div className="container flex justify-center items-center h-lvh">
      {token ? (
        <Link to="/dashboard" className="border px-3 py-1 rounded bg-gray-50">
          Dashboard
        </Link>
      ) : (
        <Link to="/register" className="border px-3 py-1 rounded bg-gray-50">
          Register Here...
        </Link>
      )}
    </div>
  );
};

export default Home;
