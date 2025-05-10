import React from "react";

const ItemCard: React.FC = () => {
  return (
    <div className="w-full max-w-md mt-6 bg-white rounded-lg shadow-md overflow-hidden">
      {/* Card Header */}
      <div className="relative h-56">
        <img
          src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
          alt="Barcelona location"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Card Body */}
      <div className="p-4">
        <h5 className="text-xl font-semibold text-gray-800 mb-2">
          UI/UX Review Check
        </h5>
        <p className="text-gray-600 text-sm">
          The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to "Naviglio" where you can enjoy the main nightlife
          in Barcelona.
        </p>
      </div>

      {/* Card Footer */}
      <div className="p-4 pt-0">
        <button className="w-fit px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-200">
          Read More
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
