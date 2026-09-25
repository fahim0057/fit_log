"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import WorkoutCard from "@/../components/workout-card";
import { SectionTitle, Spinner } from "@/../components/ui";
import type { SortOption, Workout } from "@/../lib/types";

function sortWorkouts(items: Workout[], sortBy: SortOption) {
  return [...items].sort((a, b) => {
    if (sortBy === "duration") return a.duration - b.duration;
    if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
    return b.rating - a.rating;
  });
}

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadWorkouts() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("https://api.abcz.workers.dev/api/fitlog", {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Could not load workouts.");
        }

        const data = (await response.json()) as Workout[];
        setWorkouts(data);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
    return () => controller.abort();
  }, []);

  const visibleWorkouts = useMemo(() => {
    const q = query.trim().toLowerCase();

    const filtered = !q
      ? workouts
      : workouts.filter((workout) =>
          workout.name.toLowerCase().includes(q) ||
          workout.muscleGroups.some((group) => group.toLowerCase().includes(q)),
        );

    return sortWorkouts(filtered, sortBy);
  }, [workouts, query, sortBy]);

  return (
    <section id="library" className="site-shell scroll-mt-24 pb-20 lg:pb-28">
      <SectionTitle
        eyebrow="12 MOVEMENTS"
        title="THE LIBRARY"
        subtitle="Twelve lifts covering every major muscle group."
      />

      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <label className="flex min-h-11 flex-1 items-center gap-2 border border-white/10 bg-[#0b0d0b] px-3 lg:max-w-md">
          <Search size={16} className="text-zinc-500" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search workouts or muscle groups"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-700"
          />
        </label>

        <label className="flex min-h-11 items-center gap-2 border border-white/10 bg-[#0b0d0b] px-3">
          <SlidersHorizontal size={16} className="text-zinc-500" />
          <span className="text-xs uppercase tracking-[0.12em] text-zinc-600">Sort By</span>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as SortOption)}
            className="bg-transparent text-sm text-white outline-none"
          >
            <option className="bg-black" value="duration">Duration</option>
            <option className="bg-black" value="calories">Calories</option>
            <option className="bg-black" value="rating">Rating</option>
          </select>
        </label>
      </div>

      {loading ? (
        <div className="grid min-h-80 place-items-center border border-white/10 bg-[#0b0d0b]">
          <div className="flex flex-col items-center gap-3 text-zinc-500">
            <Spinner />
            <p className="text-sm uppercase tracking-[0.14em]">Loading workouts…</p>
          </div>
        </div>
      ) : error ? (
        <div className="border border-red-500/20 bg-red-500/5 p-6 text-sm text-red-300">
          {error} Refresh the page and try again.
        </div>
      ) : visibleWorkouts.length === 0 ? (
        <div className="border border-white/10 bg-[#0b0d0b] p-10 text-center text-zinc-500">
          No workouts matched your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visibleWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}
