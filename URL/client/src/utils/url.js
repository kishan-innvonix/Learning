import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE;

export const getFullUrl = (shortId) => {
  return `${BASE_URL}/url/${shortId}`;
};

export const getShortUrl = (url, numOfChar) => {
  return url?.length > numOfChar ? `${url?.slice(0, numOfChar)}...` : url;
};

export const copyText = (text) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied Successfully", { position: "bottom-left" });
};
