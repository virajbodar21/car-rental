/** @type {import('tailwindcss').Config} */
export default {
    plugins: {
    "@tailwindcss/postcss": {},
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hyper-dark': '#05070D',
        'glass-dark': '#0B0F1A',
        'surface-dark': '#111827',
        'neon-blue': '#3B82F6',
        'neon-red': '#EF4444',
        'neon-orange': '#F97316',
        'text-primary': '#FFFFFF',
        'text-secondary': '#9CA3AF',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'neon-blue': '0 0 20px rgba(59, 130, 246, 0.5)',
        'neon-red': '0 0 20px rgba(239, 68, 68, 0.5)',
        'neon-orange': '0 0 20px rgba(249, 115, 22, 0.5)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
        'fade-in': 'fade-in 0.5s ease-in',
        'slide-up': 'slide-up 0.5s ease-out',
      },
      keyframes: {
        'glow-pulse': {
          '0%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(59, 130, 246, 0.6)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}