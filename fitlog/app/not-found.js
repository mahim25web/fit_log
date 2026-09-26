import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-32 text-center">
      <span className="font-display text-6xl font-bold text-[#ccff00]">404</span>
      <h1 className="font-display text-2xl font-bold uppercase text-white">
        Page not racked
      </h1>
      <p className="text-sm text-white/50">
        This page doesn&apos;t exist in the library. Let&apos;s get you back to lifting.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-6 py-3 text-sm font-bold uppercase tracking-wide text-black"
      >
        <Dumbbell className="h-4 w-4" />
        Go to workouts
      </Link>
    </div>
  );
}

