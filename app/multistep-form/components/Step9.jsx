"use client";
import React, { useState, useRef, useEffect } from "react";
import StepHeader from "./StepHeader";
import SignatureCanvas from "react-signature-canvas";
import jsPDF from "jspdf";
import toast, { Toaster } from "react-hot-toast";
import { Loader } from "./LoaderOverlay";
import { uploadPatientSignature } from "@/app/services/paymentService";
import { usePatient } from "../context/PatientContext";
import { useStep } from "@/app/multistep-form/context/Context";
import API_ROUTES from "../../services/endpoints";

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
  const [part, setPart] = useState(1);
  const signatureRef = useRef();
  const [isUpdating, setIsUpdating] = useState(false);
  const { patientData, appointmentDetails } = usePatient();

  // Initialize responses from sessionStorage or empty object
  const [responses, setResponses] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('step9Responses');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  // Cache responses in sessionStorage whenever they change
  useEffect(() => {
    sessionStorage.setItem('step9Responses', JSON.stringify(responses));
  }, [responses]);

  const handleOptionChange = (idx, value) => {
    setResponses((prev) => ({ ...prev, [idx]: value }));
  };

  const handleNextFromSignature = async () => {
    setIsUpdating(true);
    await uploadAndDownloadPdf();
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

      // Trigger download
      const pdfBlob = doc.output("blob");
      const blobUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "signature.pdf";
      link.click();
      URL.revokeObjectURL(blobUrl);

      // Convert to Base64 for API
      const toBase64 = (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
        });

      const base64Pdf = await toBase64(pdfBlob);

      // Send to API
      // === 3. Strip the prefix (optional, if your API expects just raw base64) ===
      // const base64Content = base64Pdf.split(",")[1]; // Remove "data:application/pdf;base64,"
      const base64Content = base64Pdf; // Remove "data:application/pdf;base64,"

      // === 4. Send to your API ===
      const payload = {
        attachmentcontents: base64Content,
        documentSubclass: "ADMIN_CONSENT",
        departmentid: patientData?.departmentid,

      };
      const formData = new FormData()
      formData.append('path', `${API_ROUTES.PATIENT_SIGNATURE(patientData?.patientid)}`);
      formData.append('method', 'POST');
      formData.append('documentSubclass', 'ADMIN_CONSENT');
      formData.append('departmentid', `${patientData?.departmentid}`);
      const blob = await fetch(base64Pdf).then(res => res.blob());
      formData.append('attachmentcontents', blob, 'signature.pdf');

      await uploadPatientSignature(patientData?.patientid, formData);
      toast.success("Signature uploaded successfully!");
      setPart(2);
      setIsUpdating(false);

    } catch (err) {
      console.error("Signature Upload Error", err);
      toast.error("Failed to upload signature");
      setIsUpdating(false);
    }
  };

  const handleClear = () => {
    signatureRef.current?.clear();
  };

  const handleFinish = () => {

        // try { setIsUpdating(true); // Prepare responses for API in the required format 
        //  const formattedResponses = Object.entries(responses).map(([index, value]) => ({ question: questions[parseInt(index)], answer: value })); 
        // const res async (params) => {
          
        // } ()= > { await addQuestions(patientData.patientid, formattedResponses)  }
        //  sessionStorage.removeItem('step9Responses'); toast.success("Responses submitted successfully!"); setCurrentStep((prev) => prev + 1); } 
        // catch (err) { console.error("Submission Error", err); toast.error("Failed to submit responses"); } 
        // finally { setIsUpdating(false); }

        
    // Simulate API success with toast notification
    toast.success("Responses saved successfully!");
    
    // Move to next step after showing toast
    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col p-6 overflow-auto relative ">
      <Toaster position="bottom-right" reverseOrder={false} />
      {isUpdating && <Loader />}
      <StepHeader />

      {part === 1 ? (
        // Signature Section
        <div className="flex flex-col gap-6 w-full max-w-xl">
          <h2 className="text-xl font-semibold text-[#0E0C69]">Signature</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Please add your signature for our records.
          </p>

          <div className="rounded-lg" style={{ border: "2px solid #CCCCCC" }}>
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
              className="bg-gray-200 text-black px-6 py-3 rounded hover:opacity-90 w-full "
            >
              Clear
            </button>
            <button
              onClick={handleNextFromSignature}
              className="bg-[#0E0C69] text-white px-6 py-3 rounded hover:opacity-90 w-full "
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        // Questions Section
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

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setPart(1)}
              className="bg-gray-200 text-black px-6 py-3 rounded hover:opacity-90 w-full"
            >
              Back to Signature
            </button>
            <button
              onClick={handleFinish}
              className="bg-[#0E0C69] text-white px-6 py-3 rounded hover:opacity-90 w-full"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}