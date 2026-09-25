# HabitFlow — Project Handover & Technical Documentation

> **Tagline:** *Build better days, one habit at a time.*  
> **Repository:** `trackora`  
> **Target Application:** HabitFlow (Daily routine, habit tracking, and productivity platform)  
> **Date:** September 2026  
> **Status:** Feature-Complete MVP / Startup-Ready Prototype  

---

## 1. Executive Summary

**HabitFlow** is a personalized daily routine, habit tracking, and productivity management web application designed with modern SaaS aesthetics (emerald and slate palette, soft shadows, rounded surfaces, and dark/light modes).

The platform allows users to:
- Establish and schedule structured daily routines (morning, afternoon, evening).
- Track habits with streaks, custom frequencies, categories, and numeric targets.
- Set quarterly and annual milestone goals linked to daily habits.
- Monitor behavioral consistency with a multi-range analytics dashboard (7-day, 30-day, 90-day trends).
- Engage with a gamified progression system (XP, levels, and unlockable badges).
- Receive non-intrusive, telemetry-driven recommendations from an **AI Smart Coach**.

---

## 2. Technology Stack & Dependencies

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **Framework** | [React](https://react.dev/) | `^18.3.1` | Component-based UI rendering |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `^5.6.3` | Type safety and strict data modeling |
| **Build Tool** | [Vite](https://vitejs.dev/) | `^5.4.11` | Rapid HMR dev server & optimized production rollup |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `^3.4.15` | Utility-first design system with dark mode |
| **Icons** | [Lucide React](https://lucide.dev/) | `^1.16.0` | Clean icon library with dynamic icon resolver |
| **Class Utilities**| `clsx`, `tailwind-merge` | Latest | Conditional and merged class management |
| **State & Storage**| React Context + `localStorage` | Built-in | Zero-backend client persistence with realistic seed data |

---

## 3. Directory Layout & Architecture

```
trackora/
├── index.html                     # Application entry point with SEO metadata and Google Fonts
├── package.json                   # Dependencies, scripts, and build metadata
├── postcss.config.js              # PostCSS configuration
├── tailwind.config.js             # Tailwind configuration (custom colors, animations, shadows)
├── tsconfig.json                  # TypeScript compiler options
├── vite.config.ts                 # Vite server configuration (Port 3000)
├── README.md                      # General project overview
├── HANDOVER.md                    # This document
└── src/
    ├── main.tsx                   # React root mount
    ├── App.tsx                    # Root application shell and view router
    ├── index.css                  # Tailwind directives and custom scrollbar classes
    ├── types/
    │   └── index.ts               # Core TypeScript definitions (Habit, Goal, ScheduleItem, etc.)
    ├── data/
    │   └── mockData.ts            # Realistic default seed data for fictional user "Alex Vance"
    ├── context/
    │   └── AppContext.tsx         # Central application state, persistence engine, and XP logic
    └── components/
        ├── common/                # Reusable presentation components
        │   ├── Badge.tsx          # Category and difficulty tags
        │   ├── CircularProgress.tsx # Animated SVG circular progress ring
        │   ├── DynamicIcon.tsx    # Dynamic Lucide icon component resolver
        │   ├── Modal.tsx          # Accessible modal dialog with backdrop blur & ESC listener
        │   └── ToastContainer.tsx # Floating notification toast system
        ├── layout/                # Global shell components
        │   ├── Sidebar.tsx        # Desktop responsive sidebar navigation with level widget
        │   ├── TopHeader.tsx      # Header bar with search, notification panel, and quick actions
        │   └── MobileNav.tsx      # Fixed bottom navigation bar for mobile and tablet devices
        ├── dashboard/             # Executive dashboard modular widgets
        │   ├── HabitOverview.tsx  # Cards with 7-day dot heatmaps and quick check-ins
        │   ├── ProductivityScore.tsx # Circular productivity gauge with sub-scores
        │   ├── SmartInsights.tsx  # Behavioral telemetry cards
        │   ├── StreaksSection.tsx # Active streak records and flame tags
        │   ├── TodayRoutine.tsx   # Chronological routine timeline with checkoffs
        │   ├── UpcomingReminders.tsx # Chronological upcoming tasks
        │   └── WeeklyConsistency.tsx # Trend chart with 7d, 30d, 90d view switcher
        ├── modals/                # Creation and configuration dialogs
        │   ├── CreateGoalModal.tsx     # Long-term goal creator with habit links
        │   ├── CreateHabitModal.tsx    # Comprehensive habit creator & editor
        │   ├── CreateScheduleModal.tsx # Schedule item and time block builder
        │   └── OnboardingModal.tsx     # 4-step onboarding wizard
        └── pages/                 # Full dedicated views
            ├── DashboardView.tsx       # Main dashboard layout
            ├── TodayView.tsx           # Circadian-grouped daily routine view
            ├── HabitsView.tsx          # Comprehensive habit management interface
            ├── ScheduleView.tsx        # Day, Week, and Month time block calendars
            ├── GoalsView.tsx           # Milestone goals with +1 quick-logs
            ├── AnalyticsView.tsx       # Comprehensive productivity analytics
            ├── RewardsView.tsx         # Gamification, XP progress, and badges
            ├── AISuggestionsView.tsx   # Smart Coach adaptive routine recommendations
            └── SettingsView.tsx        # User profile, theme, and data management
```

---

## 4. Key Workflows & State Management

The application state is centralized in [`src/context/AppContext.tsx`](file:///c:/Users/SHIJU%20JOHN/OneDrive/Desktop/trackora/src/context/AppContext.tsx) and synchronized to the browser's `localStorage` under the prefix `habitflow_v1_*`.

### A. Habit Check-in & XP Progression
- When a user marks a habit as completed today via `toggleHabitToday(habitId)`:
  1. The habit's `completedToday` flag is toggled.
  2. The streak counter increases by 1 (and updates `bestStreak` if beaten).
  3. `awardXp(25, reason)` is triggered:
     - Adds +25 XP to the user.
     - Checks if `currentXp >= xpToNextLevel`.
     - Automatically advances the level and fires celebratory toast notifications.
  4. The dynamic **Productivity Score** and today's completion percentage recalculate reactively.

### B. Habit Management (CRUD)
- **Create**: [`CreateHabitModal.tsx`](file:///c:/Users/SHIJU%20JOHN/OneDrive/Desktop/trackora/src/components/modals/CreateHabitModal.tsx) allows configuring name, category, frequency, target value & unit, preferred time of day, reminder time, difficulty, custom icon (16 options), color (8 palettes), and linked goal.
- **Edit**: Updates the habit entity and propagates to the schedule timeline.
- **Pause / Resume**: Freezes habit status without deleting past streak data.
- **Delete**: Cleans up the habit and detaches it from schedule time blocks.

### C. Schedule & Time Blocks
- Supports **Day View** (timeline with completion status and duration), **Week View** (7-day matrix), and **Month View** (30-day heatmap calendar).
- Users can schedule standalone activities or bind existing habits to specific hours.

### D. Smart Coach & Adaptive Recommendations
- Inspects behavioral logs to suggest actionable schedule tweaks (e.g. shifting workouts from late evenings to 6:30 PM).
- Clicking **"Apply Suggestion"** executes the schedule mutation immediately and awards +30 XP.
- Clicking **"Dismiss"** hides the recommendation.

### E. Long-Term Milestone Goals
- Goals track high-level targets (e.g., *Read 12 Books This Year*, *Exercise 150 Times*).
- Users can log progress using `+1 unit` and `+5 units` fast-buttons.
- Hitting 100% moves the goal to the **Completed Milestones** section and awards +150 XP.

---

## 5. Data Models Reference

Defined in [`src/types/index.ts`](file:///c:/Users/SHIJU%20JOHN/OneDrive/Desktop/trackora/src/types/index.ts):

```typescript
// Core Habit Definition
export interface Habit {
  id: string;
  name: string;
  description: string;
  category: 'health' | 'fitness' | 'mindfulness' | 'productivity' | 'learning' | 'lifestyle';
  frequency: 'daily' | 'weekdays' | 'weekends' | 'custom';
  target: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  currentStreak: number;
  bestStreak: number;
  completionRate: number;
  reminderTime?: string;
  preferredTimeOfDay: 'morning' | 'afternoon' | 'evening' | 'anytime';
  color: string;
  icon: string;
  completedToday: boolean;
  paused: boolean;
  history: { [dateStr: string]: boolean };
  createdAt: string;
  relatedGoalId?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

// Schedule Block Definition
export interface ScheduleItem {
  id: string;
  time: string; // "HH:MM"
  durationMinutes: number;
  name: string;
  category: HabitCategory;
  completed: boolean;
  reminderEnabled: boolean;
  color: string;
  icon: string;
  habitId?: string;
  notes?: string;
}

// Long-Term Goal
export interface Goal {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string; // YYYY-MM-DD
  progressPercentage: number;
  relatedHabitIds: string[];
  category: HabitCategory;
  completed: boolean;
  createdAt: string;
}
```

---

## 6. How to Run & Build

### Prerequisites
- Node.js `18.x` or higher
- npm `9.x` or higher

### Local Development
```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:3000)
npm run dev
```

> **Note for Windows PowerShell users:** If script execution policies restrict `npm.ps1`, use `npm.cmd run dev` or `npx.cmd vite`.

### Production Build
```bash
# Type check and build bundle
npm run build

# Preview production bundle locally
npm run preview
```
Production output is located in the `dist/` directory.

---

## 7. Roadmap & Recommendations for Incoming Team

If your team plans to transition this prototype into a full production SaaS with a backend:

1. **Database & API Layer**:
   - The data models in [`src/types/index.ts`](file:///c:/Users/SHIJU%20JOHN/OneDrive/Desktop/trackora/src/types/index.ts) map 1:1 to standard relational schemas (PostgreSQL / SQLite with Prisma or Supabase).
   - In [`src/context/AppContext.tsx`](file:///c:/Users/SHIJU%20JOHN/OneDrive/Desktop/trackora/src/context/AppContext.tsx), replace the `localStorage` setters with asynchronous React Query / SWR hooks or standard `fetch()` API calls to your endpoints.

2. **Authentication**:
   - Integrate authentication (e.g., Clerk, Supabase Auth, or NextAuth).
   - Connect the currently mocked `UserProfile` object to user session records.

3. **Push & Mobile Notifications**:
   - The application has frontend toggles for reminders. Connect Web Push Notifications (`service-worker.js`) or native push (via Capacitor or PWA manifest).

4. **Expanded AI / ML Coach**:
   - Connect the `SmartSuggestion` engine to an actual LLM / ML pipeline that analyzes long-term completion telemetry rather than mock heuristics.

---

## 8. Handover Sign-Off

- **Source Code Location:** `c:\Users\SHIJU JOHN\OneDrive\Desktop\trackora`
- **Build Status:** Verified passing with 0 errors (`tsc && vite build`)
- **Dev Server Status:** Live on port `3000`
- **Documentation:** [`README.md`](file:///c:/Users/SHIJU%20JOHN/OneDrive/Desktop/trackora/README.md) and [`HANDOVER.md`](file:///c:/Users/SHIJU%20JOHN/OneDrive/Desktop/trackora/HANDOVER.md)
