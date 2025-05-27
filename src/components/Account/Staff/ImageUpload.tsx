import React, { useState, ChangeEvent } from "react";

import Swal from 'sweetalert2'
import { UpdateStaffImage } from "../../../service/StaffService";

interface ImageUploadModalProps {
  isOpen: boolean;
  email: string;
  refreshData: () => Promise<void>;
  onClose: () => void;
}

const ImageUpload: React.FC<ImageUploadModalProps> = ({ isOpen, onClose, email, refreshData }) => {
  const [image, setImage] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);


      };
      reader.readAsDataURL(file); // read file as base64 string
    }
  };

  const handleConfirm = async () => {
    if (!image) {
      Swal.fire({
        title: 'No Image Selected',
        text: 'Please select an image before confirming.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    const confirmResult = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to update your profile image?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: "#000",
    });

    if (confirmResult.isConfirmed) {
      const imageUpdate = {
        image: image,
        email: email
      };

      try {
        console.log("Image update data:", imageUpdate);
        const response = await UpdateStaffImage(imageUpdate);
        if (response.status === 204) {
          Swal.fire({
            title: 'Success',
            text: 'Profile image updated successfully.',
            icon: 'success',
            confirmButtonColor: "#000",
            confirmButtonText: 'OK'
          });
          setImage(null);
          await refreshData(); // if you have a function to refresh UI
          onClose();           // close modal or UI if needed
        } else {
          Swal.fire({
            title: 'Failed',
            text: 'Something went wrong while updating the image.',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: "red",
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: 'Error',
          text: 'An unexpected error occurred.',
          icon: 'error',
          confirmButtonColor: "red",
          confirmButtonText: 'OK'
        });
      }
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
            className={`px-4 py-2 rounded ${image ? "bg-green-200 text-green-800 hover:bg-green-300" : "bg-gray-400 cursor-not-allowed"
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
