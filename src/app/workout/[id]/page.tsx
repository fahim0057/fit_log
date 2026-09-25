import Link from "next/link";
import { ArrowLeft, CircleCheck, Clock3, Flame, Gauge, Star } from "lucide-react";
import { notFound } from "next/navigation";
import { getWorkout } from "@/../lib/api";
import { Pill } from "@/../components/ui";
import WorkoutActions from "@/../components/workout-actions";

export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workout = await getWorkout(id);

  if (!workout) {
    return notFound();
  }

  const specs = [
    ["EQUIPMENT", workout.equipment],
    ["DIFFICULTY", workout.difficulty],
    ["SETS", workout.sets],
    ["REPS", workout.reps],
    ["DURATION", `${workout.duration} min`],
    ["CALORIES", `${workout.caloriesBurned} kcal`],
    ["RATING", workout.rating],
  ] as const;

  return (
    <main className="site-shell py-8 sm:py-12 lg:py-14">
      <Link href="/#library" className="mb-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-zinc-500 hover:text-white">
        <ArrowLeft size={15} /> Back to library
      </Link>

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="relative overflow-hidden border border-white/10 bg-black lg:sticky lg:top-28">
          <div className="aspect-[4/3] lg:aspect-[3/4]">
            <img src={workout.image} alt={workout.name} className="h-full w-full object-cover" />
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups.map((group) => <Pill key={group} tone="accent">{group}</Pill>)}
          </div>
          <h1 className="display-title mt-4 text-5xl uppercase leading-[0.92] sm:text-7xl">{workout.name}</h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">{workout.description}</p>

          <div className="mt-8 border border-white/10 bg-[#0b0d0b]">
            {specs.map(([label, value], index) => (
              <div key={label} className={`flex items-center justify-between gap-4 px-4 py-3.5 sm:px-5 ${index !== specs.length - 1 ? "border-b border-white/10" : ""}`}>
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-600">{label}</span>
                <span className="text-right text-sm font-semibold text-zinc-200">{String(value)}</span>
              </div>
            ))}
          </div>

          <div className="mt-9">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">
              <CircleCheck size={15} /> Instructions
            </div>
            <ol className="mt-4 space-y-3">
              {workout.instructions.map((instruction, index) => (
                <li key={instruction} className="flex gap-4 border-b border-white/10 pb-4">
                  <span className="display-title text-xl text-lime-300">0{index + 1}</span>
                  <p className="text-sm leading-6 text-zinc-400">{instruction}</p>
                </li>
              ))}
            </ol>
          </div>

          <WorkoutActions workout={workout} />

          <div className="mt-6 flex flex-wrap gap-4 text-xs text-zinc-600">
            <span className="flex items-center gap-1.5"><Clock3 size={13} /> {workout.duration} min</span>
            <span className="flex items-center gap-1.5"><Flame size={13} /> {workout.caloriesBurned} kcal</span>
            <span className="flex items-center gap-1.5"><Star size={13} /> {workout.rating}</span>
            <span className="flex items-center gap-1.5"><Gauge size={13} /> {workout.difficulty}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
