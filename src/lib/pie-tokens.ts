/**
 * PIE Design System Tokens
 * Based on Just Eat Takeaway.com's global design system
 * Learn more at https://www.pie.design/
 */

// Colors following PIE color system
export const colors = {
  // Primary colors
  primary: {
    DEFAULT: '#F36805', // Just Eat orange
    foreground: '#FFFFFF',
    50: '#FFF7F0',
    100: '#FFE9D6',
    200: '#FFD2AD',
    300: '#FFBA85',
    400: '#FF9E52',
    500: '#F36805', // Primary
    600: '#D45800',
    700: '#B54A00',
    800: '#963D00',
    900: '#783100',
  },
  // Neutral colors
  neutral: {
    DEFAULT: '#242E30',
    foreground: '#FFFFFF',
    50: '#F5F6F7',
    100: '#E8EBED',
    200: '#D1D6D9',
    300: '#B9C0C5',
    400: '#9CA6AD',
    500: '#828E96',
    600: '#5E686E',
    700: '#424A4F',
    800: '#242E30', // Primary text
    900: '#0F1719',
  },
  // Accent colors
  accent: {
    DEFAULT: '#FF8000',
    foreground: '#FFFFFF',
  },
  // System feedback colors
  success: {
    DEFAULT: '#00AC7F',
    foreground: '#FFFFFF',
  },
  warning: {
    DEFAULT: '#FFC700',
    foreground: '#242E30',
  },
  error: {
    DEFAULT: '#D9372A',
    foreground: '#FFFFFF',
  },
  info: {
    DEFAULT: '#0098CF',
    foreground: '#FFFFFF',
  },
  // UI Colors
  background: '#FFFFFF',
  foreground: '#242E30',
  card: '#FFFFFF',
  muted: '#F5F6F7',
  border: '#E8EBED',
};

// Typography following PIE type system
export const typography = {
  fontFamily: {
    sans: '"JET Sans Digital", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  fontSize: {
    xs: '0.75rem',   // 12px
    sm: '0.875rem',  // 14px
    base: '1rem',    // 16px
    lg: '1.125rem',  // 18px
    xl: '1.25rem',   // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: '1.2',
    normal: '1.5',
    loose: '1.75',
  }
};

// Spacing following PIE spacing system
export const spacing = {
  0: '0',
  0.5: '0.125rem', // 2px
  1: '0.25rem',    // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem',     // 8px
  2.5: '0.625rem', // 10px
  3: '0.75rem',    // 12px
  3.5: '0.875rem', // 14px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  7: '1.75rem',    // 28px
  8: '2rem',       // 32px
  9: '2.25rem',    // 36px
  10: '2.5rem',    // 40px
  12: '3rem',      // 48px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
};

// Radius following PIE border radius system
export const radius = {
  none: '0',
  sm: '0.25rem',   // 4px
  md: '0.5rem',    // 8px
  lg: '0.75rem',   // 12px
  xl: '1rem',      // 16px
  '2xl': '1.5rem', // 24px
  full: '9999px',
};

// Elevation/Shadow following PIE elevation system
export const elevation = {
  none: 'none',
  sm: '0px 1px 2px rgba(15, 23, 42, 0.1)',
  md: '0px 4px 8px -2px rgba(15, 23, 42, 0.1), 0px 2px 4px -2px rgba(15, 23, 42, 0.1)',
  lg: '0px 12px 16px -4px rgba(15, 23, 42, 0.08), 0px 4px 6px -2px rgba(15, 23, 42, 0.1)',
  xl: '0px 20px 24px -4px rgba(15, 23, 42, 0.08), 0px 8px 8px -4px rgba(15, 23, 42, 0.1)',
  '2xl': '0px 24px 48px -12px rgba(15, 23, 42, 0.25)',
};
