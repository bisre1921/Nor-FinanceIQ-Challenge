/**
 * Professional PDF Generator Utility
 * Creates production-ready PDFs with proper text rendering and vector graphics
 * NOT using screenshots - using proper PDF generation
 */

'use client';

import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';

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

export interface ChartConfigForPDF {
  id: string;
  title: string;
  series: ChartSeries[];
}

export interface PDFGenerationOptions {
  fileName?: string;
  reportTitle: string;
  reportSubtitle: string;
  period: string;
  charts: Array<{
    id: string;
    config: ChartConfigForPDF;
  }>;
}

// Professional PDF Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
  },
  headerPage: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1F2937',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#6B7280',
    textAlign: 'center',
  },
  period: {
    fontSize: 14,
    marginBottom: 40,
    color: '#9CA3AF',
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#F9FAFB',
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#1F2937',
  },
  chartContainer: {
    marginBottom: 20,
    border: '1px solid #E5E7EB',
    borderRadius: 8,
    padding: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#374151',
  },
  dataTable: {
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #E5E7EB',
    paddingVertical: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: '2px solid #374151',
    paddingVertical: 10,
    marginBottom: 5,
    backgroundColor: '#F9FAFB',
  },
  tableCell: {
    flex: 1,
    fontSize: 10,
    color: '#4B5563',
  },
  tableCellHeader: {
    flex: 1,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 10,
    color: '#9CA3AF',
    borderTop: '1px solid #E5E7EB',
    paddingTop: 10,
  },
  pageNumber: {
    fontSize: 10,
    color: '#9CA3AF',
  },
});

// PDF Document Component
const ReportPDFDocument: React.FC<{ options: PDFGenerationOptions }> = ({ options }) => {
  const { reportTitle, reportSubtitle, period, charts } = options;

  return (
    <Document>
      {/* Page 1: Header/Cover Page */}
      <Page size="A4" style={styles.headerPage} orientation="landscape">
        <View>
          <Text style={styles.title}>{reportTitle}</Text>
          <Text style={styles.subtitle}>{reportSubtitle}</Text>
          <Text style={styles.period}>Period: {period}</Text>
        </View>
        <View style={styles.footer}>
          <Text>Generated on {new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</Text>
        </View>
      </Page>

      {/* Page 2+: Charts with Data Tables */}
      {charts.map((chart, index) => (
        <Page key={chart.id} size="A4" style={styles.page} orientation="landscape">
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>{chart.config.title}</Text>
            
            {/* Data Table for each series */}
            {chart.config.series.map((series) => (
              <View key={series.id} style={styles.dataTable}>
                <Text style={styles.sectionTitle}>{series.name}</Text>
                
                <View style={styles.tableHeader}>
                  <Text style={styles.tableCellHeader}>Date</Text>
                  <Text style={styles.tableCellHeader}>Value</Text>
                </View>
                
                {series.data.slice(0, 10).map((dataPoint, idx) => (
                  <View key={idx} style={styles.tableRow}>
                    <Text style={styles.tableCell}>{dataPoint.date}</Text>
                    <Text style={styles.tableCell}>
                      ${dataPoint.value.toLocaleString()}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
          
          <Text style={styles.pageNumber} fixed>
            Page {index + 2} of {charts.length + 1}
          </Text>
        </Page>
      ))}
    </Document>
  );
};

/**
 * Generates and downloads a professional PDF report
 */
export const generateReportPDF = async (
  options: PDFGenerationOptions
): Promise<void> => {
  const {
    fileName = `report-${new Date().toISOString().split('T')[0]}.pdf`,
  } = options;

  try {
    const blob = await pdf(<ReportPDFDocument options={options} />).toBlob();
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
};
