import React from "react";
import { IoMdClose } from "react-icons/io";

export default function DeletePopup({ message, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#0a192f] px-10 py-6 rounded shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:text-gray-400 focus:outline-none"
          aria-label="Close"
        >
          <IoMdClose size={20} />
        </button>
        <p className="text-xl text-center text-white">{message}</p>
      </div>
    </div>
  );
}
