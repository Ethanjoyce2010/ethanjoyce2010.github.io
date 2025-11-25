import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0b0f19',
          soft: '#0f1629',
        },
        primary: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
          950: '#083344',
        },
      },
      boxShadow: {
        glow: '0 0 40px rgba(34, 211, 238, 0.15)',
      },
      backgroundImage: {
        'grid-fade':
          'radial-gradient(circle at 1px 1px, rgba(255,255,255,.08) 1px, transparent 0)'
      },
      keyframes: {
        'grid-pan': {
          '0%': { backgroundPosition: '0px 0px' },
          '100%': { backgroundPosition: '24px 24px' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
      animation: {
        'grid-pan': 'grid-pan 40s linear infinite',
        blob: 'blob 7s infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
