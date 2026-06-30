import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-44 pb-28 px-6 text-center"
    >
      <div className="absolute inset-0 bg-grid animate-gridFade pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/60 to-white dark:from-black dark:via-black/70 dark:to-black pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-72 w-[36rem] bg-accent-200/40 dark:bg-accent-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-5xl sm:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white"
        >
          PrepQ
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="mt-6 text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl mx-auto"
        >
          From solving problems to building projects, PrepQ transforms your daily activity into personalized insights, priorities, and actionable growth plans.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-sm font-medium shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all">
            Get Started
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>
          <button className="px-6 py-3 rounded-full border border-black/10 dark:border-white/15 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            Learn More
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero