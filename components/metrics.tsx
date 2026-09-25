import { Dumbbell, Flame, Timer } from "lucide-react";

export default function Metrics({ exercises, minutes, calories }: { exercises: number; minutes: number; calories: number }) {
  const items = [
    { label: "Exercises", value: exercises, icon: Dumbbell },
    { label: "Minutes", value: minutes, icon: Timer },
    { label: "Calories", value: calories, icon: Flame },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {items.map(({ label, value, icon: Icon }) => (
        <div key={label} className="border border-white/10 bg-[#0b0d0b] p-5">
          <div className="flex items-center justify-between text-zinc-600">
            <span className="text-xs uppercase tracking-[0.15em]">{label}</span>
            <Icon size={18} />
          </div>
          <p className="display-title mt-3 text-4xl">{value}</p>
        </div>
      ))}
    </div>
  );
}
