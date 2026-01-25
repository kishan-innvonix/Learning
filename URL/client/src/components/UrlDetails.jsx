import { Copy, Trash } from "lucide-react";
import { copyText, getFullCustomUrl, getFullUrl, getShortUrl } from "../utils/url";

const UrlDetails = ({ url, handleDeleteUrl, handleUpdateUrl, customDomain }) => {
  const UrlWithCopy = ({ urlText, label }) => {
    return (
      <div className="flex flex-col gap-1">
        <p className="text-xs text-gray-600 font-semibold">{label}</p>
        <div className="bg-gray-200 px-3 py-2 rounded flex justify-between items-center">
          <span className="text-sm break-all">{urlText}</span>
          <button
            onClick={() => copyText(urlText)}
            className="cursor-pointer hover:bg-gray-300 p-1 rounded transition"
            title="copy"
          >
            <Copy size={16} />
          </button>
        </div>
      </div>
    );
  };

  // Check if it's a custom URL or regular URL
  const isCustomUrl = !!customDomain;
  
  const shortUrlDisplay = isCustomUrl
    ? getFullCustomUrl(customDomain?.domain, url?.customName)
    : getFullUrl(url?.shortId);
    
  const originalUrlDisplay = isCustomUrl ? url?.url : url?.redirectUrl;
  const shortUrlLabel = isCustomUrl ? "Custom URL" : "Short URL";
  const originalUrlLabel = "Original URL";

  return (
    <>
      <div className="bg-gray-100 px-3 py-2 text-sm flex flex-col gap-2 rounded-b border-2 border-t-0 border-gray-300">
        <UrlWithCopy urlText={shortUrlDisplay} label={shortUrlLabel} />
        <UrlWithCopy urlText={getShortUrl(originalUrlDisplay, 40)} label={originalUrlLabel} />
        
        <div className="flex items-center justify-between bg-white p-3 rounded">
          <div className="visitors">
            <span className="font-semibold">Total Clicks: </span>
            <span className="p-1 bg-gray-200 rounded font-bold">
              {url?.visitList?.length || 0}
            </span>
          </div>
          <div className="status">
            <span className="font-semibold">Status: </span>
            {url?.isActive ? (
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
          <span><strong>Created:</strong> {url?.createdAt?.split("T")[0]}</span>
          <span><strong>Updated:</strong> {url?.updatedAt?.split("T")[0]}</span>
        </div>

        <div className="flex justify-between items-center gap-2">
          <button
            onClick={handleUpdateUrl}
            className="px-2 py-1 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded transition flex-1"
          >
            {url?.isActive ? "Deactivate" : "Activate"}
          </button>
          <button
            onClick={handleDeleteUrl}
            className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white font-bold rounded flex items-center gap-1 transition"
          >
            Delete <Trash size={14} />
          </button>
        </div>
      </div>
    </>
  );
};

export default UrlDetails;
