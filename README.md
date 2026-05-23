# Internshala Internship Search — SDE (Web) Assignment

A production-quality clone of the [Internshala internship search page](https://internshala.com/internships/), built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=flat-square&logo=vercel)](https://internshala-clone-jet.vercel.app)
[![GitHub](https://img.shields.io/badge/Source-GitHub-181717?style=flat-square&logo=github)](https://github.com/ayushshukla1807/internshala-internship-assignment)

---

## Live Links

| | URL |
|---|---|
| **Hosted App** | https://internshala-clone-jet.vercel.app |
| **GitHub Repo** | https://github.com/ayushshukla1807/internshala-internship-assignment |

---

## Features

### Core (Assignment Requirements)
- **Real API data** — fetches live internship listings from `https://internshala.com/hiring/search`
- **4 Filters** — Profile, Location, Duration, Stipend (all done on the frontend, zero extra network requests)
- **UI Replication** — layout, typography, and card design closely mirrors the real Internshala search page

### Additional Innovations
| Feature | Description |
|---|---|
| Dark Mode | System-aware, with manual toggle in header |
| Skeleton Loaders | Shimmer placeholders while data is fetching |
| Framer Motion | Staggered card entry animations & layout transitions |
| Grid / List Toggle | Switch between card layouts |
| Sort | By Relevance, Highest Stipend, Newest, Shortest Duration |
| Infinite Scroll | `IntersectionObserver` loads 20 cards at a time |
| Save / Bookmark | Heart icon persists saved internships via `localStorage` |
| Cmd+K Search | Spotlight-style global search with recent search history |
| Share & Copy Link | Web Share API with clipboard fallback |
| Dynamic SEO Title | Browser tab reflects active filters |
| Glassmorphism Header | Frosted-glass effect on scroll |
| Scroll-to-Top | Floating action button appears after scrolling |
| Accessible | Full ARIA labels, keyboard navigation, `role` attributes |

---

## Project Architecture

```
src/
├── app/
│   ├── layout.tsx          # Root layout — ThemeProvider, Toaster
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles, custom scrollbar, glassmorphism
│
├── components/
│   ├── Header.tsx          # Sticky nav with dark mode & Cmd+K hint
│   ├── InternshipList.tsx  # Page layout — consumes useInternshipFilters hook
│   ├── InternshipCard.tsx  # Card UI (list & grid modes)
│   ├── FilterSidebar.tsx   # All 4 filter controls
│   ├── SkeletonLoader.tsx  # Animated loading placeholder
│   ├── CommandMenu.tsx     # Cmd+K spotlight search
│   ├── ScrollToTop.tsx     # Floating scroll-to-top button
│   └── Footer.tsx          # Page footer
│
├── hooks/
│   └── useInternshipFilters.ts  # Custom hook: fetch + filter + sort logic
│
├── types/
│   └── internship.ts       # Full TypeScript interfaces for API response
│
├── constants/
│   └── index.ts            # App-wide constants (no magic numbers)
│
└── utils/
    └── index.ts            # Pure utility functions (formatStipend, parseDuration)
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Notifications | Sonner |
| Search | cmdk |
| Theming | next-themes |
| Confetti | canvas-confetti |
| Deployment | Vercel |

---

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/ayushshukla1807/internshala-internship-assignment.git
cd internshala-internship-assignment

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in your browser
open http://localhost:3000
```

---

## Design Decisions

**Why a custom `useInternshipFilters` hook?**  
Separating data-fetching and filter logic from the UI component keeps `InternshipList.tsx` focused purely on rendering. This makes each piece independently testable and easier to reason about.

**Why `constants/` and `utils/`?**  
Magic numbers and inline utility functions scattered across components are a common source of bugs and inconsistency. Centralising them makes changes trivial — update one file, effect propagates everywhere.

**Why Framer Motion instead of CSS animations?**  
CSS transitions can't cleanly handle list re-ordering when filters change. Framer Motion's `AnimatePresence` + `layout` prop handles enter/exit/reorder animations correctly with a single prop.

---

## Author

**Ayush Shukla** — ADYPU, Computer Science  
Email: ayush.shukla@adypu.edu.in
