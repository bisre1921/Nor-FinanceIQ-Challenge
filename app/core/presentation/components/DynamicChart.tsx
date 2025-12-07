/**
 * DynamicChart Component
 * Renders beautiful, animated charts using Recharts
 * Supports line, area, bar, and composed charts
 */

'use client';

import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { theme } from '@/app/core/theme/theme';
import { ChartConfig } from '@/app/core/data/mockData';

export interface DynamicChartProps {
  config: ChartConfig;
  height?: number;
  isCollapsed?: boolean;
  options?: {
    showGrid?: boolean;
    stackResults?: boolean;
    alwaysShowZero?: boolean;
  };
}

export const DynamicChart: React.FC<DynamicChartProps> = ({
  config,
  height = 400,
  isCollapsed = false,
  options = {
    showGrid: true,
    stackResults: false,
    alwaysShowZero: false,
  },
}) => {
  // Transform data for Recharts format
  // Combine all series data into single array of objects
  const transformedData = React.useMemo(() => {
    if (!config.series || config.series.length === 0) return [];

    // Get all unique dates from all series
    const allDates = new Set<string>();
    config.series.forEach((series) => {
      series.data.forEach((point) => allDates.add(point.date));
    });

    // Sort dates
    const sortedDates = Array.from(allDates).sort();

    // Create data points with all series values
    return sortedDates.map((date) => {
      const dataPoint: Record<string, string | number> = { date };

      config.series.forEach((series) => {
        const point = series.data.find((p) => p.date === date);
        dataPoint[series.name] = point?.value || 0;
      });

      return dataPoint;
    });
  }, [config]);

  // Format date for X-axis
  const formatDate = (dateStr: string) => {
    // Check if it's a quarter format (Q1 2025, Q2 2025, etc.)
    if (dateStr.startsWith('Q')) {
      return dateStr;
    }
    
    // Check if it's a year format (2025)
    if (/^\d{4}$/.test(dateStr)) {
      return dateStr;
    }
    
    // Otherwise, format as date
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: config.frequency === 'yearly' ? 'numeric' : undefined,
      });
    } catch {
      return dateStr;
    }
  };

  // Format value for Y-axis (currency)
  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `$ ${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$ ${(value / 1000).toFixed(0)}K`;
    }
    return `$ ${value}`;
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{ name: string; value: number; color: string }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: theme.colors.background.white,
            border: `1px solid ${theme.colors.border.medium}`,
            borderRadius: theme.borderRadius.md,
            padding: theme.spacing.md,
            boxShadow: theme.shadows.lg,
          }}
        >
          <p
            style={{
              margin: 0,
              marginBottom: theme.spacing.xs,
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.text.primary,
            }}
          >
            {label ? formatDate(label) : ''}
          </p>
          {payload.map((entry, index: number) => (
            <p
              key={`tooltip-${index}`}
              style={{
                margin: 0,
                marginTop: theme.spacing.xs,
                fontSize: theme.typography.fontSize.sm,
                color: entry.color,
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.xs,
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: entry.color,
                  borderRadius: '50%',
                  display: 'inline-block',
                }}
              />
              <span style={{ fontWeight: theme.typography.fontWeight.medium }}>
                {entry.name}:
              </span>
              <span style={{ fontWeight: theme.typography.fontWeight.semibold }}>
                {formatValue(entry.value)}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Determine chart type
  const hasMultipleTypes = new Set(config.series.map((s) => s.type)).size > 1;
  const chartType = hasMultipleTypes ? 'composed' : config.series[0]?.type || 'line';

  // Animation configuration
  const animationConfig = {
    animationBegin: 0,
    animationDuration: 1000,
  };

  // Grid styling - More visible for better readability
  const gridStyle = {
    stroke: theme.colors.border.medium,
    strokeDasharray: '5 5',
    strokeOpacity: 0.8,
    strokeWidth: 1,
  };

  // Axis styling
  const axisStyle = {
    fontSize: theme.typography.fontSize.xs,
    fill: theme.colors.text.muted,
    fontFamily: theme.typography.fontFamily.sans,
  };

  // Render the appropriate chart type
  const renderChart = () => {
    const commonProps = {
      data: transformedData,
      margin: { top: 20, right: 30, left: 20, bottom: 20 },
    };

    if (chartType === 'composed' || hasMultipleTypes) {
      return (
        <ComposedChart {...commonProps}>
          <defs>
            {config.series
              .filter((s) => s.type === 'area')
              .map((series) => (
                <linearGradient
                  key={`gradient-${series.id}`}
                  id={`gradient-${series.id}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={series.color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={series.color} stopOpacity={0.05} />
                </linearGradient>
              ))}
          </defs>
          {options.showGrid && <CartesianGrid {...gridStyle} />}
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            tick={axisStyle}
            stroke={theme.colors.border.medium}
          />
          <YAxis
            tickFormatter={formatValue}
            tick={axisStyle}
            stroke={theme.colors.border.medium}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              paddingTop: '20px',
              fontSize: theme.typography.fontSize.sm,
              fontFamily: theme.typography.fontFamily.sans,
            }}
          />
          {config.series.map((series) => {
            if (series.type === 'line') {
              return (
                <Line
                  key={series.id}
                  type="monotone"
                  dataKey={series.name}
                  stroke={series.color}
                  strokeWidth={3}
                  dot={{ r: 4, fill: series.color, strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: series.color, stroke: '#fff', strokeWidth: 2 }}
                  {...animationConfig}
                />
              );
            } else if (series.type === 'area') {
              return (
                <Area
                  key={series.id}
                  type="monotone"
                  dataKey={series.name}
                  stroke={series.color}
                  strokeWidth={2}
                  fill={`url(#gradient-${series.id})`}
                  {...animationConfig}
                />
              );
            } else if (series.type === 'bar') {
              return (
                <Bar
                  key={series.id}
                  dataKey={series.name}
                  fill={series.color}
                  radius={[4, 4, 0, 0]}
                  {...animationConfig}
                />
              );
            }
            return null;
          })}
        </ComposedChart>
      );
    }

    // Single type charts
    if (chartType === 'line') {
      return (
        <LineChart {...commonProps}>
          {options.showGrid && <CartesianGrid {...gridStyle} />}
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            tick={axisStyle}
            stroke={theme.colors.border.medium}
          />
          <YAxis
            tickFormatter={formatValue}
            tick={axisStyle}
            stroke={theme.colors.border.medium}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              paddingTop: '20px',
              fontSize: theme.typography.fontSize.sm,
            }}
          />
          {config.series.map((series) => (
            <Line
              key={series.id}
              type="monotone"
              dataKey={series.name}
              stroke={series.color}
              strokeWidth={3}
              dot={{ r: 4, fill: series.color }}
              activeDot={{ r: 6 }}
              {...animationConfig}
            />
          ))}
        </LineChart>
      );
    }

    if (chartType === 'area') {
      return (
        <AreaChart {...commonProps}>
          <defs>
            {config.series.map((series) => (
              <linearGradient
                key={`gradient-${series.id}`}
                id={`gradient-${series.id}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={series.color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={series.color} stopOpacity={0.05} />
              </linearGradient>
            ))}
          </defs>
          {options.showGrid && <CartesianGrid {...gridStyle} />}
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            tick={axisStyle}
            stroke={theme.colors.border.medium}
          />
          <YAxis
            tickFormatter={formatValue}
            tick={axisStyle}
            stroke={theme.colors.border.medium}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              paddingTop: '20px',
              fontSize: theme.typography.fontSize.sm,
            }}
          />
          {config.series.map((series) => (
            <Area
              key={series.id}
              type="monotone"
              dataKey={series.name}
              stroke={series.color}
              strokeWidth={2}
              fill={`url(#gradient-${series.id})`}
              {...animationConfig}
            />
          ))}
        </AreaChart>
      );
    }

    if (chartType === 'bar') {
      return (
        <BarChart {...commonProps}>
          {options.showGrid && <CartesianGrid {...gridStyle} />}
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            tick={axisStyle}
            stroke={theme.colors.border.medium}
          />
          <YAxis
            tickFormatter={formatValue}
            tick={axisStyle}
            stroke={theme.colors.border.medium}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              paddingTop: '20px',
              fontSize: theme.typography.fontSize.sm,
            }}
          />
          {config.series.map((series) => (
            <Bar
              key={series.id}
              dataKey={series.name}
              fill={series.color}
              radius={[4, 4, 0, 0]}
              {...animationConfig}
            />
          ))}
        </BarChart>
      );
    }

    return null;
  };

  if (isCollapsed) {
    return (
      <div
        style={{
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.colors.background.light,
          borderRadius: theme.borderRadius.md,
          border: `1px dashed ${theme.colors.border.medium}`,
        }}
      >
        <p
          style={{
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.text.muted,
            margin: 0,
          }}
        >
          Chart collapsed - Click expand to view
        </p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      {renderChart()}
    </ResponsiveContainer>
  );
};
