import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="site-shell flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold tracking-[0.2em] text-white">
          <span className="grid h-8 w-8 place-items-center border border-lime-300 bg-lime-300 text-black">
            <Dumbbell size={15} />
          </span>
          FITLOG
        </div>
        <p className="text-xs uppercase tracking-[0.14em] text-zinc-600 sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}