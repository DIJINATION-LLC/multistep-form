"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useStep } from "../context/Context";
import StepHeader from "./StepHeader";
import { usePatient } from "@/app/multistep-form/context/PatientContext";
import { updatePatient } from "@/app/services/paymentService";
import toast, { Toaster } from "react-hot-toast";
import {Loader} from "./LoaderOverlay";

export default function Step4() {
  const { setCurrentStep } = useStep();
  const { patientData } = usePatient();

  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Initialize form with address fields
  const [form, setForm] = useState({
    address1: patientData?.address1 || "",
    address2: patientData?.address2 || "",
   
    country: patientData?.country || "US", // Default country
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmitChanges = async () => {
    setIsUpdating(true);
    try {
      await updatePatient(patientData.patientid, {
        ...form,
        status: "a", // Active status
      });
      toast.success("Address updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Update Error", error);
      toast.error("Failed to update address. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const goToNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <div className="w-full h-full flex flex-col py-6 items-center px-4 sm:px-10 text-center relative">
      <Toaster position="bottom-right" reverseOrder={false} />
      {isUpdating && <Loader />}

      <StepHeader />

      <div className="my-6">
        <Image
          src="/address.gif"
          alt="Address Information"
          width={250}
          height={250}
        />
      </div>

      <div className="text-center space-y-2">
        <p className="text-lg font-semibold text-[#0E0C69]">
          Is your address complete and up to date?
        </p>

        {/* Address Fields */}
        {["address1", "address2"].map(
          (field) => (
            <div key={field} className="mb-3">
              
              <input
                type="text"
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="border p-2 w-full max-w-xs rounded text-center"
                placeholder={`Enter ${field}`}
                disabled={!isEditing || isUpdating}
              />
            </div>
          )
        )}
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-4 w-full">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-black text-white font-medium px-20 py-3 rounded-xl hover:opacity-90"
          >
            Update
          </button>
        ) : (
          <button
            onClick={handleSubmitChanges}
            disabled={isUpdating}
            className="bg-black text-white font-medium px-15 py-3 rounded-md hover:opacity-90"
          >
            {isUpdating ? "Updating..." : "Submit Changes"}
          </button>
        )}

        <button
          onClick={goToNextStep}
          className="bg-[#0E0C69] text-white font-medium px-20 py-3 rounded-xl hover:opacity-90"
        >
          No change
        </button>
      </div>
    </div>
  );
}