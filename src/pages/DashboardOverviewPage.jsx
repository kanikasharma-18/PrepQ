import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bell,
  ChevronRight,
  Flame,
  ArrowRight,
  TrendingUp,
  Sparkles,
  AlertTriangle,
  LayoutDashboard,
  Moon,
  Sun,
  Target,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  X,
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

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

// Easing string for inline CSS transitions — matches the framer-motion curve
const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

// ─── Shared Progress Bar ─────────────────────────────────────────────────────
// Thin, neutral, elegant — matches Landing Page minimal aesthetic.
// Fill is near-black (light mode) / near-white (dark mode).
// The accent-500 tint on the fill tip is barely visible — keeps it monochrome.

function ProgressBar({ value, max = 100, delay = 0.3 }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div
      className="h-[3px] w-full rounded-full bg-black/[0.07] dark:bg-white/[0.07] overflow-hidden"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemax={max}
    >
      <motion.div
        className="h-full rounded-full bg-neutral-900 dark:bg-neutral-200"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay }}
      />
    </div>
  )
}

// ─── Sidebar Nav Content ──────────────────────────────────────────────────────
// Extracted so it can be reused in both desktop sidebar and mobile drawer.

function SidebarContent({ collapsed, onToggle, onClose }) {
  return (
    <>
      {/* Header — logo + collapse toggle */}
      <div className="h-16 flex items-center justify-between border-b border-black/[0.05] dark:border-white/[0.06] px-4 shrink-0">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group cursor-pointer min-w-0"
          onClick={onClose}
        >
          {/* Always show the "P" monogram icon */}
          <span className="shrink-0 w-6 h-6 rounded-md bg-neutral-900 dark:bg-white flex items-center justify-center text-white dark:text-neutral-950 text-[11px] font-extrabold leading-none select-none">
            P
          </span>
          {/* Wordmark fades out when collapsed */}
          <span
            className="font-bold tracking-tight text-neutral-900 dark:text-white text-[15px] whitespace-nowrap overflow-hidden"
            style={{
              maxWidth: collapsed ? 0 : 120,
              opacity: collapsed ? 0 : 1,
              transition: `opacity 0.15s ease, max-width 0.25s ${EASE}`,
            }}
          >
            rep<span className="text-accent-500">Q</span>
          </span>
        </Link>

        {/* Collapse toggle — desktop only */}
        {onToggle && (
          <button
            type="button"
            onClick={onToggle}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="hidden lg:grid shrink-0 w-6 h-6 place-items-center rounded-md text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-all duration-200 cursor-pointer"
          >
            {collapsed ? <PanelLeftOpen size={13} /> : <PanelLeftClose size={13} />}
          </button>
        )}

        {/* Mobile close button */}
        {onClose && !onToggle && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="lg:hidden grid w-6 h-6 place-items-center rounded-md text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 cursor-pointer"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 pt-5">
        {!collapsed && (
          <p className="px-3 mb-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-neutral-400 dark:text-neutral-600 select-none">
            Menu
          </p>
        )}

        {/* Overview — only implemented page */}
        <div
          className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-default select-none overflow-hidden"
          title={collapsed ? 'Overview' : undefined}
        >
          {/* Active background */}
          <div className="absolute inset-0 rounded-xl bg-neutral-900 dark:bg-white/[0.07] border border-transparent dark:border-white/[0.08]" />
          {/* Accent left pip */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-r-full bg-accent-500" />

          <LayoutDashboard
            size={14}
            strokeWidth={2}
            className="relative shrink-0 text-white dark:text-white"
          />

          <span
            className="relative text-[13px] font-semibold text-white dark:text-white whitespace-nowrap overflow-hidden"
            style={{
              maxWidth: collapsed ? 0 : 160,
              opacity: collapsed ? 0 : 1,
              transition: `opacity 0.12s ease, max-width 0.25s ${EASE}`,
            }}
          >
            Overview
          </span>
        </div>
      </nav>

      {/* Bottom goal mini-widget — only when expanded */}
      <div
        className="px-2 pb-5 overflow-hidden"
        style={{
          opacity: collapsed ? 0 : 1,
          transition: `opacity 0.15s ease`,
          pointerEvents: collapsed ? 'none' : 'auto',
        }}
      >
        <div className="px-3 py-3 rounded-xl border border-black/[0.05] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02]">
          <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-500 mb-0.5">
            Current goal
          </p>
          <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 truncate">
            {currentGoal.title}
          </p>
          <div className="flex items-center justify-between mt-2 mb-1.5">
            <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">
              {currentGoal.progressPercent}%
            </span>
            <span className="text-[10px] text-neutral-400 dark:text-neutral-500">
              {currentGoal.daysRemaining}d left
            </span>
          </div>
          <ProgressBar value={currentGoal.progressPercent} max={100} delay={0.9} />
        </div>
      </div>
    </>
  )
}

// ─── Sidebar (Desktop) ────────────────────────────────────────────────────────

function Sidebar({ collapsed, onToggle }) {
  return (
    <aside
      className="hidden lg:flex flex-col shrink-0 border-r border-black/[0.05] dark:border-white/[0.06] bg-white/55 dark:bg-neutral-950/55 backdrop-blur-md sticky top-0 h-screen overflow-hidden"
      style={{
        width: collapsed ? 68 : 248,
        minWidth: collapsed ? 68 : 248,
        transition: `width 0.25s ${EASE}, min-width 0.25s ${EASE}`,
      }}
    >
      <SidebarContent collapsed={collapsed} onToggle={onToggle} />
    </aside>
  )
}

// ─── Mobile Drawer ────────────────────────────────────────────────────────────

function MobileDrawer({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 dark:bg-black/60 z-40 lg:hidden"
            onClick={onClose}
          />
          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-0 top-0 bottom-0 w-[248px] z-50 lg:hidden flex flex-col border-r border-black/[0.05] dark:border-white/[0.06] bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl"
          >
            <SidebarContent collapsed={false} onClose={onClose} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── TopBar ───────────────────────────────────────────────────────────────────

function TopBar({ onMenuOpen }) {
  const { dark, toggleTheme } = useTheme()

  return (
    <header className="h-16 shrink-0 flex items-center justify-between px-5 lg:px-7 border-b border-black/[0.05] dark:border-white/[0.06] bg-white/55 dark:bg-neutral-950/55 backdrop-blur-md sticky top-0 z-30">
      {/* Mobile: hamburger */}
      <button
        type="button"
        onClick={onMenuOpen}
        aria-label="Open navigation"
        className="lg:hidden h-8 w-8 grid place-items-center rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors cursor-pointer"
      >
        <Menu size={15} />
      </button>

      {/* Mobile: logo */}
      <Link to="/" className="flex items-center group cursor-pointer lg:hidden">
        <span className="text-[15px] font-bold tracking-tight text-neutral-900 dark:text-white">
          Prep<span className="text-accent-500 group-hover:text-accent-400 transition-colors">Q</span>
        </span>
      </Link>

      {/* Desktop: breadcrumb */}
      <div className="hidden lg:flex items-center gap-1.5">
        <span className="text-[13px] font-medium text-neutral-400 dark:text-neutral-500">
          Dashboard
        </span>
        <ChevronRight size={12} className="text-neutral-300 dark:text-neutral-600" />
        <span className="text-[13px] font-semibold text-neutral-700 dark:text-neutral-300">
          Overview
        </span>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-1.5">
        {/* Theme toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="h-8 w-8 grid place-items-center rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.02] text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.05] active:scale-95 transition-all duration-200 cursor-pointer"
        >
          {dark ? <Sun size={13} /> : <Moon size={13} />}
        </button>

        {/* Notification bell */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative h-8 w-8 grid place-items-center rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.02] text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.05] active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <Bell size={13} />
          {/* Tiny accent dot */}
          <span className="absolute top-[7px] right-[7px] w-1.5 h-1.5 rounded-full bg-accent-500 ring-[1.5px] ring-white dark:ring-neutral-950" />
        </button>

        {/* Divider */}
        <div className="w-px h-4 bg-black/[0.08] dark:bg-white/[0.08] mx-1" />

        {/* Profile */}
        <button
          type="button"
          className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-black/[0.04] dark:hover:bg-white/[0.03] transition-colors duration-200 cursor-pointer group"
        >
          {/* Avatar — neutral, matches Login/Signup pages */}
          <div className="h-7 w-7 rounded-full bg-neutral-900 dark:bg-white flex items-center justify-center text-white dark:text-neutral-950 text-[11px] font-bold select-none shrink-0 group-hover:opacity-85 transition-opacity">
            {user.initials}
          </div>
          <span className="hidden sm:block text-[13px] font-semibold text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
            {user.name}
          </span>
          <ChevronDown size={11} className="hidden sm:block text-neutral-400 dark:text-neutral-500" />
        </button>
      </div>
    </header>
  )
}

// ─── GoalCard ─────────────────────────────────────────────────────────────────

function GoalCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
      className="rounded-2xl border border-black/[0.05] dark:border-white/[0.06] bg-white/75 dark:bg-neutral-950/60 backdrop-blur-md p-7 relative overflow-hidden hover:border-black/[0.08] dark:hover:border-white/[0.09] transition-colors duration-300"
    >
      {/* Subtle top hairline — matches Login/Signup card */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/[0.15] to-transparent" />

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
        {/* Left column */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-neutral-100 dark:bg-white/[0.06]">
              <Target size={13} className="text-neutral-500 dark:text-neutral-400" />
            </span>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400 dark:text-neutral-500">
              Current Goal
            </p>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.1]">
            {currentGoal.title}
          </h2>

          <div className="mt-5">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[13px] font-semibold text-neutral-700 dark:text-neutral-300">
                {currentGoal.progressPercent}% on track
              </span>
              <span className="text-[11px] font-medium text-neutral-400 dark:text-neutral-500">
                Biggest gap →{' '}
                <span className="text-neutral-700 dark:text-neutral-300 font-semibold">
                  {currentGoal.biggestGap}
                </span>
              </span>
            </div>
            <ProgressBar value={currentGoal.progressPercent} max={100} delay={0.45} />
          </div>
        </div>

        {/* Right column */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 sm:gap-4 sm:shrink-0 sm:pl-8">
          <div className="sm:text-right">
            <p className="font-display text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-none">
              {currentGoal.daysRemaining}
            </p>
            <p className="text-[11px] font-medium text-neutral-400 dark:text-neutral-500 mt-0.5">
              days remaining
            </p>
          </div>
          <button
            type="button"
            className="flex items-center gap-1 text-[12px] font-semibold text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200 group cursor-pointer whitespace-nowrap"
          >
            View Goal
            <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ─── TodaysPlanCard ───────────────────────────────────────────────────────────

function TodaysPlanCard() {
  const [tasks, setTasks] = useState(initialTodaysPlan.tasks)
  const completed = tasks.filter((t) => t.done).length
  const total = tasks.length

  const toggleTask = (id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
      className="rounded-2xl border border-black/[0.05] dark:border-white/[0.06] bg-white/75 dark:bg-neutral-950/60 backdrop-blur-md p-7 relative overflow-hidden hover:border-black/[0.08] dark:hover:border-white/[0.09] transition-colors duration-300"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/[0.15] to-transparent" />

      {/* Two-column split on md+ */}
      <div className="flex flex-col md:flex-row md:gap-12 md:divide-x md:divide-black/[0.04] md:dark:divide-white/[0.05]">

        {/* LEFT — focus label + CTA */}
        <div className="md:w-[42%] shrink-0 md:pr-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-neutral-100 dark:bg-white/[0.06]">
              <Flame size={13} className="text-neutral-500 dark:text-neutral-400" />
            </span>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400 dark:text-neutral-500">
              Main Focus
            </p>
          </div>

          <h2 className="font-display text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
            {initialTodaysPlan.focus}
          </h2>
          <p className="mt-2 text-[14px] text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
            {initialTodaysPlan.subtitle}
          </p>

          {/* CTA — exact Landing Page button style */}
          <div className="mt-8">
            <button
              type="button"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-b from-neutral-900 to-black dark:from-white dark:to-neutral-100 text-white dark:text-neutral-950 text-[13px] font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.08),0_6px_14px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.12),0_10px_22px_rgba(0,0,0,0.08)] hover:scale-[1.02] active:scale-[0.97] transition-all duration-300 cursor-pointer"
            >
              Start Today's Plan
              <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* RIGHT — tasks + progress */}
        <div className="flex-1 mt-8 md:mt-0 md:pl-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400 dark:text-neutral-500 mb-4">
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
                {/* Checkbox — neutral, no blue */}
                <span
                  className={`shrink-0 w-[18px] h-[18px] rounded-[5px] flex items-center justify-center border transition-all duration-200 ${
                    task.done
                      ? 'bg-neutral-900 dark:bg-white border-neutral-900 dark:border-white'
                      : 'bg-transparent border-black/[0.15] dark:border-white/[0.15] group-hover:border-black/30 dark:group-hover:border-white/30'
                  }`}
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
                          className="dark:stroke-neutral-950"
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
              <span className="text-[12px] font-semibold text-neutral-500 dark:text-neutral-400">
                {completed} / {total} completed
              </span>
              <span className="text-[12px] font-semibold text-neutral-500 dark:text-neutral-400">
                {Math.round((completed / total) * 100)}%
              </span>
            </div>
            <ProgressBar value={completed} max={total} delay={0} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── WeeklyProgressCard ───────────────────────────────────────────────────────
// Single card, list layout — feels editorial not dashboard-y

function WeeklyProgressCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.20 }}
      className="rounded-2xl border border-black/[0.05] dark:border-white/[0.06] bg-white/75 dark:bg-neutral-950/60 backdrop-blur-md p-7 relative overflow-hidden hover:border-black/[0.08] dark:hover:border-white/[0.09] transition-colors duration-300 h-full"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/[0.15] to-transparent" />

      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400 dark:text-neutral-500 mb-6">
        This Week
      </p>

      <div className="space-y-5">
        {weeklyStats.map((stat, i) => {
          const pct = Math.min(100, (stat.value / stat.total) * 100)
          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.28 + i * 0.07 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] font-semibold text-neutral-700 dark:text-neutral-300">
                  {stat.label}
                </span>
                <div className="flex items-center gap-2.5">
                  <span className="text-[13px] font-bold text-neutral-950 dark:text-white tabular-nums">
                    {stat.id === 'goal'
                      ? `${stat.value}%`
                      : `${stat.value} / ${stat.total}`}
                  </span>
                  <span className="flex items-center gap-0.5 text-[11px] font-semibold text-neutral-400 dark:text-neutral-500">
                    <TrendingUp size={10} />
                    {stat.trend}
                  </span>
                </div>
              </div>
              <ProgressBar value={stat.value} max={stat.total} delay={0.32 + i * 0.07} />
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

// ─── FocusDriftCard ───────────────────────────────────────────────────────────

function FocusDriftCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.24 }}
      className="rounded-2xl border border-black/[0.05] dark:border-white/[0.06] bg-white/75 dark:bg-neutral-950/60 backdrop-blur-md p-7 relative overflow-hidden hover:border-black/[0.08] dark:hover:border-white/[0.09] transition-colors duration-300 h-full"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/[0.15] to-transparent" />

      <div className="flex items-start gap-3 mb-4">
        <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-lg bg-neutral-100 dark:bg-white/[0.06] mt-0.5">
          <AlertTriangle size={13} className="text-neutral-500 dark:text-neutral-400" />
        </span>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400 dark:text-neutral-500">
            Focus Drift
          </p>
          <p className="mt-1 text-[15px] font-bold text-neutral-800 dark:text-neutral-200 leading-tight">
            DSA activity ↓ {focusDrift.activityDrop}%
          </p>
        </div>
      </div>

      <p className="text-[13px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
        {focusDrift.message}
      </p>

      <button
        type="button"
        className="mt-6 group flex items-center gap-1.5 text-[13px] font-semibold text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors duration-200 cursor-pointer"
      >
        Fix My Plan
        <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
      </button>
    </motion.div>
  )
}

