// multistep/components/Step2.jsx
"use client";
import React from "react";
import { useState , useRef } from "react";
import { useStep } from "../context/Context";
import StepHeader from "./StepHeader";
import SignatureCanvas from 'react-signature-canvas'

export default function Step9() {
  const { setCurrentStep } = useStep();
  const [signature , setSignature] = useState()
  const [] = useState()
    const goToNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const ClearSign = () =>{
    signature.clear()
  }

  return (
    <div className="flex-1 flex flex-col p-6 overflow-auto">
      <StepHeader />

      <div className="flex flex-col gap-6 w-full max-w-xl">
        <h2 className="text-xl font-semibold text-[#0E0C69]">Signature</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
         Please add your signature for our records
        </p>
    <div className="rounded-lg" style={{border: '2px solid #CCCCCC'}}  >
    <SignatureCanvas 
     ref={(ref)=>{setSignature(ref)}}
    penColor='black'
    canvasProps={{width: 500, height: 300, className: 'sigCanvas'}} />,
       </div>
       <button
          onClick={ClearSign}
          className="mt-4 bg-[#0E0C69] text-white px-6 py-2 rounded hover:opacity-90 w-full sm:w-fit"
        >
         Clear
        </button>
        <button
          onClick={goToNextStep}
          className="mt-4 bg-[#0E0C69] text-white px-6 py-2 rounded hover:opacity-90 w-full sm:w-fit"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
