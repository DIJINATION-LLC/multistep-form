"use client";
import React, { useState, useEffect } from "react";
import StepHeader from "./StepHeader";
import { useStep } from "@/app/multistep-form/context/Context";
import { usePatient } from "@/app/multistep-form/context/PatientContext";
import { postQuestionnaireScreener } from "@/app/services/questionnaireService";

const questions = [
  "Augmentin 500 mg-125 mg tablet",
  "Augmentin 875 mg-125 mg tablet",
  "Calcium gluconate 100 mg/mL (10%) intravenous solution",
  "Clindamycin HCl 150 mg capsule",
  "Magnesium sulfate 500 mg/mL (50%) injection solution",
];

export default function Step11() {
  const { setCurrentStep } = useStep();
  // const { patientData, appointmentDetails } = usePatient();

  const [answers, setAnswers] = useState({});

  const handleRadioChange = (questionIdx, value) => {
    setAnswers({ ...answers, [questionIdx]: value });
  };

  const handleNext = ()=> {
     setCurrentStep((prev) => prev + 1);
  }

  // const handleFinish = async () => {
  //   try {
  //     const selectedTemplates = Object.keys(answers).map((key) => parseInt(key) + 100); 
  //   debugger  
  //     await postQuestionnaireScreener({
  //       encounterId: appointmentDetails[0].encounterid,
  //       templateids: selectedTemplates,
  //     });

  //     setCurrentStep((prev) => prev + 1);
  //   } catch (err) {
  //     console.error("Submit Error", err);
  //   }
  // };

  return (
    <div className="flex-1 flex flex-col p-6 overflow-auto">
      <StepHeader />
      <div className="flex flex-col gap-6 w-full max-w-xl">
        <h2 className="text-xl font-semibold mt-2 grey-heading">Medications</h2>
        <hr className="border-[#D4D4D4]" />

        {questions.map((q, idx) => (
          <div key={idx} className="mb-6 w-full">
            <p className="text-sm font-semibold grey-heading mb-2 text-left">{q}</p>
            <div className="flex flex-col w-full space-y-2 text-sm grey-heading">
              {["Taking", "Not Taking"].map((opt) => (
                <div key={opt} className="flex items-start w-full gap-3">
                  <div>
                    <input
                      type="radio"
                      name={`q${idx}`}
                      className="h-5 w-5 align-middle"
                      onChange={() => handleRadioChange(idx, opt)}
                      checked={answers[idx] === opt}
                    />
                  </div>
                  <span className="text-left">{opt}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={handleNext}
          className="mt-4 bg-[#0E0C69] text-white px-6 py-3 rounded hover:opacity-90 w-full"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
