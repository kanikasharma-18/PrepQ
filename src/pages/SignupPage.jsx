import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, Mail, User, ArrowRight } from 'lucide-react'
import AuthHeader from '../components/AuthHeader.jsx'

function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [authStatus, setAuthStatus] = useState(null)
  const [notice, setNotice] = useState(null)

  const validate = () => {
    const newErrors = {}

    if (!name.trim()) {
      newErrors.name = 'Full name is required'
    }

    if (!email.trim()) {
      newErrors.email = 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setNotice(null)
    setAuthStatus(null)

    if (!validate()) {
      return
    }

    setIsSubmitting(true)

    // Clean separation of auth logic — ready for backend API integration
    setTimeout(() => {
      setIsSubmitting(false)
      setAuthStatus({
        type: 'info',
        message: 'Account creation form validated cleanly. Backend user registration API integration is ready to be connected.'
      })
    }, 600)
  }

  const handleSocialLogin = (provider) => {
    setAuthStatus(null)
    setNotice(`${provider} signup is a UI placeholder. OAuth provider backend integration required.`)
  }

  return (
    <div className="min-h-screen bg-transparent text-neutral-900 dark:text-neutral-50 transition-colors duration-500 overflow-hidden relative flex flex-col justify-between">
      {/* Background decoration matching LandingPage */}
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-[0.55] dark:opacity-[0.25] z-0" />
      <div className="absolute top-[-10%] left-[-15%] w-[65%] h-[55%] rounded-full bg-accent-100/15 dark:bg-accent-950/[0.05] blur-[150px] pointer-events-none z-0" />
      <div className="absolute top-[25%] right-[-10%] w-[55%] h-[45%] rounded-full bg-violet-100/12 dark:bg-violet-950/[0.04] blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] left-[-5%] w-[50%] h-[45%] rounded-full bg-blue-100/10 dark:bg-blue-950/[0.03] blur-[150px] pointer-events-none z-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140%] max-w-[1400px] h-[800px] bg-[radial-gradient(ellipse_at_top,_rgba(120,124,248,0.08),_rgba(255,255,255,0)_60%)] dark:bg-[radial-gradient(ellipse_at_top,_rgba(120,124,248,0.03),_rgba(0,0,0,0)_65%)] pointer-events-none z-0" />

      <AuthHeader />

      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          <div className="rounded-3xl p-7 sm:p-9 border border-black/[0.05] dark:border-white/[0.06] bg-white/75 dark:bg-neutral-950/60 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.25)] relative overflow-hidden">
            {/* Subtle card glow accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-accent-500/40 to-transparent" />

            <div className="text-left">
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
                Create your PrepQ account
              </h1>
              <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 font-normal leading-relaxed">
                Start turning your daily effort into measurable growth.
              </p>
            </div>

            {notice && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-5 p-3.5 rounded-xl border border-accent-200/60 dark:border-accent-500/20 bg-accent-50/50 dark:bg-accent-950/20 text-xs text-accent-800 dark:text-accent-300 font-medium leading-relaxed"
              >
                {notice}
              </motion.div>
            )}

            {authStatus && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-5 p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-xs text-emerald-700 dark:text-emerald-300 font-medium leading-relaxed"
              >
                {authStatus.message}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
              {/* Full Name field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5"
                >
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <User
                    size={16}
                    className="absolute left-3.5 text-neutral-400 dark:text-neutral-500 pointer-events-none"
                  />
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                      if (errors.name) setErrors((prev) => ({ ...prev, name: null }))
                    }}
                    placeholder="Alex Mercer"
                    autoComplete="name"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                      errors.name
                        ? 'border-red-500 dark:border-red-400 focus:ring-red-500/20'
                        : 'border-black/10 dark:border-white/10 focus:ring-accent-500/20 focus:border-accent-500'
                    } bg-white/60 dark:bg-white/[0.03] text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:ring-2 transition-all duration-200 text-sm font-medium`}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1.5 text-xs text-red-500 dark:text-red-400 font-medium">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5"
                >
                  Email address
                </label>
                <div className="relative flex items-center">
                  <Mail
                    size={16}
                    className="absolute left-3.5 text-neutral-400 dark:text-neutral-500 pointer-events-none"
                  />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (errors.email) setErrors((prev) => ({ ...prev, email: null }))
                    }}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                      errors.email
                        ? 'border-red-500 dark:border-red-400 focus:ring-red-500/20'
                        : 'border-black/10 dark:border-white/10 focus:ring-accent-500/20 focus:border-accent-500'
                    } bg-white/60 dark:bg-white/[0.03] text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:ring-2 transition-all duration-200 text-sm font-medium`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500 dark:text-red-400 font-medium">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5"
                >
                  Password
                </label>
                <div className="relative flex items-center">
                  <Lock
                    size={16}
                    className="absolute left-3.5 text-neutral-400 dark:text-neutral-500 pointer-events-none"
                  />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      if (errors.password) setErrors((prev) => ({ ...prev, password: null }))
                    }}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className={`w-full pl-10 pr-11 py-3 rounded-xl border ${
                      errors.password
                        ? 'border-red-500 dark:border-red-400 focus:ring-red-500/20'
                        : 'border-black/10 dark:border-white/10 focus:ring-accent-500/20 focus:border-accent-500'
                    } bg-white/60 dark:bg-white/[0.03] text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:ring-2 transition-all duration-200 text-sm font-medium`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors p-1 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-500 dark:text-red-400 font-medium">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5"
                >
                  Confirm Password
                </label>
                <div className="relative flex items-center">
                  <Lock
                    size={16}
                    className="absolute left-3.5 text-neutral-400 dark:text-neutral-500 pointer-events-none"
                  />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value)
                      if (errors.confirmPassword)
                        setErrors((prev) => ({ ...prev, confirmPassword: null }))
                    }}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className={`w-full pl-10 pr-11 py-3 rounded-xl border ${
                      errors.confirmPassword
                        ? 'border-red-500 dark:border-red-400 focus:ring-red-500/20'
                        : 'border-black/10 dark:border-white/10 focus:ring-accent-500/20 focus:border-accent-500'
                    } bg-white/60 dark:bg-white/[0.03] text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:ring-2 transition-all duration-200 text-sm font-medium`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors p-1 cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1.5 text-xs text-red-500 dark:text-red-400 font-medium">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 mt-2 rounded-full bg-gradient-to-b from-neutral-900 to-black dark:from-white dark:to-neutral-100 text-white dark:text-neutral-950 text-sm font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.12),0_12px_24px_rgba(0,0,0,0.06)] hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="h-4 w-4 rounded-full border-2 border-white/30 dark:border-neutral-950/30 border-t-white dark:border-t-neutral-950 animate-spin" />
                ) : (
                  <>
                    Create Account
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </form>

            {/* Social login divider */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center pointer-events-none">
                <div className="w-full border-t border-black/[0.06] dark:border-white/[0.08]" />
              </div>
              <span className="relative px-3 bg-white/90 dark:bg-neutral-950/90 text-[11px] font-semibold tracking-wider text-neutral-400 uppercase">
                Or continue with
              </span>
            </div>

            {/* GitHub social button */}
            <button
              type="button"
              onClick={() => handleSocialLogin('GitHub')}
              className="w-full py-3 rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-white/50 dark:bg-white/[0.02] backdrop-blur-sm text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-white/80 dark:hover:bg-white/[0.06] hover:border-black/15 dark:hover:border-white/15 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Continue with GitHub
            </button>

            {/* Bottom link to login */}
            <div className="mt-7 text-center text-xs text-neutral-500 dark:text-neutral-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-neutral-950 dark:text-white font-semibold hover:text-accent-500 dark:hover:text-accent-400 hover:underline transition-colors cursor-pointer"
              >
                Sign in
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="py-6 text-center text-xs text-neutral-400 dark:text-neutral-500 font-medium relative z-10">
        © {new Date().getFullYear()} PrepQ. All rights reserved.
      </footer>
    </div>
  )
}

export default SignupPage
