"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import { useToast } from "@/context/ToastContext";
import PlanListItem from "@/components/PlanListItem";
import SortDropdown from "@/components/SortDropdown";
import SearchInput from "@/components/SearchInput";

const TABS = [
  { key: "plan", label: "Today's Plan" },
  { key: "saved", label: "Saved" },
];

export default function MyPlanPage() {
  const { plan, saved, hydrated, removeFromPlan, removeFromSaved, toggleDone } = usePlan();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");
  const [query, setQuery] = useState("");

  const metrics = useMemo(
    () => ({
      exercises: plan.length,
      minutes: plan.reduce((sum, w) => sum + w.duration, 0),
      calories: plan.reduce((sum, w) => sum + w.caloriesBurned, 0),
    }),
    [plan]
  );

  const activeList = activeTab === "plan" ? plan : saved;

  const visibleList = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? activeList.filter(
          (w) =>
            w.name.toLowerCase().includes(q) ||
            w.muscleGroups.some((tag) => tag.toLowerCase().includes(q))
        )
      : activeList;
    return [...filtered].sort((a, b) => b[sortBy] - a[sortBy]);
  }, [activeList, sortBy, query]);

  const handleRemove = (id) => {
    if (activeTab === "plan") {
      removeFromPlan(id);
      showToast("Removed from today's plan");
    } else {
      removeFromSaved(id);
      showToast("Removed from saved");
    }
  };

  const handleToggleDone = (id) => {
    toggleDone(id);
    showToast("Nice work — marked as done");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
        My Plan
      </h1>
      <p className="mt-1 text-sm text-white/50">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: "Exercises", value: metrics.exercises },
          { label: "Minutes", value: metrics.minutes },
          { label: "Calories", value: metrics.calories },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/10 bg-[#131317] px-4 py-4 text-center sm:text-left"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wide text-white/40 sm:text-xs">
              {stat.label}
            </p>
            <p className="font-display mt-1 text-2xl font-bold text-[#ccff00] sm:text-3xl">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2 rounded-full border border-white/10 bg-[#131317] p-1">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition sm:text-sm ${
                activeTab === tab.key
                  ? "bg-[#ccff00] text-black"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {tab.label} ({tab.key === "plan" ? plan.length : saved.length})
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchInput value={query} onChange={setQuery} placeholder="Search this list…" />
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>
      </div>

      <div className="mt-6">
        {!hydrated && (
          <div className="flex flex-col items-center justify-center gap-3 py-24 text-white/50">
            <Loader2 className="h-8 w-8 animate-spin text-[#ccff00]" />
            <p className="text-sm">Loading workouts…</p>
          </div>
        )}

        {hydrated && visibleList.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-[#131317] py-24 text-center">
            <h2 className="font-display text-lg font-bold uppercase tracking-wide text-white">
              Nothing here yet
            </h2>
            <p className="max-w-xs text-sm text-white/50">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="mt-3 rounded-full bg-[#ccff00] px-6 py-2.5 text-sm font-bold text-black"
            >
              Go to workouts
            </Link>
          </div>
        )}

        {hydrated && visibleList.length > 0 && (
          <div className="flex flex-col gap-3">
            {visibleList.map((workout) => (
              <PlanListItem
                key={workout.id}
                workout={workout}
                tab={activeTab}
                onRemove={handleRemove}
                onToggleDone={handleToggleDone}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
