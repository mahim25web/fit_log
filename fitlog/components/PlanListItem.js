"use client";

import Link from "next/link";
import { CheckCircle2, Clock, Flame, Star, X } from "lucide-react";

export default function PlanListItem({ workout, tab, onRemove, onToggleDone }) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#131317] p-4 sm:flex-row sm:items-center ${
        workout.done ? "opacity-60" : ""
      }`}
    >
      <div className="h-20 w-full shrink-0 overflow-hidden rounded-xl bg-[#0a0a0c] sm:h-16 sm:w-24">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3
          className={`font-display text-sm font-bold uppercase tracking-wide text-white ${
            workout.done ? "line-through" : ""
          }`}
        >
          {workout.name}
        </h3>
        <p className="text-xs text-white/50">{workout.equipment}</p>
        <div className="mt-1.5 flex items-center gap-3 text-xs text-white/60">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-[#ccff00]" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame className="h-3.5 w-3.5 text-[#ccff00]" />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-[#ccff00]" />
            {workout.rating}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <Link
          href={`/workout/${workout.id}`}
          className="rounded-full border border-white/25 px-3 py-1.5 text-xs font-semibold text-white transition hover:border-white/50"
        >
          View Details
        </Link>
        {tab === "plan" && (
          <button
            onClick={() => onToggleDone(workout.id)}
            className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              workout.done
                ? "border border-[#ccff00]/50 text-[#ccff00]"
                : "bg-[#ccff00] text-black hover:brightness-95"
            }`}
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            {workout.done ? "Done" : "Mark as Done"}
          </button>
        )}
        <button
          onClick={() => onRemove(workout.id)}
          aria-label={`Remove ${workout.name}`}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 text-white/50 transition hover:border-red-400/50 hover:text-red-400"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
