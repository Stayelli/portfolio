/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'float-1': 'float-1 6s ease-in-out infinite',
        'float-2': 'float-2 8s ease-in-out infinite',
        'float-3': 'float-3 7s ease-in-out infinite',
        'spin-3d': 'spin-3d 10s linear infinite',
        'gradient': 'gradient-shift 3s ease infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
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
