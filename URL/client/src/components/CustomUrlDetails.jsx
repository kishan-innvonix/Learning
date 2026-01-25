import { Copy, Trash } from "lucide-react";
import { copyText, getShortUrl } from "../utils/url";

const CustomUrlDetails = ({ customUrl, domain, handleDeleteUrl, handleToggleActive }) => {
  const UrlWithCopy = ({ url, label }) => {
    return (
      <div className="flex flex-col gap-1">
        <p className="text-xs text-gray-600 font-semibold">{label}</p>
        <div className="bg-gray-200 px-3 py-2 rounded flex justify-between items-center">
          <span className="text-sm break-all">{url}</span>
          <button
            onClick={() => copyText(url)}
            className="cursor-pointer hover:bg-gray-300 p-1 rounded transition"
            title="copy"
          >
            <Copy size={16} />
          </button>
        </div>
      </div>
    );
  };

  const getCustomUrl = () => {
    return `${domain?.domain}/${customUrl?.customName}`;
  };

  return (
    <div className="bg-gray-100 px-4 py-3 text-sm flex flex-col gap-3 rounded-b border-2 border-t-0 border-gray-300">
      <UrlWithCopy url={getCustomUrl()} label="Custom URL" />
      <UrlWithCopy url={getShortUrl(customUrl?.url, 50)} label="Original URL" />
      
      <div className="flex items-center justify-between bg-white p-3 rounded">
        <div className="visitors">
          <span className="font-semibold">Total Clicks: </span>
          <span className="bg-gray-200 px-3 py-1 rounded font-bold">
            {customUrl?.visitList?.length || 0}
          </span>
        </div>
        <div className="status">
          <span className="font-semibold">Status: </span>
          {customUrl?.isActive ? (
            <span className="bg-green-200 text-green-950 px-3 py-1 rounded font-semibold">
              Active
            </span>
          ) : (
            <span className="bg-red-200 text-red-800 px-3 py-1 rounded font-semibold">
              Inactive
            </span>
          )}
        </div>
      </div>

      <div className="timeStamp flex text-xs justify-between bg-white p-3 rounded">
        <span><strong>Created:</strong> {customUrl?.createdAt?.split("T")[0]}</span>
        <span><strong>Updated:</strong> {customUrl?.updatedAt?.split("T")[0]}</span>
      </div>

      <div className="flex justify-between items-center gap-2">
        <button
          onClick={handleToggleActive}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded transition flex-1"
        >
          {customUrl?.isActive ? "Deactivate" : "Activate"}
        </button>
        <button
          onClick={handleDeleteUrl}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded flex items-center gap-2 transition"
        >
          Delete <Trash size={16} />
        </button>
      </div>
    </div>
  );
};

export default CustomUrlDetails;
