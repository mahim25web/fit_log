"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

const NAV_LINKS = [
  { label: "Workout", href: "/" },
  { label: "My Plan", href: "/my-plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0c]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image src="/logo.png" alt="FitLog logo" width={24} height={24} />
          <span className="font-display text-lg font-bold tracking-wide text-white">
            FITLOG
          </span>
        </Link>

        <nav className="hidden items-center gap-2 sm:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                  isActive
                    ? "bg-[#ccff00] text-black"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 text-xs font-semibold sm:gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full bg-[#ccff00] px-3 py-1.5 text-black transition hover:brightness-95"
          >
            Plan
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black/15 px-1 text-[11px]">
              {plan.length}
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full border border-white/25 px-3 py-1.5 text-white/80 transition hover:border-white/50 hover:text-white"
          >
            Saved
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-white/20 px-1 text-[11px]">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>

      <nav className="flex items-center gap-2 border-t border-white/10 px-4 py-2 sm:hidden">
        {NAV_LINKS.map((link) => {
          const isActive =
            link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                isActive ? "bg-[#ccff00] text-black" : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
