import React, { useState } from "react";
import Layout from "../components/Layout";
import img from "../../public/landing.png";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../hooks/useAuthContext";
import { copyText } from "../utils/url";
import { Copy } from "lucide-react";

const BASE_URL = import.meta.env.VITE_BASE;

const Home = () => {
  const urlSchema = yup.object({
    url: yup
      .string()
      .url("Please enter valid URL!!!")
      .required("URL is required to short!!!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(urlSchema),
  });

  const [newUrl, setNewUrl] = useState("");
  const { user } = useAuthContext();

  const shortUrl = async (url) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/url`, {
        ...url,
        user: user?._id,
      });
      let tempUrl = `${BASE_URL}/url/${data?.shortUrl?.shortId}`;
      setNewUrl(tempUrl);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="flex w-full">
        <div className="left h-full flex flex-col relative justify-center items-center gap-5 w-[50%]">
          <div className="flex flex-col gap-4 items-center w-[80%]">
            <h1 className="text-4xl  font-bold">Shorten URL easily</h1>
            <form
              onSubmit={handleSubmit(shortUrl)}
              className="flex items-center justify-center relative w-full"
            >
              <input
                type="text"
                placeholder="https://www."
                className={`${errors?.url?.message  && "border-red-500"} border h-10 px-2 rounded-l w-[80%] outline-none`}
                {...register("url")}
              />
              <input
                type="submit"
                value={"Short"}
                className="border-y cursor-pointer border-r rounded-r h-10 px-3"
              />
            </form>
            <p>
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
        <div className="right w-[50%] flex justify-center items-center h-full">
          <div className="w-[70%]">
            <img src={img} alt="Landing Image" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
