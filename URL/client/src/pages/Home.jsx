import React, { useState } from "react";
import Layout from "../components/Layout";
import img from "../../public/landing.png";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import toast from "react-hot-toast";
import { copyText, getFullUrl } from "../utils/url";
import { Copy, LoaderIcon } from "lucide-react";
import { urlSchema } from "../schemas/auth.schemas";
import { createShortUrl } from "../services/urlService";

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(urlSchema),
  });

  const [newUrl, setNewUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShortUrl = async (url) => {
    try {
      setLoading(true);
      const { data } = await createShortUrl(url);
      let tempUrl = getFullUrl(data?.shortUrl?.shortId);
      setNewUrl(tempUrl);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row w-full">
        <div className="left h-full flex flex-col relative justify-center items-center gap-5 md:w-[50%]">
          <div className="flex flex-col gap-4 items-center w-[80%]">
            <h1 className="md:text-4xl text-2xl font-bold">
              Shorten URL easily
            </h1>
            <form
              onSubmit={handleSubmit(handleShortUrl)}
              className="flex items-center justify-center relative w-full"
            >
              <input
                type="text"
                placeholder="https://www."
                className={`${errors?.url?.message && "border-red-500"} border h-8 md:h-10 px-2 rounded-l w-[80%] outline-none`}
                {...register("url")}
                disabled={loading}
              />
              <input
                type="submit"
                value={loading ? "Shorting..." : "Short"}
                className="border-y cursor-pointer border-r rounded-r h-8 md:h-10 px-3"
                disabled={loading}
              />
            </form>
            <p className="text-sm md:text-lg">
              Paste your long URL and get a short, shareable link instantly.
            </p>
            <div
              className={`${!newUrl && "hidden"}  bg-green-200 px-3 py-1 rounded-lg flex items-center gap-4`}
            >
              {newUrl}
              <Copy
                onClick={() => copyText(newUrl)}
                className="cursor-pointer text-green-950"
                size={15}
              />
            </div>
            <FormError errors={errors} />
          </div>
        </div>
        <div className="right md:w-[50%] flex justify-center items-center h-full">
          <div className="w-[70%]">
            <img src={img} alt="Landing Image" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
