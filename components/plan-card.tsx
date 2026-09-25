"use client";

import Link from "next/link";
import { Check, Clock3, Flame, Star, X } from "lucide-react";
import toast from "react-hot-toast";
import type { Workout } from "@/../lib/types";
import { useFitLog } from "@/../context/fit-log-context";

export default function PlanCard({ workout, done = false, savedMode = false }: { workout: Workout; done?: boolean; savedMode?: boolean }) {
  const { removeFromPlan, markDone, removeFromSaved } = useFitLog();

  const handleRemove = () => {
    if (savedMode) {
      removeFromSaved(workout.id);
      toast.success("Removed from saved workouts");
    } else {
      removeFromPlan(workout.id);
      toast.success("Removed from today's plan");
    }
  };

  const handleDone = () => {
    markDone(workout.id);
    toast.success("Workout marked as done");
  };

  return (
    <article className={`border border-white/10 bg-[#0b0d0b] p-3 sm:p-4 ${done ? "opacity-65" : ""}`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="h-28 w-full shrink-0 overflow-hidden bg-black sm:h-24 sm:w-36">
          <img src={workout.image} alt={workout.name} className="h-full w-full object-cover" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">{savedMode ? "Saved for later" : done ? "Completed" : "Today's plan"}</p>
              <h3 className={`display-title mt-1 text-2xl tracking-wide ${done ? "line-through" : ""}`}>{workout.name}</h3>
              <p className="mt-1 text-sm text-zinc-500">{workout.equipment}</p>
            </div>
            <button
              type="button"
              aria-label={`Remove ${workout.name}`}
              onClick={handleRemove}
              className="grid h-9 w-9 shrink-0 place-items-center border border-white/10 text-zinc-500 transition hover:border-red-500/40 hover:text-red-300"
            >
              <X size={16} />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5"><Clock3 size={14} /> {workout.duration} min</span>
            <span className="flex items-center gap-1.5"><Flame size={14} /> {workout.caloriesBurned} kcal</span>
            <span className="flex items-center gap-1.5"><Star size={14} /> {workout.rating}</span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Link href={`/workout/${workout.id}`} className="btn-secondary px-4 py-2 text-xs">
              VIEW DETAILS
            </Link>
            {!savedMode && !done ? (
              <button type="button" onClick={handleDone} className="btn-primary px-4 py-2 text-xs">
                <Check size={14} /> MARK AS DONE
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
