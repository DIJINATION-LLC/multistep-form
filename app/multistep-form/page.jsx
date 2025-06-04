// multistep/page.jsx
"use client";

import React from "react";
import { StepProvider, useStep } from "./context/Context";
import SidebarSteps from "./components/SidebarSteps";

import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import Step5 from "./components/Step5";
import Step6 from "./components/Step6"
// ... import all up to Step12

const StepRenderer = () => {
  const { currentStep } = useStep();

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1 />;
      case 2: return <Step2 />;
      case 3: return <Step3 />
      case 4: return <Step4 />
      case 5: return <Step5 />
      // ...
      case 12: return <Step12 />;
      default: return <Step1 />;
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */} 
      <aside className=" w-[35%] bg-[#0E0C69] text-white overflow-y-auto">
        <SidebarSteps />
      </aside>

      {/* Step Content */}
      <main className="w-[65%] overflow-y-auto bg-[#F9FAFB]">
        {renderStep()}
      </main>
    </div>
  );
};

export default function MultistepPage() {
  return (
    <StepProvider>
      <StepRenderer />
    </StepProvider>
  );
}
