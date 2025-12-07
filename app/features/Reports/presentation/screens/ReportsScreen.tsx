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
import { generateReportPDF } from '@/app/core/utils/pdfGenerator';
import { generateVisualPDF } from '@/app/core/utils/pdfGeneratorVisual';
import { generateExcelReport } from '@/app/core/utils/excelGenerator';

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
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

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
              
              // Initial load should NOT trigger unsaved changes
              setCharts([...charts, newChart]);
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

  const handlePrint = async () => {
    // Legacy handler - can be removed or kept as default
    await handlePrintVisual();
  };

  const handlePrintVisual = async () => {
    setIsGeneratingPDF(true);
    
    try {
      const reportConfig = currentReportId ? getReportConfig(currentReportId) : null;
      
      const fileName = reportConfig?.title 
        ? `${reportConfig.title.toLowerCase().replace(/\s+/g, '-')}-styled-${new Date().toISOString().split('T')[0]}.pdf`
        : `report-styled-${new Date().toISOString().split('T')[0]}.pdf`;

      // Get all chart IDs for visual capture
      const chartElementIds = charts.map(chart => `chart-${chart.id}`);

      // Generate visual PDF with styled header and charts
      await generateVisualPDF({
        fileName,
        headerElementId: 'report-header-content',
        chartElementIds,
      });

      console.log('Styled PDF generated successfully!');
    } catch (error) {
      console.error('Error generating styled PDF:', error);
      alert('Failed to generate styled PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handlePrintData = async () => {
    setIsGeneratingPDF(true);
    
    try {
      // Get report config for title and subtitle
      const reportConfig = currentReportId ? getReportConfig(currentReportId) : null;
      
      const fileName = reportConfig?.title 
        ? `${reportConfig.title.toLowerCase().replace(/\s+/g, '-')}-data-${new Date().toISOString().split('T')[0]}.pdf`
        : `report-data-${new Date().toISOString().split('T')[0]}.pdf`;

      // Prepare chart data for PDF
      const pdfCharts = charts.map(chart => ({
        id: chart.id,
        config: {
          id: chart.config.id,
          title: chart.config.title,
          series: chart.config.series,
        },
      }));

      // Generate PDF with proper data
      await generateReportPDF({
        fileName,
        reportTitle: reportConfig?.title || 'Financial Report',
        reportSubtitle: reportConfig?.subtitle || 'Comprehensive financial overview',
        period: selectedPeriod 
          ? (selectedPeriod.type === 'monthly' 
              ? `${selectedPeriod.month} ${selectedPeriod.year}`
              : `${selectedPeriod.quarter} ${selectedPeriod.year}`)
          : reportConfig?.period || 'April 2025',
        charts: pdfCharts,
      });

      console.log('Data PDF generated successfully!');
    } catch (error) {
      console.error('Error generating data PDF:', error);
      alert('Failed to generate data PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleExportExcel = async () => {
    setIsGeneratingPDF(true);
    
    try {
      const reportConfig = currentReportId ? getReportConfig(currentReportId) : null;
      
      const fileName = reportConfig?.title 
        ? `${reportConfig.title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.xlsx`
        : `report-${new Date().toISOString().split('T')[0]}.xlsx`;

      // Prepare chart data for Excel
      const excelCharts = charts.map(chart => ({
        id: chart.id,
        config: {
          id: chart.config.id,
          title: chart.config.title,
          series: chart.config.series,
        },
      }));

      console.log('Excel Charts Data:', excelCharts);
      console.log('First chart series:', excelCharts[0]?.config.series);

      // Generate Excel file
      await generateExcelReport({
        fileName,
        reportTitle: reportConfig?.title || 'Financial Report',
        reportSubtitle: reportConfig?.subtitle || 'Comprehensive financial overview',
        period: selectedPeriod 
          ? (selectedPeriod.type === 'monthly' 
              ? `${selectedPeriod.month} ${selectedPeriod.year}`
              : `${selectedPeriod.quarter} ${selectedPeriod.year}`)
          : reportConfig?.period || 'April 2025',
        charts: excelCharts,
      });

      console.log('Excel file generated successfully!');
    } catch (error) {
      console.error('Error generating Excel file:', error);
      alert('Failed to generate Excel file. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
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
          position: 'relative',
        }}
      >
        {/* Loading Overlay for PDF Generation */}
        {isGeneratingPDF && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              gap: theme.spacing.lg,
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                border: `4px solid ${theme.colors.border.light}`,
                borderTop: `4px solid ${theme.colors.primary.yellow}`,
                borderRadius: theme.borderRadius.full,
                animation: 'spin 1s linear infinite',
              }}
            />
            <div
              style={{
                fontSize: theme.typography.fontSize.lg,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.background.white,
              }}
            >
              Generating PDF...
            </div>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        )}

        {/* Report Header - Same width as charts */}
        <div style={{ paddingTop: 'clamp(0.5rem, 2vw, 1rem)' }}>
          <ReportHeader
            title={reportConfig?.title || 'report'}
            subtitle={reportConfig?.subtitle || 'Comprehensive financial overview'}
            period={reportConfig?.period || 'April 2025'}
            onBack={onNavigateToDashboard}
            onSave={handleSave}
            onPrint={handlePrint}
            onPrintVisual={handlePrintVisual}
            onPrintData={handlePrintData}
            onExportExcel={handleExportExcel}
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
