import React, { use, useEffect, useState } from "react";
import { GetItemById } from "../../service/ItemService";

interface ItemModelProps {
  open: boolean;
  onClose: () => void;
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

const ItemModel: React.FC<ItemModelProps> = ({ open, onClose, itemId }) => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [itemData, setItemData] = useState<AllItem | null>(null);

  useEffect(() => {
    const fetchBase64Image = async () => {
      if (!itemId) return;

      const result: AllItem = await GetItemById(itemId);
      setItemData(result);

      if (result.image) {
        setImgSrc(result.image); // base64 image
      }
    };

    fetchBase64Image();
  }, [itemId]);

  const formatDate = (rawDate: string | null | undefined): string => {
    if (!rawDate) return "N/A";

    const date = new Date(rawDate);
    if (isNaN(date.getTime())) return rawDate; // fallback for invalid date

    return date.toISOString().split("T")[0].replace(/-/g, "/"); // e.g., 2025/05/06
  };

  if (!open || !itemId) return null;


  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-black bg-opacity-60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative mx-4 sm:mx-auto w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl bg-white transition-transform duration-300"
      >
        <div className="flex flex-col">
          {/* Image Section */}
          <div className="relative w-full h-96 overflow-hidden">
            <img
              src={imgSrc || "https://png.pngtree.com/png-vector/20210827/ourmid/pngtree-new-item-poster-png-image_3834274.jpg"}
              alt={itemData?.itemName}
              className="w-full h-full object-fill"
            />
          </div>

          {/* Details Section */}
          <div className="p-6">
            <h3 className="text-2xl font-bold text-slate-800 mb-3">
              {itemData?.itemName}
            </h3>
            <p className="text-sm text-slate-600 mb-4">{itemData?.itemDescription}</p>
            <ul className="text-sm text-slate-700 space-y-1">
              <li><span className="font-semibold">Status:</span> {itemData?.itemStatus}</li>
              <li><span className="font-semibold">Location:</span> {itemData?.location}</li>
              <li><span className="font-semibold">Reported By:</span> {itemData?.reportedBy}</li>
              <li><span className="font-semibold">Reported Date:</span> {formatDate(itemData?.reportedDate ? new Date(itemData.reportedDate[0], itemData.reportedDate[1] - 1, itemData.reportedDate[2]).toISOString() : null)}</li>
              {itemData?.foundBy && <li><span className="font-semibold">Found By:</span> {itemData?.foundBy}</li>}
              {itemData?.foundDate && <li><span className="font-semibold">Found Date:</span> {formatDate(itemData?.foundDate)}</li>}
              {itemData?.claimedBy && <li><span className="font-semibold">Claimed By:</span> {itemData?.claimedBy}</li>}
              {itemData?.claimedDate && <li><span className="font-semibold">Claimed Date:</span> {formatDate(itemData?.claimedDate)}</li>}
            </ul>
            <button
              onClick={onClose}
              className="mt-6 w-full bg-slate-800 text-white py-2 rounded-md hover:bg-slate-700 text-sm font-semibold transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ItemModel;
