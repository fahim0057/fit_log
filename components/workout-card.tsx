import Image from "next/image";
import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";

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
      className="
        group
        block
        h-[368px]
        w-full
        max-w-[394px]
        overflow-hidden
        rounded-xl
        border
        border-[#24272E]
        bg-[#15171D]
        transition-all
        duration-200
        hover:border-[#C2F800]/40
      "
    >
      {/* Image */}
      <div className="relative h-[197px] w-full overflow-hidden bg-[#0B0D0B]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="394px"
          className="
            object-cover
            transition-transform
            duration-300
            group-hover:scale-[1.02]
          "
        />
      </div>

      {/* Content */}
      <div className="px-6 py-5">

        {/* Tags */}
        <div className="flex min-h-[20px] flex-wrap gap-2">
          {workout.muscleGroups
            .slice(0, 2)
            .map((group) => (
              <Pill key={group} tone="accent">
                {group}
              </Pill>
            ))}
        </div>

        {/* Workout name */}
        <h3
          className="
            mt-4
            font-oswald
            text-[20px]
            font-bold
            uppercase
            leading-none
            tracking-wide
            text-white
          "
        >
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="mt-2 text-[13px] leading-5 text-[#8B919A]">
          {workout.equipment}
        </p>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-3 border-t border-[#24272E] pt-4">

          {/* Duration */}
          <div className="flex items-center gap-2 text-[13px] text-[#9CA3AF]">
            <Clock3 size={14} strokeWidth={1.8} />
            <span>{workout.duration} min</span>
          </div>

          {/* Calories */}
          <div className="flex items-center gap-2 text-[13px] text-[#9CA3AF]">
            <Flame size={14} strokeWidth={1.8} />
            <span>{workout.caloriesBurned} kcal</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 text-[13px] text-[#9CA3AF]">
            <Star size={14} strokeWidth={1.8} />
            <span>{workout.rating}</span>
          </div>

        </div>
      </div>
    </Link>
  );
}