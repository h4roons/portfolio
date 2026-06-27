/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        // Monochrome ramp
        carbon: {
          950: '#08090b',
          900: '#0c0d10',
          800: '#131419',
          700: '#1b1d23',
          600: '#262931',
          500: '#363a44',
          400: '#565b67',
          300: '#8b909c',
          200: '#c2c6cf',
          100: '#e8eaee',
        },
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      maxWidth: {
        content: '1180px',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(0, -3%) scale(1.04)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        // Drifting colored aurora blobs
        aurora: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(6%, -8%) scale(1.15)' },
          '66%': { transform: 'translate(-5%, 5%) scale(0.92)' },
          '100%': { transform: 'translate(0, 0) scale(1)' },
        },
        // Sliding gradient for text / borders
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        // Soft breathing glow
        'glow-pulse': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.06)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        // One-shot sheen sweep across a surface
        sheen: {
          '0%': { transform: 'translateX(-120%) skewX(-18deg)', opacity: '0' },
          '40%': { opacity: '0.55' },
          '100%': { transform: 'translateX(220%) skewX(-18deg)', opacity: '0' },
        },
        'bob': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        marquee: 'marquee 36s linear infinite',
        'float-slow': 'float-slow 14s ease-in-out infinite',
        shimmer: 'shimmer 8s linear infinite',
        aurora: 'aurora 22s ease-in-out infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
        'glow-pulse': 'glow-pulse 5s ease-in-out infinite',
        'spin-slow': 'spin-slow 18s linear infinite',
        sheen: 'sheen 1.1s ease-out',
        bob: 'bob 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
