/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          50: '#f0f0ff',
          100: '#e3e2ff',
          400: '#8b85f5',
          500: '#6c63f5',
          600: '#564fde',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        gridFade: {
          '0%, 100%': { opacity: 0.35 },
          '50%': { opacity: 0.6 },
        },
        floatUp: {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        gridFade: 'gridFade 6s ease-in-out infinite',
        floatUp: 'floatUp 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
}