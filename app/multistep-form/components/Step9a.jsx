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
  "Do you carry an epinephrine injector?",
   "Do you carry an epinephrine injector?",
    "Do you carry an epinephrine injector?",
     "Do you carry an epinephrine injector?",
];

export default function Step9a() {
  const { setCurrentStep } = useStep();

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <div className="w-full h-full flex flex-col  justify-center items-center p-6">
      <StepHeader />
      <div className="sticky top-0 bg-dark-blue z-10 py-4 px-4 w-full " >
        <h1 className="text-2xl font-bold text-[#0E0C69]  ">
          Rapid 3
        </h1>
        {/* <p className=" text-sm text-gray-500 mt-1">
          Please answer the following questions truthfully.
        </p> */}
        <hr className="mt-4 border-[#D4D4D4] w-full text-center m-auto" />

      </div>

      {/* Scrollable Questions */}
      <div className="w-full max-w-xl flex-1 items-start overflow-auto no-scrollbar pt-4 pb-6">
        {questions.map((q, idx) => (
  <div key={idx} className="mb-6 w-full">
    <p className="text-sm font-medium text-[#0E0C69] mb-2 text-left">{q}</p>
    <div className="flex flex-col w-full space-y-2 text-sm text-gray-700">
      {["0 - No Difficulty","1 - Some Difficulty","2 - Much Difficulty","3 - Unable To Do"].map(opt => (
        <div key={opt} className="flex items-start  w-full gap-3">
            <div> 
          <input
            type="radio"
            name={`q${idx}`}
            className="h-5 w-5 align-middle"
          />
          </div>
          <span className="text-left ">{opt}</span>
        </div>
      ))}
    </div>
  </div>
))}

      {/* Sticky Bottom */}
      <div className="bg-white w-full max-w-xl py-4 px-4 ">
        <button
          onClick={handleNext}
          className="w-full bg-[#0E0C69] text-white py-3 rounded-md text-center font-medium hover:opacity-90 transition"
        >
          Continue
        </button>
      </div>
      </div>

    </div>
  );
}
