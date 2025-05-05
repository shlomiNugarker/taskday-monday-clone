/** @type {import('tailwindcss').Config} */
const { colors } = require('./src/components/ui/ColorVariables');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        neutral: colors.neutral,
        status: colors.status,
        bg: colors.background,
      },
      boxShadow: {
        'task': '0 1px 2px rgba(0, 0, 0, 0.07)',
        'board': '0 2px 4px rgba(0, 0, 0, 0.05)',
        'header': '0 2px 10px rgba(0, 0, 0, 0.1)',
        'modal': '0 4px 20px rgba(0, 0, 0, 0.15)',
        'dropdown': '0 3px 8px rgba(0, 0, 0, 0.12)',
      },
      fontFamily: {
        'sans': ['sofia-pro', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      transitionProperty: {
        'width': 'width',
        'height': 'height',
        'spacing': 'margin, padding',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'slide-left': 'slideLeft 0.3s ease-out',
        'slide-right': 'slideRight 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}