/**
 * Visual PDF Generator
 * Generates styled PDFs with actual rendered charts and header as images
 * For visual presentation - keeps all styles and charts
 */

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export interface VisualPDFOptions {
  fileName?: string;
  headerElementId?: string;
  chartElementIds?: string[];
}

/**
 * Captures a DOM element as high-quality canvas
 */
const captureElement = async (
  element: HTMLElement,
  options?: { scale?: number; backgroundColor?: string }
): Promise<HTMLCanvasElement> => {
  const canvas = await html2canvas(element, {
    scale: options?.scale || 2.5, // Higher quality
    backgroundColor: options?.backgroundColor || '#ffffff',
    logging: false,
    useCORS: true,
    allowTaint: true,
    imageTimeout: 0,
    removeContainer: true,
  });
  return canvas;
};

/**
 * Adds canvas image to PDF with proper scaling
 */
const addCanvasToPDF = (
  pdf: jsPDF,
  canvas: HTMLCanvasElement,
  addNewPage: boolean = false
): void => {
  if (addNewPage) {
    pdf.addPage();
  }

  const imgData = canvas.toDataURL('image/png', 1.0);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  // Calculate dimensions to fit page with margins
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  const ratio = Math.min(
    (pdfWidth - 20) / imgWidth,
    (pdfHeight - 20) / imgHeight
  );

  const scaledWidth = imgWidth * ratio;
  const scaledHeight = imgHeight * ratio;

  // Center on page
  const xOffset = (pdfWidth - scaledWidth) / 2;
  const yOffset = (pdfHeight - scaledHeight) / 2;

  pdf.addImage(imgData, 'PNG', xOffset, yOffset, scaledWidth, scaledHeight, undefined, 'FAST');
};

/**
 * Generates styled PDF with visual charts
 * Page 1: Report Header (styled, but WITHOUT action buttons)
 * Page 2+: Individual Charts (ONLY the chart, no title or buttons)
 */
export const generateVisualPDF = async (
  options: VisualPDFOptions
): Promise<void> => {
  const {
    fileName = `report-visual-${new Date().toISOString().split('T')[0]}.pdf`,
    headerElementId = 'report-header-content',
    chartElementIds = [],
  } = options;

  try {
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    // Capture header (only the content part, not action bar)
    const headerElement = document.getElementById(headerElementId);
    if (headerElement) {
      const headerCanvas = await captureElement(headerElement, {
        scale: 2.5,
        backgroundColor: '#ffffff',
      });
      addCanvasToPDF(pdf, headerCanvas, false);
    }

    // Capture each chart content (without title bar and action buttons)
    for (let i = 0; i < chartElementIds.length; i++) {
      // Use chart-content-{id} instead of chart-{id} to get only the chart
      const chartContentId = chartElementIds[i].replace('chart-', 'chart-content-');
      const chartElement = document.getElementById(chartContentId);
      if (chartElement) {
        const chartCanvas = await captureElement(chartElement, {
          scale: 2.5,
          backgroundColor: '#ffffff',
        });
        addCanvasToPDF(pdf, chartCanvas, true);
      }
    }

    // Save PDF
    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating visual PDF:', error);
    throw new Error('Failed to generate styled PDF. Please try again.');
  }
};
