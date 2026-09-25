"use client";

import { Check, BookmarkPlus, ListPlus } from "lucide-react";
import toast from "react-hot-toast";
import type { Workout } from "@/../lib/types";
import { useFitLog } from "@/../context/fit-log-context";

export default function WorkoutActions({ workout }: { workout: Workout }) {
  const { plan, addToPlan, addToSaved, isInPlan, isSaved, hydrated } = useFitLog();
  const inPlan = hydrated && isInPlan(workout.id);
  const saved = hydrated && isSaved(workout.id);
  const planFull = hydrated && plan.length >= 5 && !inPlan;

  const handleAddToPlan = () => {
    const added = addToPlan(workout);

    if (added) {
      toast.success("Added to today's plan");
      return;
    }

    if (inPlan) {
      toast("This workout is already in today's plan");
    } else {
      toast.error("Today's plan is full. Maximum 5 lifts.");
    }
  };

  const handleSave = () => {
    const added = addToSaved(workout);
    toast(added ? "Saved for later" : "This workout is already saved");
  };

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={handleAddToPlan}
        disabled={!hydrated || inPlan || planFull}
        className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
      >
        {inPlan ? <Check size={16} /> : <ListPlus size={16} />}
        {!hydrated ? "LOADING…" : inPlan ? "ADDED TO PLAN" : planFull ? "PLAN FULL (5/5)" : "ADD TO TODAY'S PLAN"}
      </button>
      <button
        type="button"
        onClick={handleSave}
        disabled={saved}
        className="btn-secondary disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saved ? <Check size={16} /> : <BookmarkPlus size={16} />}
        {saved ? "SAVED" : "SAVE FOR LATER"}
      </button>
    </div>
  );
}
