"use client";
import React from "react";
import { useStep } from "@/app/multistep-form/context/Context";
import StepHeader from "./StepHeader";
import { FiPlus } from "react-icons/fi";


const questions = [
  "Do you have any known drug allergies?",
  "Do you have any known drug allergies?",
 
];

export default function Step10() {
  const { setCurrentStep } = useStep();

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <div className="w-full h-full flex flex-col  justify-center items-center p-6">
      <StepHeader />
      <div className="sticky top-0 bg-dark-blue z-10 py-4  w-full " >
        <h1 className="text-2xl font-bold text-[#0E0C69]  ">
          Allergies
        </h1>
        {/* <p className=" text-sm text-gray-500 mt-1">
          Please answer the following questions truthfully.
        </p> */}
        <hr className="mt-4 border-[#D4D4D4] w-full text-center m-auto" />

      </div>

      {/* Scrollable Questions */}
      <div className="w-full max-w-full flex-1 items-start  pt-4 pb-6">
        {questions.map((q, idx) => (
  <div key={idx} className="mb-6 w-full">
    <p className="text-sm font-medium text-[#0E0C69] mb-2 text-left">{q}</p>
    <div className="flex flex-col w-full space-y-2 text-sm text-gray-700">
      {["Yes", "No"].map(opt => (
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

 <div className="flex flex-col gap-6 w-full max-w-xl ">
        <h3 className="text-xl font-semibold text-[#0E0C69]">Add a Photo</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          After tapping the “Add Photo” button, aim the built-in camera toward yourself such
          that you see your reflection on the screen. Then take a photo by tapping the capture
          button. Say cheese!
        </p>

        <button
          type="button"
          className="flex items-center justify-center gap-2 w-fit border border-[#0E0C69] text-[#0E0C69] font-medium px-6 py-2 rounded-[12px] hover:bg-[#0E0C69] hover:text-white transition-all"
        >
          <span ><FiPlus size={24}/></span>
          Add Photo
        </button>

       
      </div>





      {/* Sticky Bottom */}
      <div className="bg-white w-full max-w-xl py-8 px-4 ">
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
