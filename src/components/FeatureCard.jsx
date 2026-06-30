import { motion } from 'framer-motion'

function FeatureCard({ icon: Icon, title, description, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className="h-full flex flex-col gap-4 p-6 rounded-2xl border border-black/[0.06] dark:border-white/10 bg-white dark:bg-neutral-900/60 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-lg hover:border-black/10 dark:hover:border-white/20 transition-shadow"
    >
      <div className="h-11 w-11 grid place-items-center rounded-xl bg-accent-50 dark:bg-accent-500/10 text-accent-600 dark:text-accent-400">
        <Icon size={20} strokeWidth={1.75} />
      </div>
      <div>
        <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
          {title}
        </h3>
        <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

export default FeatureCard