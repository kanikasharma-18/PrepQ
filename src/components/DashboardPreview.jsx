import { motion } from 'framer-motion'
import {
  TrendingUp,
  Flame,
  GitCommit,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'

const stats = [
  { label: 'Readiness score', value: '78%', icon: TrendingUp },
  { label: 'Day streak', value: '23', icon: Flame },
  { label: 'Commits this week', value: '41', icon: GitCommit },
  { label: 'Goals on track', value: '6/8', icon: CheckCircle2 },
]

const skillBars = [
  { label: 'Data Structures', value: 82 },
  { label: 'System Design', value: 54 },
  { label: 'DBMS', value: 67 },
  { label: 'Operating Systems', value: 45 },
]

const activity = [
  { label: 'Solved "Merge Intervals" on LeetCode', time: '2h ago' },
  { label: 'Pushed 3 commits to orion-tracker', time: '5h ago' },
  { label: 'Completed Weekly Review', time: '1d ago' },
]

function DashboardPreview() {
  return (
    <section className="px-6 py-24 bg-neutral-100/40 dark:bg-neutral-900/10 border-y border-black/[0.03] dark:border-white/[0.04]">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white"
        >
          Your Personal Developer Growth Dashboard
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed"
        >
          See your readiness score, weak areas, and weekly progress in one
          clean view, updated automatically as you code.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14"
        >
          <div className="rounded-2xl border border-black/[0.05] dark:border-white/[0.08] bg-white/70 dark:bg-neutral-950/50 backdrop-blur-xl shadow-[0_24px_50px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.01)] dark:shadow-[0_24px_50px_rgba(0,0,0,0.2)] overflow-hidden text-left animate-float">
            <div className="flex items-center gap-1.5 px-5 py-3.5 border-b border-black/[0.04] dark:border-white/[0.06] bg-neutral-50/50 dark:bg-white/[0.01]">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/60 dark:bg-red-500/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60 dark:bg-yellow-500/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/60 dark:bg-green-500/40" />
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="group/stat rounded-xl border border-black/[0.04] dark:border-white/[0.06] p-4 bg-neutral-50/30 dark:bg-white/[0.02] hover:border-black/10 dark:hover:border-white/15 hover:shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:scale-[1.01] transition-all duration-350"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-neutral-500 dark:text-neutral-450 font-medium">
                        {label}
                      </span>
                      <Icon size={14} className="text-accent-500 group-hover/stat:scale-110 transition-transform duration-300" />
                    </div>
                    <p className="mt-2 text-xl font-bold tracking-tight text-neutral-950 dark:text-white">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 rounded-xl border border-black/[0.04] dark:border-white/[0.06] p-5 bg-white/40 dark:bg-white/[0.01]">
                  <h4 className="text-sm font-semibold text-neutral-950 dark:text-white tracking-tight">
                    Skill gap analysis
                  </h4>
                  <div className="mt-5 space-y-4">
                    {skillBars.map(({ label, value }) => (
                      <div key={label}>
                        <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-1.5 font-medium">
                          <span>{label}</span>
                          <span>{value}%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-neutral-100 dark:bg-neutral-800/60 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${value}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="h-full rounded-full bg-gradient-to-r from-accent-500 to-accent-600 dark:from-accent-500 dark:to-accent-400"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-2 flex flex-col gap-5">
                  <div className="rounded-xl border border-accent-100/50 dark:border-accent-500/10 p-5 bg-gradient-to-br from-accent-50/40 via-accent-50/10 to-transparent dark:from-accent-500/[0.04] dark:via-transparent dark:to-transparent shadow-[0_2px_12px_rgba(120,124,248,0.02)] relative overflow-hidden group/ai">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-accent-400/5 rounded-full blur-xl pointer-events-none group-hover/ai:scale-110 transition-transform duration-500" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 text-accent-600 dark:text-accent-400">
                        <Sparkles size={14} className="animate-pulse" />
                        <span className="text-xs font-semibold tracking-wider uppercase">
                          AI Recommendation
                        </span>
                      </div>
                      <p className="mt-2.5 text-sm text-neutral-700 dark:text-neutral-350 leading-relaxed font-normal">
                        Focus on Operating Systems this week, it's your largest
                        gap toward your target role.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-black/[0.04] dark:border-white/[0.06] p-5 bg-white/40 dark:bg-white/[0.01]">
                    <h4 className="text-sm font-semibold text-neutral-950 dark:text-white tracking-tight">
                      Recent activity
                    </h4>
                    <ul className="mt-3 space-y-3">
                      {activity.map((item) => (
                        <li
                          key={item.label}
                          className="flex justify-between gap-3 text-xs border-b border-black/[0.03] dark:border-white/[0.03] pb-2 last:border-b-0 last:pb-0"
                        >
                          <span className="text-neutral-600 dark:text-neutral-400 font-medium">
                            {item.label}
                          </span>
                          <span className="text-neutral-400 dark:text-neutral-500 whitespace-nowrap">
                            {item.time}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default DashboardPreview