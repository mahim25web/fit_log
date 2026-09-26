🏋️ FitLog — Workout Library
FitLog is a dark, no-nonsense gym companion built for the B14-A6 assignment. Browse a library of twelve lifts, drop up to five into Today's Plan, save others for later, and watch your session's exercises, minutes, and calories add up in real time.

🔗 Links
Live Link: add after deployment
GitHub Repository: add after pushing
✨ Features
Responsive workout library — a 3-column grid of all twelve lifts pulled live from the FitLog API, collapsing gracefully down to a single column on mobile.
Live Plan & Saved badges — the navbar always reflects exactly how many lifts are in Today's Plan and Saved, persisted across reloads via localStorage.
Detailed workout pages — a two-column layout with a key-specs panel (equipment, difficulty, sets, reps, duration, calories, rating) and numbered instructions for every lift.
My Plan dashboard — live Exercises / Minutes / Calories metrics, tabbed Today's Plan / Saved views, and quick actions to view, mark as done, or remove a lift.
Search & sort — filter the library or your plan by name or muscle group, and re-sort by Duration, Calories, or Rating on the fly.
Toast notifications & a 5-lift plan cap — clear feedback on every add/remove/done action, with the "Add to today's plan" button disabling once the plan is full.
Custom loading, empty, and 404 states — a branded loading spinner while data is fetched, a friendly empty state on My Plan, and a dark, on-brand 404 page for unknown routes.
🛠️ Technologies Used
Next.js (App Router)
React
Tailwind CSS v4
Lucide React for icons
Browser localStorage for persistence
FitLog REST API for workout data
📂 Project Structure
app/
  page.js                 → Home (Hero + Library)
  workout/[id]/page.js    → Workout detail page
  my-plan/page.js         → My Plan dashboard
  not-found.js            → Custom 404
  layout.js               → Root layout, fonts, providers
components/               → Navbar, Hero, Footer, WorkoutCard, PlanListItem, SortDropdown, SearchInput
context/                  → WorkoutsContext, PlanContext, ToastContext
lib/api.js                → API fetch helpers
🚀 Getting Started
npm install
npm run dev
Open http://localhost:3000.

📦 Build
npm run build
npm run start
