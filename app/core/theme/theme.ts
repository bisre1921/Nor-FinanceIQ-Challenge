/**
 * Theme Configuration
 * Centralized color definitions and design tokens for the FinanceIQ dashboard
 */

export const theme = {
  colors: {
    // Primary Brand Colors
    primary: {
      yellow: '#F9B931',
      yellowHover: '#E5A71F',
      yellowLight: '#FFF9E6',
    },
    
    // Background Colors
    background: {
      dark: '#0B1625',        // Main sidebar background
      darker: '#081220',       // Darker sections
      medium: '#1A2634',       // Hover states
      light: '#F5F5F5',        // Main content background
      white: '#FFFFFF',        // Card backgrounds
    },
    
    // Text Colors
    text: {
      primary: '#FFFFFF',      // Main text on dark backgrounds
      secondary: '#8B94A8',    // Secondary text / descriptions
      tertiary: '#6B7280',     // Tertiary text
      dark: '#1F2937',         // Text on light backgrounds
      muted: '#9CA3AF',        // Muted text
    },
    
    // Chart Colors
    chart: {
      blue: '#4F9CF9',         // Primary line color
      blueLight: '#E0EFFF',    // Light blue fill
      green: '#34D399',        // Secondary line color
      greenLight: '#D1FAE5',   // Light green fill
      orange: '#FB923C',       // Tertiary line color
      orangeLight: '#FED7AA',  // Light orange fill
      grid: '#E5E7EB',         // Grid lines
    },
    
    // Status Colors
    status: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',
    },
    
    // Border Colors
    border: {
      light: '#E5E7EB',
      medium: '#D1D5DB',
      dark: '#2D3748',
    },
    
    // Icon Colors
    icon: {
      primary: '#8B94A8',
      active: '#F9B931',
      hover: '#FFFFFF',
    },
  },
  
  // Typography
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, -apple-system, sans-serif',
      mono: 'Menlo, Monaco, Courier New, monospace',
    },
    fontSize: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  
  // Spacing
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
  },
  
  // Border Radius
  borderRadius: {
    sm: '0.25rem',    // 4px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    full: '9999px',   // Full rounded
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  
  // Transitions
  transitions: {
    fast: '150ms ease-in-out',
    normal: '250ms ease-in-out',
    slow: '350ms ease-in-out',
  },
  
  // Z-Index
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
} as const;

// Type exports for TypeScript
export type Theme = typeof theme;
export type ThemeColors = typeof theme.colors;
