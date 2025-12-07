/**
 * ChartSettings Component
 * Beautiful animated settings sidebar that slides from the right
 * Features: Series editor, Frequency selector, Date range, Options checkboxes
 * Modular structure with sub-components
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '@/app/core/theme/theme';
import {
  SettingsHeader,
  SettingsFooter,
  SeriesEditor,
  FrequencySelector,
  DateRangeSelector,
  OptionsPanel,
  SeriesItem,
  FrequencyType,
  DateRangeType,
  ChartOptions,
} from '../sub-components/ChartSettings';

export interface ChartSettingsConfig {
  series: SeriesItem[];
  frequency: FrequencyType;
  dateRange: DateRangeType;
  options: ChartOptions;
}

export interface ChartSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  chartTitle?: string;
  initialConfig?: Partial<ChartSettingsConfig>;
  onConfigChange?: (config: ChartSettingsConfig) => void;
  onSave?: (config: ChartSettingsConfig) => void;
}

export const ChartSettings: React.FC<ChartSettingsProps> = ({
  isOpen,
  onClose,
  chartTitle = 'Cumulative Revenue',
  initialConfig = {},
  onConfigChange,
  onSave,
}) => {
  // Settings state
  const [series, setSeries] = useState<SeriesItem[]>(
    initialConfig.series || [
      {
        id: 'revenue',
        name: 'Revenue',
        color: theme.colors.chart.blue,
        chartType: 'Line',
        enabled: true,
      },
      {
        id: 'grossProfit',
        name: 'Gross Profit',
        color: theme.colors.chart.green,
        chartType: 'Area',
        enabled: true,
      },
      {
        id: 'netProfit',
        name: 'Net Profit',
        color: theme.colors.chart.orange,
        chartType: 'Bar',
        enabled: true,
      },
    ]
  );

  const [frequency, setFrequency] = useState<FrequencyType>(
    initialConfig.frequency || 'Month'
  );

  const [dateRange, setDateRange] = useState<DateRangeType>(
    initialConfig.dateRange || 'Current financial year • 2025'
  );

  const [options, setOptions] = useState<ChartOptions>(
    initialConfig.options || {
      highlightCurrentPeriod: true,
      trimPeriodsWithoutResults: true,
      stackResults: true,
      alwaysShowZero: false,
      showGrid: true,
    }
  );

  // Ref for sidebar
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Handle frequency change (immediate update - no save required)
  const handleFrequencyChange = (newFrequency: FrequencyType) => {
    setFrequency(newFrequency);
    // Immediately notify parent of configuration change
    const newConfig: ChartSettingsConfig = {
      series,
      frequency: newFrequency,
      dateRange,
      options,
    };
    onConfigChange?.(newConfig);
  };

  // Handle series change (immediate update)
  const handleSeriesChange = (newSeries: SeriesItem[]) => {
    setSeries(newSeries);
    // Immediately notify parent of configuration change
    const newConfig: ChartSettingsConfig = {
      series: newSeries,
      frequency,
      dateRange,
      options,
    };
    onConfigChange?.(newConfig);
  };

  // Handle date range change (immediate update)
  const handleDateRangeChange = (newDateRange: DateRangeType) => {
    setDateRange(newDateRange);
    const newConfig: ChartSettingsConfig = {
      series,
      frequency,
      dateRange: newDateRange,
      options,
    };
    onConfigChange?.(newConfig);
  };

  // Handle save (for options only)
  const handleSave = () => {
    const config: ChartSettingsConfig = {
      series,
      frequency,
      dateRange,
      options,
    };
    onSave?.(config);
    onClose();
  };

  // Handle cancel
  const handleCancel = () => {
    // Reset to initial values
    setSeries(
      initialConfig.series || [
        {
          id: 'revenue',
          name: 'Revenue',
          color: theme.colors.chart.blue,
          chartType: 'Line',
          enabled: true,
        },
        {
          id: 'grossProfit',
          name: 'Gross Profit',
          color: theme.colors.chart.green,
          chartType: 'Area',
          enabled: true,
        },
        {
          id: 'netProfit',
          name: 'Net Profit',
          color: theme.colors.chart.orange,
          chartType: 'Bar',
          enabled: true,
        },
      ]
    );
    setFrequency(initialConfig.frequency || 'Month');
    setDateRange(initialConfig.dateRange || 'Current financial year • 2025');
    setOptions(
      initialConfig.options || {
        highlightCurrentPeriod: true,
        trimPeriodsWithoutResults: true,
        stackResults: true,
        alwaysShowZero: false,
        showGrid: true,
      }
    );
    onClose();
  };

  const enabledSeriesCount = series.filter((s) => s.enabled).length;

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(2px)',
              zIndex: 999,
            }}
          />
        )}
      </AnimatePresence>

      {/* Settings Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={sidebarRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '450px',
              backgroundColor: theme.colors.background.white,
              boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.15)',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <SettingsHeader
              chartTitle={chartTitle}
              seriesCount={enabledSeriesCount}
              onClose={onClose}
            />

            {/* Scrollable Content */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: theme.spacing.xl,
              }}
            >
              {/* Series Editor */}
              <SeriesEditor series={series} onSeriesChange={handleSeriesChange} />

              {/* Frequency Selector */}
              <FrequencySelector
                frequency={frequency}
                onFrequencyChange={handleFrequencyChange}
              />

              {/* Date Range Selector */}
              <DateRangeSelector dateRange={dateRange} onDateRangeChange={handleDateRangeChange} />

              {/* Options Panel */}
              <OptionsPanel options={options} onOptionsChange={setOptions} />
            </div>

            {/* Footer */}
            <SettingsFooter onSave={handleSave} onCancel={handleCancel} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Re-export types for convenience
export type { FrequencyType, DateRangeType, SeriesItem, ChartOptions };
