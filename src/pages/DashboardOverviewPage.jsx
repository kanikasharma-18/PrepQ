import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bell,
  ChevronRight,
  Flame,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Sparkles,
  AlertTriangle,
  LayoutDashboard,
  Moon,
  Sun,
} from 'lucide-react'
import { useTheme } from '../hooks/useTheme.js'
import {
  user,
  currentGoal,
  todaysPlan as initialTodaysPlan,
  weeklyStats,
  focusDrift,
  aiInsight,
} from '../data/dashboardData.js'

// ─── Tiny helpers ────────────────────────────────────────────────────────────

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

// ─── ProgressBar ─────────────────────────────────────────────────────────────

function ProgressBar({ value, max = 100, className = '' }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div
      className={`h-1.5 w-full rounded-full bg-black/[0.07] dark:bg-white/[0.08] overflow-hidden ${className}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemax={max}
    >
      <motion.div
        className="h-full rounded-full bg-neutral-900 dark:bg-white"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      />
    </div>
  )
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────

function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r border-black/[0.05] dark:border-white/[0.06] bg-white/40 dark:bg-neutral-950/40 backdrop-blur-sm min-h-screen pt-0 pb-8">
      {/* Logo — matches existing PrepQ wordmark pattern */}
      <div className="px-6 h-[61px] flex items-center border-b border-black/[0.05] dark:border-white/[0.06]">
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
          <span className="text-[15px] font-bold tracking-tight text-neutral-900 dark:text-white transition-colors duration-300">
            Prep<span className="text-accent-500 group-hover:text-accent-400 transition-colors duration-300">Q</span>
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="mt-6 px-3 flex-1">
        <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
          Navigation
        </p>
        <div className="space-y-0.5">
          {/* Overview — only nav item (others not implemented) */}
          <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 cursor-default select-none">
            <LayoutDashboard size={14} strokeWidth={2} />
            <span className="text-sm font-semibold">Overview</span>
          </div>
        </div>
      </nav>
    </aside>
  )
}

// ─── TopBar ──────────────────────────────────────────────────────────────────

function TopBar() {
  const { dark, toggleTheme } = useTheme()

  return (
    <header className="h-[61px] shrink-0 flex items-center justify-between px-6 border-b border-black/[0.05] dark:border-white/[0.06] bg-white/40 dark:bg-neutral-950/40 backdrop-blur-sm sticky top-0 z-30">
      {/* Mobile logo */}
      <Link to="/" className="flex items-center gap-2 group cursor-pointer lg:hidden">
        <span className="text-[15px] font-bold tracking-tight text-neutral-900 dark:text-white">
          Prep<span className="text-accent-500 group-hover:text-accent-400 transition-colors">Q</span>
        </span>
      </Link>
      {/* Desktop: empty left side (sidebar has logo) */}
      <div className="hidden lg:block" />

      <div className="flex items-center gap-2.5">
        {/* Theme toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="h-8 w-8 grid place-items-center rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-white/50 dark:bg-white/[0.02] text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-white/[0.06] active:scale-95 transition-all duration-300 cursor-pointer"
        >
          {dark ? <Sun size={13} /> : <Moon size={13} />}
        </button>

        {/* Notification bell */}
        <button
          type="button"
          aria-label="Notifications"
          className="h-8 w-8 grid place-items-center rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-white/50 dark:bg-white/[0.02] text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-white/[0.06] active:scale-95 transition-all duration-300 cursor-pointer relative"
        >
          <Bell size={13} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-accent-500 ring-2 ring-white dark:ring-neutral-950" />
        </button>

        {/* User avatar */}
        <div className="flex items-center gap-2 pl-1 cursor-pointer group">
          <div className="h-7 w-7 rounded-full bg-neutral-900 dark:bg-white flex items-center justify-center text-white dark:text-neutral-950 text-[11px] font-bold select-none group-hover:opacity-80 transition-opacity">
            {user.initials}
          </div>
          <span className="hidden sm:block text-sm font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">
            {user.name}
          </span>
        </div>
      </div>
    </header>
  )
}

// ─── GoalCard ────────────────────────────────────────────────────────────────

function GoalCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="rounded-2xl border border-black/[0.06] dark:border-white/[0.07] bg-white/70 dark:bg-neutral-950/50 backdrop-blur-sm p-6 relative overflow-hidden"
    >
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-300/60 dark:via-white/[0.12] to-transparent" />

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-1">
            Current Goal
          </p>
          <h2 className="font-display text-xl font-extrabold tracking-tight text-neutral-950 dark:text-white truncate">
            {currentGoal.title}
          </h2>
          <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
            {currentGoal.daysRemaining} days remaining
          </p>
        </div>

        <button
          type="button"
          className="shrink-0 flex items-center gap-1 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors duration-200 group cursor-pointer"
        >
          View Goal
          <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
        </button>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            {currentGoal.progressPercent}% on track
          </span>
          <span className="text-[10px] font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
            Biggest gap →{' '}
            <span className="text-neutral-700 dark:text-neutral-300 font-semibold">{currentGoal.biggestGap}</span>
          </span>
        </div>
        <ProgressBar value={currentGoal.progressPercent} max={100} />
      </div>
    </motion.div>
  )
}

// ─── TodaysPlanCard ──────────────────────────────────────────────────────────

function TodaysPlanCard() {
  const [tasks, setTasks] = useState(initialTodaysPlan.tasks)

  const completed = tasks.filter((t) => t.done).length
  const total = tasks.length

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
      className="rounded-2xl border border-black/[0.06] dark:border-white/[0.07] bg-white/70 dark:bg-neutral-950/50 backdrop-blur-sm p-6 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-300/60 dark:via-white/[0.12] to-transparent" />

      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <Flame size={14} className="text-neutral-600 dark:text-neutral-400 shrink-0" />
        <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
          Main Focus
        </p>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
            {initialTodaysPlan.focus}
          </h2>
          <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
            {initialTodaysPlan.subtitle}
          </p>
        </div>
      </div>

      {/* Tasks */}
      <div className="mt-5 space-y-2.5">
        {tasks.map((task) => (
          <button
            key={task.id}
            type="button"
            onClick={() => toggleTask(task.id)}
            className="w-full flex items-center gap-3 group cursor-pointer"
            aria-pressed={task.done}
          >
            {/* Checkbox */}
            <span
              className={`shrink-0 w-4 h-4 rounded flex items-center justify-center border transition-all duration-200 ${
                task.done
                  ? 'bg-neutral-900 dark:bg-white border-neutral-900 dark:border-white'
                  : 'bg-transparent border-black/20 dark:border-white/20 group-hover:border-black/40 dark:group-hover:border-white/40'
              }`}
            >
              <AnimatePresence>
                {task.done && (
                  <motion.svg
                    key="check"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    width="9"
                    height="7"
                    viewBox="0 0 9 7"
                    fill="none"
                  >
                    <path
                      d="M1 3.5L3.5 6L8 1"
                      stroke="white"
                      className="dark:stroke-neutral-950"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                )}
              </AnimatePresence>
            </span>

            <span
              className={`text-sm font-medium transition-colors duration-200 ${
                task.done
                  ? 'line-through text-neutral-400 dark:text-neutral-500'
                  : 'text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-950 dark:group-hover:text-white'
              }`}
            >
              {task.label}
            </span>
          </button>
        ))}
      </div>

      {/* Progress */}
      <div className="mt-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
            {completed} / {total} completed
          </span>
        </div>
        <ProgressBar value={completed} max={total} />
      </div>

      {/* CTA */}
      <div className="mt-5 flex justify-end">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-b from-neutral-900 to-black dark:from-white dark:to-neutral-100 text-white dark:text-neutral-950 text-xs font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.12),0_8px_20px_rgba(0,0,0,0.06)] hover:scale-[1.02] active:scale-[0.97] transition-all duration-300 cursor-pointer"
        >
          Start Today's Plan
          <ArrowRight size={12} className="shrink-0" />
        </button>
      </div>
    </motion.div>
  )
}

// ─── FocusDriftCard ──────────────────────────────────────────────────────────

function FocusDriftCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.26 }}
      className="rounded-2xl border border-black/[0.06] dark:border-white/[0.07] bg-white/70 dark:bg-neutral-950/50 backdrop-blur-sm p-5 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-300/60 dark:via-white/[0.12] to-transparent" />

      <div className="flex items-start gap-2.5 mb-3">
        <AlertTriangle
          size={13}
          strokeWidth={2}
          className="shrink-0 mt-0.5 text-neutral-500 dark:text-neutral-400"
        />
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            Focus Drift
          </p>
          <p className="mt-0.5 text-sm font-semibold text-neutral-800 dark:text-neutral-200">
            Activity ↓ {focusDrift.activityDrop}%
          </p>
        </div>
      </div>

      <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
        {focusDrift.message}
      </p>

      <button
        type="button"
        className="mt-4 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors duration-200 flex items-center gap-1 group cursor-pointer"
      >
        Fix My Plan
        <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
      </button>
    </motion.div>
  )
}

// ─── WeeklyStatCard ──────────────────────────────────────────────────────────

function WeeklyStatCard({ stat, delay = 0 }) {
  const pct = Math.min(100, (stat.value / stat.total) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
      className="rounded-2xl border border-black/[0.06] dark:border-white/[0.07] bg-white/70 dark:bg-neutral-950/50 backdrop-blur-sm p-4 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-300/40 dark:via-white/[0.08] to-transparent" />

      <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-2">
        {stat.label}
      </p>

      <p className="font-display text-2xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
        {stat.id === 'goal' ? `${stat.value}%` : `${stat.value} / ${stat.total}`}
      </p>
      <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
        {stat.unit}
      </p>

      <div className="mt-3">
        <ProgressBar value={stat.value} max={stat.total} />
      </div>

      <div className="mt-2 flex items-center gap-1">
        {stat.trendUp ? (
          <TrendingUp size={11} className="text-neutral-500 dark:text-neutral-400 shrink-0" />
        ) : (
          <TrendingDown size={11} className="text-neutral-500 dark:text-neutral-400 shrink-0" />
        )}
        <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">
          {stat.trend}
        </span>
      </div>
    </motion.div>
  )
}

// ─── InsightCard ─────────────────────────────────────────────────────────────

function InsightCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.42 }}
      className="rounded-2xl border border-black/[0.06] dark:border-white/[0.07] bg-white/70 dark:bg-neutral-950/50 backdrop-blur-sm p-6 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-300/60 dark:via-white/[0.12] to-transparent" />

      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={13} className="text-neutral-500 dark:text-neutral-400 shrink-0" />
        <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
          PrepQ Insight
        </p>
      </div>

      <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
        {aiInsight.text}
      </p>

      <button
        type="button"
        className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors duration-200 group cursor-pointer"
      >
        Ask PrepQ
        <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform duration-200" />
      </button>
    </motion.div>
  )
}

// ─── DashboardOverviewPage ────────────────────────────────────────────────────

export default function DashboardOverviewPage() {
  return (
    <div className="min-h-screen bg-transparent text-neutral-900 dark:text-neutral-50 transition-colors duration-500 flex">
      {/* Background — matches Landing/Login pages exactly */}
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-[0.55] dark:opacity-[0.25] z-0" />
      <div className="fixed top-[-10%] left-[-15%] w-[65%] h-[55%] rounded-full bg-accent-100/15 dark:bg-accent-950/[0.05] blur-[150px] pointer-events-none z-0" />
      <div className="fixed top-[25%] right-[-10%] w-[55%] h-[45%] rounded-full bg-violet-100/12 dark:bg-violet-950/[0.04] blur-[150px] pointer-events-none z-0" />
      <div className="fixed bottom-[10%] left-[-5%] w-[50%] h-[45%] rounded-full bg-blue-100/10 dark:bg-blue-950/[0.03] blur-[150px] pointer-events-none z-0" />

      {/* Sidebar */}
      <Sidebar />

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <TopBar />

        {/* Scrollable content area */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 pb-20 space-y-10">

            {/* ── Page header ─────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
                {getGreeting()}, {user.name} 👋
              </h1>
              <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400 font-normal leading-relaxed">
                Here's what you need to focus on today.
              </p>
            </motion.div>

            {/* ── Current Goal ────────────────────────────────────────── */}
            <section aria-labelledby="goal-heading">
              <h2 id="goal-heading" className="sr-only">Current Goal</h2>
              <GoalCard />
            </section>

            {/* ── Today's Plan ─────────────────────────────────────────── */}
            <section aria-labelledby="todays-plan-heading">
              <div className="flex items-center justify-between mb-4">
                <h2
                  id="todays-plan-heading"
                  className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400"
                >
                  Today's Plan
                </h2>
              </div>
              <TodaysPlanCard />
            </section>

            {/* ── Focus Drift ──────────────────────────────────────────── */}
            {focusDrift.detected && (
              <section aria-labelledby="focus-drift-heading">
                <h2 id="focus-drift-heading" className="sr-only">Focus Drift</h2>
                <FocusDriftCard />
              </section>
            )}

            {/* ── This Week ────────────────────────────────────────────── */}
            <section aria-labelledby="this-week-heading">
              <div className="flex items-center justify-between mb-4">
                <h2
                  id="this-week-heading"
                  className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400"
                >
                  This Week
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {weeklyStats.map((stat, i) => (
                  <WeeklyStatCard key={stat.id} stat={stat} delay={0.3 + i * 0.06} />
                ))}
              </div>
            </section>

            {/* ── PrepQ Insight ─────────────────────────────────────────── */}
            <section aria-labelledby="insight-heading">
              <h2 id="insight-heading" className="sr-only">PrepQ Insight</h2>
              <InsightCard />
            </section>

          </div>
        </main>
      </div>
    </div>
  )
}
