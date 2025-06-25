"use client";
import React from "react";

export default function AlertPopup({ mainHeading ,message, buttonText, buttonColor = "success", img, onClose }) {
  const buttonClasses = {
    success: "bg-green-500",
    danger: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500"
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm text-center shadow-lg">
        <img src={img} alt="Alert Icon" className="w-25 h-25 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2"> {mainHeading} </h2>
        <p className="text-sm text-gray-600 mb-6">{message}</p>
        <button
          onClick={onClose}
          className={`w-full text-white py-2 rounded ${buttonClasses[buttonColor] || buttonClasses.success}`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
