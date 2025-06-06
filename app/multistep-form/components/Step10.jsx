"use client";
import React from "react";
import { useStep } from "@/app/multistep-form/context/Context";
import StepHeader from "./StepHeader";

const questions = [
  "Do you have any known drug allergies?",
  "Have you ever had a reaction to anesthesia?",
  "Are you allergic to latex?",
  "Do you have any food allergies?",
  "Have you experienced rashes or hives after medication?",
  "Do you carry an epinephrine injector?"
];

export default function Step10() {
  const { setCurrentStep } = useStep();

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-4 sm:px-10">
      <StepHeader />
      <div className="sticky top-0 bg-white z-10 py-4 w-full border-b border-gray-200">
        <h1 className="text-2xl font-bold text-[#0E0C69] text-center">
          Allergies
        </h1>
        <p className="text-center text-sm text-gray-500 mt-1">
          Please answer the following questions truthfully.
        </p>
      </div>

      {/* Scrollable Questions */}
      <div className="w-full max-w-xl flex-1 overflow-y-scroll no-scrollbar pt-4 pb-6">
        {questions.map((q, idx) => (
          <div key={idx} className="mb-6">
            <p className="text-sm font-medium text-[#0E0C69] mb-2">{q}</p>
            <div className="space-y-2 text-sm text-gray-700">
              <label className="flex items-center">
                <input type="radio" name={`q${idx}`} className="mr-2" />
                Yes
              </label>
              <label className="flex items-center">
                <input type="radio" name={`q${idx}`} className="mr-2" />
                No
              </label>
              <label className="flex items-center">
                <input type="radio" name={`q${idx}`} className="mr-2" />
                Not Sure
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Bottom */}
      <div className="bg-white w-full max-w-xl py-4 border-t border-gray-200  bottom-0 z-10">
        <button
          onClick={handleNext}
          className="w-full bg-[#0E0C69] text-white py-3 rounded-md text-center font-medium hover:opacity-90 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
