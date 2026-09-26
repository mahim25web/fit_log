import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a0c]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-8 text-center sm:flex-row sm:justify-between sm:text-left sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog logo" width={20} height={20} />
          <span className="font-display text-sm font-bold tracking-wide text-white">
            FITLOG
          </span>
        </div>
        <p className="text-xs text-white/50">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
