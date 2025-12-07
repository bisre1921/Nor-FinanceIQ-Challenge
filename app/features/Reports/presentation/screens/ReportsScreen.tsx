/**
 * ReportsScreen Component
 * Main reports view with sidebar, header, and free-form chart canvas
 */

'use client';

import React, { useState } from 'react';
import { theme } from '@/app/core/theme/theme';
import { Sidebar, ReportHeader, ChartsCanvas, ChartItem, Period } from '@/app/core/presentation/components';
import { 
  getReportConfig, 
  getChartData, 
  filterChartDataByMonth, 
  filterChartDataByQuarter,
  ChartConfig
} from '@/app/core/data/mockData';

export interface ReportsScreenProps {
  onNavigateToDashboard?: () => void;
}

export const ReportsScreen: React.FC<ReportsScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const [currentReportId, setCurrentReportId] = useState<string | null>(null);
  const [charts, setCharts] = useState<ChartItem[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<Period | null>(null);
  const [baseChartData, setBaseChartData] = useState<Record<string, ChartConfig>>({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Wrapper function to update charts and mark as unsaved
  const handleChartsUpdate = (newCharts: ChartItem[] | ((prev: ChartItem[]) => ChartItem[])) => {
    setCharts(newCharts);
    setHasUnsavedChanges(true);
  };

  const handleNavigate = (path: string) => {
    if (path === '/dashboard') {
      onNavigateToDashboard?.();
    } else {
      // Map path to report ID
      // Path format: /reports/revenue/chart -> revenue-chart
      // Path format: /reports/kpis -> kpis
      const pathParts = path.split('/').filter(Boolean);
      
      let reportId: string | null = null;
      
      if (pathParts.length >= 2) {
        if (pathParts.length === 2) {
          // Simple path like /reports/kpis
          reportId = pathParts[1];
        } else if (pathParts.length >= 3) {
          // Complex path like /reports/revenue/chart -> revenue-chart
          // Join the last two parts with hyphen
          reportId = `${pathParts[1]}-${pathParts[2]}`;
        }
      }
      
      setCurrentReportId(reportId);
      
      // Add chart to canvas when report is selected
      if (reportId) {
        const reportConfig = getReportConfig(reportId);
        if (reportConfig?.charts[0]) {
          const originalChartData = getChartData(reportConfig.charts[0]);
          if (originalChartData) {
            // Store original data
            setBaseChartData(prev => ({
              ...prev,
              [originalChartData.id]: originalChartData
            }));

            // Apply period filter if one is selected
            let chartData = originalChartData;
            if (selectedPeriod) {
              if (selectedPeriod.type === 'monthly') {
                chartData = filterChartDataByMonth(
                  originalChartData,
                  selectedPeriod.month,
                  selectedPeriod.year
                );
              } else {
                chartData = filterChartDataByQuarter(
                  originalChartData,
                  selectedPeriod.quarter,
                  selectedPeriod.year
                );
              }
            }

            // Check if chart already exists
            const chartExists = charts.some(c => c.id === chartData.id);
            if (!chartExists) {
              // Calculate position (cascade new charts)
              const position = {
                x: 50 + charts.length * 30,
                y: 50 + charts.length * 30,
              };
              
              const newChart: ChartItem = {
                id: chartData.id,
                config: chartData,
                position,
                size: { width: 800, height: 500 },
              };
              
              handleChartsUpdate([...charts, newChart]);
            }
          }
        }
      }
    }
  };

  const handleSave = () => {
    console.log('Saving report...');
    // TODO: Implement save logic (persist charts state, period, etc.)
    
    // Reset unsaved changes flag
    setHasUnsavedChanges(false);
  };

  const handlePrint = () => {
    console.log('Printing report...');
    // Implement print logic
  };

  const handlePeriodChange = (period: Period | null) => {
    console.log('Period changed:', period);
    
    // Mark as unsaved when period changes
    setHasUnsavedChanges(true);
    
    // Handle reset (period is null)
    if (!period) {
      setSelectedPeriod(null);
      // Restore all charts to original unfiltered data
      handleChartsUpdate(prevCharts =>
        prevCharts.map(chart => ({
          ...chart,
          config: baseChartData[chart.id] || chart.config,
        }))
      );
      return;
    }
    
    setSelectedPeriod(period);
    
    // Update existing charts with filtered data
    handleChartsUpdate(prevCharts => 
      prevCharts.map(chart => {
        // Get original data from baseChartData
        const originalData = baseChartData[chart.id];
        if (!originalData) return chart;

        // Apply filter based on period type
        let filteredConfig: ChartConfig;
        if (period.type === 'monthly') {
          filteredConfig = filterChartDataByMonth(
            originalData,
            period.month,
            period.year
          );
        } else {
          filteredConfig = filterChartDataByQuarter(
            originalData,
            period.quarter,
            period.year
          );
        }

        return {
          ...chart,
          config: filteredConfig,
        };
      })
    );
  };

  // Get current report config
  const reportConfig = currentReportId ? getReportConfig(currentReportId) : null;

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: theme.colors.background.light,
        flexDirection: 'row',
      }}
    >
      {/* Sidebar */}
      <Sidebar onNavigate={handleNavigate} />

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
          minWidth: 0,
          padding: 'clamp(0.5rem, 2vw, 1rem)',
          paddingTop: 0,
        }}
      >
        {/* Report Header - Same width as charts */}
        <div style={{ paddingTop: 'clamp(0.5rem, 2vw, 1rem)' }}>
          <ReportHeader
            title={reportConfig?.title || 'report'}
            subtitle={reportConfig?.subtitle || 'Comprehensive financial overview'}
            period={reportConfig?.period || 'April 2025'}
            onBack={onNavigateToDashboard}
            onSave={handleSave}
            onPrint={handlePrint}
            onPeriodChange={handlePeriodChange}
            hasUnsavedChanges={hasUnsavedChanges}
            showSaveButton={hasUnsavedChanges}
          />
        </div>

        {/* Charts Canvas - Free-form draggable and resizable charts */}
        <div
          style={{
            flex: 1,
            paddingTop: 'clamp(0.5rem, 2vw, 1rem)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <ChartsCanvas
            charts={charts}
            onChartsUpdate={handleChartsUpdate}
          />
        </div>
      </main>
    </div>
  );
};
