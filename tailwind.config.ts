import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#24415D',
        ink: '#425F7F',
        surface: '#7995B4',
        royal: '#90B8DD',
        azure: '#D7EBFA',
        gold: '#EEF7FD',
        blush: '#B8D2E8',
        mint: '#DCEFF0',
        cream: '#FBFDFF',
        rose: '#E6E8F7',
        plum: '#6C86A2',
        cocoa: '#23384C',
        mist: '#F2F8FD',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.62), 0 22px 70px rgba(91, 129, 166, 0.16)',
        soft: '0 22px 56px rgba(97, 134, 169, 0.14)',
      },
      backgroundImage: {
        'hero-grid':
          'radial-gradient(circle at top, rgba(151, 202, 242, 0.24), transparent 30%), radial-gradient(circle at 82% 18%, rgba(223, 241, 255, 0.3), transparent 24%), linear-gradient(135deg, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0) 100%)',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(16px,-24px,0) scale(1.06)' },
        },
        driftSlow: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(-18px,22px,0) scale(1.08)' },
        },
        driftWide: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '33%': { transform: 'translate3d(22px,-18px,0) scale(1.05)' },
          '66%': { transform: 'translate3d(-14px,20px,0) scale(1.09)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseRing: {
          '0%': { opacity: '0.25', transform: 'scale(0.9)' },
          '70%': { opacity: '0', transform: 'scale(1.2)' },
          '100%': { opacity: '0', transform: 'scale(1.2)' },
        },
      },
      animation: {
        drift: 'drift 10s ease-in-out infinite',
        'drift-slow': 'driftSlow 18s ease-in-out infinite',
        'drift-wide': 'driftWide 24s ease-in-out infinite',
        shimmer: 'shimmer 2.4s linear infinite',
        'pulse-ring': 'pulseRing 2.4s ease-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
