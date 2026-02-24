const Dashboard = () => {
  const token = localStorage.getItem("token");

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
          <h2 className="text-2xl font-bold mb-2">Welcome 🎉</h2>
          <p className="text-gray-600">
            You are successfully logged in.
          </p>

          {/* <p className="mt-4 text-sm text-gray-500">
            Token: {token}
          </p> */}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;