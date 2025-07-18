"use client";
import React, { useRef, useState } from "react";
import { useStep } from "../context/Context";
import StepHeader from "./StepHeader";
import { FiPlus } from "react-icons/fi";
import { usePatient } from "../context/PatientContext";
import { uploadPatientPhoto } from "@/app/services/paymentService";
import AlertPopup from "@/app/multistep-form/components/AlertPopup";
import helper from "@/app/utils/helper";

export default function Step2() {
  const { setCurrentStep } = useStep();
  const { patientData } = usePatient();

  const inputRef = useRef(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result.split(",")[1]); // Get pure base64 without prefix
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!imageBase64) return alert("Please capture a photo first");

    try {
      setUploading(true);
      await uploadPatientPhoto(patientData.patientid, patientData.departmentid, imageBase64);
      setShowAlert(true)
      setCurrentStep(3);
    } catch (err) {
      console.error("Photo Upload Error", err);
      alert("Failed to upload photo");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-6 overflow-auto">
      <StepHeader />
    {showAlert && (
       <AlertPopup
    mainHeading="Success!"
    message="Image uploaded successfully"
    buttonText="Next"
    buttonColor="success"
    img="/success.png"
    onClose={() => {
      setShowAlert(false);
     
    }}
  />

    )};


      <div className="flex flex-col gap-6 w-full max-w-xl">
        <h3 className="text-xl font-semibold text-[#0E0C69]">Add a Photo</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          After tapping the “Add Photo” button, aim the built-in camera toward yourself such
          that you see your reflection on the screen. Then take a photo by tapping the capture
          button. Say cheese!
        </p>

        <div>
          <input
            type="file"
            accept="image/*"
            capture="user"
            onChange={handleImageChange}
            style={{ display: "none" }}
            ref={inputRef}
          />
          <button
            type="button"
            onClick={() => inputRef.current.click()}
            className="flex items-center justify-center gap-2 w-fit border border-[#0E0C69] text-[#0E0C69] font-medium px-6 py-2 rounded-[12px] hover:bg-[#0E0C69] hover:text-white transition-all"
          >
            <span>
              <FiPlus size={24} />
            </span>
            Add Photo
          </button>
        </div>

        {imageBase64 && (
          <img
            src={`data:image/jpeg;base64,${imageBase64}`}
            alt="Captured"
            className="mt-4 w-40 h-40 object-cover rounded"
          />
        )}

        <div>
          <h4 className="font-semibold text-[#0E0C69] text-base mb-1">
            Why Do We Ask For A Photo?
          </h4>
          <p className="text-sm text-gray-700">
            Adding a photo to your chart allows our staff to more easily recognize you when
            you come in for a visit. This helps us have a more friendly and secure medical
            practice.
          </p>
        </div>

        <button
          onClick={handleUpload}
          disabled={!imageBase64 || uploading}
          className="mt-4 bg-[#0E0C69] text-white px-6 py-2 rounded hover:opacity-90 w-full sm:w-fit"
        >
          {uploading ? "Uploading..." : "Upload & Next Step"}
        </button>
      </div>
    </div>
  );
}
