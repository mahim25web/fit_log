"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Bookmark, BookmarkCheck, Clock, Flame, Loader2, Plus, Star } from "lucide-react";
import { fetchWorkoutById } from "@/lib/api";
import { usePlan } from "@/context/PlanContext";
import { useToast } from "@/context/ToastContext";
import { TagPill } from "@/components/WorkoutCard";

const SPEC_ROWS = [
  { label: "Equipment", key: "equipment" },
  { label: "Difficulty", key: "difficulty" },
  { label: "Sets", key: "sets" },
  { label: "Reps", key: "reps" },
  { label: "Duration", key: "duration", suffix: " min" },
  { label: "Calories", key: "caloriesBurned", suffix: " kcal" },
  { label: "Rating", key: "rating" },
];

export default function WorkoutDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToPlan, addToSaved, isInPlan, isInSaved, isPlanFull } = usePlan();
  const { showToast } = useToast();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- resetting state for a new [id] param before refetching
    setLoading(true);
    setNotFound(false);
    fetchWorkoutById(id)
      .then((data) => {
        if (!active) return;
        if (!data || data.error) {
          setNotFound(true);
        } else {
          setWorkout(data);
        }
      })
      .catch(() => {
        if (active) setNotFound(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-32 text-white/50">
        <Loader2 className="h-8 w-8 animate-spin text-[#ccff00]" />
        <p className="text-sm">Loading workout…</p>
      </div>
    );
  }

  if (notFound || !workout) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-32 text-center">
        <h1 className="font-display text-2xl font-bold uppercase text-white">
          Workout not found
        </h1>
        <p className="text-sm text-white/50">
          That lift doesn&apos;t exist in the library. Head back and pick another one.
        </p>
        <Link
          href="/"
          className="mt-2 rounded-full bg-[#ccff00] px-6 py-2.5 text-sm font-bold text-black"
        >
          Go to workouts
        </Link>
      </div>
    );
  }

  const alreadyInPlan = isInPlan(workout.id);
  const alreadyInSaved = isInSaved(workout.id);

  const handleAddToPlan = () => {
    if (alreadyInPlan) return;
    const added = addToPlan(workout);
    if (added) {
      showToast("Added to today's plan");
    } else if (isPlanFull) {
      showToast("Today's plan is full — finish or remove a lift first");
    }
  };

  const handleSave = () => {
    if (alreadyInSaved) return;
    const added = addToSaved(workout);
    if (added) showToast("Saved for later");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-1.5 text-sm font-medium text-white/50 transition hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="aspect-square w-full overflow-hidden rounded-3xl border border-white/10 bg-[#131317] lg:aspect-auto lg:h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={workout.image}
            alt={workout.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <h1 className="font-display text-3xl font-bold uppercase leading-tight text-white sm:text-4xl">
            {workout.name}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">
            {workout.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {workout.muscleGroups.map((tag, i) => (
              <TagPill key={tag} label={tag} index={i} />
            ))}
          </div>

          <div className="mt-6 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-[#131317]">
            {SPEC_ROWS.map((row) => (
              <div
                key={row.key}
                className="flex items-center justify-between px-4 py-2.5 text-sm"
              >
                <span className="font-semibold uppercase tracking-wide text-white/40">
                  {row.label}
                </span>
                <span className="font-medium text-white">
                  {workout[row.key]}
                  {row.suffix || ""}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h2 className="font-display text-lg font-bold uppercase tracking-wide text-white">
              Instructions
            </h2>
            <ol className="mt-3 flex flex-col gap-3">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-white/70">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-xs font-bold text-black">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleAddToPlan}
              disabled={alreadyInPlan || isPlanFull}
              className="flex items-center justify-center gap-2 rounded-full bg-[#ccff00] px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus className="h-4 w-4" />
              {alreadyInPlan ? "Already in plan" : "Add to today's plan"}
            </button>
            <button
              onClick={handleSave}
              disabled={alreadyInSaved}
              className="flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:border-white/50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {alreadyInSaved ? (
                <BookmarkCheck className="h-4 w-4" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
              {alreadyInSaved ? "Saved" : "Save for later"}
            </button>
          </div>

          <div className="mt-4 flex items-center gap-4 text-xs text-white/40">
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
      </div>
    </div>
  );
}
