import { useState, useEffect } from "react";
import React from "react";
import { GetItemById } from "../../service/ItemService";

interface ItemCardProps {
  itemId: string;
  onReadMore: () => void;
}

interface AllItem {
  itemId: string;
  itemName: string;
  itemDescription: string;
  location: string;
  itemStatus: string;
  reportedDate: [number, number, number];
  image: string;
  foundBy?: string;
  foundDate?: string;
  claimedBy?: string;
  claimedDate?: string;
}



const ItemCard: React.FC<ItemCardProps> = ({
  itemId,
  onReadMore,
}) => {

  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const [itemData, setItemData] = useState<AllItem | null>(null);

  useEffect(() => {
    const fetchBase64Image = async () => {
      const result: AllItem = await GetItemById(itemId);
      setItemData(result);

      if (result.image) {
        setImgSrc(result.image); // Already includes data:image/jpeg;base64,...
      }
    };

    fetchBase64Image();
  }, [itemId]);

  return (
    <div className="w-full max-w-80 mt-6 bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
      {/* Card Header */}
      <div className="relative h-56">
        <img
          src={imgSrc ? imgSrc : "https://png.pngtree.com/png-vector/20210827/ourmid/pngtree-new-item-poster-png-image_3834274.jpg"}
          alt={itemData?.itemName}
          className="w-full h-full object-fill"
        />
      </div>

      {/* Card Body */}
      <div className="p-4">
        <div className="w-full text-left mb-2">
          <p className={`inline text-sm font-semibold rounded-full px-4 py-1
    ${itemData?.itemStatus === "CLAIMED"
              ? "bg-green-200 text-green-800"
              : itemData?.itemStatus === "LOST"
                ? "bg-red-200 text-red-800"
                : "bg-yellow-200 text-yellow-800"
            }`}>
            {itemData?.itemStatus}
          </p>
        </div>


        <h5 className="text-xl text-left font-semibold text-gray-800 mb-1">
          {itemData?.itemName}
        </h5>
        <p className="text-gray-600 text-sm text-left mb-1">
          {itemData?.itemDescription}
        </p>
        <p className="text-gray-500 text-xs text-left">Location: {itemData?.location}</p>


      </div>

      {/* Card Footer */}
      <div className="flex justify-start p-4 pt-3">
        <button
          onClick={onReadMore}
          className="px-4 py-2 bg-black text-white text-sm font-bold rounded-md hover:bg-black/70 transition-colors duration-200"
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
