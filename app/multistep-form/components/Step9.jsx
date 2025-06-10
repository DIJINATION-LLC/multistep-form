"use client";
import React, { useState, useRef } from "react";
import StepHeader from "./StepHeader";
import SignatureCanvas from "react-signature-canvas";
import { useStep } from "@/app/multistep-form/context/Context";

const questions = [
  "Do you have any known drug allergies?",
  "Have you ever had a reaction to anesthesia?",
  "Are you allergic to latex?",
  "Do you have any food allergies?",
  "Have you experienced rashes or hives after medication?",
  "Do you carry an epinephrine injector?",
];

export default function Step9() {
  const { setCurrentStep } = useStep();
  const [part, setPart] = useState(1); // 1: signature, 2: questions
  const signatureRef = useRef();

  const handleNextFromSignature = () => {
    setPart(2);
  };

  const handleClear = () => {
    signatureRef.current?.clear();
  };

  const handleFinish = () => {
    setCurrentStep((prev) => prev + 1); // Move to step 10
  };

  return (
    <div className="flex-1 flex flex-col p-6 overflow-auto">
      <StepHeader />

      {part === 1 ? (
        // === Signature Section ===
        <div className="flex flex-col gap-6 w-full max-w-xl">
          <h2 className="text-xl font-semibold text-[#0E0C69]">Signature</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Please add your signature for our records.
          </p>

          <div
            className="rounded-lg"
            style={{ border: "2px solid #CCCCCC" }}
          >
            <SignatureCanvas
              ref={signatureRef}
              penColor="black"
              canvasProps={{
                width: 500,
                height: 300,
                className: "sigCanvas",
              }}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleClear}
              className="bg-gray-200 text-black px-6 py-2 rounded hover:opacity-90 w-full sm:w-fit"
            >
              Clear
            </button>
            <button
              onClick={handleNextFromSignature}
              className="bg-[#0E0C69] text-white px-6 py-2 rounded hover:opacity-90 w-full sm:w-fit"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        // === Rapid 3 Questions Section ===
      
        <div className="flex flex-col gap-6 w-full max-w-xl">
          <h2 className="text-xl font-semibold text-[#0E0C69]">Rapid 3</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Please answer the following questions truthfully.
          </p>

                 {questions.map((q, idx) => (
  <div key={idx} className="mb-6 w-full">
    <p className="text-sm font-medium text-[#0E0C69] mb-2 text-left">{q}</p>
    <div className="flex flex-col w-full space-y-2 text-sm text-gray-700">
      {  [
                  "0 - No Difficulty",
                  "1 - Some Difficulty",
                  "2 - Much Difficulty",
                  "3 - Unable To Do",
                ].map(opt => (
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
      )}
    </div>
  );
}
