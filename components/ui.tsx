import type { ReactNode } from "react";

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-7">
      {eyebrow ? <p className="eyebrow mb-2">{eyebrow}</p> : null}
      <h2 className="display-title text-4xl uppercase tracking-tight sm:text-5xl">
        {title}
      </h2>
      {subtitle ? <p className="mt-2 max-w-2xl text-sm text-zinc-500 sm:text-base">{subtitle}</p> : null}
    </div>
  );
}

export function Pill({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "accent" }) {
  return (
    <span className={tone === "accent" ? "pill pill-accent" : "pill"}>
      {children}
    </span>
  );
}

export function Spinner() {
  return <span className="spinner" aria-label="Loading" />;
}
