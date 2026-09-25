"use client";

"use client";

import { SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import WorkoutCard from "@/../components/workout-card";
import { SectionTitle, Spinner } from "@/../components/ui";
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
    className="mx-auto w-full max-w-[1280px] scroll-mt-24 px-6 pb-20 pt-8 lg:pb-24"
  >
    {/* Header */}
    <div className="mb-6 flex items-end justify-between">
      <SectionTitle
        title="THE LIBRARY"
        subtitle="Twelve lifts covering every major muscle group."
      />

      {/* Sort */}
      <label className="mb-1 flex h-8 items-center gap-2 rounded border border-white/10 bg-[#0B0D0B] px-3">
        <SlidersHorizontal
          size={13}
          className="text-[#7F857D]"
        />

        <span className="text-[10px] uppercase tracking-[0.12em] text-[#7F857D]">
          Sort By
        </span>

        <select
          value={sortBy}
          onChange={(event) =>
            setSortBy(event.target.value as SortOption)
          }
          className="bg-transparent text-[10px] font-semibold text-white outline-none"
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

    {/* Loading */}
    {loading && (
      <div className="grid min-h-[300px] place-items-center rounded-lg border border-white/10 bg-[#0B0D0B]">
        <div className="flex flex-col items-center gap-3 text-[#7F857D]">
          <Spinner />

          <p className="text-xs uppercase tracking-[0.14em]">
            Loading workouts…
          </p>
        </div>
      </div>
    )}

    {/* Error */}
    {!loading && error && (
      <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-6 text-sm text-red-300">
        {error}
      </div>
    )}

    {/* Cards */}
    {!loading && !error && (
      <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
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