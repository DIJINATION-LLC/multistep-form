"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useStep } from "../context/Context";
import StepHeader from "./StepHeader";
import { usePatient } from "@/app/multistep-form/context/PatientContext";
import { updatePatient } from "@/app/services/paymentService";
import toast, { Toaster } from "react-hot-toast";
import {Loader} from "./LoaderOverlay";

export default function Step5() {
  const { setCurrentStep } = useStep();
  const { patientData } = usePatient();

  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Initialize form with billing fields
  const [form, setForm] = useState({
    firstname: patientData?.firstname || "",
    lastname: patientData?.lastname || "",
    dob: patientData?.dob || "",
    contactrelationship: patientData?.contactrelationship || "",
    address1: patientData?.address1 || "",
    address2: patientData?.address2 || "",
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
      toast.success("Billing information updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Update Error", error);
      toast.error("Failed to update billing info. Please try again.");
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
          src="/billing.gif"
          alt="Billing Information"
          width={250}
          height={250}
        />
      </div>

      <div className="text-center">
        <p className="text-lg font-semibold text-[#0E0C69]">
          Is your billing info complete and up to date?
        </p>

        {!isEditing ? (
          // Display Mode
          <div className="mt-4 space-y-1 text-sm text-gray-600">
            <p>
              <strong>Name:</strong> {`${patientData?.firstname || ""} ${patientData?.lastname || ""}`}
            </p>
            <p>
              <strong>Birthday:</strong> {patientData?.dob || "Not Found"}
            </p>
            <p>
              <strong>Relationship:</strong>{" "}
              {patientData?.contactrelationship || "Not Found"}
            </p>
            <p>
              <strong>Address:</strong> {`${patientData?.address1 || ""} ${patientData?.address2 || ""}`.trim() || "N/A"}
            </p>
          </div>
        ) : (
          // Edit Mode
          <div className="mt-4 space-y-3 max-w-xs mx-auto">
            <div className="flex gap-2">
              <input
                type="text"
                name="firstname"
                value={form.firstname}
                onChange={handleChange}
                className="border p-2 w-full rounded text-center"
                placeholder="First Name"
                disabled={isUpdating}
              />
              <input
                type="text"
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
                className="border p-2 w-full rounded text-center"
                placeholder="Last Name"
                disabled={isUpdating}
              />
            </div>
            
            <input
              type="text"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="border p-2 w-full rounded text-center"
              placeholder="Birthday (YYYY-MM-DD)"
              disabled={isUpdating}
            />
            
            <input
              type="text"
              name="contactrelationship"
              value={form.contactrelationship}
              onChange={handleChange}
              className="border p-2 w-full rounded text-center"
              placeholder="Relationship"
              disabled={isUpdating}
            />
            
            <input
              type="text"
              name="address1"
              value={form.address1}
              onChange={handleChange}
              className="border p-2 w-full rounded text-center"
              placeholder="Address Line 1"
              disabled={isUpdating}
            />
            
            <input
              type="text"
              name="address2"
              value={form.address2}
              onChange={handleChange}
              className="border p-2 w-full rounded text-center"
              placeholder="Address Line 2"
              disabled={isUpdating}
            />
          </div>
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