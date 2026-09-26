"use client";

import { useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import SortDropdown from "@/components/SortDropdown";
import SearchInput from "@/components/SearchInput";
import { useWorkouts } from "@/context/WorkoutsContext";

export default function HomePage() {
  const { workouts, loading, error } = useWorkouts();
  const [sortBy, setSortBy] = useState("duration");
  const [query, setQuery] = useState("");

  const visibleWorkouts = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? workouts.filter(
          (w) =>
            w.name.toLowerCase().includes(q) ||
            w.muscleGroups.some((tag) => tag.toLowerCase().includes(q))
        )
      : workouts;

    return [...filtered].sort((a, b) => b[sortBy] - a[sortBy]);
  }, [workouts, sortBy, query]);

  return (
    <>
      <Hero />

      <section id="library" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-white sm:text-3xl">
              The Library
            </h2>
            <p className="mt-1 text-sm text-white/50">
              Twelve lifts covering every major muscle group.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <SearchInput value={query} onChange={setQuery} placeholder="Search by name or tag…" />
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>
        </div>

        <div className="mt-8">
          {loading && (
            <div className="flex flex-col items-center justify-center gap-3 py-24 text-white/50">
              <Loader2 className="h-8 w-8 animate-spin text-[#ccff00]" />
              <p className="text-sm">Loading workouts…</p>
            </div>
          )}

          {!loading && error && (
            <div className="flex flex-col items-center justify-center gap-2 py-24 text-center text-white/60">
              <p className="text-sm font-semibold text-white">Couldn&apos;t load the library.</p>
              <p className="text-xs">{error}</p>
            </div>
          )}

          {!loading && !error && visibleWorkouts.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-2 py-24 text-center text-white/60">
              <p className="text-sm font-semibold text-white">No workouts match your search.</p>
              <p className="text-xs">Try a different name or muscle group.</p>
            </div>
          )}

          {!loading && !error && visibleWorkouts.length > 0 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visibleWorkouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
