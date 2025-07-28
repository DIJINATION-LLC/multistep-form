"use client";
import React, { useState, useRef, useEffect } from "react";

export default function SearchableSelect({
  options,
  value,
  onChange,
  placeholder,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);

  const filteredOptions = options.filter((opt) =>
    opt.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectOption = (opt) => {
    onChange(opt.code || opt.id); // occupation has code, language has id
    setIsOpen(false);
    setSearch("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedName =
    options.find((opt) => opt.code === value || opt.id === value)?.name || "";

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div
        className="border border-gray-300 rounded-md px-4 py-2 bg-white cursor-pointer focus:ring-2 focus:ring-[#0E0C69] text-sm"
        onClick={toggleDropdown}
      >
        {selectedName || <span className="text-gray-400">{placeholder}</span>}
      </div>

      {isOpen && (
        <div className="absolute z-20 w-full bg-white mt-1 border border-gray-300 rounded-md shadow-lg max-h-64 overflow-y-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 border-b border-gray-200 text-sm focus:outline-none"
            placeholder="Search..."
          />
          <ul className="max-h-48 overflow-y-auto">
            {filteredOptions.slice(0, 120).map((opt) => (
              <li
                key={opt.code || opt.id}
                onClick={() => selectOption(opt)}
                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              >
                {opt.name}
              </li>
            ))}
            {filteredOptions.length === 0 && (
              <li className="px-4 py-2 text-sm text-gray-400">No results</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
