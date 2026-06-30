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
    <section className="px-6 py-24 bg-neutral-50 dark:bg-neutral-950/40">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white"
        >
          Your Personal Developer Growth Dashboard
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-4 text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto"
        >
          See your readiness score, weak areas, and weekly progress in one
          clean view, updated automatically as you code.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="mt-14 rounded-2xl border border-black/[0.06] dark:border-white/10 bg-white dark:bg-neutral-900 shadow-xl overflow-hidden text-left"
        >
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-black/[0.06] dark:border-white/10">
            <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-300" />
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-xl border border-black/[0.06] dark:border-white/10 p-4 bg-neutral-50 dark:bg-neutral-800/50"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      {label}
                    </span>
                    <Icon size={14} className="text-accent-500" />
                  </div>
                  <p className="mt-2 text-xl font-semibold text-neutral-900 dark:text-white">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3 rounded-xl border border-black/[0.06] dark:border-white/10 p-5">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
                  Skill gap analysis
                </h4>
                <div className="mt-5 space-y-4">
                  {skillBars.map(({ label, value }) => (
                    <div key={label}>
                      <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-1.5">
                        <span>{label}</span>
                        <span>{value}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-accent-500"
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2 flex flex-col gap-5">
                <div className="rounded-xl border border-black/[0.06] dark:border-white/10 p-5 bg-accent-50/60 dark:bg-accent-500/[0.07]">
                  <div className="flex items-center gap-2 text-accent-600 dark:text-accent-400">
                    <Sparkles size={14} />
                    <span className="text-xs font-medium">
                      AI recommendation
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-200 leading-relaxed">
                    Focus on Operating Systems this week, it's your largest
                    gap toward your target role.
                  </p>
                </div>

                <div className="rounded-xl border border-black/[0.06] dark:border-white/10 p-5">
                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
                    Recent activity
                  </h4>
                  <ul className="mt-3 space-y-3">
                    {activity.map((item) => (
                      <li
                        key={item.label}
                        className="flex justify-between gap-3 text-xs"
                      >
                        <span className="text-neutral-600 dark:text-neutral-300">
                          {item.label}
                        </span>
                        <span className="text-neutral-400 whitespace-nowrap">
                          {item.time}
                        </span>
                      </li>
                    ))}
                  </ul>
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