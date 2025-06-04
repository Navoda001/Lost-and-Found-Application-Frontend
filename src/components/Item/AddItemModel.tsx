import React, { useState } from "react";
import { AddItem } from "../../service/ItemService";
import { Listbox } from "@headlessui/react";
import {getUser} from "../Auth/AuthProvider";
import Swal from 'sweetalert2'

interface AddItemModalProps {
  open: boolean;
  onClose: () => void;
}

interface AllItem {
  itemName: string;
  itemDescription: string;
  location: string;
  itemStatus: string;
  foundDate: string;
  email:string;
  image: string;
}

const AddItemModal: React.FC<AddItemModalProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState<AllItem>({
    itemName: "",
    itemDescription: "",
    location: "",
    itemStatus: "LOST",
    foundDate: "",
    image: "",
    email:"",
  });
  const statusOptions = ["LOST", "FOUND"];
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const decode = getUser();
  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewImage(base64String);

        // Set base64 in formData
        setFormData((prev) => ({
          ...prev,
          image: base64String,
        }));
      };
      reader.readAsDataURL(file); // read file as base64 string
    }
  };


  const handleSubmit = async () => {
    if (!formData.itemName || !formData.itemDescription || !formData.location || !formData.itemStatus) {
      Swal.fire({
        title: "Error!",
        confirmButtonColor: "red",
        text: "Please fill all required fields!",
        icon: "error"
      });
      return;
    }
    try {
      formData.email = decode?.sub || ""; // Set email from decoded token
      console.log("Form Data:", formData);
      const response = await AddItem(formData); // Send as multipart/form-data
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          title: "Successful!",
          confirmButtonColor: "#000",
          text: "Item is Saved!",
          icon: "success"
        });
        onClose();
      } else {
        Swal.fire({
          title: "Error!",
          confirmButtonColor: "red",
          text: "Error uploading data!",
          icon: "error"
        });
        console.error("Error uploading data");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      Swal.fire({
        title: "Error!",
        confirmButtonColor: "red",
        text: "Error saving file!",
        icon: "error"
      });
    }

    setFormData({
      itemName: "",
      itemDescription: "",
      location: "",
      itemStatus: "LOST",
      foundDate: "",
      image: "",
      email:""
    });
    setPreviewImage(null);
    onClose();
  };



  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Add New Item</h2>

        <div className="grid grid-cols-1  gap-4 max-h-[70vh] overflow-y-auto p-2">
          <input name="itemName" value={formData.itemName} onChange={handleChange} placeholder="Item Name" className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-200" />
          <textarea name="itemDescription" value={formData.itemDescription} onChange={handleChange} placeholder="Item Description" className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-200" />
          <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-200" />
          <Listbox value={formData.itemStatus} onChange={(value) => setFormData({ ...formData, itemStatus: value })}>
            <div className="relative w-full">
              <Listbox.Button className="w-full py-2 px-4 border border-gray-300 rounded-xl text-left shadow-md">
                {formData.itemStatus}
              </Listbox.Button>
              <Listbox.Options className="absolute mt-1 w-full bg-white border rounded-md shadow-lg z-10">
                {statusOptions.map((status) => (
                  <Listbox.Option
                    key={status}
                    value={status}
                    className={({ active }) =>
                      `cursor-pointer rounded-xl px-4 py-2 ${active ? "bg-gray-900 text-white" : "bg-white"}`
                    }
                  >
                    {status}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>

          {/* Found Date Input: Show only if status is FOUND */}
          <div className="flex flex-col gap-1">
            {formData.itemStatus === "FOUND" && (
              <label className="text-sm text-gray-600">Found Date</label>
            )}
            {formData.itemStatus === "FOUND" && (
              <input
                name="foundDate"
                type="date"
                value={formData.foundDate}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition duration-200" />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Image Upload</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />

            {previewImage && (
              <div className="relative mt-2 inline-block">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="mt-2 h-auto object-cover rounded border"
                />
                <button
                  onClick={() => setPreviewImage(null)}
                  className="absolute top-1 left-1  bg-opacity-80 rounded-full p-1 text-gray-800 text-3xl hover:text-red-600 transition"
                  aria-label="Clear Image"
                >
                  &times;
                </button>
              </div>
            )}

          </div>
        </div>

        <div className="flex justify-end mt-6 gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-black text-white text-sm font-bold rounded-md hover:bg-black/70 transition-colors duration-200">Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;
