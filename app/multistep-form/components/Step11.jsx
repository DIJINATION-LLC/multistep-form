"use client";
import React, { useState, useRef } from "react";
import StepHeader from "./StepHeader";
import { useStep } from "@/app/multistep-form/context/Context";

const questions = [
  "Augmentin 500 mg-125 mg tablet",
  "Augmentin 875 mg-125 mg tablet",
  "Calcium gluconate 100 mg/mL (10%) intravenous solution",
  "Clindamycin HCl 150 mg capsule",
//   "Clindamycin HCl 150 mg capsule",
  "Magnesium sulfate 500 mg/mL (50%) injection solution",
];

export default function Step11() {
  const { setCurrentStep } = useStep();

  const handleFinish = () => {
    setCurrentStep((prev) => prev + 1); // Move to step 12
  };

  return (
    <div className="flex-1 flex flex-col p-6 overflow-auto">
      <StepHeader />
      <div className="flex flex-col gap-6 w-full max-w-xl">
        <h2 className="text-xl font-semibold mt-2 grey-heading " >Rapid 3</h2>
        <hr  className="border-[#D4D4D4]  " />
    
        {questions.map((q, idx) => (
          <div key={idx} className="mb-6 w-full">
            <p className="text-sm font-semibold grey-heading mb-2 text-left">
              {q}
            </p>
            <div className="flex flex-col w-full space-y-2 text-sm grey-heading">
              {[
                "Taking",
                "Not Taking"
               
              ].map((opt) => (
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

        <button
          onClick={handleFinish}
          className="mt-4 bg-[#0E0C69] text-white px-6 py-3 rounded hover:opacity-90 w-full"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
