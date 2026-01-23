import { Copy, Delete, Drumstick, Edit, Pencil, Trash } from "lucide-react";
import { copyText, getFullUrl, getShortUrl } from "../utils/url";

const UrlDetails = ({ url, handleDeleteUrl, handleUpdateUrl }) => {
  const UrlWithCopy = ({ url }) => {
    return (
      <div className="bg-gray-200 px-2 py-1 rounded">
        <div className="flex justify-between text-sm items-center">
          {url}
          <div
            onClick={() => copyText(url)}
            className="cursor-pointer"
            title="copy"
          >
            <Copy size={14} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="bg-gray-100 px-3 py-2 text-sm flex flex-col gap-2 rounded">
        <UrlWithCopy url={getFullUrl(url?.shortId)} />
        <UrlWithCopy url={getShortUrl(url?.redirectUrl, 40)} />
        <div className="flex items-center justify-between">
          <div className="visitors">
            Total visitor <span className="p-1 bg-gray-200 rounded">{url?.visitList?.length}</span>
          </div>
          <div className="status">
            <span>Status: </span>
            {url?.isActive ? (
              <span className="bg-green-200 text-green-950 px-2 py-0.5 rounded">
                Active
              </span>
            ) : (
              <span className="bg-red-200 text-red-800 px-2 py-0.5 rounded">
                Expire
              </span>
            )}
          </div>
        </div>
        <div className="timeStamp flex text-sm justify-between items-center">
          <span>CreatedAt: {url?.createdAt?.split("T")[0]}</span>
          <span>LastUpdate: {url?.updatedAt?.split("T")[0]}</span>
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={handleUpdateUrl}
            className="px-2 py-1 bg-gray-600 text-white font-bold rounded"
          >
            {url?.isActive ? "Deactivate" : "Activate"}
          </button>
          <button
            onClick={handleDeleteUrl}
            className="px-2 py-1 bg-red-600 text-white font-bold rounded flex items-center gap-1"
          >
            Delete <Trash size={14} />
          </button>
        </div>
      </div>
    </>
  );
};

export default UrlDetails;
