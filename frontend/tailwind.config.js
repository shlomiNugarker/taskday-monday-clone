/** @type {import('tailwindcss').Config} */
const designSystem = require('./src/components/ui/DesignTokens');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: designSystem.colors.primary,
        secondary: designSystem.colors.secondary,
        neutral: designSystem.colors.neutral,
        status: designSystem.colors.status,
        bg: designSystem.colors.background,
      },
      boxShadow: designSystem.shadows,
      fontFamily: {
        'sans': [designSystem.typography.fontFamily.base],
        'mono': [designSystem.typography.fontFamily.monospace],
      },
      fontSize: designSystem.typography.fontSizes,
      fontWeight: designSystem.typography.fontWeights,
      lineHeight: designSystem.typography.lineHeights,
      letterSpacing: designSystem.typography.letterSpacing,
      borderRadius: designSystem.borderRadius,
      zIndex: designSystem.zIndex,
      spacing: designSystem.spacing,
      screens: designSystem.breakpoints,
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