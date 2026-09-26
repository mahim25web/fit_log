"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { fetchWorkouts } from "@/lib/api";

const WorkoutsContext = createContext(null);

export function WorkoutsProvider({ children }) {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    fetchWorkouts()
      .then((data) => {
        if (active) setWorkouts(data);
      })
      .catch((err) => {
        if (active) setError(err.message || "Something went wrong");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <WorkoutsContext.Provider value={{ workouts, loading, error }}>
      {children}
    </WorkoutsContext.Provider>
  );
}

export function useWorkouts() {
  const ctx = useContext(WorkoutsContext);
  if (!ctx) throw new Error("useWorkouts must be used within a WorkoutsProvider");
  return ctx;
}

