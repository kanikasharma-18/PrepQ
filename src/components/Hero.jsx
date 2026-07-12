import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-44 pb-28 px-6 text-center"
    >
      <div className="absolute inset-0 bg-grid animate-gridFade pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fafafa]/50 to-[#fafafa] dark:via-[#08080a]/50 dark:to-[#08080a] pointer-events-none z-0" />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 h-80 w-[42rem] bg-accent-100/30 dark:bg-accent-500/5 blur-3xl rounded-full pointer-events-none z-0" />

      <div className="relative max-w-3xl mx-auto z-10">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl sm:text-7xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.08]"
        >
          PrepQ
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl mx-auto font-normal"
        >
          From solving problems to building projects, PrepQ transforms your daily activity into personalized insights, priorities, and actionable growth plans.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button className="group relative inline-flex items-center justify-center gap-2 px-6.5 py-3 rounded-full bg-gradient-to-b from-neutral-900 to-black dark:from-white dark:to-neutral-100 text-white dark:text-neutral-950 text-sm font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.12),0_12px_24px_rgba(0,0,0,0.06)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 cursor-pointer">
            Get Started
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
          
          <button className="px-6.5 py-3 rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-white/50 dark:bg-white/[0.02] backdrop-blur-sm text-sm font-semibold text-neutral-700 dark:text-neutral-350 hover:text-neutral-950 dark:hover:text-white hover:bg-white/80 dark:hover:bg-white/[0.06] hover:border-black/15 dark:hover:border-white/15 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer">
            Learn More
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero