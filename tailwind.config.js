/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          50: '#f4f5ff',
          100: '#ebecff',
          200: '#dce0ff',
          300: '#c2c7ff',
          400: '#9ea3fc',
          500: '#787cf8',
          600: '#5b5ee6',
          700: '#484ac9',
          800: '#3c3ea6',
          900: '#343685',
          950: '#1f1f51',
        },
      },
      fontFamily: {
        sans: ['"Geist"', '"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', '"Geist"', '"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        gridFade: {
          '0%, 100%': { opacity: 0.25 },
          '50%': { opacity: 0.45 },
        },
        floatUp: {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        gridFade: 'gridFade 7s ease-in-out infinite',
        floatUp: 'floatUp 0.6s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}