import { motion } from 'framer-motion'

function CTA() {
  return (
    <section className="px-6 py-28 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white leading-tight"
      >
        Stop Guessing.
        <br />
        Start Growing.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="mt-4 text-neutral-500 dark:text-neutral-400 max-w-md mx-auto"
      >
        Join developers using PrepQ to turn scattered effort into a clear
        path forward.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-8"
      >
        <button className="px-7 py-3.5 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-sm font-medium shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all">
          Get Started Free
        </button>
      </motion.div>
    </section>
  )
}

export default CTA