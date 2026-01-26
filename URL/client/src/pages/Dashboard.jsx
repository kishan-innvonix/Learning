import React, { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { ArrowDownIcon, ChevronDown, ChevronUp, Copy } from "lucide-react";
import UrlDetails from "../components/UrlDetails";
import { getFullUrl, getShortUrl } from "../utils/url";

const BASE_URL = import.meta.env.VITE_BASE;

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [urls, setUrls] = useState([]);
  const [isLinkOpen, setIsLinkOpen] = useState(null);

  const totalClicks = useMemo(() => {
    return urls?.reduce((s, url) => {
      return s + url?.visitList?.length;
    }, 0);
  }, [urls]);

  // memorize the total Active and it return value not fuction
  const totalActive = useMemo(() => {
    return urls?.reduce((s, url) => {
      return url?.isActive ? s + 1 : s;
    }, 0);
  }, [urls]);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/url/list`, {
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
    fetchUrls();
  }, []);

  const handleLinkTogle = (id) => {
    isLinkOpen === id ? setIsLinkOpen(null) : setIsLinkOpen(id);
  };

  const DataCard = ({ message }) => {
    return (
      <>
        <div className="bg-black text-white font-bold px-4 py-3 text-center rounded-lg">
          {message}
        </div>
      </>
    );
  };

  const handleDeleteUrl = async (id) => {
    const cn = confirm("Are you sure?");
    if (!cn) return;

    try {
      const { data } = await axios.delete(`${BASE_URL}/api/url/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      const filteredUrl = urls.filter((url) => {
        return url?._id !== data.deletedUrl;
      });
      setUrls(filteredUrl);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleUpdateUrl = async (id) => {
    try {
      const { data } = await axios.patch(
        `${BASE_URL}/api/url/${id}/status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        },
      );
      const filteredUrl = urls.map((url) => {
        return url?._id === id ? data?.url : url;
      });
      setUrls(filteredUrl);

      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row md:justify-center gap-5 w-full px-5 mt-5 ">
        <div className="urlStats flex flex-col items-center gap-5 lg:w-[25%] md:w-[30%]">
          <div className="state flex flex-col w-full gap-1">
            <DataCard message={`Total URLS ${urls?.length}`} />
            <DataCard message={`Clicks ${totalClicks}`} />
            <DataCard message={`Active ${totalActive}`} />
            <DataCard message={`Expired ${urls?.length - totalActive}`} />
          </div>
          <Link
            className="bg-green-200 hover:bg-green-300 transition ease w-full p-2 rounded-lg text-center"
            to={"/urls"}
          >
            Generate Custom Url
          </Link>
        </div>

        <div className="recentUrls md:w-[55%] lg:w-[45%]">
          <ul className="flex flex-col gap-3">
            {urls?.map((url) => (
              <div key={url?._id}>
                <li
                  onClick={() => handleLinkTogle(url?._id)}
                  className="cursor-pointer flex items-center justify-between gap-2 bg-black text-white px-3 rounded py-2"
                >
                  <div className="">
                    <div className="font-bold text-zinc-50">
                      {getFullUrl(url?.shortId)}
                    </div>
                    <div className="text-zinc-400">
                      {getShortUrl(url?.redirectUrl, 40)}
                    </div>
                  </div>
                  {isLinkOpen && isLinkOpen === url?._id ? (
                    <ChevronUp size={17} />
                  ) : (
                    <ChevronDown size={17} />
                  )}
                </li>
                {isLinkOpen && url?._id === isLinkOpen && (
                  <UrlDetails
                    handleDeleteUrl={() => handleDeleteUrl(url?._id)}
                    handleUpdateUrl={() => handleUpdateUrl(url?._id)}
                    url={url}
                  />
                )}
              </div>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
