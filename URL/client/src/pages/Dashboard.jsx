import React, { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, Copy, Loader } from "lucide-react";
import UrlDetails from "../components/UrlDetails";
import { getFullUrl, getShortUrl } from "../utils/url";
import { deleteUrl, getAllUrls, updateUrl } from "../services/urlService";
import Loading from "../components/Loading";

const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const [isLinkOpen, setIsLinkOpen] = useState(null);
  const [loading, setLoading] = useState(true);

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
      setLoading(true);
      try {
        const { data } = await getAllUrls();
        setUrls(data.urls);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
        console.log(error);
      } finally {
        setLoading(false);
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
      const { data } = await deleteUrl(id);
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
      const { data } = await updateUrl(id);
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
        {/* left */}
        <div className="urlStats flex flex-col items-center gap-5 lg:w-[25%] md:w-[30%]">
          {/* Quick data cards */}
          <div className="state flex flex-col w-full gap-1">
            <DataCard message={`Total URLS ${urls?.length || 0}`} />
            <DataCard message={`Clicks ${totalClicks || 0}`} />
            <DataCard message={`Active ${totalActive || 0}`} />
            <DataCard message={`Expired ${urls?.length - totalActive || 0}`} />
          </div>
          {/* create custom url */}
          <Link
            className="bg-green-200 hover:bg-green-300 transition ease w-full p-2 rounded-lg text-center"
            to={"/urls"}
          >
            Generate Custom Url
          </Link>
        </div>

        <div className="recentUrls md:w-[55%] lg:w-[45%]">
          {/* List of urls */}
          <ul className="flex flex-col gap-3">
            {loading ? (
              <Loading message="Loading Urls..." />
            ) : urls?.length === 0 ? (
              <>
                <div className="text-center py-8 text-gray-500"> No URLs created yet</div>
              </>
            ) : (
              urls?.map((url) => (
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
              ))
            )}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
