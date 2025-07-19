"use client";
import React, { useRef, useState, useEffect } from "react";
import { useStep } from "@/app/multistep-form/context/Context";
import StepHeader from "./StepHeader";
import { usePatient } from "@/app/multistep-form/context/PatientContext";
import { updatePatient } from "@/app/services/paymentService";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./LoaderOverlay";

export default function Step6() {
  const { setCurrentStep } = useStep();
  const { patientData } = usePatient();
  const [isUpdating, setIsUpdating] = useState(false);

  const contactRelationshipCodes = [
    "SPOUSE",
    "PARENT",
    "CHILD",
    "SIBLING",
    "FRIEND",
    "COUSIN",
    "GUARDIAN",
    "OTHER",];

  const [relationship, setRelationship] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    contactname: "",
    contactrelationship: "",
    contacthomephone: "",
    contactworkphone: "",
    contactmobilephone: "",
  });
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && patientData) {
      initialized.current = true; // set flag to true
      setForm({
        contactname: patientData.contactname || "",
        contactrelationship: patientData.contactrelationship || "",
        contacthomephone: patientData.contacthomephone || "",
        contactworkphone: patientData.contactworkphone || "",
        contactmobilephone: patientData.contactmobilephone || "",
      });
      setRelationship(patientData.contactrelationship || "");
    }
  }, [patientData]);

  const goToNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };
  const handleSubmitChanges = async () => {
    setIsUpdating(true);
    try {
      debugger
      await updatePatient(patientData.patientid, {
        ...form,
        status: "a", // Active status
      });
      toast.success("Address updated successfully!");
      setTimeout(() => {
        goToNextStep()
      }, 1000);
      setIsEditing(false);
    } catch (error) {
      console.error("Update Error", error);
      toast.error("Failed to update address. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full h-full flex flex-col py-6 items-center px-4 sm:px-10 text-center">

      <Toaster position="bottom-right" reverseOrder={false} />
      {isUpdating && <Loader />}
      <StepHeader />

      {/* Emergency Contact Form */}
      <div className="w-full max-w-xl text-left">
        <h2 className="text-lg font-semibold text-[#0E0C69] mb-2">
          Emergency Contact Information
        </h2>
        <hr className="mb-4 border-gray-300" />

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0E0C69]"
            placeholder="Input field"
            name="contactname"
            onChange={handleChange}
            disabled={!isEditing || isUpdating}
            value={form.contactname}
          />
        </div>

        {/* Mobile & Home Phone */}
        <div className="flex flex-col sm:flex-row gap-4 mb-2">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              Mobile Phone
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0E0C69]"
              placeholder="Input field"
              name="contactmobilephone"
              onChange={handleChange}
              disabled={!isEditing || isUpdating}
              value={form.contactmobilephone}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Home Phone</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0E0C69]"
              placeholder="Input field"
              name={"contacthomephone"}
              onChange={handleChange}
              disabled={!isEditing || isUpdating}
              value={form.contacthomephone}
            />
          </div>
        </div>

        {/* Warning */}
        <p className="text-red-500 text-sm mb-4">
          * At least one required
        </p>

        {/* Relationship Dropdown */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Relationship To Patient <span className="text-red-500">*</span>
          </label>
          <select
            value={relationship}
            disabled={!isEditing || isUpdating}
            onChange={(e) => {
              const val = e.target.value;
              setRelationship(val);
              setForm((prev) => ({
                ...prev,
                contactrelationship: val,
              }));
            }}
            className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#0E0C69]"
          >
            <option value="" disabled>Select Relationship</option>
            {contactRelationshipCodes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Save Button */}
        <div className="text-center">
          {/* <button
            onClick={handleSubmitChanges}
            className="bg-[#0E0C69] text-white font-medium px-8 py-2 rounded-md hover:opacity-90 transition"
          >
            Save
          </button> */}
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
              {isUpdating ? "Updating..." : "Submit Changes"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
