import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ArrowDownIcon } from "lucide-react";

const BASE_URL = import.meta.env.VITE_BASE;

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [urls, setUrls] = useState([]);

  const totalCliks = () => {
    return urls?.reduce((s, url) => {
      return s + url?.visitList?.length;
    }, 0);
  };

  const totalActive = () => {
    return urls?.reduce((s, url) => {
      return url?.isActive ? s + 1 : s;
    }, 0);
  };

  useEffect(() => {
    const getUrls = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/url`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        setUrls(data.urls);
        console.log(data.urls);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
        console.log(error);
      }
    };
    getUrls();
  }, []);

  return (
    <Layout>
      {/* Basic states
      recent urls
      option for custom url(before check about custom name or username)
      expiretion 
    */}
      <div className="flex w-full">
        <div className="urlStats mt-5 w-[35%]">
          <div className="state flex gap-1">
            <div className="totalUrl bg-amber-50 px-4 py-3 rounded">
              Total URL {urls?.length}
            </div>
            <div className="toalClicks bg-amber-50 px-4 py-3 rounded">
              Clicks {totalCliks()}
            </div>
            <div className="totalActive bg-amber-50 px-4 py-3 rounded">
              Active {totalActive()}
            </div>
            <div className="totalExpire bg-amber-50 px-4 py-3 rounded">
              Expired {urls?.length - totalActive()}
            </div>
          </div>
          <div className="customUrl">Generate custom url</div>
        </div>

        <div className="recentUrls w-[75%]">
          <ul className="">
            {urls?.map((url, index) => (
              <>
                <li
                  onClick={() => navigate(`${BASE_URL}/url/${url?.shortId}`)}
                  className="cursor-pointer flex"
                  title={`${BASE_URL}/url/${url?.shortId}`}
                >
                  {`${BASE_URL}/url/${url?.shortId}`}
                <ArrowDownIcon />
                </li>
              </>
              // <td
              //   onClick={() => navigate(url?.redirectUrl)}
              //   className="cursor-pointer"
              //   title={url?.redirectUrl}
              // >
              //   {url?.redirectUrl.length > 40
              //     ? `${url?.redirectUrl?.slice(0, 40)}...`
              //     : url?.redirectUrl}
              // </td>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
