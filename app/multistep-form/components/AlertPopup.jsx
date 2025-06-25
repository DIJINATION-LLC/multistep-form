"use client";
import React, { useEffect, useState } from "react";

export default function AlertPopup({ mainHeading ,message, buttonText, buttonColor = "success", img, onClose }) {
  const [show, setShow] = useState(false);

  const buttonClasses = {
    success: "bg-green-500",
    danger: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500"
  };

  useEffect(() => {
    setShow(true); // trigger animation
    const timer = setTimeout(() => {
      handleClose();
    }, 5000); // auto close after 5 seconds

    return () => clearTimeout(timer); // cleanup
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      onClose(); // after animation ends
    }, 300);
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300`}>
      <div
        className={`bg-white rounded-lg p-6 w-full max-w-sm text-center shadow-lg transform transition-transform duration-300 ${
          show ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-95"
        }`}
      >
        <img src={img} alt="Alert Icon" className="w-16 h-16 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">{mainHeading}</h2>
        <p className="text-sm text-gray-600 mb-6">{message}</p>
        <button
          onClick={handleClose}
          className={`w-full text-white py-2 rounded ${buttonClasses[buttonColor] || buttonClasses.success}`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
