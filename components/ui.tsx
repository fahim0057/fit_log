import type { ReactNode } from "react";

export function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div>
      <h2 className="font-oswald text-[30px] font-bold uppercase leading-none tracking-tight text-white sm:text-[32px]">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-2 text-[13px] text-[#7F857D]">
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
          ? "inline-flex h-5 items-center rounded-full bg-[#C2F800] px-3 text-[11px] font-bold uppercase leading-none tracking-wide text-black"
          : "inline-flex h-5 items-center rounded-full border border-white/10 px-3 text-[11px] uppercase leading-none text-[#7F857D]"
      }
    >
      {children}
    </span>
  );
}

export function Spinner() {
  return <span className="spinner" aria-label="Loading" />;
}