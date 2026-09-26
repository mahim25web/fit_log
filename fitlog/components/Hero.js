import Image from "next/image";
import { Dumbbell } from "lucide-react";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
      <div className="grid items-center gap-8 rounded-3xl border border-white/10 bg-[#111114] px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-2">
        <div>
          <p className="font-display text-xs font-semibold tracking-[0.2em] text-[#ccff00]">
            WORKOUT LIBRARY
          </p>
          <h1 className="font-display mt-3 text-4xl font-bold uppercase leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            Train with intent.
            <br />
            Log every set.
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition hover:brightness-95"
          >
            <Dumbbell className="h-4 w-4" />
            Browse workouts
          </a>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-2xl bg-[#0a0a0c]">
            <Image
              src="/banner.png"
              alt="FitLog workout illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
