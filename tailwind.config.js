/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      // MODIFIED: Added blob animations
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'float-1': 'float-1 6s ease-in-out infinite',
        'float-2': 'float-2 8s ease-in-out infinite',
        'float-3': 'float-3 7s ease-in-out infinite',
        'spin-3d': 'spin-3d 10s linear infinite',
        'gradient': 'gradient-shift 3s ease infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        // ADD THESE:
        'blob-1': 'blob-1 25s linear infinite',
        'blob-2': 'blob-2 20s linear infinite',
        'blob-3': 'blob-3 30s linear infinite',
      },
      // MODIFIED: Added keyframes
      keyframes: {
        // ADD THESE:
        'blob-1': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(40px, -60px) scale(1.1)' },
          '50%': { transform: 'translate(0, 80px) scale(0.9)' },
          '75%': { transform: 'translate(-50px, -30px) scale(1.05)' },
        },
        'blob-2': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(-30px, 50px) scale(1.1)' },
          '50%': { transform: 'translate(-60px, -40px) scale(0.9)' },
          '75%': { transform: 'translate(20px, 20px) scale(1.05)' },
        },
        'blob-3': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(30px, -40px) scale(1.1)' },
          '50%': { transform: 'translate(0, 60px) scale(0.9)' },
          '75%': { transform: 'translate(-40px, -20px) scale(1.05)' },
        },
      },
      backdropBlur: {
        '2xl': '40px',
      },
      boxShadow: {
        '3d': '0 35px 60px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.4)',
        'glow-lg': '0 0 40px rgba(59, 130, 246, 0.6)',
      },
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      }
    },
  },
  plugins: [],
};
