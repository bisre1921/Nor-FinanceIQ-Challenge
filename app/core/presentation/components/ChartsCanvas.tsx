/**
 * ChartsCanvas Component
 * Free-form canvas where charts can be positioned and resized anywhere
 */

'use client';

import React from 'react';
import { theme } from '@/app/core/theme/theme';
import { ResizableMovableChart } from './ResizableMovableChart';
import { ChartConfig } from '@/app/core/data/mockData';

export interface ChartItem {
  id: string;
  config: ChartConfig;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface ChartsCanvasProps {
  charts: ChartItem[];
  onChartsUpdate?: (charts: ChartItem[]) => void;
}

export const ChartsCanvas: React.FC<ChartsCanvasProps> = ({
  charts,
  onChartsUpdate,
}) => {
  const handleDeleteChart = (id: string) => {
    const newCharts = charts.filter((c) => c.id !== id);
    onChartsUpdate?.(newCharts);
  };

  const handleChartMessage = (id: string) => {
    console.log(`Message for chart ${id}`);
    // Implement message functionality
  };

  const handleChartSettings = (id: string) => {
    console.log(`Settings for chart ${id}`);
    // Implement settings functionality
  };

  return (
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
        />
      ))}
    </div>
  );
};
