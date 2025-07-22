"use client";
import React, { useState, useRef } from "react";
import StepHeader from "./StepHeader";
import SignatureCanvas from "react-signature-canvas";
import jsPDF from "jspdf";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./LoaderOverlay";
import { uploadPatientSignature, addQuestions } from "@/app/services/paymentService";
import { usePatient } from "../context/PatientContext";



import { useStep } from "@/app/multistep-form/context/Context";

const questions = [
  "Do you have any known drug allergies?",
  "Have you ever had a reaction to anesthesia?",
  "Are you allergic to latex?",
  "Do you have any food allergies?",
  "Have you experienced rashes or hives after medication?",
  "Do you carry an epinephrine injector?"
];

const options = [
  { label: "0 - No Difficulty", value: "0" },
  { label: "1 - Some Difficulty", value: "1" },
  { label: "2 - Much Difficulty", value: "2" },
  { label: "3 - Unable To Do", value: "3" }
];

export default function Step9() {
  const { setCurrentStep } = useStep();
  const [part, setPart] = useState(1); // 1: signature, 2: questions
  const signatureRef = useRef();
  const [isUpdating, setIsUpdating] = useState(false);
  const { patientData, appointmentDetails } = usePatient();
  console.log(patientData)

  const [responses, setResponses] = useState({});
  const handleOptionChange = (idx, value) => {
    setResponses((prev) => ({ ...prev, [idx]: value }));
  };

  const handleNextFromSignature = async () => {
    setIsUpdating(true);
    await uploadAndDownloadPdf();
    setPart(2);
  };



  const uploadAndDownloadPdf = async () => {
    try {
      setIsUpdating(true);

      const signatureImage = signatureRef.current
        ?.getCanvas()
        .toDataURL("image/png");

      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.text("Patient Signature", 10, 20);

      if (signatureImage) {
        doc.addImage(signatureImage, "PNG", 10, 30, 180, 60);
      }

      // === 1. Trigger download for user ===
      const pdfBlob = doc.output("blob");
      const blobUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "signature.pdf";
      link.click();
      URL.revokeObjectURL(blobUrl);

      // === 2. Convert blob to Base64 ===
      const toBase64 = (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => resolve(reader.result); // returns: data:application/pdf;base64,xxxx
          reader.onerror = reject;
        });

      const base64Pdf = await toBase64(pdfBlob);

      // === 3. Strip the prefix (optional, if your API expects just raw base64) ===
      const base64Content = base64Pdf.split(",")[1]; // Remove "data:application/pdf;base64,"

      // === 4. Send to your API ===
      const payload = {
        attachmentcontents: base64Content,
        documentSubclass: "ADMIN_CONSENT",
        departmentid: patientData?.departmentid
      };

      await uploadPatientSignature(patientData?.patientid, payload);

      setIsUpdating(false);
    } catch (err) {
      console.error("Signature Upload Error", err);
      setIsUpdating(false);
    } finally {
      setIsUpdating(false);
    }
  };


  const handleClear = () => {
    signatureRef.current?.clear();
  };

  // const handleFinish = () => {
  //   setCurrentStep((prev) => prev + 1); // Move to step 10
  // };
  const handleFinish = async () => {
    const questionsPayload = questions.map((q, idx) => ({
      question: q,
      answer: responses[idx] || "" // fallback in case not answered
    }));

    const payload = {
      patientid: patientData?.patientid,
      encounterid: appointmentDetails.length == 1 ? appointmentDetails[0]?.encounterid:appointmentDetails?.encounterid,
      questionnairetype: "CUSTOM",
      TEMPLATEIDS: questionsPayload
    };
    debugger
    try {
      await addQuestions(patientData?.patientid, appointmentDetails.length == 1 ? appointmentDetails[0]?.encounterid:appointmentDetails?.encounterid, payload);
    } catch (err) {
      console.error("Failed to submit questionnaire:", err);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-6 overflow-auto">
      <Toaster position="bottom-right" reverseOrder={false} />
      {isUpdating && <Loader />}
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

        // <div className="flex flex-col gap-6 w-full max-w-xl">
        //   <h2 className="text-xl font-semibold text-[#0E0C69]">Rapid 3</h2>
        //   <p className="text-sm text-gray-700 leading-relaxed">
        //     Please answer the following questions truthfully.
        //   </p>

        //   {questions.map((q, idx) => (
        //     <div key={idx} className="mb-6 w-full">
        //       <p className="text-sm font-medium text-[#0E0C69] mb-2 text-left">{q}</p>
        //       <div className="flex flex-col w-full space-y-2 text-sm text-gray-700">
        //         {[
        //           "0 - No Difficulty",
        //           "1 - Some Difficulty",
        //           "2 - Much Difficulty",
        //           "3 - Unable To Do",
        //         ].map(opt => (
        //           <div key={opt} className="flex items-start  w-full gap-3">
        //             <div>
        //               <input
        //                 type="radio"
        //                 name={`q${idx}`}
        //                 className="h-5 w-5 align-middle"
        //               />
        //             </div>
        //             <span className="text-left ">{opt}</span>
        //           </div>
        //         ))}
        //       </div>
        //     </div>
        //   ))}

        //   <button
        //     onClick={handleFinish}
        //     className="mt-4 bg-[#0E0C69] text-white px-6 py-3 rounded hover:opacity-90 w-full"
        //   >
        //     Continue
        //   </button>
        // </div>
        <div className="flex flex-col gap-6 w-full max-w-xl">
          <h2 className="text-xl font-semibold text-[#0E0C69]">Rapid 3</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Please answer the following questions truthfully.
          </p>

          {questions.map((q, idx) => (
            <div key={idx} className="mb-6 w-full">
              <p className="text-sm font-medium text-[#0E0C69] mb-2 text-left">{q}</p>
              <div className="flex flex-col w-full space-y-2 text-sm text-gray-700">
                {options.map((opt) => (
                  <label key={opt.value} className="flex items-start w-full gap-3">
                    <div>
                      <input
                        type="radio"
                        name={`q${idx}`}
                        value={opt.value}
                        checked={responses[idx] === opt.value}
                        onChange={() => handleOptionChange(idx, opt.value)}
                        className="h-5 align-middle"
                      />
                    </div>
                    <span className="text-left">{opt.label}</span>
                  </label>
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
