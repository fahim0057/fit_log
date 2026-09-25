"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { useFitLog } from "@/../context/fit-log-context";
import DumbbellLogo from "@/../assets/logo.png";

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={DumbbellLogo}
        alt="FitLog logo"
        width={32}
        height={32}
        priority
      />

      <span className="font-oswald text-[18px] font-black leading-7 tracking-wide text-white">
        FITLOG
      </span>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const { plan, saved } = useFitLog();

  const workoutActive = pathname === "/";
  const planActive = pathname === "/my-plan";

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070807]/95 backdrop-blur">
      <nav className="site-shell px-6">

        {/* ================= DESKTOP ================= */}
        <div className="hidden h-20 items-center justify-between md:flex">

          {/* Logo */}
          <Link href="/" aria-label="FitLog home">
            <Logo />
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-2">

            {/* Workouts */}
            <Link
              href="/#library"
              className={`
                flex h-7 w-[88px] items-center justify-center
                text-sm font-medium
                transition-all duration-200
                ${
                  workoutActive
                    ? "rounded-full bg-[#16220d] text-[#C2F800]"
                    : "text-[#C2F800] hover:text-white"
                }
              `}
            >
              Workouts
            </Link>

            {/* My Plan */}
            <Link
              href="/my-plan"
              className={`
                flex h-7 w-[88px] items-center justify-center
                text-sm font-medium
                transition-all duration-200
                ${
                  planActive
                    ? "rounded-full bg-[#16220d] text-[#C2F800]"
                    : "text-[#9CA3AF] hover:text-white"
                }
              `}
            >
              My Plan
            </Link>
          </div>

          {/* Counters */}
          <div className="flex items-center gap-6">

            {/* PLAN */}
            <Link
              href="/my-plan"
              className="flex items-center gap-2 text-sm text-[#9CA3AF]"
            >
              <span>Plan</span>

              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#C2F800] text-[11px] font-bold leading-none text-black">
                {plan.length}
              </span>
            </Link>

            {/* SAVED */}
            <Link
              href="/my-plan"
              className="flex items-center gap-2 text-sm text-[#9CA3AF]"
            >
              <span>Saved</span>

              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#9CA3AF] text-[11px] font-bold leading-none text-[#9CA3AF]">
                {saved.length}
              </span>
            </Link>
          </div>
        </div>

        {/* ================= MOBILE ================= */}
        <div className="flex h-20 items-center justify-between md:hidden">

          {/* Hamburger */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-10 w-10 place-items-center border border-white/15"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* Logo */}
          <Link href="/" aria-label="FitLog home">
            <Logo />
          </Link>

          {/* Mobile counters */}
          <div className="flex items-center gap-2">

            <Link
              href="/my-plan"
              className="flex items-center gap-1 text-xs text-[#9CA3AF]"
            >
              <span>Plan</span>

              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#C2F800] text-[10px] font-bold text-black">
                {plan.length}
              </span>
            </Link>

            <Link
              href="/my-plan"
              className="flex items-center gap-1 text-xs text-[#9CA3AF]"
            >
              <span>Saved</span>

              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#9CA3AF] text-[10px] font-bold text-[#9CA3AF]">
                {saved.length}
              </span>
            </Link>
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {menuOpen && (
          <div className="border-t border-white/10 py-4 md:hidden">

            <Link
              href="/#library"
              onClick={closeMenu}
              className={`
                block px-4 py-3 text-sm font-medium
                ${
                  workoutActive
                    ? "text-[#C2F800]"
                    : "text-[#9CA3AF]"
                }
              `}
            >
              Workouts
            </Link>

            <Link
              href="/my-plan"
              onClick={closeMenu}
              className={`
                block px-4 py-3 text-sm font-medium
                ${
                  planActive
                    ? "text-[#C2F800]"
                    : "text-[#9CA3AF]"
                }
              `}
            >
              My Plan
            </Link>

          </div>
        )}
      </nav>
    </header>
  );
}