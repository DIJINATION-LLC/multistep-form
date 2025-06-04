// multistep/components/SidebarSteps.jsx
"use client";
import React from "react";
import { useStep } from "../context/Context";

export default function SidebarSteps() {
  const { currentStep, setCurrentStep } = useStep();

  const steps = [
    "Payment Summary",
    "Photo",
    "Contact Information",
    "Address",
    "Billing Information",
    "Emergency Contact",
    "General Information",
    "Demographics",
    "Rapid 3",
    "Allergies",
    "Medications",
    "Wellness Questionnaire",
  ];

  return (
    <div className="px-5 py-12 space-y-10">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep === stepNumber;

        return (
          <div
            key={stepNumber}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${
              isActive ? "bg-white text-[#0E0C69]" : "text-white hover:bg-[#1a1975]"
            }`}
            onClick={() => setCurrentStep(stepNumber)}
          >
            <div
              className={`h-6 w-6 flex items-center justify-center rounded-full text-xs font-bold ${
                isActive ? "bg-[#0E0C69] text-white" : "border border-white"
              }`}
            >
              {stepNumber}
            </div>
            <span className="text-sm font-medium">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
