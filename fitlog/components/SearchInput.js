"use client";

import { Search } from "lucide-react";

export default function SearchInput({ value, onChange, placeholder = "Search…" }) {
  return (
    <div className="relative w-full sm:w-64">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-white/15 bg-[#131317] py-2 pl-9 pr-4 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-[#ccff00]"
      />
    </div>
  );
}
