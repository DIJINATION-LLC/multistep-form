"use client";
import React, { useState, useEffect } from "react";
import { useStep } from "@/app/multistep-form/context/Context";
import StepHeader from "./StepHeader";
import { getLanguages, getEthnicities, getRaces, getOccupations } from "@/app/services/demographics";

const MultiSelect = ({ selected, setSelected, options, placeholder, onSearch }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");

  const handleSelect = (item) => {
    if (!selected.find((s) => s.id === item.id)) {
      setSelected([...selected, item]);
    }
  };

  const handleRemove = (id) => {
    setSelected(selected.filter((s) => s.id !== id));
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (onSearch) onSearch(value);
  };

  return (
    <div className="relative">
      <div
        className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-[48px] flex flex-wrap items-center gap-2 cursor-pointer"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {selected.length === 0 && <span className="text-gray-400">{placeholder}</span>}
        {selected.map((item) => (
          <span
            key={item.id}
            className="bg-[#B9EAFF] text-[#0E0C69] px-3 py-1 rounded-full flex items-center"
          >
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
            onChange={handleSearch}
            className="w-full p-2 border-b border-gray-300"
            placeholder="Search..."
          />
          <ul className="max-h-40 overflow-y-auto">
            {options
              .filter((item) => !selected.find((s) => s.id === item.id))
              .map((item) => (
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

  const [languages, setLanguages] = useState([]);
  const [ethnicities, setEthnicities] = useState([]);
  const [races, setRaces] = useState([]);
  const [occupations, setOccupations] = useState([]);

  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedEthnicities, setSelectedEthnicities] = useState([]);
  const [selectedRaces, setSelectedRaces] = useState([]);
  const [selectedOccupation, setSelectedOccupation] = useState("");

  useEffect(() => {
    fetchInitialData();
  }, []);

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
          <select
            value={selectedOccupation}
            onChange={(e) => setSelectedOccupation(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#0E0C69]"
          >
            <option value="">Select Occupation</option>
            {occupations.map((occ) => (
              <option key={occ.code} value={occ.code}>
                {occ.name}
              </option>
            ))}
          </select>
        </div>

        {/* Language */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Language <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedLanguage?.id || ""}
            onChange={(e) =>
              setSelectedLanguage(languages.find((lang) => lang.id === e.target.value))
            }
            className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#0E0C69]"
          >
            <option value="">Select Language</option>
            {languages.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
          </select>
          <div className="flex items-start  w-full gap-3 mt-3">
            <div className="">
              <input type="checkbox" className="mr-2" />
             
            </div>
            <span className="text-left "> Rather Not Say</span>
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
            placeholder="Search Ethnicities"
          />
           <div className="flex items-start  w-full gap-3 mt-3">
            <div className="">
              <input type="checkbox" className="mr-2" />
             
            </div>
            <span className="text-left "> Rather Not Say</span>
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
            placeholder="Search Races"
          />
         <div className="flex items-start  w-full gap-3 mt-3">
            <div className="">
              <input type="checkbox" className="mr-2" />
             
            </div>
            <span className="text-left "> Rather Not Say</span>
          </div>
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={goToNextStep}
            className="bg-[#0E0C69] text-white font-medium px-8 py-2 rounded-md hover:opacity-90 transition"
          >
            Continue
          </button>
          <p className="text-red-500 text-xs mt-2">* Required</p>
        </div>
      </div>
    </div>
  );
}
