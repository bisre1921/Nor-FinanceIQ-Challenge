/**
 * ChartsCanvas Component
 * Free-form canvas where charts can be positioned and resized anywhere
 */

'use client';

import React, { useState } from 'react';
import { theme } from '@/app/core/theme/theme';
import { ResizableMovableChart } from './ResizableMovableChart';
import { ChartSettings, ChartSettingsConfig } from './ChartSettings';
import {
  ChartConfig,
  transformToQuarterlyData,
  transformToYearlyData,
} from '@/app/core/data/mockData';

export interface ChartItem {
  id: string;
  config: ChartConfig;
  position: { x: number; y: number };
  size: { width: number; height: number };
  settings?: ChartSettingsConfig; // Store chart-specific settings
}

export interface ChartsCanvasProps {
  charts: ChartItem[];
  onChartsUpdate?: (charts: ChartItem[]) => void;
}

export const ChartsCanvas: React.FC<ChartsCanvasProps> = ({
  charts,
  onChartsUpdate,
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedChartId, setSelectedChartId] = useState<string | null>(null);
  const [baseChartConfigs, setBaseChartConfigs] = useState<Record<string, ChartConfig>>({});

  const handleDeleteChart = (id: string) => {
    const newCharts = charts.filter((c) => c.id !== id);
    onChartsUpdate?.(newCharts);
  };

  const handleChartMessage = (id: string) => {
    console.log(`Message for chart ${id}`);
    // Implement message functionality
  };

  const handlePositionChange = (id: string, position: { x: number; y: number }) => {
    const updatedCharts = charts.map(chart =>
      chart.id === id ? { ...chart, position } : chart
    );
    onChartsUpdate?.(updatedCharts);
  };

  const handleSizeChange = (id: string, size: { width: number; height: number }) => {
    const updatedCharts = charts.map(chart =>
      chart.id === id ? { ...chart, size } : chart
    );
    onChartsUpdate?.(updatedCharts);
  };

  const handleChartSettings = (id: string) => {
    const chart = charts.find((c) => c.id === id);
    if (chart) {
      // Store the original config if not already stored
      if (!baseChartConfigs[id]) {
        setBaseChartConfigs(prev => ({ ...prev, [id]: chart.config }));
      }
    }
    setSelectedChartId(id);
    setIsSettingsOpen(true);
  };

  const handleConfigChange = (config: ChartSettingsConfig) => {
    if (!selectedChartId) return;

    const chartIndex = charts.findIndex((c) => c.id === selectedChartId);
    if (chartIndex === -1) return;

    const baseConfig = baseChartConfigs[selectedChartId] || charts[chartIndex].config;
    let transformedConfig = { ...baseConfig };

    // Apply frequency transformation
    if (config.frequency === 'Quarter') {
      transformedConfig = transformToQuarterlyData(baseConfig);
    } else if (config.frequency === 'Year') {
      transformedConfig = transformToYearlyData(baseConfig);
    }

    // Update the chart with new config
    const updatedCharts = [...charts];
    updatedCharts[chartIndex] = {
      ...updatedCharts[chartIndex],
      config: transformedConfig,
      settings: config,
    };

    onChartsUpdate?.(updatedCharts);
  };

  const handleSettingsSave = (config: ChartSettingsConfig) => {
    console.log('Settings saved:', config);
    // Options are applied here when user clicks Save
    handleConfigChange(config);
  };

  return (
    <>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: charts.length > 0 ? 'calc(100vh - 200px)' : 'auto',
          minHeight: charts.length > 0 ? '600px' : '100px',
          backgroundColor: theme.colors.background.white,
          borderRadius: theme.borderRadius.xl,
          overflow: 'auto',
          padding: theme.spacing.md,
        }}
      >
        {/* Charts */}
        {charts.map((chart) => (
          <ResizableMovableChart
            key={chart.id}
            id={chart.id}
            config={chart.config}
            defaultPosition={chart.position}
            defaultSize={chart.size}
            onDelete={handleDeleteChart}
            onMessage={handleChartMessage}
            onSettings={handleChartSettings}
            onPositionChange={handlePositionChange}
            onSizeChange={handleSizeChange}
            chartOptions={chart.settings?.options}
          />
        ))}
      </div>

      {/* Settings Sidebar */}
      <ChartSettings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        chartTitle={
          selectedChartId
            ? charts.find((c) => c.id === selectedChartId)?.config.title || 'Chart'
            : 'Chart'
        }
        initialConfig={
          selectedChartId
            ? charts.find((c) => c.id === selectedChartId)?.settings
            : undefined
        }
        onConfigChange={handleConfigChange}
        onSave={handleSettingsSave}
      />
    </>
  );
};
