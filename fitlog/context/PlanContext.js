"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const PlanContext = createContext(null);

const STORAGE_KEY = "fitlog:plan-state:v1";
const PLAN_CAP = 5;

function loadInitialState() {
  if (typeof window === "undefined") {
    return { plan: [], saved: [] };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { plan: [], saved: [] };
    const parsed = JSON.parse(raw);
    return {
      plan: Array.isArray(parsed.plan) ? parsed.plan : [],
      saved: Array.isArray(parsed.saved) ? parsed.saved : [],
    };
  } catch {
    return { plan: [], saved: [] };
  }
}

export function PlanProvider({ children }) {
  const [hydrated, setHydrated] = useState(false);
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    const initial = loadInitialState();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage on mount
    setPlan(initial.plan);
    setSaved(initial.saved);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ plan, saved }));
  }, [plan, saved, hydrated]);

  const isInPlan = (id) => plan.some((w) => w.id === id);
  const isInSaved = (id) => saved.some((w) => w.id === id);
  const isPlanFull = plan.length >= PLAN_CAP;

  const addToPlan = (workout) => {
    if (isInPlan(workout.id) || isPlanFull) return false;
    setPlan((prev) => [...prev, { ...workout, done: false }]);
    return true;
  };

  const addToSaved = (workout) => {
    if (isInSaved(workout.id)) return false;
    setSaved((prev) => [...prev, { ...workout }]);
    return true;
  };

  const removeFromPlan = (id) => setPlan((prev) => prev.filter((w) => w.id !== id));
  const removeFromSaved = (id) => setSaved((prev) => prev.filter((w) => w.id !== id));

  const toggleDone = (id) =>
    setPlan((prev) => prev.map((w) => (w.id === id ? { ...w, done: !w.done } : w)));

  const value = useMemo(
    () => ({
      plan,
      saved,
      hydrated,
      planCap: PLAN_CAP,
      isPlanFull,
      isInPlan,
      isInSaved,
      addToPlan,
      addToSaved,
      removeFromPlan,
      removeFromSaved,
      toggleDone,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [plan, saved, hydrated]
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within a PlanProvider");
  return ctx;
}
