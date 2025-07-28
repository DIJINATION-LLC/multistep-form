"use client";
import React, { useState, useEffect } from "react";
import { useStep } from "@/app/multistep-form/context/Context";
import { usePatient } from "@/app/multistep-form/context/PatientContext";
import StepHeader from "./StepHeader";
import { getLanguages, getEthnicities, getRaces, getOccupations } from "@/app/services/demographics";
import SearchableSelect from "./resusable-components/SearchableSelect";

// ✅ MultiSelect Component
const MultiSelect = ({ selected, setSelected, options, placeholder }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");

  const handleSelect = (item) => {
    if (!selected.some((s) => s.id === item.id)) {
      setSelected([...selected, item]);
    }
  };

  const handleRemove = (id) => {
    setSelected(selected.filter((s) => s.id !== id));
  };

  const filteredOptions = options.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      !selected.some((s) => s.id === item.id)
  );

  return (
    <div className="relative">
      <div
        className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-[48px] flex flex-wrap items-center gap-2 cursor-pointer"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {selected.length === 0 && <span className="text-gray-400">{placeholder}</span>}
        {selected.map((item) => (
          <span key={item.id} className="bg-[#B9EAFF] text-[#0E0C69] px-3 py-1 rounded-full flex items-center">
            {item.name}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(item.id);
              }}
              className="ml-2 bg-black text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
            >
              ✕
            </button>
          </span>
        ))}
      </div>

      {showDropdown && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border-b border-gray-300"
            placeholder="Search..."
          />
          <ul className="max-h-40 overflow-y-auto">
            {filteredOptions.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSelect(item)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default function Step8() {
  const { setCurrentStep } = useStep();
  const { patientData } = usePatient();

  const [languages, setLanguages] = useState([]);
  const [ethnicities, setEthnicities] = useState([]);
  const [races, setRaces] = useState([]);
  const [occupations, setOccupations] = useState([]);

  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedEthnicities, setSelectedEthnicities] = useState([]);
  const [selectedRaces, setSelectedRaces] = useState([]);
  const [selectedOccupation, setSelectedOccupation] = useState("");

  // ✅ Fetch API data once on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      const lang = await getLanguages();
      setLanguages(lang);
      const eth = await getEthnicities();
      setEthnicities(eth);
      const rac = await getRaces();
      setRaces(rac);
      const occ = await getOccupations();
      setOccupations(occ);
    };
    fetchInitialData();
  }, []);

  // ✅ Prefill data when patientData + fetched data ready
  useEffect(() => {
    if (languages.length && patientData?.language6392code) {
      const langObj = languages.find((l) => l.id === patientData.language6392code);
      if (langObj) setSelectedLanguage(langObj.id);
    }

    if (ethnicities.length && patientData?.ethnicitycode) {
      const ethObj = ethnicities.find((e) => e.id === patientData.ethnicitycode);
      if (ethObj) setSelectedEthnicities([ethObj]);
    }

    if (races.length && patientData?.racename) {
      const raceObj = races.find((r) => r.name === patientData.racename);
      if (raceObj) setSelectedRaces([raceObj]);
    }
  }, [patientData, languages, ethnicities, races]);

  const goToNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <div className="w-full h-full flex flex-col py-6 items-center px-4 sm:px-10 text-center">
      <StepHeader />

      <div className="w-full max-w-xl text-left">
        <h2 className="text-lg font-semibold text-[#0E0C69] mb-2">Demographics</h2>
        <hr className="mb-4 border-gray-300" />

        {/* Occupation */}
        <div className="mb-4">
  <label className="block text-sm font-medium mb-1">Occupation</label>
  <SearchableSelect
    options={occupations}
    value={selectedOccupation}
    onChange={setSelectedOccupation}
    placeholder="Select Occupation"
  />
</div>


        {/* Language */}
       <div className="mb-4">
  <label className="block text-sm font-medium mb-1">
    Language <span className="text-red-500">*</span>
  </label>
  <SearchableSelect
    options={languages}
    value={selectedLanguage}
    onChange={setSelectedLanguage}
    placeholder="Select Language"
  />
  <div className="flex items-start w-full gap-3 mt-3">
    <div>
      <input type="checkbox" className="mr-2" />
    </div>
    <span>Rather Not Say</span>
  </div>
</div>

        {/* Ethnicity */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Ethnicity <span className="text-red-500">*</span>
          </label>
          <MultiSelect
            selected={selectedEthnicities}
            setSelected={setSelectedEthnicities}
            options={ethnicities}
            placeholder="Select Ethnicity"
          />
          <div className="flex items-start w-full gap-3 mt-3">
            <div>
            <input type="checkbox" className="mr-2" />
            </div>
            <span>Rather Not Say</span>
          </div>
        </div>

        {/* Race */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Race <span className="text-red-500">*</span>
          </label>
          <MultiSelect
            selected={selectedRaces}
            setSelected={setSelectedRaces}
            options={races}
            placeholder="Select Race"
          />
          <div className="flex items-start w-full gap-3 mt-3">
            <div>
            <input type="checkbox" className="mr-2" />
            </div>
            <span>Rather Not Say</span>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={goToNextStep}
            className="bg-[#0E0C69] text-white font-medium px-8 py-3 rounded-md hover:opacity-90 transition w-full"
          >
            Continue
          </button>
          <p className="text-red-500 text-xs mt-2">* Required</p>
        </div>
      </div>
    </div>
  );
}
