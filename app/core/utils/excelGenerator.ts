/**
 * Excel Generator Utility
 * Exports chart data to professional Excel files with proper formatting
 * Each chart gets its own sheet with styled headers and formatted data
 */

import * as XLSX from 'xlsx';

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

export interface ChartConfigForExcel {
  id: string;
  title: string;
  series: ChartSeries[];
}

export interface ExcelExportOptions {
  fileName?: string;
  reportTitle: string;
  reportSubtitle: string;
  period: string;
  charts: Array<{
    id: string;
    config: ChartConfigForExcel;
  }>;
}

/**
 * Formats date string for Excel
 */
const formatDateForExcel = (dateStr: string): string => {
  // Handle quarter format (Q1 2025, Q2 2025, etc.)
  if (dateStr.startsWith('Q')) {
    return dateStr;
  }
  // Handle year format (2025)
  if (/^\d{4}$/.test(dateStr)) {
    return dateStr;
  }
  // Otherwise return as-is
  return dateStr;
};

/**
 * Generates Excel file with chart data
 * Creates a separate sheet for each chart
 */
export const generateExcelReport = async (
  options: ExcelExportOptions
): Promise<void> => {
  const {
    fileName = `report-${new Date().toISOString().split('T')[0]}.xlsx`,
    reportTitle,
    reportSubtitle,
    period,
    charts,
  } = options;

  try {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Add Summary Sheet
    const summaryData = [
      ['Report Title', reportTitle],
      ['Report Subtitle', reportSubtitle],
      ['Period', period],
      ['Generated On', new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })],
      ['Total Charts', charts.length.toString()],
      [],
      ['Chart List'],
      ...charts.map((chart, idx) => [`${idx + 1}. ${chart.config.title}`]),
    ];

    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
    
    // Set column widths for summary sheet
    summarySheet['!cols'] = [
      { wch: 20 },
      { wch: 60 },
    ];

    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');

    // Add a sheet for each chart
    charts.forEach((chart) => {
      const config = chart.config;
      
      console.log('Processing chart:', config.title);
      console.log('Series count:', config.series.length);
      
      // Prepare data for each series
      config.series.forEach((series) => {
        console.log('Processing series:', series.name);
        console.log('Data points count:', series.data?.length || 0);
        console.log('Sample data:', series.data?.slice(0, 2));
        
        // Verify data exists
        if (!series.data || series.data.length === 0) {
          console.warn(`No data for series: ${series.name}`);
          return;
        }
        
        // Create sheet name (max 31 characters for Excel)
        // Use series index to ensure uniqueness
        const sheetName = `${config.title.substring(0, 15)}-${series.name.substring(0, 10)}`.substring(0, 31);
        console.log('Creating sheet:', sheetName);
        
        // Prepare header
        const headers = ['Date/Period', series.name, 'Type'];
        
        // Prepare data rows
        const dataRows = series.data.map((dataPoint) => [
          formatDateForExcel(dataPoint.date),
          dataPoint.value,
          series.type.toUpperCase(),
        ]);
        
        // Add summary statistics
        const values = series.data.map(d => d.value);
        const total = values.reduce((sum, val) => sum + val, 0);
        const average = total / values.length;
        const max = Math.max(...values);
        const min = Math.min(...values);
        
        // Combine all data
        const sheetData = [
          ['Chart', config.title],
          ['Series', series.name],
          ['Chart Type', series.type.toUpperCase()],
          ['Data Points', values.length.toString()],
          [],
          headers,
          ...dataRows,
          [],
          ['Statistics'],
          ['Total', total],
          ['Average', average],
          ['Maximum', max],
          ['Minimum', min],
        ];
        
        // Create worksheet
        const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
        
        // Set column widths
        worksheet['!cols'] = [
          { wch: 15 },
          { wch: 20 },
          { wch: 12 },
        ];
        
        // Add the worksheet to workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        console.log(`Sheet "${sheetName}" added to workbook with ${dataRows.length} rows`);
      });
    });

    // Create a combined data sheet with all series
    if (charts.length > 0) {
      // Get all unique dates across all series
      const allDates = new Set<string>();
      charts.forEach(chart => {
        chart.config.series.forEach(series => {
          series.data.forEach(point => {
            allDates.add(point.date);
          });
        });
      });
      
      const sortedDates = Array.from(allDates).sort();
      
      // Create combined data
      const combinedHeaders = ['Date/Period'];
      const seriesMap: Map<string, Map<string, number>> = new Map();
      
      charts.forEach(chart => {
        chart.config.series.forEach(series => {
          combinedHeaders.push(`${chart.config.title} - ${series.name}`);
          const dataMap = new Map<string, number>();
          series.data.forEach(point => {
            dataMap.set(point.date, point.value);
          });
          seriesMap.set(`${chart.config.title} - ${series.name}`, dataMap);
        });
      });
      
      const combinedData: Array<Array<string | number>> = [combinedHeaders];
      sortedDates.forEach(date => {
        const row: Array<string | number> = [formatDateForExcel(date)];
        seriesMap.forEach((dataMap) => {
          row.push(dataMap.get(date) || 0);
        });
        combinedData.push(row);
      });
      
      const combinedSheet = XLSX.utils.aoa_to_sheet(combinedData);
      
      // Set column widths
      combinedSheet['!cols'] = [
        { wch: 15 },
        ...Array(combinedHeaders.length - 1).fill({ wch: 18 }),
      ];
      
      XLSX.utils.book_append_sheet(workbook, combinedSheet, 'All Data');
    }

    // Log final workbook state
    console.log('Final workbook sheets:', workbook.SheetNames);
    console.log('Total sheets in workbook:', workbook.SheetNames.length);

    // Write the file with proper options
    XLSX.writeFile(workbook, fileName, {
      bookType: 'xlsx',
      type: 'binary',
      compression: true
    });
    
    console.log('Excel file generated successfully!');
  } catch (error) {
    console.error('Error generating Excel file:', error);
    throw new Error('Failed to generate Excel file. Please try again.');
  }
};
