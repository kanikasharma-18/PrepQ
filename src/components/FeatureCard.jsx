import { motion } from 'framer-motion'

function FeatureCard({ icon: Icon, title, description, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="group h-full flex flex-col gap-4 p-6 rounded-2xl border border-black/[0.04] dark:border-white/[0.06] bg-white/60 dark:bg-neutral-950/40 backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.01),0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_0_24px_rgba(120,124,248,0.04)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.15),0_0_24px_rgba(120,124,248,0.05)] hover:border-black/10 dark:hover:border-white/15 transition-all duration-300"
    >
      <div className="h-11 w-11 grid place-items-center rounded-xl bg-accent-50/80 dark:bg-accent-500/[0.06] text-accent-600 dark:text-accent-400 group-hover:scale-105 group-hover:bg-accent-100/50 dark:group-hover:bg-accent-500/[0.12] transition-all duration-300">
        <Icon size={19} strokeWidth={1.8} className="group-hover:rotate-6 transition-transform duration-300" />
      </div>
      <div>
        <h3 className="text-base font-semibold text-neutral-900 dark:text-white tracking-tight">
          {title}
        </h3>
        <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-450 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

export default FeatureCard