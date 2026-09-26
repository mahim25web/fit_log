import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";

export function TagPill({ label, index }) {
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
        index === 0
          ? "bg-[#ccff00] text-black"
          : "border border-white/25 text-white/80"
      }`}
    >
      {label}
    </span>
  );
}

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#131317] transition hover:-translate-y-1 hover:border-white/25 hover:shadow-xl hover:shadow-black/30"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-[#0a0a0c]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={workout.image}
          alt={workout.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((tag, i) => (
            <TagPill key={tag} label={tag} index={i} />
          ))}
        </div>
        <h3 className="font-display text-base font-bold uppercase leading-snug text-white">
          {workout.name}
        </h3>
        <p className="text-xs text-white/50">{workout.equipment}</p>
        <div className="mt-auto flex items-center gap-3 pt-2 text-xs font-medium text-white/70">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-[#ccff00]" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame className="h-3.5 w-3.5 text-[#ccff00]" />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-[#ccff00]" />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
