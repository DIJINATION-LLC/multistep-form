"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useStep } from "../context/Context";
import StepHeader from "./StepHeader";
import { usePatient } from "@/app/multistep-form/context/PatientContext";
import { updatePatient } from "@/app/services/paymentService";
import toast, { Toaster } from "react-hot-toast";
import {Loader} from "./LoaderOverlay";

export default function Step3() {
  const { setCurrentStep } = useStep();
  const { patientData } = usePatient();

  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [form, setForm] = useState({
    email: patientData?.email || "",
    mobilephone: patientData?.mobilephone || "",
    homephone: patientData?.homephone || "",
    workphone: patientData?.workphone || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmitChanges = async () => {
    setIsUpdating(true);
    try {
      await updatePatient(patientData.patientid, {
        ...form,
        countrycode3166: "US",
        status: "a",
        guarantorcountrycode3166: "US",
      });
      toast.success("Details updated successfully!");
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
      <Toaster position="top-right" reverseOrder={false} />
      {isUpdating && <Loader />}

      <StepHeader />

      <div className="my-6">
        <Image
          src="/contact-info.gif"
          alt="Contact Info"
          width={250}
          height={250}
        />
      </div>

      <div className="text-center space-y-2">
        <p className="text-lg font-semibold text-[#0E0C69]">
          Is your contact info complete and up to date?
        </p>

        {["email", "mobilephone", "homephone", "workphone"].map((field) => (
          <div key={field}>
            <strong>
              {field === "email"
                ? "Email"
                : field.charAt(0).toUpperCase() +
                  field.slice(1).replace("phone", " Phone")}
            </strong>
            <br />
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="border p-2 w-full max-w-xs rounded"
              placeholder={field}
              disabled={!isEditing || isUpdating}
            />
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-4 w-full" >
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-black text-white font-medium px-20 py-3 rounded-md hover:opacity-90"
          >
            Update
          </button>
        ) : (
          <button
            onClick={handleSubmitChanges}
            disabled={isUpdating}
            className="bg-black text-white font-medium px-20 py-3 rounded-md hover:opacity-90 "
          >
            {isUpdating ? "Updating..." : "Submit Changes"}
          </button>
        )}

        <button
          onClick={goToNextStep}
          className="bg-[#0E0C69] text-white font-medium px-20 py-3 rounded-md hover:opacity-90"
        >
          No change
        </button>
      </div>
    </div>
  );
}
