// multistep/page.jsx
"use client";

import React from "react";
import { StepProvider, useStep } from "./context/Context";
import withAuth from "@/app/hoc/withAuth";
import SidebarSteps from "./components/SidebarSteps";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import Step5 from "./components/Step5";
import Step6 from "./components/Step6";
import Step7 from "./components/Step7";
import Step8 from "./components/Step8";
import Step9 from "./components/Step9";
import Step10 from "./components/Step10";
import Step12 from "./components/Step12";

const StepRenderer = () => {
  const { currentStep } = useStep();

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1 />;
      case 2: return <Step2 />;
      case 3: return <Step3 />
      case 4: return <Step4 />
      case 5: return <Step5 />
      case 6: return <Step6 />
      case 7 : return <Step7 />
      case 8 : return <Step8 />
      case 9 : return <Step9 />
      case 10 : return <Step10 />
      case 11 : return <Step10 />
      case 12: return <Step12 />;
      default: return <Step1 />;
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */} 
      <aside className=" w-[45%] bg-[url(/sidebar.png)] bg-cover text-white overflow-y-auto">
        <SidebarSteps />
      </aside>

      {/* Step Content */}
      <main className="w-[55%] overflow-y-auto bg-[#F9FAFB]">
        {renderStep()}
      </main>
    </div>
  );
};

 function MultistepPage() {
const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  
 useEffect(() => {
  
  const user = localStorage.getItem("currentUser");
  if (user) {
    setCurrentUser(JSON.parse(user));
  } else {
    router.push("/"); 
  }
  
}, []);


  if (!currentUser) return null;
  return (
    <StepProvider>
      <StepRenderer user={currentUser} />
    </StepProvider>
  );
}

export default withAuth(MultistepPage);