// ─── InsightCard ──────────────────────────────────────────────────────────────

function InsightCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.30 }}
      className="rounded-2xl border border-black/[0.05] dark:border-white/[0.06] bg-white/75 dark:bg-neutral-950/60 backdrop-blur-md p-7 relative overflow-hidden hover:border-black/[0.08] dark:hover:border-white/[0.09] transition-colors duration-300"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/[0.15] to-transparent" />

      <div className="flex items-center gap-2.5 mb-4">
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-neutral-100 dark:bg-white/[0.06]">
          <Sparkles size={13} className="text-accent-500" />
        </span>
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400 dark:text-neutral-500">
          PrepQ Insight
        </p>
      </div>

      <p className="text-[15px] text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-2xl">
        {aiInsight.text}
      </p>

      {/* CTA — secondary/ghost style, matching Landing Page secondary button */}
      <button
        type="button"
        className="mt-5 group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-white/50 dark:bg-white/[0.02] text-[13px] font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-white/80 dark:hover:bg-white/[0.05] hover:border-black/15 dark:hover:border-white/15 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 cursor-pointer"
      >
        Ask PrepQ
        <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5" />
      </button>
    </motion.div>
  )
}

// ─── DashboardOverviewPage ────────────────────────────────────────────────────

export default function DashboardOverviewPage() {
  // Sidebar: expanded on desktop, collapsed on tablets (lg=false by default for ≤1024px is handled by CSS)
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-transparent text-neutral-900 dark:text-neutral-50 transition-colors duration-500 flex">

      {/* ── Background layers — identical to Landing/Login/Signup ── */}
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-[0.55] dark:opacity-[0.25] z-0" />
      <div className="fixed top-[-10%] left-[-15%] w-[65%] h-[55%] rounded-full bg-accent-100/15 dark:bg-accent-950/[0.05] blur-[150px] pointer-events-none z-0" />
      <div className="fixed top-[25%] right-[-10%] w-[55%] h-[45%] rounded-full bg-violet-100/12 dark:bg-violet-950/[0.04] blur-[150px] pointer-events-none z-0" />
      <div className="fixed bottom-[10%] left-[-5%] w-[50%] h-[45%] rounded-full bg-blue-100/10 dark:bg-blue-950/[0.03] blur-[150px] pointer-events-none z-0" />

      {/* ── Mobile drawer ── */}
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* ── Desktop sidebar ── */}
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((p) => !p)} />

      {/* ── Main column — flex-1 so it auto-expands when sidebar collapses ── */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <TopBar onMenuOpen={() => setMobileOpen(true)} />

        <main className="flex-1 overflow-y-auto">
          <div className="px-5 sm:px-7 lg:px-9 py-10 pb-24">

            {/* ── Greeting ─────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-9"
            >
              <h1 className="font-display text-[2.25rem] sm:text-[2.6rem] font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.1]">
                {getGreeting()}, {user.name} 👋
              </h1>
              <p className="mt-2.5 text-[15px] text-neutral-500 dark:text-neutral-400 font-normal leading-relaxed">
                Here's what you need to focus on today.
              </p>
            </motion.div>

            {/* ── Current Goal — full width ─────────────────────── */}
            <section aria-labelledby="goal-heading" className="mb-5">
              <h2 id="goal-heading" className="sr-only">Current Goal</h2>
              <GoalCard />
            </section>

            {/* ── Today's Plan — full width ────────────────────── */}
            <section aria-labelledby="todays-plan-heading" className="mb-5">
              <h2 id="todays-plan-heading" className="sr-only">Today's Plan</h2>
              <TodaysPlanCard />
            </section>

            {/* ── Two-column: Weekly Progress + Focus Drift ─────── */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5 mb-5">
              <section aria-labelledby="weekly-heading">
                <h2 id="weekly-heading" className="sr-only">Weekly Progress</h2>
                <WeeklyProgressCard />
              </section>

              {focusDrift.detected && (
                <section aria-labelledby="focus-drift-heading">
                  <h2 id="focus-drift-heading" className="sr-only">Focus Drift</h2>
                  <FocusDriftCard />
                </section>
              )}
            </div>

            {/* ── PrepQ Insight — full width ───────────────────── */}
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
