import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#181218',
        ink: '#221922',
        surface: '#322632',
        royal: '#7A5C74',
        azure: '#BFA3C4',
        gold: '#E5C39A',
        blush: '#D7A0B2',
        mint: '#BFCDBD',
        cream: '#FBF4EE',
        rose: '#C58FA1',
        plum: '#5F4458',
        cocoa: '#3A2C32',
        mist: '#F6E9EC',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,244,241,0.08), 0 26px 90px rgba(43, 24, 34, 0.34)',
        soft: '0 22px 60px rgba(46, 28, 37, 0.22)',
      },
      backgroundImage: {
        'hero-grid':
          'radial-gradient(circle at top, rgba(215, 160, 178, 0.18), transparent 30%), radial-gradient(circle at 82% 18%, rgba(229, 195, 154, 0.18), transparent 24%), linear-gradient(135deg, rgba(255,250,247,0.08) 0%, rgba(255,255,255,0) 100%)',
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
