"use client";
import React from "react";
import { useStep } from "../context/Context";
import styles from "@/app/styles/style";

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
            <div className="flex flex-col items-center py-3">
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
                <div className="w-px h-5 my-4 bg-white opacity-50"></div>
              )}
            </div>

            {/* Text Part */}
            <div
              className={`py-2 px-3 rounded-md w-full ${
                isActive ? "bg-[#ffffff2f] " : "text-white group-hover:bg-[#1a1975]"
              }`}
            >
              <div className={`${styles.heading3} uppercase !font-normal `}>
                Step {stepNumber}
              </div>
              <div className={`${styles.heading2}`}>{label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
