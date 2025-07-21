"use client";
import React, { useState, useEffect } from "react";
import { useStep } from "@/app/multistep-form/context/Context";
import StepHeader from "./StepHeader";
import { FiPlus } from "react-icons/fi";
import { getAllergies, updateAllergies } from "@/app/services/allergiesService"; 
import { usePatient } from "@/app/multistep-form/context/PatientContext";

export default function Step9() {
  const { setCurrentStep } = useStep();
  const { patientData } = usePatient();

  const [nkda, setNkda] = useState(false);
  const [allergies, setAllergies] = useState([]);
  const [newAllergy, setNewAllergy] = useState({ allergenid: "", onsetdate: "", reactions: [] });

  useEffect(() => {
    fetchAllergyData();
  }, []);

  const fetchAllergyData = async () => {
    try {
      const data = await getAllergies(patientData.patientid, patientData.departmentid);
      setAllergies(data?.allergies || []);
      setNkda(data?.nkda || false);
    } catch (error) {
      console.error("Get Allergies Error", error);
    }
  };

  const handleAllergyChange = (e) => {
    setNewAllergy({ ...newAllergy, [e.target.name]: e.target.value });
  };

  const handleAddAllergy = () => {
    if (!newAllergy.allergenid) return;
    setAllergies([...allergies, newAllergy]);
    setNewAllergy({ allergenid: "", onsetdate: "", reactions: [] });
  };

  const handleSubmit = async () => {
    try {
      await updateAllergies(patientData.patientid, patientData.departmentid , {
        nkda,
        allergies,
        departmentid: patientData.departmentid,
      });
      setCurrentStep((prev) => prev + 1);
    } catch (error) {
      console.error("Update Allergy Error", error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-6">
      <StepHeader />

      <div className="sticky top-0 bg-dark-blue z-10 py-4 w-full">
        <h1 className="text-2xl font-bold text-[#0E0C69]">Allergies</h1>
        <hr className="mt-4 border-[#D4D4D4] w-full" />
      </div>

      <div className="w-full max-w-full flex-1 pt-4 pb-6">
        <div className="mb-6 w-full">
          <p className="text-sm font-medium text-[#0E0C69] mb-2 text-left">
            Do you have any known drug allergies?
          </p>
          <div className="flex flex-col space-y-2 text-sm text-gray-700">
            {["Yes", "No"].map((opt) => (
              <div key={opt} className="flex items-center gap-3">
                <div>
                <input
                  type="radio"
                  name="drugAllergy"
                  checked={nkda === (opt === "Yes")}
                  onChange={() => setNkda(opt === "Yes")}
                  className="h-5 w-5"
                />
                 </div>
                <span>{opt}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6 w-full">
          <p className="text-sm font-medium text-[#0E0C69] mb-2 text-left">
            Do you have any known food/environment allergies?
          </p>
          <div className="flex flex-col space-y-2 text-sm text-gray-700">
            {["Yes", "No"].map((opt) => (
              <div key={opt} className="flex items-center gap-3">
                <div> 
                <input
                  type="radio"
                  name="envAllergy"
                  className="h-5 w-5"
                />
                </div>
                <span>{opt}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 w-full max-w-xl">
          <h3 className="text-xl font-semibold text-[#0E0C69]">Add an Allergy</h3>
          <input
            type="text"
            name="allergenid"
            value={newAllergy.allergenid}
            onChange={handleAllergyChange}
            placeholder="Allergen ID"
            className="border px-4 py-2 rounded-md"
          />
          <input
            type="text"
            name="onsetdate"
            value={newAllergy.onsetdate}
            onChange={handleAllergyChange}
            placeholder="Onset Date (MM/DD/YYYY)"
            className="border px-4 py-2 rounded-md"
          />
          <button
            type="button"
            onClick={handleAddAllergy}
            className="flex items-center justify-center gap-2 w-fit border border-[#0E0C69] text-[#0E0C69] font-medium px-6 py-2 rounded-[12px] hover:bg-[#0E0C69] hover:text-white transition-all"
          >
            <FiPlus size={24} />
            Add Allergy
          </button>
        </div>

        <div className="mt-6 w-full">
          <h4 className="text-lg font-semibold text-[#0E0C69] mb-2">Your Allergies</h4>
          <ul className="space-y-2">
            {allergies.map((item, idx) => (
              <li key={idx} className="text-sm">
                {item.allergenid} - {item.onsetdate}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white w-full max-w-xl py-8 px-4">
        <button
          onClick={handleSubmit}
          className="w-full bg-[#0E0C69] text-white py-3 rounded-md text-center font-medium hover:opacity-90 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
