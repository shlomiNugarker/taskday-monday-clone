/**
 * Project Color Variables and Design Tokens
 * 
 * This file centralizes the color palette and design values used throughout the application
 * for easier maintenance and consistency.
 */

export const colors = {
  // Primary colors
  primary: {
    blue: '#0073ea',
    indigo: '#5034ff',
    purple: '#6c6cff',
    green: '#00c875',
    yellow: '#ffcb00',
    red: '#e2435c',
  },
  
  // Neutral colors
  neutral: {
    black: '#323338',
    darkGray: '#676879',
    gray: '#919191',
    lightGray: '#d0d4e4',
    extraLightGray: '#f6f7fb',
    white: '#ffffff',
  },
  
  // Status colors
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

// Shadows for different elevation levels
export const shadows = {
  sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
  inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
  outline: '0 0 0 3px rgba(0, 115, 234, 0.4)',
};

// Border radius values
export const borderRadius = {
  none: '0',
  sm: '3px',
  md: '5px',
  lg: '8px',
  xl: '12px',
  full: '9999px',
};

// z-index values for consistent layering
export const zIndex = {
  base: 1,
  menu: 10,
  header: 20,
  modal: 30,
  tooltip: 40,
};

// Animation timing and easing
export const animation = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
};

// Typography constants
export const typography = {
  fontFamily: 'sofia-pro, Roboto, Helvetica, Arial, sans-serif',
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    xxl: '24px',
    xxxl: '32px',
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};

// Spacing scale
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
};

export default {
  colors,
  shadows,
  borderRadius,
  zIndex,
  animation,
  typography,
  spacing
};