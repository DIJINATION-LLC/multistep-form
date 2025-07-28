"use client";
import React, { useState, useEffect } from "react";
import { useStep } from "@/app/multistep-form/context/Context";
import StepHeader from "./StepHeader";
import { getAllergies, updateAllergies } from "@/app/services/allergiesService";
import { usePatient } from "@/app/multistep-form/context/PatientContext";

export default function Step10() {
  const { setCurrentStep } = useStep();
  const { patientData } = usePatient();

  const [nkda, setNkda] = useState(false);
  const [allergies, setAllergies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const allergiesPerPage = 8;

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

  const handleSubmit = async () => {
    try {
      await updateAllergies(patientData.patientid, patientData.departmentid, {
        nkda,
        allergies,
        departmentid: patientData.departmentid,
      });
      setCurrentStep((prev) => prev + 1);
    } catch (error) {
      console.error("Update Allergy Error", error);
    }
  };

  const indexOfLast = currentPage * allergiesPerPage;
  const indexOfFirst = indexOfLast - allergiesPerPage;
  const currentAllergies = allergies.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(allergies.length / allergiesPerPage);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-6">
      <StepHeader />

      <div className="sticky top-0 bg-dark-blue z-10 py-4 w-full">
        <h1 className="text-2xl font-bold text-[#0E0C69]">Allergies</h1>
        <hr className="mt-4 border-[#D4D4D4] w-full" />
      </div>

      <div className="w-full max-w-full flex-1 pt-4 pb-6 overflow-auto">
        {/* Drug Allergy Question */}
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

        {/* Food/Env Allergy Question */}
        <div className="mb-6 w-full">
          <p className="text-sm font-medium text-[#0E0C69] mb-2 text-left">
            Do you have any known food/environment allergies?
          </p>
          <div className="flex flex-col space-y-2 text-sm text-gray-700">
            {["Yes", "No"].map((opt) => (
              <div key={opt} className="flex items-center gap-3">
              <div><input type="radio" name="envAllergy" className="h-5 w-5" /> </div>  
                <span>{opt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Allergy Table */}
        <div className="overflow-x-auto my-8">
          <h4 className="text-lg font-semibold text-[#0E0C69] mb-2">Allergy Details</h4>
          <table className="min-w-[800px] w-full text-sm border rounded-md">
            <thead className="bg-[#0E0C69] text-white text-left">
              <tr>
                <th className="p-3">Allergen Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Date</th>
                <th className="p-3">Reactions</th>
                <th className="p-3">Severity</th>
                <th className="p-3">Last Modified</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-700">
              {currentAllergies.map((item, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-3">{item.allergenname || "N/A"}</td>
                  <td className="p-3">{item.categories?.join(", ") || "N/A"}</td>
                  <td className="p-3">{item.onsetdate || "N/A"}</td>
                  <td className="p-3">
                    {item.reactions?.map((r) => r.reactionname).join(", ") || "N/A"}
                  </td>
                  <td className="p-3">
                    {item.reactions?.map((r) => r.severity || "N/A").join(", ") || "N/A"}
                  </td>
                  <td className="p-3">
                    {item.lastmodifieddatetime?.split("T")[0] || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

         {/* Pagination */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 border rounded disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-10 py-2 border rounded disabled:opacity-50 bg-blue text-white"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
      </div>

      {/* Continue Button */}
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
