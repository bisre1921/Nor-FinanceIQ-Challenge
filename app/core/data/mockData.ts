/**
 * Mock Data for FinanceIQ Dashboard
 * Comprehensive data structure based on design specifications
 */

export interface ChartDataPoint {
  date: string;
  value: number;
}

export interface ChartSeries {
  id: string;
  name: string;
  type: 'line' | 'area' | 'bar';
  color: string;
  data: ChartDataPoint[];
}

export interface ChartConfig {
  id: string;
  title: string;
  subtitle?: string;
  series: ChartSeries[];
  dateRange: {
    start: string;
    end: string;
  };
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
}

// Revenue Chart Data
export const revenueChartData: ChartConfig = {
  id: 'cumulative-revenue',
  title: 'Cumulative Revenue',
  subtitle: 'Revenue trends over time',
  dateRange: {
    start: '2025-01-01',
    end: '2025-10-31',
  },
  frequency: 'monthly',
  series: [
    {
      id: 'revenue',
      name: 'Revenue',
      type: 'line',
      color: '#4F9CF9',
      data: [
        { date: '2025-01-25', value: 1650000 },
        { date: '2025-02-25', value: 1720000 },
        { date: '2025-03-25', value: 1780000 },
        { date: '2025-04-25', value: 1750000 },
        { date: '2025-05-25', value: 1800000 },
        { date: '2025-06-25', value: 1750000 },
        { date: '2025-07-25', value: 1850000 },
        { date: '2025-08-25', value: 2100000 },
        { date: '2025-09-25', value: 2050000 },
        { date: '2025-10-25', value: 2150000 },
      ],
    },
    {
      id: 'gross-profit',
      name: 'Gross Profit',
      type: 'area',
      color: '#34D399',
      data: [
        { date: '2025-01-25', value: 750000 },
        { date: '2025-02-25', value: 780000 },
        { date: '2025-03-25', value: 800000 },
        { date: '2025-04-25', value: 790000 },
        { date: '2025-05-25', value: 820000 },
        { date: '2025-06-25', value: 800000 },
        { date: '2025-07-25', value: 850000 },
        { date: '2025-08-25', value: 900000 },
        { date: '2025-09-25', value: 880000 },
        { date: '2025-10-25', value: 950000 },
      ],
    },
    {
      id: 'net-profit',
      name: 'Net Profit',
      type: 'bar',
      color: '#FB923C',
      data: [
        { date: '2025-01-25', value: 50000 },
        { date: '2025-02-25', value: 60000 },
        { date: '2025-03-25', value: 55000 },
        { date: '2025-04-25', value: 65000 },
        { date: '2025-05-25', value: 70000 },
        { date: '2025-06-25', value: 45000 },
        { date: '2025-07-25', value: -30000 },
        { date: '2025-08-25', value: -50000 },
        { date: '2025-09-25', value: 80000 },
        { date: '2025-10-25', value: 120000 },
      ],
    },
  ],
};

// KPIs Chart Data
export const kpisChartData: ChartConfig = {
  id: 'kpis-overview',
  title: 'Key Performance Indicators',
  subtitle: 'Overview of key metrics',
  dateRange: {
    start: '2025-01-01',
    end: '2025-10-31',
  },
  frequency: 'monthly',
  series: [
    {
      id: 'profit-margin',
      name: 'Profit Margin %',
      type: 'line',
      color: '#4F9CF9',
      data: [
        { date: '2025-01-25', value: 15.2 },
        { date: '2025-02-25', value: 16.8 },
        { date: '2025-03-25', value: 17.5 },
        { date: '2025-04-25', value: 16.2 },
        { date: '2025-05-25', value: 18.1 },
        { date: '2025-06-25', value: 17.8 },
        { date: '2025-07-25', value: 19.2 },
        { date: '2025-08-25', value: 20.5 },
        { date: '2025-09-25', value: 19.8 },
        { date: '2025-10-25', value: 21.3 },
      ],
    },
  ],
};

// Report Configuration
export interface ReportConfig {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  icon: string;
  charts: string[]; // Chart IDs
}

export const reportConfigs: Record<string, ReportConfig> = {
  'revenue-chart': {
    id: 'revenue-chart',
    title: 'report',
    subtitle: 'Comprehensive financial overview',
    period: 'April 2025',
    icon: 'checkered',
    charts: ['cumulative-revenue'],
  },
  'revenue-analysis': {
    id: 'revenue-analysis',
    title: 'Revenue Analysis',
    subtitle: 'Detailed revenue breakdown',
    period: 'April 2025',
    icon: 'checkered',
    charts: ['cumulative-revenue'],
  },
  kpis: {
    id: 'kpis',
    title: 'Key Performance Indicators',
    subtitle: 'Overview of critical metrics',
    period: 'April 2025',
    icon: 'checkered',
    charts: ['kpis-overview'],
  },
};

// Chart Data Registry
export const chartDataRegistry: Record<string, ChartConfig> = {
  'cumulative-revenue': revenueChartData,
  'kpis-overview': kpisChartData,
};

// Helper function to get chart data by ID
export const getChartData = (chartId: string): ChartConfig | null => {
  return chartDataRegistry[chartId] || null;
};

// Helper function to get report config
export const getReportConfig = (reportId: string): ReportConfig | null => {
  return reportConfigs[reportId] || null;
};

// Default report
export const DEFAULT_REPORT_ID = 'revenue-chart';

// Month mapping for filtering
export const MONTH_MAP: Record<string, number> = {
  'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
  'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
};

// Quarter to months mapping
export const QUARTER_MONTHS: Record<string, number[]> = {
  'Q1': [1, 2, 3],
  'Q2': [4, 5, 6],
  'Q3': [7, 8, 9],
  'Q4': [10, 11, 12]
};

/**
 * Filter chart data by month
 */
export const filterChartDataByMonth = (
  chartData: ChartConfig,
  month: string,
  year: number
): ChartConfig => {
  const monthNumber = MONTH_MAP[month];
  
  const filteredSeries = chartData.series.map(series => ({
    ...series,
    data: series.data.filter(point => {
      const date = new Date(point.date);
      return date.getMonth() + 1 === monthNumber && date.getFullYear() === year;
    })
  }));

  return {
    ...chartData,
    series: filteredSeries,
    dateRange: {
      start: `${year}-${String(monthNumber).padStart(2, '0')}-01`,
      end: `${year}-${String(monthNumber).padStart(2, '0')}-31`,
    }
  };
};

/**
 * Filter chart data by quarter
 */
export const filterChartDataByQuarter = (
  chartData: ChartConfig,
  quarter: string,
  year: number
): ChartConfig => {
  const months = QUARTER_MONTHS[quarter];
  
  const filteredSeries = chartData.series.map(series => ({
    ...series,
    data: series.data.filter(point => {
      const date = new Date(point.date);
      return months.includes(date.getMonth() + 1) && date.getFullYear() === year;
    })
  }));

  const startMonth = months[0];
  const endMonth = months[months.length - 1];
  
  return {
    ...chartData,
    series: filteredSeries,
    dateRange: {
      start: `${year}-${String(startMonth).padStart(2, '0')}-01`,
      end: `${year}-${String(endMonth).padStart(2, '0')}-31`,
    }
  };
};
