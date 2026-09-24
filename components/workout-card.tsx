import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";
import type { Workout } from "@/../lib/types";
import { Pill } from "@/../components/ui";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block border border-white/10 bg-[#0b0d0b] transition duration-200 hover:-translate-y-1 hover:border-lime-300/50"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-black">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {workout.muscleGroups.slice(0, 2).map((group) => (
            <Pill key={group} tone="accent">{group}</Pill>
          ))}
        </div>
      </div>

      <div className="p-4">
        <h3 className="display-title text-xl tracking-wide">{workout.name}</h3>
        <p className="mt-1 text-sm text-zinc-500">{workout.equipment}</p>

        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-4 text-xs text-zinc-500">
          <span className="flex items-center gap-1.5"><Clock3 size={14} /> {workout.duration} min</span>
          <span className="flex items-center gap-1.5"><Flame size={14} /> {workout.caloriesBurned} kcal</span>
          <span className="flex items-center gap-1.5"><Star size={14} /> {workout.rating}</span>
        </div>
      </div>
    </Link>
  );
}
