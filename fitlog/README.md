# 🏋️ FitLog — Workout Library

FitLog is a dark, no-nonsense gym companion built for the B14-A6 assignment. Browse a library of twelve lifts, drop up to five into **Today's Plan**, save others for later, and watch your session's exercises, minutes, and calories add up in real time.

## 🔗 Links

- Live Link: https://fit-log-web-project.vercel.app
- GitHub Repository: https://github.com/mahim25web/fit_log.git

## ✨ Features

1. **Responsive workout library** — a 3-column grid of all twelve lifts pulled live from the FitLog API, collapsing gracefully down to a single column on mobile.
2. **Live Plan & Saved badges** — the navbar always reflects exactly how many lifts are in Today's Plan and Saved, persisted across reloads via `localStorage`.
3. **Detailed workout pages** — a two-column layout with a key-specs panel (equipment, difficulty, sets, reps, duration, calories, rating) and numbered instructions for every lift.
4. **My Plan dashboard** — live Exercises / Minutes / Calories metrics, tabbed Today's Plan / Saved views, and quick actions to view, mark as done, or remove a lift.
5. **Search & sort** — filter the library or your plan by name or muscle group, and re-sort by Duration, Calories, or Rating on the fly.
6. **Toast notifications & a 5-lift plan cap** — clear feedback on every add/remove/done action, with the "Add to today's plan" button disabling once the plan is full.
7. **Custom loading, empty, and 404 states** — a branded loading spinner while data is fetched, a friendly empty state on My Plan, and a dark, on-brand 404 page for unknown routes.

## 🛠️ Technologies Used

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) for icons
- Browser `localStorage` for persistence
- [FitLog REST API](https://api.abcz.workers.dev/api/fitlog) for workout data

## 📂 Project Structure

```
app/
  page.js                 → Home (Hero + Library)
  workout/[id]/page.js    → Workout detail page
  my-plan/page.js         → My Plan dashboard
  not-found.js            → Custom 404
  layout.js               → Root layout, fonts, providers
components/               → Navbar, Hero, Footer, WorkoutCard, PlanListItem, SortDropdown, SearchInput
context/                  → WorkoutsContext, PlanContext, ToastContext
lib/api.js                → API fetch helpers
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 📦 Build

```bash
npm run build
npm run start
```
