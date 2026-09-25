import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="site-shell pb-16 pt-10 sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-16">
      <div className="hero-grid overflow-hidden border border-white/10 bg-[#0b0d0b]">
        <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
          <p className="eyebrow">WORKOUT LIBRARY</p>
          <h1 className="display-title mt-4 max-w-4xl text-[3.2rem] leading-[0.9] tracking-tight sm:text-[4.8rem] lg:text-[5.8rem]">
            TRAIN WITH INTENT. <span className="text-lime-300">LOG EVERY SET.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <div className="mt-8">
            <Link href="/#library" className="btn-primary inline-flex">
              BROWSE WORKOUTS <ArrowDownRight size={17} />
            </Link>
          </div>
        </div>

        <div className="relative min-h-[320px] border-t border-white/10 lg:min-h-[500px] lg:border-l lg:border-t-0">
          <Image
            src="/assets/banner.png"
            alt="Athlete training in a gym"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d0b] via-transparent to-transparent opacity-60" />
          <div className="absolute bottom-5 left-5 border border-white/15 bg-black/45 px-4 py-3 backdrop-blur-sm">
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">FOCUS / FORM / CONSISTENCY</p>
          </div>
        </div>
      </div>
    </section>
  );
}
