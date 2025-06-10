"use client";
import React from "react";
import { useStep } from "../context/Context";
import Styles from "@/app/styles/style"

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
    <div className="px-12 py-12 space-y-4 relative">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep === stepNumber;
        const isCompleted = currentStep > stepNumber;

        return (
          <div
            key={stepNumber}
            className={`flex gap-4 items-start relative z-10 cursor-pointer group transition`}
            onClick={() => setCurrentStep(stepNumber)}
          >
            {/* Vertical timeline line */}
            <div className="flex flex-col items-center">
              {/* Dot */}
              <div
                className={`w-4 h-4 rounded-full border-2 ${
                  isActive || isCompleted
                    ? "bg-[#1f93dc] border-[#fff]"
                    : "border-white"
                }`}
              ></div>

              {/* Line (except last step) */}
              {index !== steps.length - 1 && (
                <div className="w-px h-5 my-5 bg-white opacity-50"></div>
              )}
            </div>

            {/* Text Part */}
            <div
              className={`py-4 px-3 rounded-md w-full ${
                isActive ? "bg-[#ffffff2f] " : "text-white group-hover:bg-[#1a1975]"
              }`}
            >
              <div className="text-[10px] uppercase font-semibold text-gray-400 tracking-wide">
                Step {stepNumber}
              </div>
              <div className="text-sm font-medium">{label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
