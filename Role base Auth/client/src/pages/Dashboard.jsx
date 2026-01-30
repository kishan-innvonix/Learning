import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axiosInstance from "../utils/axiosConfig";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axiosInstance.get("/api/user/current");
        setUser(data?.user);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axiosInstance.get("/api/user/");
        setUsers(data?.users);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    let sure = confirm("Are you sure to want a delete");
    if (!sure || !id) return;

    try {
      const { data } = await axiosInstance.delete(`/api/user/${id}`);
      console.log(data);
      toast.success(data?.message);
      const filteredUsers = users?.filter((user) => {
        return user?._id !== data?.deletedUserId;
      });
      setUsers(filteredUsers);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Layout>
      <div className="w-full flex gap-5 p-10 bg-violet-50 ">
        <div className="title w-[40%] px-5 py-2 border rounded-xl border-violet-600">
          <h1 className="text-violet-950 text-5xl font-bold ">
            Hello, {user?.name}
          </h1>
          <h1 className="text-violet-950">{user?.email}</h1>
        </div>
        {users?.length > 0 && (
          <div className="div border rounded-xl border-violet-600 px-5 py-2 w-[60%]">
            <div className="text-right">
              <span className="px-2 py-1 rounded bg-violet-200 ">Total : {users?.length}</span>
            </div>
            <ul className="flex flex-col mt-2 gap-2 ">
              {users?.map((u, index) => (
                <li
                  key={index}
                  className="flex justify-between rounded bg-violet-100 px-4 py-1"
                >
                  <div className="flex gap-5 items-center">
                    <div className="name">{u?.name}</div>
                    <div className="email">{u?.email}</div>
                  </div>
                  <button
                    onClick={() => handleDeleteUser(u?._id)}
                    className="bg-red-600 px-2 py-0.5 rounded text-white font-bold"
                  >
                    delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
