import Image from "next/image";
import Link from "next/link";
import {
  Clock3,
  Flame,
  Star,
} from "lucide-react";

import type { Workout } from "@/../lib/types";
import { Pill } from "@/../components/ui";

export default function WorkoutCard({
  workout,
}: {
  workout: Workout;
}) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden border border-white/10 bg-[#0B0D0B] transition duration-200 hover:border-[#C2F800]/40"
    >
      {/* ================= IMAGE ================= */}
      <div className="relative aspect-[16/8] overflow-hidden bg-[#080908]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
        />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-4 sm:p-5">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.slice(0, 2).map((group) => (
            <Pill
              key={group}
              tone="accent"
            >
              {group}
            </Pill>
          ))}
        </div>

        {/* Title */}
        <h3 className="display-title mt-3 text-xl uppercase leading-none tracking-wide text-white">
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="mt-2 text-sm text-[#7F857D]">
          {workout.equipment}
        </p>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-3 border-t border-white/10 pt-4">
          <div className="flex items-center gap-1.5 text-[11px] text-[#7F857D]">
            <Clock3 size={13} />
            <span>{workout.duration} min</span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-[#7F857D]">
            <Flame size={13} />
            <span>{workout.caloriesBurned} kcal</span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-[#7F857D]">
            <Star size={13} />
            <span>{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}