"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Workout } from "@/../lib/types";

type PlanWorkout = Workout & { done: boolean };

type FitLogContextValue = {
  plan: PlanWorkout[];
  saved: Workout[];
  hydrated: boolean;
  addToPlan: (workout: Workout) => boolean;
  removeFromPlan: (workoutId: number) => void;
  markDone: (workoutId: number) => void;
  addToSaved: (workout: Workout) => boolean;
  removeFromSaved: (workoutId: number) => void;
  isInPlan: (workoutId: number) => boolean;
  isSaved: (workoutId: number) => boolean;
};

const FitLogContext = createContext<FitLogContextValue | null>(null);

const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";

export function FitLogProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<PlanWorkout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedPlan = localStorage.getItem(PLAN_KEY);
      const savedSaved = localStorage.getItem(SAVED_KEY);

      if (savedPlan) {
        const parsedPlan = JSON.parse(savedPlan) as PlanWorkout[];
        setPlan(parsedPlan.slice(0, 5));
      }

      if (savedSaved) {
        setSaved(JSON.parse(savedSaved) as Workout[]);
      }
    } catch (error) {
      console.error("Could not load FitLog data", error);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  }, [plan, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved, hydrated]);

  const addToPlan = useCallback((workout: Workout) => {
    const canAdd = plan.length < 5 && !plan.some((item) => item.id === workout.id);
    if (!canAdd) return false;

    setPlan((current) => {
      if (current.length >= 5 || current.some((item) => item.id === workout.id)) {
        return current;
      }
      return [...current, { ...workout, done: false }];
    });

    return true;
  }, [plan]);

  const removeFromPlan = useCallback((workoutId: number) => {
    setPlan((current) => current.filter((item) => item.id !== workoutId));
  }, []);

  const markDone = useCallback((workoutId: number) => {
    setPlan((current) =>
      current.map((item) =>
        item.id === workoutId ? { ...item, done: true } : item,
      ),
    );
  }, []);

  const addToSaved = useCallback((workout: Workout) => {
    const canAdd = !saved.some((item) => item.id === workout.id);
    if (!canAdd) return false;

    setSaved((current) => {
      if (current.some((item) => item.id === workout.id)) return current;
      return [...current, workout];
    });

    return true;
  }, [saved]);

  const removeFromSaved = useCallback((workoutId: number) => {
    setSaved((current) => current.filter((item) => item.id !== workoutId));
  }, []);

  const isInPlan = useCallback(
    (workoutId: number) => plan.some((item) => item.id === workoutId),
    [plan],
  );

  const isSaved = useCallback(
    (workoutId: number) => saved.some((item) => item.id === workoutId),
    [saved],
  );

  const value = useMemo(
    () => ({
      plan,
      saved,
      hydrated,
      addToPlan,
      removeFromPlan,
      markDone,
      addToSaved,
      removeFromSaved,
      isInPlan,
      isSaved,
    }),
    [
      plan,
      saved,
      hydrated,
      addToPlan,
      removeFromPlan,
      markDone,
      addToSaved,
      removeFromSaved,
      isInPlan,
      isSaved,
    ],
  );

  return <FitLogContext.Provider value={value}>{children}</FitLogContext.Provider>;
}

export function useFitLog() {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error("useFitLog must be used inside FitLogProvider");
  }

  return context;
}
