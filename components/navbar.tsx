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

      <span className="display-title text-lg tracking-wide">
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
      <nav className="site-shell">

        {/* Desktop Navbar */}
        <div className="hidden h-20 items-center justify-between md:flex">

          {/* Logo */}
          <Link href="/" aria-label="FitLog home">
            <Logo />
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">

            <Link
              href="/#library"
              className={
                workoutActive
                  ? "nav-link nav-link-active"
                  : "nav-link"
              }
            >
              Workout
            </Link>

            <Link
              href="/my-plan"
              className={
                planActive
                  ? "nav-link nav-link-active"
                  : "nav-link"
              }
            >
              My Plan
            </Link>

          </div>

          {/* Counters */}
          <div className="flex items-center gap-3">

            <Link
              href="/my-plan"
              className="status-pill status-pill-filled"
            >
              <span>PLAN</span>
              <strong>{plan.length}</strong>
            </Link>

            <Link
              href="/my-plan"
              className="status-pill status-pill-outline"
            >
              <span>SAVED</span>
              <strong>{saved.length}</strong>
            </Link>

          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="flex h-20 items-center justify-between md:hidden">

          {/* Hamburger */}
          <button
            type="button"
            aria-label={
              menuOpen ? "Close menu" : "Open menu"
            }
            onClick={() =>
              setMenuOpen((open) => !open)
            }
            className="grid h-10 w-10 place-items-center border border-white/15"
          >
            {menuOpen ? (
              <X size={18} />
            ) : (
              <Menu size={18} />
            )}
          </button>

          {/* Logo */}
          <Link href="/" aria-label="FitLog home">
            <Logo />
          </Link>

          {/* Counters */}
          <div className="flex items-center gap-2">

            <Link
              href="/my-plan"
              className="status-pill status-pill-filled px-2"
            >
              <span>PLAN</span>
              <strong>{plan.length}</strong>
            </Link>

            <Link
              href="/my-plan"
              className="status-pill status-pill-outline px-2"
            >
              <span>SAVED</span>
              <strong>{saved.length}</strong>
            </Link>

          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="border-t border-white/10 py-4 md:hidden">

            <Link
              href="/#library"
              onClick={closeMenu}
              className={
                workoutActive
                  ? "nav-link nav-link-active block"
                  : "nav-link block"
              }
            >
              Workout
            </Link>

            <Link
              href="/my-plan"
              onClick={closeMenu}
              className={
                planActive
                  ? "nav-link nav-link-active block"
                  : "nav-link block"
              }
            >
              My Plan
            </Link>

          </div>
        )}
      </nav>
    </header>
  );
}