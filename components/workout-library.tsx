"use client";

import { SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import WorkoutCard from "@/../components/workout-card";
import { Spinner } from "@/../components/ui";
import type { SortOption, Workout } from "@/../lib/types";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

const sortWorkouts = (
  workouts: Workout[],
  sortBy: SortOption,
): Workout[] => {
  return [...workouts].sort((a, b) => {
    switch (sortBy) {
      case "duration":
        return a.duration - b.duration;

      case "calories":
        return b.caloriesBurned - a.caloriesBurned;

      case "rating":
        return b.rating - a.rating;

      default:
        return 0;
    }
  });
};

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadWorkouts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_URL, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Could not load workouts.");
        }

        const data: Workout[] = await response.json();

        setWorkouts(data);
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();

    return () => controller.abort();
  }, []);

  const sortedWorkouts = useMemo(() => {
    return sortWorkouts(workouts, sortBy);
  }, [workouts, sortBy]);

  return (
    <section
      id="library"
      className="site-shell scroll-mt-24 px-6 pb-20 pt-4 sm:pb-24 lg:pb-28"
    >
      {/* ================= HEADER ================= */}
      <div className="mb-8 flex flex-col gap-6 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C2F800]">
            12 MOVEMENTS
          </p>

          <h2 className="display-title mt-2 text-4xl uppercase leading-none tracking-tight text-white sm:text-5xl">
            THE LIBRARY
          </h2>

          <p className="mt-3 text-sm text-[#7F857D] sm:text-base">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* ================= SORT ================= */}
        <label className="flex h-10 items-center gap-2 border border-white/10 bg-[#0B0D0B] px-3">
          <SlidersHorizontal
            size={15}
            className="text-[#7F857D]"
          />

          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#7F857D]">
            Sort By
          </span>

          <select
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value as SortOption)
            }
            className="cursor-pointer bg-transparent text-xs font-semibold text-white outline-none"
            aria-label="Sort workouts"
          >
            <option
              value="duration"
              className="bg-[#0B0D0B]"
            >
              Duration
            </option>

            <option
              value="calories"
              className="bg-[#0B0D0B]"
            >
              Calories
            </option>

            <option
              value="rating"
              className="bg-[#0B0D0B]"
            >
              Rating
            </option>
          </select>
        </label>
      </div>

      {/* ================= LOADING ================= */}
      {loading && (
        <div className="grid min-h-[320px] place-items-center border border-white/10 bg-[#0B0D0B]">
          <div className="flex flex-col items-center gap-3 text-[#7F857D]">
            <Spinner />

            <p className="text-xs font-semibold uppercase tracking-[0.16em]">
              Loading workouts…
            </p>
          </div>
        </div>
      )}

      {/* ================= ERROR ================= */}
      {!loading && error && (
        <div className="border border-red-500/20 bg-red-500/5 p-6 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* ================= WORKOUT GRID ================= */}
      {!loading && !error && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedWorkouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
            />
          ))}
        </div>
      )}
    </section>
  );
}