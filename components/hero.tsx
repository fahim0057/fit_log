import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";

import Banner from "@/../assets/banner.png";

export default function Hero() {
  return (
    <section className="site-shell px-6 pb-16 pt-8 sm:pb-20 sm:pt-10 lg:pb-24 lg:pt-12">
      <div className="grid overflow-hidden bg-[#0B0D0B] lg:grid-cols-[1.15fr_0.85fr]">

        {/* LEFT CONTENT */}
        <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-14 lg:py-16">

          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#A0A0A0]">
            WORKOUT LIBRARY
          </p>

          <h1 className="mt-4 max-w-3xl font-oswald text-[3rem] font-black uppercase leading-[0.95] tracking-tight text-white sm:text-[4rem] lg:text-[4.75rem]">
            TRAIN WITH INTENT.
            <span className="block text-[#C2F800]">
              LOG EVERY SET.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-7 text-[#9CA3AF] sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift,
            lock it into today&apos;s plan, and watch the week&apos;s work
            add up.
          </p>

          <div className="mt-8">
            <Link
              href="/#library"
              className="inline-flex items-center gap-2 rounded-full bg-[#C2F800] px-5 py-3 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-[#d5ff38]"
            >
              Browse Workouts
              <ArrowDownRight size={17} strokeWidth={2.5} />
            </Link>
          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="flex min-h-[360px] items-center justify-center lg:min-h-[500px]">
          <Image
            src={Banner}
            alt="FitLog workout illustration"
            width={334}
            height={334}
            priority
            className="h-[334px] w-[334px] object-contain"
          />
        </div>

      </div>
    </section>
  );
}