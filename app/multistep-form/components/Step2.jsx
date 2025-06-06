// multistep/components/Step2.jsx
"use client";
import React from "react";
import { useStep } from "../context/Context";
import StepHeader from "./StepHeader";


export default function Step2() {
  const { setCurrentStep } = useStep();

  return (
    <div className="flex-1 flex flex-col p-6 overflow-auto">
      <StepHeader />

      <div className="flex flex-col gap-6 w-full max-w-xl">
        <h3 className="text-xl font-semibold text-[#0E0C69]">Add a Photo</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          After tapping the “Add Photo” button, aim the built-in camera toward yourself such
          that you see your reflection on the screen. Then take a photo by tapping the capture
          button. Say cheese!
        </p>

        <button
          type="button"
          className="flex items-center justify-center gap-2 w-fit border border-[#0E0C69] text-[#0E0C69] font-medium px-4 py-2 rounded hover:bg-[#0E0C69] hover:text-white transition-all"
        >
          <span className="text-lg">➕</span>
          Add Photo
        </button>

        <div>
          <h4 className="font-semibold text-[#0E0C69] text-base mb-1">Why Do We Ask For A Photo?</h4>
          <p className="text-sm text-gray-700">
            Adding a photo to your chart allows our staff to more easily recognize you when
            you come in for a visit. This helps us have a more friendly and secure medical
            practice.
          </p>
        </div>

        <button
          onClick={() => setCurrentStep(3)}
          className="mt-4 bg-[#0E0C69] text-white px-6 py-2 rounded hover:opacity-90 w-full sm:w-fit"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
