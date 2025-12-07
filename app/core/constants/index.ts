/**
 * Application Constants
 * Global constants and configuration values
 */

export const APP_CONFIG = {
  name: 'FinanceIQ',
  shortName: 'FI',
  description: 'Financial reporting and analytics platform',
  version: '1.0.0',
} as const;

export const ROUTES = {
  home: '/',
  dashboard: '/dashboard',
  reports: {
    base: '/reports',
    kpis: '/reports/kpis',
    revenue: {
      base: '/reports/revenue',
      chart: '/reports/revenue/chart',
      analysis: '/reports/revenue/analysis',
      thisYear: '/reports/revenue/this-year',
      rolling12: '/reports/revenue/rolling-12',
      allTime: '/reports/revenue/all-time',
      comparison: '/reports/revenue/comparison',
      topAccounts: '/reports/revenue/top-accounts',
      vsExpenses: '/reports/revenue/vs-expenses',
    },
    costsExpenses: '/reports/costs-expenses',
    profitability: '/reports/profitability',
    cashFlow: '/reports/cash-flow',
    growth: '/reports/growth',
    activity: '/reports/activity',
    efficiency: '/reports/efficiency',
    coverage: '/reports/coverage',
    liquidity: '/reports/liquidity',
    forecasting: '/reports/forecasting',
    custom: '/reports/custom',
  },
  tables: {
    base: '/reports/tables',
    kpis: '/reports/tables/kpis',
    revenue: '/reports/tables/revenue',
    costsExpenses: '/reports/tables/costs-expenses',
    profitability: '/reports/tables/profitability',
    cashFlow: '/reports/tables/cash-flow',
    growth: '/reports/tables/growth',
  },
} as const;

export const UI_CONSTANTS = {
  sidebarWidth: '280px',
  headerHeight: '64px',
  maxContentWidth: '1200px',
  animationDuration: {
    fast: 150,
    normal: 250,
    slow: 350,
  },
} as const;

export const DATE_FORMATS = {
  display: 'MMMM YYYY', // April 2025
  short: 'MMM DD',      // Apr 15
  full: 'MMMM DD, YYYY', // April 15, 2025
} as const;

export const CHART_TYPES = {
  line: 'line',
  bar: 'bar',
  area: 'area',
  pie: 'pie',
  donut: 'donut',
} as const;

export const MESSAGES = {
  errors: {
    loadingData: 'Failed to load data. Please try again.',
    savingReport: 'Failed to save report. Please try again.',
    generic: 'Something went wrong. Please try again.',
  },
  success: {
    reportSaved: 'Report saved successfully!',
    reportDeleted: 'Report deleted successfully!',
  },
  warnings: {
    unsavedChanges: 'You have unsaved changes.',
  },
  info: {
    comingSoon: 'This feature is coming soon!',
    tableBlocksComingSoon: 'Table blocks coming soon',
  },
} as const;
