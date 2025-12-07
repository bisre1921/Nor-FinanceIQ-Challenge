/**
 * Sidebar Items Data Structure
 * Centralized configuration for all sidebar navigation items
 */

import { LucideIcon } from 'lucide-react';
import {
  Target,
  DollarSign,
  CreditCard,
  TrendingUp,
  Droplets,
  BarChart3,
  Activity,
  Zap,
  Layers,
  Waves,
  LineChart,
} from 'lucide-react';

export interface SidebarSubItem {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  path: string;
}

export interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
  path?: string;
  subItems?: SidebarSubItem[];
  badge?: string | number;
}

export type TabType = 'tables' | 'charts';

/**
 * Chart Tab Items
 * These items appear when the "Charts" tab is active
 */
export const chartSidebarItems: SidebarItem[] = [
  {
    id: 'kpis',
    label: 'KPIs',
    icon: Target,
    path: '/reports/kpis',
  },
  {
    id: 'revenue',
    label: 'Revenue',
    icon: DollarSign,
    subItems: [
      {
        id: 'revenue-chart',
        label: 'Revenue Chart',
        description: 'Visual revenue trends',
        icon: LineChart,
        path: '/reports/revenue/chart',
      },
      {
        id: 'revenue-analysis',
        label: 'Revenue Analysis',
        description: 'Detailed revenue analysis',
        icon: BarChart3,
        path: '/reports/revenue/analysis',
      },
      {
        id: 'revenue-this-year',
        label: 'Revenue — This financial year',
        description: 'Revenue for the current financial y...',
        icon: TrendingUp,
        path: '/reports/revenue/this-year',
      },
      {
        id: 'revenue-rolling-12',
        label: 'Revenue — Rolling 12 months',
        description: 'Revenue for the last 12 months',
        icon: Activity,
        path: '/reports/revenue/rolling-12',
      },
      {
        id: 'revenue-all-time',
        label: 'Revenue — All time',
        description: 'Revenue for all available time',
        icon: BarChart3,
        path: '/reports/revenue/all-time',
      },
      {
        id: 'revenue-comparison',
        label: 'Revenue — This year vs last year',
        description: 'Revenue comparison between curr...',
        icon: TrendingUp,
        path: '/reports/revenue/comparison',
      },
      {
        id: 'top-revenue-accounts',
        label: 'Top Revenue Accounts',
        description: 'Ranked list of revenue accounts',
        icon: BarChart3,
        path: '/reports/revenue/top-accounts',
      },
      {
        id: 'revenue-vs-expenses',
        label: 'Revenue vs Expenses',
        description: 'Compare revenue and expenses',
        icon: Activity,
        path: '/reports/revenue/vs-expenses',
      },
    ],
  },
  {
    id: 'costs-expenses',
    label: 'Costs & Expenses',
    icon: CreditCard,
    path: '/reports/costs-expenses',
  },
  {
    id: 'profitability',
    label: 'Profitability',
    icon: TrendingUp,
    path: '/reports/profitability',
  },
  {
    id: 'cash-flow',
    label: 'Cash Flow',
    icon: Droplets,
    path: '/reports/cash-flow',
  },
  {
    id: 'growth',
    label: 'Growth',
    icon: BarChart3,
    path: '/reports/growth',
  },
  {
    id: 'activity',
    label: 'Activity',
    icon: Activity,
    path: '/reports/activity',
  },
  {
    id: 'efficiency',
    label: 'Efficiency',
    icon: Zap,
    path: '/reports/efficiency',
  },
  {
    id: 'coverage',
    label: 'Coverage',
    icon: Layers,
    path: '/reports/coverage',
  },
  {
    id: 'liquidity',
    label: 'Liquidity',
    icon: Waves,
    path: '/reports/liquidity',
  },
  {
    id: 'forecasting',
    label: 'Forecasting',
    icon: LineChart,
    path: '/reports/forecasting',
  },
];

/**
 * Table Tab Items
 * These items appear when the "Tables" tab is active
 */
export const tableSidebarItems: SidebarItem[] = [
  {
    id: 'kpis-table',
    label: 'KPIs',
    icon: Target,
    path: '/reports/tables/kpis',
  },
  {
    id: 'revenue-table',
    label: 'Revenue',
    icon: DollarSign,
    path: '/reports/tables/revenue',
  },
  {
    id: 'costs-expenses-table',
    label: 'Costs & Expenses',
    icon: CreditCard,
    path: '/reports/tables/costs-expenses',
  },
  {
    id: 'profitability-table',
    label: 'Profitability',
    icon: TrendingUp,
    path: '/reports/tables/profitability',
  },
  {
    id: 'cash-flow-table',
    label: 'Cash Flow',
    icon: Droplets,
    path: '/reports/tables/cash-flow',
  },
  {
    id: 'growth-table',
    label: 'Growth',
    icon: BarChart3,
    path: '/reports/tables/growth',
  },
];

/**
 * Get sidebar items based on active tab
 */
export const getSidebarItems = (activeTab: TabType): SidebarItem[] => {
  return activeTab === 'charts' ? chartSidebarItems : tableSidebarItems;
};
