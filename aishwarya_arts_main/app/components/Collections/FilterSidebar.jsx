"use client";

import React from "react";

// 1. Data Constants - Values MUST be lowercase to match normalized DB strings
const GOD = [
  "Amman", "Annamalai", "Annapoorni", "Baba", "Balaji",
  "Balaji Lakshmi", "Balaji Thayaar",
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
  { label: "Big Painting", value: "Big Painting" },
  { label: "Pooja Set", value: "Pooja Set" }
];

const DIMENSIONS = ["15x12", "18x14", "20x16", "24x18", "30x24", "36x24", "48x36", "60x36", "72x48", "Custom Size"];

export default function FilterSidebar({ selectedFilters, onFilterChange }) {
  // Helper to strip quotes and spaces for exact matching (e.g., "20" X 16"" -> 20x16)
  const clean = (str) => str?.toLowerCase().replace(/["\s]/g, "") || "";

  return (
    <aside
      aria-label="Product Filter Navigation"
      className="space-y-8 sticky top-28 h-[calc(100vh-120px)] overflow-y-auto pr-4 scrollbar-hide"
    >
      {/* 1. DEITY FILTER */}
      <FilterGroup title="Deity / God">
        <div
          className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar text-zinc-700"
          role="group"
          aria-label="Filter by Deity"
        >
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

      {/* 2. ART STYLE FILTER */}
      <FilterGroup title="Art Style / Type">
        <div
          className="flex flex-col gap-3"
          role="group"
          aria-label="Filter by Art Style"
        >
          {ART_STYLES.map((type) => (
            <FilterCheckbox
              key={type.value}
              label={type.label}
              checked={selectedFilters.workStyle.includes(type.value.toLowerCase())}
              onChange={() => onFilterChange("workStyle", type.value.toLowerCase())}
            />
          ))}
        </div>
      </FilterGroup>

      {/* 3. DIMENSIONS FILTER */}
      <FilterGroup title="Dimensions (Inches)">
        <div
          className="flex flex-col gap-3"
          role="group"
          aria-label="Filter by Dimensions"
        >
          {DIMENSIONS.map((size) => (
            <FilterCheckbox
              key={size}
              label={size}
              checked={selectedFilters.dimensions.some((d) => clean(d) === clean(size))}
              onChange={() => onFilterChange("dimensions", size.toLowerCase())}
            />
          ))}
        </div>
      </FilterGroup>
    </aside>
  );
}

/* ================= REUSABLE SUB-COMPONENTS ================= */

const FilterCheckbox = ({ label, checked, onChange }) => (
  <label className="flex items-center justify-between cursor-pointer group py-1.5 focus-within:ring-2 focus-within:ring-amber-600 rounded-md px-1">
    <div className="flex items-center gap-3">
      <div
        className={`w-4 h-4 rounded border transition-all flex items-center justify-center shrink-0
        ${checked
            ? "bg-amber-800 border-amber-800 shadow-xs"
            : "border-zinc-300 group-hover:border-amber-600 bg-white"
          }`}
        aria-hidden="true"
      >
        {checked && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
        aria-label={`Filter by ${label}`}
      />
      <span
        className={`text-sm tracking-wide transition-colors font-medium ${checked ? "text-amber-900 font-bold" : "text-zinc-700 group-hover:text-zinc-900"}`}
      >
        {label}
      </span>
    </div>
    {checked && (
      <div className="w-1.5 h-1.5 rounded-full bg-amber-800 animate-pulse" aria-hidden="true" />
    )}
  </label>
);

const FilterGroup = ({ title, children }) => (
  <div className="border-b border-zinc-100 pb-6">
    <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-900 mb-4 font-cinzel">
      {title}
    </h3>
    <div className="flex flex-col gap-2.5">{children}</div>
  </div>
);