import { Link } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme.js'

function AuthHeader() {
  const { dark, toggleTheme } = useTheme()

  return (
    <header className="w-full max-w-6xl mx-auto px-6 py-5 flex items-center justify-between relative z-20">
      <Link to="/" className="flex items-center gap-2 group cursor-pointer">
        <span className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white transition-colors duration-300">
          Prep<span className="text-accent-500 group-hover:text-accent-400 transition-colors duration-300">Q</span>
        </span>
      </Link>

      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle dark mode"
        className="h-9 w-9 grid place-items-center rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-white/50 dark:bg-white/[0.02] text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-white/[0.06] active:scale-95 transition-all duration-300 cursor-pointer"
      >
        {dark ? (
          <Sun size={15} className="transition-transform duration-300 rotate-0 hover:rotate-45" />
        ) : (
          <Moon size={15} className="transition-transform duration-300 -rotate-12 hover:-rotate-0" />
        )}
      </button>
    </header>
  )
}

export default AuthHeader
