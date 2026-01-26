import React, { useEffect, useState, useMemo, useCallback } from "react";
import Layout from "../components/Layout";
import { useAuthContext } from "../hooks/useAuthContext";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChevronDown, ChevronUp } from "lucide-react";
import Input from "../components/auth/Input";
import UrlDetails from "../components/UrlDetails";
import { customDomainSchema, customUrlSchema } from "../schemas/auth.schemas";
import {
  createCustomDomain,
  createCustomUrl,
  deleteCustomDomain,
  deleteCustomUrl,
  getAllCustomUrls,
  getCustomDomain,
  getCustomUrlsByDomain,
  updateCustomUrl,
} from "../services/customUrlService";


const CustomUrl = () => {
  const { user } = useAuthContext();
  const [customDomain, setCustomDomain] = useState(null);
  const [customUrls, setCustomUrls] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [isLinkOpen, setIsLinkOpen] = useState(null);
  const [domainLoading, setDomainLoading] = useState(false);
  const [urlLoading, setUrlLoading] = useState(false);

  // Domain Form
  const {
    register: registerDomain,
    handleSubmit: handleSubmitDomain,
    reset: resetDomain,
    formState: { errors: domainErrors },
  } = useForm({
    resolver: yupResolver(customDomainSchema),
  });

  // Custom URL Form
  const {
    register: registerUrl,
    handleSubmit: handleSubmitUrl,
    reset: resetUrl,
    formState: { errors: urlErrors },
  } = useForm({
    resolver: yupResolver(customUrlSchema),
  });

  // Fetch custom domain and URLs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: domainData } = await getCustomDomain();
        setCustomDomain(domainData.customDomain || null);
        if (domainData.customDomain) {
          setSelectedDomain(domainData.customDomain._id);
        }

        const { data: urlData } = await getCustomUrlsByDomain(domainData?.customDomain?._id);
        setCustomUrls(urlData.customUrls || []);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to fetch data");
      }
    };
    fetchData();
  }, [user?.token]);

  const onSubmitDomain = async (formData) => {
    setDomainLoading(true);
    try {
      const { data } = await createCustomDomain(formData);
      setCustomDomain(data.customDomain);
      setSelectedDomain(data.customDomain._id);
      toast.success(data.message || "Domain created successfully");
      resetDomain();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create domain");
    } finally {
      setDomainLoading(false);
    }
  };

  const onSubmitUrl = async (formData) => {
    if (!selectedDomain) {
      toast.error("Please select or create a domain first");
      return;
    }

    setUrlLoading(true);
    try {
      const payload = {
        ...formData,
        domain: selectedDomain,
      };

      const { data } = await createCustomUrl(payload);
      setCustomUrls([...customUrls, data.customUrl]);
      toast.success(data.message || "Custom URL created successfully");
      resetUrl();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to create custom URL",
      );
    } finally {
      setUrlLoading(false);
    }
  };

  const handleDeleteDomain = async () => {
    const cn = confirm(
      "Are you sure? This will delete the domain and all associated URLs.",
    );
    if (!cn) return;

    try {
      const { data } = await deleteCustomDomain(customDomain?._id);
      setCustomDomain(null);
      setSelectedDomain("");
      setCustomUrls([]);
      toast.success(data.message || "Domain deleted");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete domain");
    }
  };

  const handleDeleteCustomUrl = async (id) => {
    const cn = confirm("Are you sure?");
    if (!cn) return;

    try {
      const { data } = await deleteCustomUrl(id);
      const filteredUrls = customUrls.filter((url) => url?._id !== id);
      setCustomUrls(filteredUrls);
      toast.success(data.message || "Custom URL deleted");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete");
    }
  };

  const handleToggleCustomUrlActive = useCallback(
    async (id) => {
      try {
        const { data } = await updateCustomUrl(id)
        setCustomUrls((prevUrls) =>
          prevUrls.map((url) => (url?._id === id ? data?.customUrl : url)),
        );
        toast.success(data.message || "Status updated");
      } catch (error) {
        console.log(error)
        toast.error(
          error?.response?.data?.message || "Failed to update status",
        );
      }
    },
    [user?.token],
  );

  const handleLinkToggle = useCallback((id) => {
    setIsLinkOpen((prev) => (prev === id ? null : id));
  }, []);

  return (
    <Layout>
      <div className="flex md:flex-row flex-col justify-center gap-5 w-full mt-5 px-4">
        {/* Left Side - Forms */}
        <div className="md-w-[35%] lg:w-[25%] flex flex-col gap-5">
          {/* Domain Form */}
          <div className="bg-white border-2 border-black p-6 rounded-lg h-fit">
            <h2 className="text-xl font-bold mb-6 text-black">
              {customDomain ? "Your Domain" : "Create Domain"}
            </h2>
            {customDomain ? (
              <div className="flex flex-col gap-4">
                <div className="bg-gray-100 p-4 rounded border-2 border-black">
                  <p className="text-sm text-gray-600 mb-2">Domain Name</p>
                  <p className="font-bold text-lg text-black">
                    {customDomain.domain}
                  </p>
                </div>
                <button
                  onClick={handleDeleteDomain}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded font-semibold transition"
                >
                  Delete Domain
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmitDomain(onSubmitDomain)}
                className="flex flex-col gap-4"
              >
                <Input
                  id="domain"
                  label="Domain Name"
                  placeholder="example.com"
                  {...registerDomain("domain")}
                  error={domainErrors.domain}
                />
                <input
                  className="border-2 border-black text-lg px-6 py-2 rounded bg-black text-white font-bold cursor-pointer hover:bg-gray-800 transition disabled:opacity-50"
                  type="submit"
                  value={domainLoading ? "Creating..." : "Create Domain"}
                  disabled={domainLoading}
                />
              </form>
            )}
          </div>

          {/* Create Custom URL Form */}
          {customDomain && (
            <div className="bg-white border-2 border-black p-6 rounded-lg h-fit">
              <h2 className="text-xl font-bold mb-6 text-black">
                Create Custom URL
              </h2>
              <form
                onSubmit={handleSubmitUrl(onSubmitUrl)}
                className="flex flex-col gap-4"
              >
                <div>
                  <label className="font-semibold text-black block mb-2">
                    Domain
                  </label>
                  <select
                    className="border-2 border-gray-300 px-4 py-2 rounded w-full focus:outline-none focus:border-black"
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value)}
                    {...registerUrl("domain")}
                  >
                    <option value={customDomain._id}>
                      {customDomain.domain}
                    </option>
                  </select>
                  {urlErrors.domain && (
                    <p className="text-red-500 text-sm">
                      {urlErrors.domain.message}
                    </p>
                  )}
                </div>

                <Input
                  id="url"
                  label="URL to Shorten"
                  type="url"
                  placeholder="https://example.com/very-long-url"
                  {...registerUrl("url")}
                  error={urlErrors.url}
                />

                <Input
                  id="customName"
                  label="Custom Name"
                  placeholder="myshortlink"
                  {...registerUrl("customName")}
                  error={urlErrors.customName}
                />

                <input
                  className="border-2 border-black text-lg px-6 py-2 rounded bg-black text-white font-bold cursor-pointer hover:bg-gray-800 transition disabled:opacity-50"
                  type="submit"
                  value={urlLoading ? "Creating..." : "Create Custom URL"}
                  disabled={urlLoading}
                />
              </form>
            </div>
          )}
        </div>

        {/* Right Side */}
        <div className="md:w-[55%] lg:w-[45%]">
          {customDomain ? (
            <>
              {/* Domain Display */}
              <div className="bg-gray-100 p-4 rounded mb-4 border-2 border-black">
                <p className="font-semibold text-black">Active Domain:</p>
                <p className="text-lg font-bold text-black">
                  {customDomain.domain}
                </p>
              </div>

              {/* URLs List */}
              <h2 className="text-2xl font-bold mb-4 text-black">
                Your Custom URLs
              </h2>
              <ul className="flex flex-col gap-3 mb-5">
                {customUrls ? (
                  customUrls.map((url) => (
                    <div key={url?._id}>
                      <li
                        onClick={() => handleLinkToggle(url?._id)}
                        className="cursor-pointer flex items-center justify-between gap-2 bg-black text-white px-4 rounded py-3 border-2 border-black"
                      >
                        <div className="">
                          <div className="font-bold text-zinc-50">
                            {customDomain.domain}/{url?.customName}
                          </div>
                          <div className="text-zinc-400 text-sm">
                            Clicks: {url?.visitList?.length || 0}
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
                          url={url}
                          customDomain={customDomain}
                          handleDeleteUrl={() =>
                            handleDeleteCustomUrl(url?._id)
                          }
                          handleUpdateUrl={() =>
                            handleToggleCustomUrlActive(url?._id)
                          }
                        />
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No custom URLs created yet
                  </div>
                )}
              </ul>
            </>
          ) : (
            <div className="text-center py-16 text-gray-500 border-2 border-dashed border-gray-300 rounded">
              <p className="text-lg">Create a custom domain first</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CustomUrl;
