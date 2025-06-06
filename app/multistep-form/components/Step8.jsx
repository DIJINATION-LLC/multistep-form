"use client";
import React, { useState } from "react";
import { useStep } from "@/app/multistep-form/context/Context";
import StepHeader from "./StepHeader";

const ethnicityOptions = ["Central American", "Mexican", "Asian", "African American", "Other"];
const raceOptions = ["White", "Black", "Asian", "Hispanic", "Other"];

const MultiSelect = ({ selected, setSelected, options, placeholder }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelect = (value) => {
    if (!selected.includes(value)) {
      setSelected([...selected, value]);
    }
  };

  const handleRemove = (value) => {
    setSelected(selected.filter((item) => item !== value));
  };

  return (
    <div className="relative">
      <div
        className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-[48px] flex flex-wrap items-center gap-2 cursor-pointer"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {selected.length === 0 && (
          <span className="text-gray-400">{placeholder}</span>
        )}
        {selected.map((item, idx) => (
          <span
            key={idx}
            className="bg-[#B9EAFF] text-[#0E0C69] px-3 py-1 rounded-full flex items-center"
          >
            {item}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(item);
              }}
              className="ml-2 bg-black text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
            >
              ✕
            </button>
          </span>
        ))}
      </div>

      {showDropdown && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md max-h-40 overflow-y-auto">
          {options
            .filter((item) => !selected.includes(item))
            .map((item, idx) => (
              <li
                key={idx}
                onClick={() => handleSelect(item)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                {item}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default function Step8() {
  const { setCurrentStep } = useStep();

  const [language, setLanguage] = useState("English");
  const [ethnicity, setEthnicity] = useState(["Central American"]);
  const [race, setRace] = useState(["White"]);

  const goToNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <div className="w-full h-full flex flex-col py-6  items-center px-4 sm:px-10 text-center">
     <StepHeader />

      <div className="w-full max-w-xl text-left">
        <h2 className="text-lg font-semibold text-[#0E0C69] mb-2">
          Demographics
        </h2>
        <hr className="mb-4 border-gray-300" />

        {/* Occupation */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Occupation</label>
          <select className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#0E0C69]">
            <option>Select Occupation</option>
            <option>Engineer</option>
            <option>Teacher</option>
            <option>Other</option>
          </select>
        </div>

        {/* Language */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Language <span className="text-red-500">*</span>
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#0E0C69]"
          >
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input type="checkbox" className="mr-2" />
              Rather Not Say
            </label>
          </div>
        </div>

        {/* Ethnicity */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Ethnicity <span className="text-red-500">*</span>
          </label>
          <MultiSelect
            selected={ethnicity}
            setSelected={setEthnicity}
            options={ethnicityOptions}
            placeholder="Search"
          />
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input type="checkbox" className="mr-2" />
              Rather Not Say
            </label>
          </div>
        </div>

        {/* Race */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Race <span className="text-red-500">*</span>
          </label>
          <MultiSelect
            selected={race}
            setSelected={setRace}
            options={raceOptions}
            placeholder="Search"
          />
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input type="checkbox" className="mr-2" />
              Rather Not Say
            </label>
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
