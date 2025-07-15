"use client";
import React, { useState } from "react";
import StepHeader from "./StepHeader";
import AlertPopup from "./AlertPopup";
import helper from "@/app/utils/helper";
import { useStep } from "@/app/multistep-form/context/Context";


const questions = [
  {
    text: "Little interest or pleasure in doing things",
    name: "pleasure",
  },
  {
    text: "Feeling down, depressed, or hopeless",
    name: "hopeless",
  },
];

const options = [
  "Not at all",
  "Several days",
  "More than half the days",
  "Nearly every day",
];

export default function Step12() {
  const [showSurvey, setShowSurvey] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
    const { setCurrentStep } = useStep();
  
 const handleNext = () => {
    setCurrentStep((setCurrentStep)=> setCurrentStep +1);
  };

  return (
    <div className="w-full h-full flex flex-col py-6 justify-center items-center px-4 sm:px-10">
      <StepHeader />
      {showPopup && (
        <AlertPopup
          mainHeading={helper.heading}
          message={helper.successMessage}
          buttonText={helper.successText}
          buttonColor={helper.success}
          img="/success.png"
          onClose={handleNext}
        />
      )}

      {/* Sticky Heading */}
      <div className=" py-4 w-full text-left  ">
        <h1 className="text-2xl font-bold text-[#0E0C69] text-left">
          Wellness Questionnaire
        </h1>
        <p className="text-left text-sm text-gray-500 mt-1">
          Over the last two weeks, how often have you been bothered by any of
          the following problems?
        </p>
      </div>

      {/* Questions */}
      <div className="w-full max-w-xl flex-1  pt-4 pb-6 space-y-6">
        {questions.map((q, idx) => (
          <div key={idx}>
            <p className="text-sm font-medium text-[#0E0C69] mb-2">
              {q.text}
              <span className="text-red-500">*</span>
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {options.map((opt, i) => (
                <label
                  key={i}
                  className="border border-[#0E0C69] text-[#0E0C69] text-center py-2 px-3 rounded-md hover:bg-[#0E0C69] hover:text-white cursor-pointer transition"
                >
                  <input
                    type="radio"
                    name={q.name}
                    value={opt}
                    className="hidden"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}
        <p className="text-xs text-red-500 mt-2">*Required</p>
        <div className="bg-white w-full  py-4">
          <button
            onClick={() => setShowPopup(true)}
            className="w-full bg-[#0E0C69] text-white py-3 rounded-md text-center font-medium hover:opacity-90 transition"
          >
             Continue
          </button>
        </div>
      </div>
    </div>
  );
}
