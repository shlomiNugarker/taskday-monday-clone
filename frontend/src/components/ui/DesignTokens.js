/**
 * Design System Tokens
 * 
 * This file centralizes all design tokens used throughout the application
 * for easier maintenance, consistency, and theming.
 */

// Color system with base and semantic colors
export const colors = {
  // Brand colors
  primary: {
    50: '#e6f5ff',
    100: '#cce8ff',
    200: '#99d1ff',
    300: '#66baff',
    400: '#33a3ff',
    500: '#0073ea', // Primary brand color
    600: '#005cb8',
    700: '#004286',
    800: '#002953',
    900: '#001121',
  },
  
  // Secondary brand colors
  secondary: {
    indigo: {
      500: '#5034ff',
      600: '#4126cc',
    },
    purple: {
      500: '#6c6cff',
      600: '#5252cc',
    },
    green: {
      500: '#00c875',
      600: '#00a05e',
    },
    yellow: {
      500: '#ffcb00',
      600: '#cca200',
    },
    red: {
      500: '#e2435c',
      600: '#b5364a',
    },
  },
  
  // Neutral colors for text, backgrounds, borders
  neutral: {
    black: '#323338',
    darkGray: '#676879',
    gray: '#919191',
    lightGray: '#d0d4e4',
    extraLightGray: '#f6f7fb',
    white: '#ffffff',
  },
  
  // Semantic colors for statuses
  status: {
    success: '#00c875',
    warning: '#fdab3d',
    error: '#e2445c',
    info: '#0086c0',
  },
  
  // Background colors
  background: {
    primary: '#ffffff',
    secondary: '#f6f7fb',
    accent: '#292f4c',
    hover: '#dcdfec',
  }
};

// Shadows with consistent naming and values
export const shadows = {
  none: 'none',
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.15)',
  '2xl': '0 25px 50px rgba(0, 0, 0, 0.2)',
  inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
  outline: '0 0 0 3px rgba(0, 115, 234, 0.4)',
  
  // Component-specific shadows
  'task': '0 1px 2px rgba(0, 0, 0, 0.07)',
  'board': '0 2px 4px rgba(0, 0, 0, 0.05)',
  'header': '0 2px 10px rgba(0, 0, 0, 0.1)',
  'modal': '0 4px 20px rgba(0, 0, 0, 0.15)',
  'dropdown': '0 3px 8px rgba(0, 0, 0, 0.12)',
};

// Border radius values
export const borderRadius = {
  none: '0',
  xs: '2px',
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  full: '9999px',
};

// z-index values for consistent layering
export const zIndex = {
  hide: -1,
  base: 0,
  raised: 1,
  dropdown: 10,
  sticky: 20,
  header: 30,
  modal: 40,
  popover: 50,
  tooltip: 60,
  toast: 70,
};

// Animation timing and easing
export const animation = {
  duration: {
    fastest: '100ms',
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slowest: '700ms',
  },
  easing: {
    ease: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    easeIn: 'cubic-bezier(0.42, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.58, 1)',
    easeInOut: 'cubic-bezier(0.42, 0, 0.58, 1)',
    linear: 'linear',
  },
};

// Typography system
export const typography = {
  fontFamily: {
    base: 'sofia-pro, Roboto, Helvetica, Arial, sans-serif',
    monospace: 'SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

// Spacing scale (in pixels)
export const spacing = {
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
  32: '128px',
  40: '160px',
  48: '192px',
  64: '256px',
};

// Common breakpoints for responsive design
export const breakpoints = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Export all tokens as default
export default {
  colors,
  shadows,
  borderRadius,
  zIndex,
  animation,
  typography,
  spacing,
  breakpoints
}; 