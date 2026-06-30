import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-md bg-white/75 dark:bg-neutral-950/75 border-b border-black/[0.04] dark:border-white/[0.06] shadow-[0_2px_18px_rgba(0,0,0,0.015)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className={`max-w-6xl mx-auto flex items-center justify-between px-6 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}>
        <a href="#top" className="flex items-center gap-2 group">
          <span className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white transition-colors duration-300">
            Prep<span className="text-accent-500 group-hover:text-accent-400 transition-colors duration-300">Q</span>
          </span>
        </a>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle dark mode"
            className="h-9 w-9 grid place-items-center rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-white/50 dark:bg-white/[0.02] text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-white/[0.06] active:scale-95 transition-all duration-300 cursor-pointer"
          >
            {dark ? <Sun size={15} className="transition-transform duration-300 rotate-0 hover:rotate-45" /> : <Moon size={15} className="transition-transform duration-300 -rotate-12 hover:-rotate-0" />}
          </button>

          <button className="px-4.5 py-1.5 rounded-full text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.12),0_8px_20px_rgba(0,0,0,0.06)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 cursor-pointer">
            Sign In
          </button>
        </div>
      </nav>
    </motion.header>
  )
}

export default Navbar