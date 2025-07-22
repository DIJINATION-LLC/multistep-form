"use client";
import React, { useState, useEffect } from "react";
import { useStep } from "@/app/multistep-form/context/Context";
import StepHeader from "./StepHeader";
import { usePatient } from "@/app/multistep-form/context/PatientContext";
import { updatePatient } from "@/app/services/paymentService";
import toast, { Toaster } from "react-hot-toast";
import {Loader} from "./LoaderOverlay";

export default function Step7() {
  const { setCurrentStep } = useStep();
  const { patientData } = usePatient();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Marital status mapping (code to display name)
  const maritalStatusOptions = [
    { code: "D", name: "Divorced" },
    { code: "M", name: "Married" },
    { code: "S", name: "Single" },
    { code: "U", name: "Unmarried" },
    { code: "W", name: "Widowed" },
    { code: "X", name: "Separated" },
    { code: "P", name: "Partner" },
  ];

  // Initialize form with current data - using preferredname instead of nickname
  const [form, setForm] = useState({
    preferredname: patientData?.preferredname || "", // Changed to preferredname
    maritalstatus: patientData?.maritalstatus || "",
    maritalstatusname: maritalStatusOptions.find(
      opt => opt.code === patientData?.maritalstatus
    )?.name || ""
  });

  // Update form when patientData changes
  useEffect(() => {
    if (patientData) {
      setForm({
        preferredname: patientData.preferredname || "", // Changed to preferredname
        maritalstatus: patientData.maritalstatus || "",
        maritalstatusname: maritalStatusOptions.find(
          opt => opt.code === patientData.maritalstatus
        )?.name || ""
      });
    }
  }, [patientData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "maritalstatus") {
      const selectedStatus = maritalStatusOptions.find(opt => opt.code === value);
      setForm({
        ...form,
        maritalstatus: value,
        maritalstatusname: selectedStatus ? selectedStatus.name : ""
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmitChanges = async () => {
    setIsUpdating(true);
    try {
      //payload of fr put api
      const payload = {
        preferredname: form.preferredname, 
        maritalstatus: form.maritalstatus,
        status: "a", 
      };
      
      await updatePatient(patientData.patientid, payload);
      toast.success("Information updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Update Error", error);
      toast.error("Failed to update. Please try again.");
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
      
      {/* General Information Form */}
      <div className="w-full max-w-xl text-left">
        <h2 className="text-lg font-semibold text-[#0E0C69] mb-2">
          General Information
        </h2>
        <hr className="mb-4 border-gray-300" />

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Nick Name <span className="text-red-500">*</span>
          </label>
          {!isEditing ? (
            <div className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-100">
              {form.preferredname || "Not provided"}
            </div>
          ) : (
            <input
              type="text"
              name="preferredname"
              value={form.preferredname} 
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0E0C69]"
              placeholder="Enter Nick name"
              disabled={isUpdating}
            />
          )}
        </div>

        {/* Marital Status */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Marital Status <span className="text-red-500">*</span>
          </label>
          {!isEditing ? (
            <div className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-100">
              {form.maritalstatusname || "Not provided"}
            </div>
          ) : (
            <select
              name="maritalstatus"
              value={form.maritalstatus}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#0E0C69]"
              disabled={isUpdating}
            >
              <option value="">Select marital status</option>
              {maritalStatusOptions.map((status) => (
                <option key={status.code} value={status.code}>
                  {status.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-black text-white font-medium px-6 py-2 rounded-md hover:opacity-90"
            >
              Update
            </button>
          ) : (
            <button
              onClick={handleSubmitChanges}
              disabled={isUpdating}
              className="bg-black text-white font-medium px-6 py-2 rounded-md hover:opacity-90"
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          )}

          <button
            onClick={() => {
              if (isEditing) {
                setIsEditing(false);
                // Reset form to original values
                setForm({
                  preferredname: patientData?.preferredname || "", // Changed to preferredname
                  maritalstatus: patientData?.maritalstatus || "",
                  maritalstatusname: maritalStatusOptions.find(
                    opt => opt.code === patientData?.maritalstatus
                  )?.name || ""
                });
              } else {
                goToNextStep();
              }
            }}
            className="bg-[#0E0C69] text-white font-medium px-6 py-2 rounded-md hover:opacity-90"
          >
            {isEditing ? "Cancel" : "No change"}
          </button>
        </div>
      </div>
    </div>
  );
}