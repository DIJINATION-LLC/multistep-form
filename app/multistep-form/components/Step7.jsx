"use client";
import React, { useState } from "react";
import { useStep } from "@/app/multistep-form/context/Context";
import StepHeader from "./StepHeader";

export default function Step7() {
  const { setCurrentStep } = useStep();

  const [relationship, setRelationship] = useState("Single");

  const goToNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <div className="w-full h-full flex flex-col py-6 items-center px-4 sm:px-10 text-center">
      
      <StepHeader />

      {/* Emergency Contact Form */}
      <div className="w-full max-w-xl text-left">
        <h2 className="text-lg font-semibold text-[#0E0C69] mb-2">
          General Information
        </h2>
        <hr className="mb-4 border-gray-300" />

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Nick Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0E0C69]"
            placeholder="Input field"
          />
        </div>

      
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
           Marital Status <span className="text-red-500">*</span>
          </label>
          <select
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#0E0C69]"
          >
            <option value="single">Single</option>
            <option value="marries">Married</option>
          </select>
        </div>

        {/* Save Button */}
        <div className="text-center">
          <button
            onClick={goToNextStep}
            className="bg-[#0E0C69] text-white font-medium px-8 py-2 rounded-md hover:opacity-90 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
