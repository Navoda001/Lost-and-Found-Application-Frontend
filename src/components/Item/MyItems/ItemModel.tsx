import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { DeleteItem, FoundItem, GetItemById } from "../../../service/ItemService";
import { AddRequest } from "../../../service/RequestService";
import { getUser } from "../../Auth/AuthProvider";

interface ItemModelProps {
  open: boolean;
  onClose: () => void;
  refreshData: () => Promise<void>;
  itemId: string | null;
}

interface AllItem {
  itemId: string;
  itemName: string;
  itemDescription: string;
  location: string;
  itemStatus: string;
  reportedDate: [number, number, number];
  reportedBy: string;
  image: string;
  foundBy?: string;
  foundDate?: string;
  claimedBy?: string;
  claimedDate?: string;
}

const ItemModel: React.FC<ItemModelProps> = ({ open, onClose, itemId, refreshData }) => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [itemData, setItemData] = useState<AllItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchData = async () => {
    if (!itemId) return;

    const result: AllItem = await GetItemById(itemId);
    console.log("Fetched item data:", result);
    setItemData(result);

    if (result.image) {
      setImgSrc(result.image); // base64 image
    }
  };
  const decode = getUser();

  useEffect(() => {

    fetchData();

  }, [itemId, open]);

  const formatDate = (rawDate: string | null | undefined): string => {
    if (!rawDate) return "N/A";

    const date = new Date(rawDate);
    if (isNaN(date.getTime())) return rawDate; // fallback for invalid date

    return date.toISOString().split("T")[0].replace(/-/g, "/"); // e.g., 2025/05/06
  };

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#888",
      confirmButtonText: "Yes, delete it!"
    });

    if (!confirm.isConfirmed) return;

    try {
      setIsDeleting(true);
      const response = await DeleteItem(itemData?.itemId);
      if (response.status === 204) {
        Swal.fire({
          title: "Deleted!",
          confirmButtonColor: "#000",
          text: "Item is Deleted!",
          icon: "success"
        });
        await refreshData();
        onClose();
      } else {
        Swal.fire({
          title: "Error!",
          confirmButtonColor: "red",
          text: "Failed to delete item!",
          icon: "error"
        });
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      Swal.fire({
        title: "Error!",
        confirmButtonColor: "red",
        text: "Failed to delete item!",
        icon: "error"
      });
    } finally {
      setIsDeleting(false);
    }
  };


  const handleFound = async () => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to mark this item as FOUND?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#888",
      confirmButtonText: "Yes, mark as FOUND"
    });

    if (!confirm.isConfirmed) return;

    try {
      setIsLoading(true);
      const response = await FoundItem(itemData?.itemId, "FOUND", decode?.sub || "");
      if (response.status === 204) {
        Swal.fire({
          title: "Success!",
          confirmButtonColor: "#000",
          text: "Item is set to Found!",
          icon: "success"
        });
        itemId = "";
        await refreshData();
        onClose();
      } else {
        Swal.fire({
          title: "Error!",
          confirmButtonColor: "red",
          text: "Failed to change item status",
          icon: "error"
        });
      }
    } catch (error) {
      console.error("Error updating item status:", error);
      Swal.fire({
        title: "Error!",
        confirmButtonColor: "red",
        text: "Failed to change item status",
        icon: "error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequest = async () => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to send a request for this item?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#888",
      confirmButtonText: "Yes, send request"
    });

    if (!confirm.isConfirmed) return;

    try {
      setIsLoading(true); // Optional: show loading UI state

      const requestPayload = {
        itemId: itemData?.itemId ?? "",
        requestEmail: decode?.sub || "",
      };
      console.log("Request data:", requestPayload);
      const response = await AddRequest(requestPayload);

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          title: "Success!",
          confirmButtonColor: "#000",
          text: "Your request has been submitted successfully.",
          icon: "success"
        });
        onClose();
      } else {
        Swal.fire({
          title: "Error!",
          confirmButtonColor: "red",
          text: "Failed to send the request.",
          icon: "error"
        });
      }
    } catch (error:any) {
      if (error.response.status === 409) {
        console.error("Error submitting request:", error);
        Swal.fire({
          title: "Error!",
          confirmButtonColor: "red",
          text: "Failed to send the request.You have already sent a request for this item.",
          icon: "error"
        });
      } else {
        Swal.fire({
          title: "Error!",
          confirmButtonColor: "red",
          text: "Something went wrong while submitting the request.",
          icon: "error"
        });
      }

    } finally {
      setIsLoading(false);
    }
  };


  if (!open || !itemId) return null;


  return (
    <div
      className="fixed h-screen overflow-auto inset-0 z-[100] grid place-items-center bg-black bg-opacity-60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative h-auto p-0 m-2 mx-4 sm:mx-auto w-full max-w-lg rounded-2xl overflow-visible shadow-2xl bg-white transition-transform duration-300"
      >
        <div className="flex flex-col">
          {/* Image Section */}
          <div className="relative w-full h-96 overflow-hidden">
            <img
              src={imgSrc || "https://png.pngtree.com/png-vector/20210827/ourmid/pngtree-new-item-poster-png-image_3834274.jpg"}
              alt={itemData?.itemName}
              className="w-full h-full object-fill rounded-2xl"
            />
          </div>

          {/* Details Section */}
          <div className="p-6">
            <h3 className="text-2xl font-bold text-slate-800 mb-3">
              {itemData?.itemName}
            </h3>
            <p className="text-sm text-slate-600 mb-4">{itemData?.itemDescription}</p>
            <ul className="text-sm text-slate-700 space-y-1 text-left">
              <li className="mb-2">
                <span className="font-semibold">Status:</span>
                <span
                  className={`ml-2 px-2 py-1 text-sm font-semibold rounded-full 
      ${itemData?.itemStatus === "CLAIMED"
                      ? " text-green-800"
                      : itemData?.itemStatus === "LOST"
                        ? " text-red-800"
                        : " text-yellow-800"
                    }`}
                >
                  {itemData?.itemStatus}
                </span>
              </li>

              <li><span className="font-semibold">Location:</span> {itemData?.location}</li>
              <li><span className="font-semibold">Reported By:</span> {itemData?.reportedBy}</li>
              <li><span className="font-semibold">Reported Date:</span> {formatDate(itemData?.reportedDate ? new Date(itemData.reportedDate[0], itemData.reportedDate[1] - 1, itemData.reportedDate[2]).toISOString() : null)}</li>
              {itemData?.foundBy && <li><span className="font-semibold">Found By:</span> {itemData?.foundBy}</li>}
              {itemData?.foundDate && <li><span className="font-semibold">Found Date:</span> {formatDate(itemData?.foundDate)}</li>}
              {itemData?.claimedBy && <li><span className="font-semibold">Claimed By:</span> {itemData?.claimedBy}</li>}
              {itemData?.claimedDate && <li><span className="font-semibold">Claimed Date:</span> {formatDate(itemData?.claimedDate)}</li>}
            </ul>


            <div className="flex col-span-3 space-x-2 mt-6">
              {itemData?.itemStatus === "FOUND" && (
                <button
                  onClick={handleRequest}
                  disabled={isLoading}
                  className={`w-full py-2 rounded-md text-sm font-semibold transition 
        ${isLoading
                      ? "bg-green-200 text-green-800 cursor-not-allowed"
                      : "bg-green-200 text-green-800 hover:bg-green-300"}`}
                >
                  {isLoading ? "Requesting..." : "Request"}
                </button>
              )}

              {itemData?.itemStatus === "LOST" && (
                <button
                  onClick={handleFound}
                  disabled={isLoading}
                  className={`w-full py-2 rounded-md text-sm font-semibold transition 
        ${isLoading
                      ? "bg-yellow-300 text-yellow-800 cursor-not-allowed"
                      : "bg-yellow-200 text-yellow-800 hover:bg-yellow-300"}`}
                >
                  {isLoading ? "Processing..." : "Found"}
                </button>
              )}

              {/* Close Button – Always visible */}
              <button
                onClick={onClose}
                className="w-full bg-slate-950 text-white py-2 rounded-md hover:bg-gray-700 text-sm font-semibold transition"
              >
                Close
              </button>
            </div>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className={`mt-4 w-full py-2 rounded-md text-sm font-semibold transition ${isDeleting
                ? "bg-red-300 cursor-not-allowed text-red-800"
                : "bg-red-200 text-red-800 hover:bg-red-300"
                }`}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>

          </div>
        </div>
      </div>
    </div>

  );
};

export default ItemModel;
