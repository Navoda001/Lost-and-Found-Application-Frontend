import React, { useState, ChangeEvent } from "react";

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ImageUpload: React.FC<ImageUploadModalProps> = ({ isOpen, onClose }) => {
  const [image, setImage] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewURL = URL.createObjectURL(file);
      setImage(previewURL);
    }
  };

  const handleConfirm = () => {
    if (image) {
      setImage(null);
    }
  };

  const handleCancel = () => {
    setImage(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleCancel}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4 text-black">Upload Profile Image</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4 mt-4 text-black"
        />
        {image && (
          <img
            src={image}
            alt="Preview"
            className="w-32 h-32 object-cover border-2 rounded-full mb-4"
          />
        )}
        <div className="grid grid-cols-2 justify-end space-x-4">
          <button
            onClick={handleCancel}
            className=" bg-slate-950 text-white py-2 rounded-md hover:bg-gray-700 text-sm font-semibold transition"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!image}
            className={`px-4 py-2 rounded ${
              image ? "bg-green-200 text-green-800 hover:bg-green-300" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
