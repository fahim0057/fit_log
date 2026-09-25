"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useFitLog } from "@/../context/fit-log-context";
import type { SortOption } from "@/../lib/types";
import Metrics from "@/../components/metrics";
import PlanCard from "@/../components/plan-card";
import { Spinner } from "@/../components/ui";
import Link from "next/link";

export default function MyPlanContent() {
  const { plan, saved, hydrated } = useFitLog();
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [query, setQuery] = useState("");

  const minutes = plan.reduce((sum, item) => sum + item.duration, 0);
  const calories = plan.reduce((sum, item) => sum + item.caloriesBurned, 0);

  const items = useMemo(() => {
    const source = activeTab === "plan" ? plan : saved;
    const q = query.trim().toLowerCase();

    const filtered = source.filter((item) => {
      if (!q) return true;
      return item.name.toLowerCase().includes(q) || item.muscleGroups.some((group) => group.toLowerCase().includes(q));
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "duration") return a.duration - b.duration;
      if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
      return b.rating - a.rating;
    });
  }, [activeTab, plan, saved, query, sortBy]);

  if (!hydrated) {
    return (
      <main className="site-shell flex min-h-[60vh] items-center justify-center py-24">
        <div className="flex flex-col items-center gap-3 text-zinc-500">
          <Spinner />
          <p className="text-sm uppercase tracking-[0.14em]">Loading workouts…</p>
        </div>
      </main>
    );
  }

  return (
    <main className="site-shell py-10 sm:py-14 lg:py-16">
      <div className="max-w-3xl">
        <p className="eyebrow">TRAINING LOG</p>
        <h1 className="display-title mt-3 text-5xl uppercase leading-none sm:text-7xl">MY PLAN</h1>
        <p className="mt-4 text-sm leading-6 text-zinc-500 sm:text-base">Cap of five lifts for today. Finish them, then load more.</p>
      </div>

      <div className="mt-9">
        <Metrics exercises={plan.length} minutes={minutes} calories={calories} />
      </div>

      <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex border border-white/10 p-1 self-start">
          <button type="button" onClick={() => setActiveTab("plan")} className={activeTab === "plan" ? "tab tab-active" : "tab"}>
            Today&apos;s Plan <span>{plan.length}</span>
          </button>
          <button type="button" onClick={() => setActiveTab("saved")} className={activeTab === "saved" ? "tab tab-active" : "tab"}>
            Saved <span>{saved.length}</span>
          </button>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <label className="flex min-h-11 flex-1 items-center gap-2 border border-white/10 bg-[#0b0d0b] px-3 sm:min-w-72">
            <Search size={16} className="text-zinc-500" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search your list"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-700"
            />
          </label>
          <label className="flex min-h-11 items-center gap-2 border border-white/10 bg-[#0b0d0b] px-3">
            <SlidersHorizontal size={16} className="text-zinc-500" />
            <span className="text-xs uppercase tracking-[0.12em] text-zinc-600">Sort By</span>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value as SortOption)} className="bg-transparent text-sm text-white outline-none">
              <option className="bg-black" value="duration">Duration</option>
              <option className="bg-black" value="calories">Calories</option>
              <option className="bg-black" value="rating">Rating</option>
            </select>
          </label>
        </div>
      </div>

      <div className="mt-5">
        {items.length === 0 ? (
          <div className="border border-white/10 bg-[#0b0d0b] px-6 py-16 text-center">
            <p className="display-title text-3xl sm:text-4xl">NOTHING HERE YET</p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-500">Browse the library and add a lift to get today moving.</p>
            <Link href="/#library" className="btn-primary mt-6 inline-flex">
              GO TO WORKOUTS
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <PlanCard key={item.id} workout={item} done ={"done" in item ? item.done : false} savedMode={activeTab === "saved"} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
