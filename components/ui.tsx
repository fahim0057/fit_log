import type { ReactNode } from "react";

export function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-5">
      <h2 className="font-oswald text-3xl font-bold uppercase leading-none tracking-tight text-white sm:text-4xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-1.5 text-xs text-[#7F857D] sm:text-sm">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function Pill({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "accent";
}) {
  return (
    <span
      className={
        tone === "accent"
          ? "rounded-full bg-[#C2F800] px-2 py-0.5 text-[8px] font-bold uppercase leading-none tracking-wide text-black"
          : "rounded-full border border-white/10 px-2 py-0.5 text-[8px] uppercase leading-none text-[#7F857D]"
      }
    >
      {children}
    </span>
  );
}

export function Spinner() {
  return <span className="spinner" aria-label="Loading" />;
}