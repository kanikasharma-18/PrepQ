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
  Target,
  ChevronDown,
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

// ─── Helper ──────────────────────────────────────────────────────────────────

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

// ─── Accent Progress Bar (electric blue) ─────────────────────────────────────

function AccentBar({ value, max = 100, className = '', delay = 0.3 }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div
      className={`h-1.5 w-full rounded-full bg-black/[0.08] dark:bg-white/[0.08] overflow-hidden ${className}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemax={max}
    >
      <motion.div
        className="h-full rounded-full"
        style={{ background: 'linear-gradient(90deg, #38bdf8, #0ea5e9)' }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay }}
      />
    </div>
  )
}

// ─── Neutral Bar (for task progress where accent is used on checkboxes) ───────

function NeutralBar({ value, max = 100, delay = 0.2 }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const full = pct === 100
  return (
    <div
      className="h-1.5 w-full rounded-full bg-black/[0.08] dark:bg-white/[0.08] overflow-hidden"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemax={max}
    >
      <motion.div
        className="h-full rounded-full"
        style={{
          background: full
            ? 'linear-gradient(90deg, #38bdf8, #0ea5e9)'
            : 'linear-gradient(90deg, #38bdf8, #0ea5e9)',
        }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      />
    </div>
  )
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────

function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-[240px] shrink-0 border-r border-black/[0.06] dark:border-white/[0.06] bg-white/50 dark:bg-neutral-950/50 backdrop-blur-md sticky top-0 h-screen">
      {/* Logo */}
      <div className="px-7 h-16 flex items-center border-b border-black/[0.06] dark:border-white/[0.06]">
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
          <span className="text-base font-bold tracking-tight text-neutral-900 dark:text-white transition-colors duration-300">
            Prep<span className="text-sky-500 group-hover:text-sky-400 transition-colors duration-300">Q</span>
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="mt-5 px-4 flex-1">
        <p className="px-3 mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-500">
          Menu
        </p>

        {/* Active item */}
        <div className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-default select-none group">
          {/* Active pill */}
          <div className="absolute inset-0 rounded-xl bg-neutral-900 dark:bg-white/[0.06] border border-transparent dark:border-white/[0.08]" />
          {/* Blue left edge */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-sky-400" />
          <LayoutDashboard
            size={15}
            strokeWidth={2}
            className="relative text-white dark:text-white shrink-0"
          />
          <span className="relative text-[13px] font-semibold text-white dark:text-white">
            Overview
          </span>
        </div>
      </nav>

      {/* Footer */}
      <div className="px-4 pb-6">
        <div className="px-3 py-3 rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02]">
          <p className="text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">
            Goal deadline
          </p>
          <p className="text-sm font-bold text-neutral-800 dark:text-neutral-200">
            {currentGoal.daysRemaining} days left
          </p>
          <AccentBar value={currentGoal.progressPercent} max={100} className="mt-2" delay={0.8} />
        </div>
      </div>
    </aside>
  )
}

// ─── TopBar ──────────────────────────────────────────────────────────────────

function TopBar() {
  const { dark, toggleTheme } = useTheme()

  return (
    <header className="h-16 shrink-0 flex items-center justify-between px-6 lg:px-8 border-b border-black/[0.06] dark:border-white/[0.06] bg-white/50 dark:bg-neutral-950/50 backdrop-blur-md sticky top-0 z-30">
      {/* Mobile logo */}
      <Link to="/" className="flex items-center group cursor-pointer lg:hidden">
        <span className="text-base font-bold tracking-tight text-neutral-900 dark:text-white">
          Prep<span className="text-sky-500 group-hover:text-sky-400 transition-colors">Q</span>
        </span>
      </Link>

      {/* Desktop left — page title breadcrumb */}
      <div className="hidden lg:flex items-center gap-2">
        <span className="text-[13px] font-semibold text-neutral-400 dark:text-neutral-500">
          Dashboard
        </span>
        <ChevronRight size={13} className="text-neutral-300 dark:text-neutral-600" />
        <span className="text-[13px] font-semibold text-neutral-800 dark:text-neutral-200">
          Overview
        </span>
      </div>

      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="h-8 w-8 grid place-items-center rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.03] text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.06] active:scale-95 transition-all duration-200 cursor-pointer"
        >
          {dark ? <Sun size={13} /> : <Moon size={13} />}
        </button>

        {/* Notification bell */}
        <button
          type="button"
          aria-label="Notifications"
          className="h-8 w-8 grid place-items-center rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.03] text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.06] active:scale-95 transition-all duration-200 cursor-pointer relative"
        >
          <Bell size={13} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-sky-500 ring-[1.5px] ring-white dark:ring-neutral-950" />
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-black/[0.08] dark:bg-white/[0.08] mx-1" />

        {/* User avatar + name */}
        <button
          type="button"
          className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors duration-200 cursor-pointer group"
        >
          {/* Avatar with sky gradient */}
          <div className="h-7 w-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold select-none shrink-0"
            style={{ background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)' }}
          >
            {user.initials}
          </div>
          <span className="hidden sm:block text-[13px] font-semibold text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">
            {user.name}
          </span>
          <ChevronDown size={12} className="hidden sm:block text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors" />
        </button>
      </div>
    </header>
  )
}

// ─── GoalCard ────────────────────────────────────────────────────────────────

function GoalCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
      className="rounded-2xl border border-black/[0.06] dark:border-white/[0.07] bg-white/75 dark:bg-neutral-950/55 backdrop-blur-sm p-7 relative overflow-hidden"
    >
      {/* Subtle top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        {/* Left */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-sky-500/10 dark:bg-sky-400/10">
              <Target size={14} className="text-sky-500 dark:text-sky-400" />
            </span>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-500">
              Current Goal
            </p>
            <span className="ml-auto sm:hidden inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-500/10 dark:bg-sky-400/[0.08] text-sky-600 dark:text-sky-400 border border-sky-500/15 dark:border-sky-400/15">
              {currentGoal.daysRemaining}d left
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
            {currentGoal.title}
          </h2>

          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-neutral-800 dark:text-neutral-200">
                  {currentGoal.progressPercent}%
                </span>
                <span className="text-xs font-medium text-sky-600 dark:text-sky-400 bg-sky-500/8 dark:bg-sky-400/8 px-1.5 py-0.5 rounded-md">
                  on track
                </span>
              </div>
              <span className="text-[11px] font-medium text-neutral-400 dark:text-neutral-500">
                Biggest gap →{' '}
                <span className="text-neutral-700 dark:text-neutral-300 font-semibold">
                  {currentGoal.biggestGap}
                </span>
              </span>
            </div>
            <AccentBar value={currentGoal.progressPercent} max={100} delay={0.4} />
          </div>
        </div>

        {/* Right — days badge + CTA */}
        <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-4 shrink-0">
          <div className="hidden sm:flex flex-col items-end">
            <span className="font-display text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
              {currentGoal.daysRemaining}
            </span>
            <span className="text-[11px] font-medium text-neutral-400 dark:text-neutral-500 -mt-0.5">
              days remaining
            </span>
          </div>

          <button
            type="button"
            className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200 group cursor-pointer"
          >
            View Goal
            <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </button>
        </div>
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
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      className="rounded-2xl border border-black/[0.06] dark:border-white/[0.07] bg-white/75 dark:bg-neutral-950/55 backdrop-blur-sm p-7 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200/80 dark:via-white/[0.08] to-transparent" />

      {/* Two-column layout on md+ */}
      <div className="flex flex-col md:flex-row md:gap-12">

        {/* LEFT — focus context */}
        <div className="md:w-[45%] shrink-0">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-orange-500/10 dark:bg-orange-400/[0.08]">
              <Flame size={13} className="text-orange-500 dark:text-orange-400" />
            </span>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-500">
              Main Focus
            </p>
          </div>

          <h2 className="font-display text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
            {initialTodaysPlan.focus}
          </h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
            {initialTodaysPlan.subtitle}
          </p>

          {/* CTA */}
          <div className="mt-8">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.12),0_4px_12px_rgba(14,165,233,0.25)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.15),0_8px_20px_rgba(14,165,233,0.35)] hover:scale-[1.02] active:scale-[0.97] transition-all duration-300 cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)' }}
            >
              Start Today's Plan
              <ArrowRight size={14} className="shrink-0" />
            </button>
          </div>
        </div>

        {/* Divider (desktop only) */}
        <div className="hidden md:block w-px bg-black/[0.06] dark:bg-white/[0.06] my-1" />

        {/* RIGHT — tasks + progress */}
        <div className="flex-1 mt-8 md:mt-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-500 mb-4">
            Today's tasks
          </p>

          <div className="space-y-3">
            {tasks.map((task) => (
              <button
                key={task.id}
                type="button"
                onClick={() => toggleTask(task.id)}
                className="w-full flex items-center gap-3 group cursor-pointer text-left"
                aria-pressed={task.done}
              >
                {/* Checkbox */}
                <span
                  className={`shrink-0 w-[18px] h-[18px] rounded-[5px] flex items-center justify-center border transition-all duration-200 ${
                    task.done
                      ? 'border-sky-500 dark:border-sky-400'
                      : 'bg-transparent border-black/15 dark:border-white/15 group-hover:border-black/30 dark:group-hover:border-white/30'
                  }`}
                  style={task.done ? { background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)' } : {}}
                >
                  <AnimatePresence>
                    {task.done && (
                      <motion.svg
                        key="check"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        width="10"
                        height="8"
                        viewBox="0 0 10 8"
                        fill="none"
                      >
                        <path
                          d="M1 4L4 7L9 1"
                          stroke="white"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </motion.svg>
                    )}
                  </AnimatePresence>
                </span>

                <span
                  className={`text-[14px] font-medium transition-colors duration-200 ${
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
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                {completed} / {total} completed
              </span>
              <span className="text-xs font-semibold text-sky-600 dark:text-sky-400">
                {Math.round((completed / total) * 100)}%
              </span>
            </div>
            <NeutralBar value={completed} max={total} delay={0} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── WeeklyStatCard ──────────────────────────────────────────────────────────

function WeeklyStatCard({ stat, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className="rounded-2xl border border-black/[0.06] dark:border-white/[0.07] bg-white/75 dark:bg-neutral-950/55 backdrop-blur-sm p-5 relative overflow-hidden hover:border-black/10 dark:hover:border-white/[0.12] transition-colors duration-200 group"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200/60 dark:via-white/[0.07] to-transparent" />

      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-500 mb-3">
        {stat.label}
      </p>

      <p className="font-display text-2xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
        {stat.id === 'goal' ? `${stat.value}%` : `${stat.value} / ${stat.total}`}
      </p>
      <p className="mt-0.5 text-xs text-neutral-400 dark:text-neutral-500 font-medium">
        {stat.unit}
      </p>

      <div className="mt-3.5">
        <AccentBar value={stat.value} max={stat.total} delay={delay + 0.2} />
      </div>

      <div className="mt-2.5 flex items-center gap-1.5">
        {stat.trendUp ? (
          <TrendingUp size={11} className="text-sky-500 dark:text-sky-400 shrink-0" />
        ) : (
          <TrendingDown size={11} className="text-rose-400 dark:text-rose-400 shrink-0" />
        )}
        <span className={`text-[11px] font-semibold ${stat.trendUp ? 'text-sky-600 dark:text-sky-400' : 'text-rose-500 dark:text-rose-400'}`}>
          {stat.trend}
        </span>
      </div>
    </motion.div>
  )
}

// ─── FocusDriftCard ──────────────────────────────────────────────────────────

function FocusDriftCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
      className="rounded-2xl border border-amber-500/15 dark:border-amber-400/[0.12] bg-white/75 dark:bg-neutral-950/55 backdrop-blur-sm p-6 relative overflow-hidden h-full"
    >
      {/* Amber top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

      <div className="flex items-start gap-3 mb-3">
        <span className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-lg bg-amber-500/10 dark:bg-amber-400/[0.08] mt-0.5">
          <AlertTriangle size={13} className="text-amber-600 dark:text-amber-400" />
        </span>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-500">
            Focus Drift
          </p>
          <p className="mt-0.5 text-base font-bold text-neutral-800 dark:text-neutral-200">
            DSA activity ↓{focusDrift.activityDrop}%
          </p>
        </div>
      </div>

      <p className="text-[13px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
        {focusDrift.message}
      </p>

      <button
        type="button"
        className="mt-5 text-[13px] font-semibold text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 transition-colors duration-200 flex items-center gap-1.5 group cursor-pointer"
      >
        Fix My Plan
        <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
      </button>
    </motion.div>
  )
}

// ─── InsightCard ─────────────────────────────────────────────────────────────

function InsightCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.36 }}
      className="rounded-2xl border border-black/[0.06] dark:border-white/[0.07] bg-white/75 dark:bg-neutral-950/55 backdrop-blur-sm p-7 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" />

      <div className="flex items-start gap-7 flex-col sm:flex-row">
        <div className="shrink-0">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-sky-500/10 dark:bg-sky-400/[0.08]">
              <Sparkles size={13} className="text-sky-500 dark:text-sky-400" />
            </span>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-500">
              PrepQ Insight
            </p>
          </div>
        </div>
      </div>

      <p className="text-[15px] text-neutral-700 dark:text-neutral-300 leading-relaxed -mt-2">
        {aiInsight.text}
      </p>

      <div className="mt-5 flex items-center gap-4">
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-500/25 dark:border-sky-400/20 text-[13px] font-semibold text-sky-600 dark:text-sky-400 hover:bg-sky-500/8 dark:hover:bg-sky-400/8 hover:border-sky-500/40 dark:hover:border-sky-400/30 transition-all duration-200 cursor-pointer group"
        >
          Ask PrepQ
          <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
        </button>
      </div>
    </motion.div>
  )
}

// ─── DashboardOverviewPage ────────────────────────────────────────────────────

export default function DashboardOverviewPage() {
  return (
    <div className="min-h-screen bg-transparent text-neutral-900 dark:text-neutral-50 transition-colors duration-500 flex">

      {/* ── Background — same fixed layers as Landing/Login pages ── */}
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-[0.55] dark:opacity-[0.25] z-0" />
      <div className="fixed top-[-10%] left-[-15%] w-[65%] h-[55%] rounded-full bg-accent-100/15 dark:bg-accent-950/[0.05] blur-[150px] pointer-events-none z-0" />
      <div className="fixed top-[25%] right-[-10%] w-[55%] h-[45%] rounded-full bg-violet-100/12 dark:bg-violet-950/[0.04] blur-[150px] pointer-events-none z-0" />
      <div className="fixed bottom-[10%] left-[-5%] w-[50%] h-[45%] rounded-full bg-blue-100/10 dark:bg-blue-950/[0.03] blur-[150px] pointer-events-none z-0" />

      {/* ── Sidebar ── */}
      <Sidebar />

      {/* ── Main column ── */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <TopBar />

        <main className="flex-1 overflow-y-auto">
          <div className="px-6 lg:px-10 py-10 pb-20">

            {/* ── Greeting ─────────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-9"
            >
              <h1 className="font-display text-4xl sm:text-[2.6rem] font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.1]">
                {getGreeting()}, {user.name} 👋
              </h1>
              <p className="mt-2 text-[15px] text-neutral-500 dark:text-neutral-400 font-normal leading-relaxed">
                Here's what you need to focus on today.
              </p>
            </motion.div>

            {/* ── Current Goal — full width ─────────────────────────────── */}
            <section aria-labelledby="goal-heading" className="mb-6">
              <h2 id="goal-heading" className="sr-only">Current Goal</h2>
              <GoalCard />
            </section>

            {/* ── Section label ─────────────────────────────────────────── */}
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-500 mb-4">
              Today's Plan
            </p>

            {/* ── Today's Plan — full width ─────────────────────────────── */}
            <section aria-labelledby="todays-plan-heading" className="mb-6">
              <h2 id="todays-plan-heading" className="sr-only">Today's Plan</h2>
              <TodaysPlanCard />
            </section>

            {/* ── Middle row: Weekly Progress + Focus Drift ─────────────── */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 mb-6">

              {/* Weekly stats */}
              <section aria-labelledby="this-week-heading">
                <p
                  id="this-week-heading"
                  className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-500 mb-4"
                >
                  This Week
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-2 2xl:grid-cols-4 gap-3">
                  {weeklyStats.map((stat, i) => (
                    <WeeklyStatCard key={stat.id} stat={stat} delay={0.22 + i * 0.06} />
                  ))}
                </div>
              </section>

              {/* Focus Drift */}
              {focusDrift.detected && (
                <section aria-labelledby="focus-drift-heading" className="flex flex-col">
                  <p
                    id="focus-drift-heading"
                    className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-500 mb-4"
                  >
                    Alert
                  </p>
                  <FocusDriftCard />
                </section>
              )}
            </div>

            {/* ── PrepQ Insight — full width ────────────────────────────── */}
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
