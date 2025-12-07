/**
 * SeriesEditor Component
 * Allows users to select/deselect series (Revenue, Gross Profit, Net Profit, etc.)
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { theme } from '@/app/core/theme/theme';
import { TrendingUp, BarChart3, DollarSign } from 'lucide-react';
import { ChartTypeSelector } from './ChartTypeSelector';

export interface SeriesItem {
  id: string;
  name: string;
  color: string;
  chartType: 'Line' | 'Area' | 'Bar';
  enabled: boolean;
}

export interface SeriesEditorProps {
  series: SeriesItem[];
  onSeriesChange: (series: SeriesItem[]) => void;
}

const SERIES_ICONS: Record<string, React.FC<{ size?: number }>> = {
  Revenue: TrendingUp,
  'Gross Profit': BarChart3,
  'Net Profit': DollarSign,
};

export const SeriesEditor: React.FC<SeriesEditorProps> = ({ series, onSeriesChange }) => {
  const toggleSeries = (id: string) => {
    const updatedSeries = series.map((s) =>
      s.id === id ? { ...s, enabled: !s.enabled } : s
    );
    onSeriesChange(updatedSeries);
  };

  const changeChartType = (id: string, newType: 'Line' | 'Area' | 'Bar') => {
    const updatedSeries = series.map((s) =>
      s.id === id ? { ...s, chartType: newType } : s
    );
    onSeriesChange(updatedSeries);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      style={{ marginBottom: theme.spacing.xl }}
    >
      <label
        style={{
          display: 'block',
          fontSize: theme.typography.fontSize.sm,
          fontWeight: theme.typography.fontWeight.medium,
          color: theme.colors.text.dark,
          marginBottom: theme.spacing.sm,
        }}
      >
        Series
      </label>

      <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.sm }}>
        {series.map((item, index) => {
          const Icon = SERIES_ICONS[item.name] || TrendingUp;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + index * 0.05 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: theme.spacing.sm,
                padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                backgroundColor: 'transparent',
                borderRadius: theme.borderRadius.md,
                transition: theme.transitions.fast,
              }}
            >
              {/* Left side: Color + Icon + Name */}
              <motion.label
                whileTap={{ scale: 0.98 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.sm,
                  cursor: 'pointer',
                  flex: 1,
                }}
                onClick={() => toggleSeries(item.id)}
              >
                {/* Color Indicator */}
                <div
                  style={{
                    width: '14px',
                    height: '14px',
                    backgroundColor: item.color,
                    borderRadius: theme.borderRadius.sm,
                    flexShrink: 0,
                    opacity: item.enabled ? 1 : 0.3,
                  }}
                />
                
                {/* Icon */}
                <span
                  style={{
                    color: item.enabled ? theme.colors.text.muted : theme.colors.text.tertiary,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Icon size={16} />
                </span>
                
                {/* Name */}
                <span
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: item.enabled ? theme.colors.text.dark : theme.colors.text.muted,
                    fontWeight: theme.typography.fontWeight.medium,
                  }}
                >
                  {item.name}
                </span>
              </motion.label>

              {/* Right side: Chart Type Selector + More Options */}
              <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.xs }}>
                {/* Chart Type Icon + Dropdown */}
                {item.enabled && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      gap: theme.spacing.xs,
                    }}
                  >
                    {/* Chart Type Selector */}
                    <ChartTypeSelector
                      value={item.chartType}
                      onChange={(value) => changeChartType(item.id, value)}
                    />
                  </motion.div>
                )}
                
                {/* More Options Button (3 dots) */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '24px',
                    height: '24px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: theme.borderRadius.sm,
                    color: theme.colors.text.muted,
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold',
                  }}
                >
                  ⋮
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add or Remove Variables Link */}
      <motion.button
        whileHover={{ x: 2 }}
        style={{
          marginTop: theme.spacing.sm,
          padding: 0,
          backgroundColor: 'transparent',
          border: 'none',
          color: theme.colors.chart.green,
          fontSize: theme.typography.fontSize.sm,
          fontWeight: theme.typography.fontWeight.medium,
          cursor: 'pointer',
          textDecoration: 'underline',
        }}
      >
        Add or remove variables
      </motion.button>
    </motion.div>
  );
};
