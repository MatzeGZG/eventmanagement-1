// Color system with WCAG 2.1 AA compliant contrast ratios
export const colors = {
  // Primary colors with enhanced contrast
  primary: {
    gold: '#D4AF37', // Base gold
    darkGold: '#8B7355', // Darker for better contrast on light backgrounds
    lightGold: '#F4D03F', // Brighter for better contrast on dark backgrounds
    black: '#000000',
  },
  // Secondary colors
  secondary: {
    charcoal: '#1A1A1A', // Darker for better contrast
    silver: '#E0E0E0', // Lighter for better contrast
    pearl: '#FFFFFF',
  },
  // Accent colors with improved contrast
  accent: {
    success: '#2E7D32', // Darker green for better contrast
    error: '#D32F2F', // Darker red for better contrast
    warning: '#F57C00', // Darker orange for better contrast
    info: '#1976D2', // Darker blue for better contrast
  },
  // Background colors
  background: {
    dark: '#121212',
    light: '#FFFFFF',
    muted: '#F5F5F5',
  },
  // Text colors with proper contrast
  text: {
    primary: '#FFFFFF', // For dark backgrounds
    secondary: '#E0E0E0', // For dark backgrounds
    dark: '#121212', // For light backgrounds
    muted: '#757575', // For light backgrounds, meets AA for large text
  }
};