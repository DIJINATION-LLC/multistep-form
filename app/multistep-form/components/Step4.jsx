"use client";
import React from "react";
import Image from "next/image";
import { useStep } from "../context/Context";
import StepHeader from "./StepHeader";


export default function Step4() {
  const { setCurrentStep } = useStep();

  const goToNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <div className="w-full h-full flex flex-col py-6 items-center px-4 sm:px-10 text-center">
      <StepHeader />

      {/* Animation / Image */}
      <div className="my-6">
        <Image
          src="/address.gif" // 🔁 Replace this with your actual path
          alt="Contact Info Animation"
          width={120}
          height={120}
        />
      </div>

      {/* Info Text */}
      <div className="text-center">
        <p className="text-lg font-semibold text-[#0E0C69]">
Is your address complete and up to date?        </p>
        <p className="text-sm text-gray-700 mt-2">
          1803 Cormier Row Suite 269
        </p>

       
      </div>

      {/* Buttons */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button
          className="bg-black text-white font-medium px-6 py-2 rounded-md hover:opacity-90"
        >
          Update
        </button>
        <button
          onClick={goToNextStep}
          className="bg-[#0E0C69] text-white font-medium px-6 py-2 rounded-md hover:opacity-90"
        >
          No change
        </button>
      </div>
    </div>
  );
}
