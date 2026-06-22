import React from "react";

// 1. Data Constants - Values MUST be lowercase to match normalized DB strings
const GOD = [
  "Amman", "Annamalai", "Annapoorni", "Baba", "Balaji", 
  "Balaji Lakshmi", "Balaji Thaayar", "Balaji Thayaar", 
  "Datchnamoorthy", "Dhanvanthri", "Durga Devi", 
  "GajaLakshmi", "Ganesha", "Gayathri Devi", "Guruvayurappan", 
  "Hanuman", "Kamadenu", "Kamatchi amman", "Krishna", 
  "Lakshmi", "Lakshmi Narayana", "Lalitha Devi", 
  "Maha Mariamman", "Meenakshi", "Murugan", "Narashimar", 
  "Pooja Set Painting", "Raja Raja Rajeshwari", "Ramar", 
  "Ratha krishnan", "Renuga Devi", "Saraswathi", 
  "Sathya Narayana", "Shiva Family", "Vishwa Brahma", "Andaal"
];

const ART_STYLES = [
  { label: "3D Embossed", value: "embossed" },
  { label: "2D", value: "2d" },
  { label: "Flat Type", value: "flat" },
  { label:"Big Painting", value:"Big Painting"},
  { label: "Pooja Set", value:"Pooja Set"}
];

const DIMENSIONS = ["15x12", "18x14", "20x16", "24x18", "30x24", "36x24", "48x36","60x36", "72x48", "Custom Size"];

const FilterSidebar = ({ selectedFilters, onFilterChange }) => {
  // Helper to strip quotes and spaces for exact matching (e.g., "20" X 16"" -> 20x16)
  const clean = (str) => str?.toLowerCase().replace(/["\s]/g, "") || "";

  return (
    <div className="space-y-10 sticky top-28 h-[calc(100vh-120px)] overflow-y-auto pr-4 scrollbar-hide">
      {/* 1. DEITY FILTER */}
      <FilterGroup title="GOD">
        <div className="flex flex-col gap-3.5 max-h-64 overflow-y-auto pr-2 custom-scrollbar text-black">
          {GOD.map((god) => (
            <FilterCheckbox
              key={god}
              label={god}
              checked={selectedFilters.godName.includes(god.toLowerCase())}
              onChange={() => onFilterChange("godName", god.toLowerCase())}
            />
          ))}
        </div>
      </FilterGroup>

      {/* 2. ART STYLE FILTER - Ensuring strictly lowercase matching */}
      <FilterGroup title="Art Style / Type">
        {ART_STYLES.map((type) => (
          <FilterCheckbox
            key={type.value}
            label={type.label}
            checked={selectedFilters.workStyle.includes(
              type.value.toLowerCase(),
            )}
            onChange={() =>
              onFilterChange("workStyle", type.value.toLowerCase())
            }
          />
        ))}
      </FilterGroup>

      {/* 3. DIMENSIONS FILTER - Using 'clean' helper to match DB strings with quotes */}
      <FilterGroup title="Dimensions (Inches)">
        {DIMENSIONS.map((size) => (
          <FilterCheckbox
            key={size}
            label={size}
            checked={selectedFilters.dimensions.some(
              (d) => clean(d) === clean(size),
            )}
            onChange={() => onFilterChange("dimensions", size.toLowerCase())}
          />
        ))}
      </FilterGroup>
    </div>
  );
};

/* ================= REUSABLE SUB-COMPONENTS ================= */

const FilterCheckbox = ({ label, checked, onChange }) => (
  <label className="flex items-center justify-between cursor-pointer group py-1">
    <div className="flex items-center gap-3">
      <div
        className={`w-4 h-4 rounded border transition-all flex items-center justify-center
        ${
          checked
            ? "bg-amber-800 border-amber-800"
            : "border-gray-300 group-hover:border-amber-600 bg-white"
        }`}
      >
        {checked && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <span
        className={`text-sm tracking-wide transition-colors ${checked ? "text-amber-900 font-bold" : "text-zinc-900 group-hover:text-black"}`}
      >
        {label}
      </span>
    </div>
    {checked && (
      <div className="w-1 h-1 rounded-full bg-amber-800 animate-pulse" />
    )}
  </label>
);

const FilterGroup = ({ title, children }) => (
  <div className="border-b border-gray-100 pb-8">
    <h2 className="text-md uppercase tracking-[0.15em] font-bold text-black mb-5">
      {title}
    </h2>
    <div className="flex flex-col gap-3.5">{children}</div>
  </div>
);

export default FilterSidebar;
