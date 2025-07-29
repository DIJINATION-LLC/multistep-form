"use client";
import React, { useEffect, useState } from "react";
import { getMedications, searchMedication, addMedication } from "@/app/services/medicationService";
import { useStep } from "@/app/multistep-form/context/Context";
import { usePatient } from "@/app/multistep-form/context/PatientContext";
import { Loader } from "./LoaderOverlay";
import StepHeader from "./StepHeader";
import toast, { Toaster } from "react-hot-toast";

export default function Step11() {
  const { setCurrentStep } = useStep();
  const { patientData, appointmentDetails } = usePatient();

  const [loading, setLoading] = useState(false);
  const [medications, setMedications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMed, setSelectedMed] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [patientNote, setPatientNote] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(medications.length / itemsPerPage);
  const paginatedData = medications.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    if (!patientData || !appointmentDetails) return;
    fetchMeds();
  }, [patientData, appointmentDetails]);

  const fetchMeds = async () => {
    setLoading(true);
    try {
      const meds = await getMedications(patientData.patientid, appointmentDetails[0].departmentid);
      setMedications(meds);
    } catch (err) {
      toast.error("Failed to load medications");
    } finally {
      setLoading(false);
    }
  };

  const convertDate = (dateString) => {
    const [year , month , day] = dateString.split('-');
  return `${day}/${month}/${year}`

  }

const handleSearchChange = async (e) => {
  const val = e.target.value;
  setSearchTerm(val);
  
  if (val.length < 2) {
    setSearchResults([]);
    return;
  }

  setIsSearching(true);
  try {
    const res = await searchMedication(val);
    console.log("search result", res);
    
    // Always set the results - no condition needed
    setSearchResults(res);
  } catch (err) {
    console.error('Search error:', err);
    setSearchResults([]);
  } finally {
    setIsSearching(false);
  }
};
  const handleAddMedication = async () => {
    if (!selectedMed || !startDate) {
      toast.error("All fields are required.");
      return;
    }

    const payload = {
      medicationid: selectedMed.medicationid,
      departmentid: appointmentDetails[0].departmentid,
      startdate: convertDate( startDate) ,
      patientnote: patientNote,
    };

    setLoading(true);
    try {
      await addMedication(payload, patientData.patientid);
      toast.success("Medication added!");
      // Reset
      setSelectedMed(null);
      setSearchTerm("");
      setSearchResults([]);
      setStartDate("");
      setPatientNote("");
      setShowAddForm(false);
      await fetchMeds();
    } catch (err) {
      toast.error("Failed to add medication.");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => setCurrentStep((prev) => prev + 1);

  return (
    <div className="flex-1 flex flex-col p-6 overflow-auto">
       <Toaster position="top-right" reverseOrder={false} />
      <StepHeader />
      <div className="flex justify-between items-center my-4">
        <h1 className="text-[28px] font-semibold text-[#0E0C69]">Medications</h1>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-[#0E0C69] text-white px-4 py-2 rounded hover:opacity-90"
          >
             Add Medication
          </button>
        )}
      </div>

      {/* Add Medication Form */}
      {showAddForm && (
        <div className="bg-gray-50 border rounded p-4 mb-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="relative">
  <label className="text-sm font-medium">Search Medication</label>
  <input
    value={searchTerm}
    onChange={handleSearchChange}
    className="w-full border px-3 py-2 rounded"
    placeholder="Type medication name..."
  />
  
  {/* Only show dropdown when search term is 2+ characters */}
  {searchTerm.length >= 2 && (
    <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
      {isSearching ? (
        <div className="px-4 py-2 text-sm text-gray-500">Searching...</div>
      ) : searchResults.length >= 0 ? (
        searchResults.map((med) => (
          <div
            key={med.medicationid}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm border-b"
            onClick={() => {
              setSelectedMed(med);
              setSearchTerm(med.medication);
              setSearchResults([]);
            }}
          >
            {med.medication}
          </div>
        ))
      ) : (
        <div className="px-4 py-2 text-sm text-gray-500">
          No medications found
        </div>
      )}
    </div>
  )}
</div>

            <div>
              <label className="text-sm font-medium">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium">Patient Note</label>
              <textarea
                value={patientNote}
                onChange={(e) => setPatientNote(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                rows="3"
                placeholder="Write note..."
              />
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={handleAddMedication}
              disabled={!selectedMed || !startDate}
              className="bg-[#0E0C69] text-white px-6 py-2 rounded hover:opacity-90 disabled:opacity-50"
            >
              Submit
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 border border-gray-300 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Medication Table */}
      {!showAddForm && (
        <div className="overflow-x-scroll border-2 rounded-2xl">
          <table className="min-w-full text-sm text-left table-fixed">
            <thead className="bg-[#0E0C69] text-white">
              <tr>
                <th className="px-4 py-2 w-[50px]">No.</th>
                <th className="px-4 py-2 w-[200px]">Medication</th>
                <th className="px-4 py-2 w-[200px]">Organ Class</th>
                <th className="px-4 py-2 w-[200px]">Therapeutic Class</th>
                <th className="px-4 py-2 w-[120px]">Date</th>
                <th className="px-4 py-2 w-[120px]">Safe to Renew</th>
                <th className="px-4 py-2 w-[120px]">Discontinued</th>
                <th className="px-4 py-2 w-[300px]">Note</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan="8" className="text-center py-20 relative">
                    <Loader />
                  </td>
                </tr>
              )}
              {!loading && paginatedData.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center text-gray-500 py-6 italic">
                    No medications found.
                  </td>
                </tr>
              )}
              {!loading &&
                paginatedData.map((med, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 even:bg-white odd:bg-gray-50"
                  >
                    <td className="px-4 py-2">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-4 py-2">{med.medication}</td>
                    <td className="px-4 py-2">{med.organclass}</td>
                    <td className="px-4 py-2">{med.therapeuticclass}</td>
                    <td className="px-4 py-2">{med.events?.[0]?.eventdate || "-"}</td>
                    <td className="px-4 py-2">{med.issafetorenew ? "Yes" : "No"}</td>
                    <td className="px-4 py-2">{med.isdiscontinued ? "Yes" : "No"}</td>
                    <td className="px-4 py-2">
                      <div className="max-h-[80px] overflow-y-auto">
                        {med.status || med.patientnote || "—"}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {!showAddForm && totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded bg-white text-[#0E0C69] disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded bg-white text-[#0E0C69] disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Continue Button */}
      <button
        onClick={handleNext}
        className="mt-6 bg-[#0E0C69] text-white px-6 py-3 rounded hover:opacity-90 w-full"
      >
        Continue
      </button>
    </div>
  );
}
