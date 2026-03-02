import { useEffect } from "react";
import { useState } from "react";
import api from "../utils/api";
import { User } from "../types/user";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/users/`);
        setUser(data?.user);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-indigo-600 text-white px-6 py-4 flex justify-between">
        <h1 className="text-xl font-semibold">My Dashboard</h1>
        <button
          onClick={logout}
          className="bg-white text-indigo-600 px-4 py-1 rounded-md hover:bg-gray-100"
        >
          Logout
        </button>
      </nav>

      {/* Content */}
      <div className="p-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-2">
            Welcome {loading ? "..." : user?.name} 🎉
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
