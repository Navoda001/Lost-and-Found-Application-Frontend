import React from "react";

interface ItemCardProps {
  onReadMore: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ onReadMore }) => {
  return (
    <div className="w-full max-w-80 mt-6 bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Card Header */}
      <div className="relative h-56">
        <img
          src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          alt="Barcelona location"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Card Body */}
      <div className="p-4">
        <h5 className="text-xl text-left font-semibold text-gray-800 mb-2">
          Calculator
        </h5>
        <p className="text-gray-600 text-sm text-left">
          The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to "Naviglio" where you can enjoy the main nightlife
          in Barcelona.
        </p>
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
