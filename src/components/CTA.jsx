import { motion } from 'framer-motion'

function CTA() {
  return (
    <section className="px-6 py-28 relative">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto rounded-3xl p-12 sm:p-16 border border-black/[0.04] dark:border-white/[0.06] bg-white/65 dark:bg-neutral-950/40 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.02)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden relative text-center"
      >
        {/* Subtle grid pattern inside CTA card */}
        <div className="absolute inset-0 bg-grid opacity-[0.25] dark:opacity-[0.1] pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-accent-100/20 dark:bg-accent-500/5 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-violet-100/20 dark:bg-violet-500/5 blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.12]"
          >
            Stop Guessing.
            <br />
            Start Growing.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-neutral-500 dark:text-neutral-400 max-w-md mx-auto leading-relaxed"
          >
            Join developers using PrepQ to turn scattered effort into a clear
            path forward.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8"
          >
            <button className="px-7 py-3.5 rounded-full bg-gradient-to-b from-neutral-900 to-black dark:from-white dark:to-neutral-100 text-white dark:text-neutral-950 text-sm font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.12),0_12px_24px_rgba(0,0,0,0.06)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 cursor-pointer">
              Get Started Free
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default CTA