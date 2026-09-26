"use client";

import { ChevronDown } from "lucide-react";

const OPTIONS = [
  { value: "duration", label: "Duration" },
  { value: "caloriesBurned", label: "Calories" },
  { value: "rating", label: "Rating" },
];

export default function SortDropdown({ value, onChange }) {
  return (
    <div className="flex items-center gap-2 text-xs text-white/60">
      <span className="hidden sm:inline">Sort By</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Sort by"
          className="appearance-none rounded-full border border-white/15 bg-[#131317] py-1.5 pl-3 pr-8 text-xs font-semibold text-white outline-none transition hover:border-white/30 focus:border-[#ccff00]"
        >
          {OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#131317]">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/50" />
      </div>
    </div>
  );
}
