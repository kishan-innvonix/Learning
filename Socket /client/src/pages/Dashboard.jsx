// import React, { useEffect, useState } from "react";
// import Layout from "../components/Layout";
// import axiosInstance from "../utils/axiosConfig";
// import toast from "react-hot-toast";

// const Dashboard = () => {
//   const [user, setUser] = useState(null);
//   const [users, setUsers] = useState([]);
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const { data } = await axiosInstance.get("/api/user/current");
//         setUser(data?.user);
//         console.log(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchUserData();
//   }, []);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const { data } = await axiosInstance.get("/api/user/");
//         setUsers(data?.users);
//         console.log(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const handleDeleteUser = async (id) => {
//     let sure = confirm("Are you sure to want a delete");
//     if (!sure || !id) return;

//     try {
//       const { data } = await axiosInstance.delete(`/api/user/${id}`);
//       console.log(data);
//       toast.success(data?.message);
//       const filteredUsers = users?.filter((user) => {
//         return user?._id !== data?.deletedUserId;
//       });
//       setUsers(filteredUsers);
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message);
//     }
//   };

//   return (
//     <Layout>
//       <div className="w-full flex gap-5 p-10 bg-violet-50 ">
//         <div className="title w-[40%] px-5 py-2 border rounded-xl border-violet-600">
//           <h1 className="text-violet-950 text-5xl font-bold ">
//             Hello, {user?.name}
//           </h1>
//           <h1 className="text-violet-950">{user?.email}</h1>
//         </div>
//         {users?.length > 0 && (
//           <div className="div border rounded-xl border-violet-600 px-5 py-2 w-[60%]">
//             <div className="text-right">
//               <span className="px-2 py-1 rounded bg-violet-200 ">Total : {users?.length}</span>
//             </div>
//             <ul className="flex flex-col mt-2 gap-2 ">
//               {users?.map((u, index) => (
//                 <li
//                   key={index}
//                   className="flex justify-between rounded bg-violet-100 px-4 py-1"
//                 >
//                   <div className="flex gap-5 items-center">
//                     <div className="name">{u?.name}</div>
//                     <div className="email">{u?.email}</div>
//                   </div>
//                   <button
//                     onClick={() => handleDeleteUser(u?._id)}
//                     className="bg-red-600 px-2 py-0.5 rounded text-white font-bold"
//                   >
//                     delete
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default Dashboard;
import { useState } from "react";
import ChatWindow from "./ChatWindow";
import axiosInstance from "../utils/axiosConfig";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {
  const { userId } = useAuthContext();
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const navigate = useNavigate();
  const { chatId } = useParams();
  const [loading, setLoading] = useState(false);

  const handleSearchUser = async (searchTerm) => {
    setSearch(searchTerm);

    try {
      const { data } = await axiosInstance.get(`/api/user/search`, {
        params: { searchTerm },
      });

      setUsers(data?.users);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChatWithUser = async (user) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post(`/api/chat/create`, {
        users: [user._id, userId],
      });
      setSelectedChat(data?.chat);
      setSelectedUser(user);
      navigate(`/chat/${data?.chat?._id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchChat = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get(
          `/api/chat/messages/${chatId}`,
        );
        setSelectedChat(data?.chat);

        const otherUser = data.chat.users.find((user) => user._id !== userId);
        setSelectedUser(otherUser);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchChat();
  }, [chatId]);

  useEffect(() => {
    const fetchAllChats = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get(`/api/chat/all`);
        setChats(data.chats);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllChats();
  }, []);

  return (
    <div className="flex h-screen bg-zinc-100">
      {/* Sidebar */}
      <div className="w-75 bg-white border-r flex flex-col">
        {/* Search */}
        <div className="p-3 border-b">
          <input
            type="text"
            placeholder="Search user..."
            className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black"
            value={search}
            onChange={(e) => handleSearchUser(e.target.value)}
          />
        </div>
        {/* user List */}
        <div className="flex flex-col overflow-y-auto">
          {users.map((user) => (
            <div
              key={user._id}
              onClick={() => handleChatWithUser(user)}
              className={`px-4 py-3 cursor-pointer hover:bg-zinc-100 
              ${selectedUser?._id === user._id && "bg-zinc-200"}`}
              >
              {user.name}
            </div>
          ))}
        </div>
        <span className="border-b py-1" />

        {/* chat List */}
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="flex flex-col overflow-y-auto mt-1">
            {chats.map((chat) => {
              const otherUser = chat.users.find((user) => user._id !== userId);
              console.log(otherUser)
              return (
                <div
                  key={otherUser._id}
                  onClick={() => handleChatWithUser(otherUser)}
                  className={`px-4 py-3 cursor-pointer hover:bg-zinc-100 
              ${selectedUser?._d === otherUser._id && "bg-zinc-200"}`}
                >
                  {otherUser.name}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1">
        {loading ? (
          <h2>Loading...</h2>
        ) : selectedChat && selectedUser ? (
          <ChatWindow user={selectedUser} chat={selectedChat} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
