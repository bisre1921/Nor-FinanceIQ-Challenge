/**
 * ReportHeader Component
 * Header section showing report details, period selector, and action buttons
 */

'use client';

import React, { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { theme } from '@/app/core/theme/theme';
import { ActionBar, ReportInfo, PeriodSelector } from '../sub-components';
import { PeriodCalendar, Period } from './PeriodCalendar';

export interface ReportHeaderProps {
  title?: string;
  subtitle?: string;
  period?: string;
  showBackButton?: boolean;
  showSaveButton?: boolean;
  showPrintButton?: boolean;
  hasUnsavedChanges?: boolean;
  onBack?: () => void;
  onSave?: () => void;
  onPrint?: () => void;
  onPrintVisual?: () => void;
  onPrintData?: () => void;
  onExportExcel?: () => void;
  onPeriodChange?: (period: Period) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const ReportHeader: React.FC<ReportHeaderProps> = ({
  title = 'report',
  subtitle = 'Comprehensive financial overview',
  period = 'April 2025',
  showBackButton = true,
  showSaveButton = true,
  showPrintButton = true,
  hasUnsavedChanges = false,
  onBack,
  onSave,
  onPrint,
  onPrintVisual,
  onPrintData,
  onExportExcel,
  onPeriodChange,
  className,
  style,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [displayPeriod, setDisplayPeriod] = useState(period);
  const [selectedPeriod, setSelectedPeriod] = useState<Period | null>(null);
  const periodButtonRef = useRef<HTMLDivElement>(null);

  const handlePeriodSelect = (selectedPeriod: Period) => {
    // Format period for display
    let formattedPeriod = '';
    if (selectedPeriod.type === 'monthly') {
      formattedPeriod = `${selectedPeriod.month} ${selectedPeriod.year}`;
    } else {
      // Get month range for quarter
      const quarterMonths: Record<string, string> = {
        'Q1': 'Jan-Mar',
        'Q2': 'Apr-Jun',
        'Q3': 'Jul-Sep',
        'Q4': 'Oct-Dec',
      };
      formattedPeriod = `${selectedPeriod.quarter} (${quarterMonths[selectedPeriod.quarter]}) ${selectedPeriod.year}`;
    }
    
    setDisplayPeriod(formattedPeriod);
    setSelectedPeriod(selectedPeriod); // Track the selected period
    setShowCalendar(false);
    onPeriodChange?.(selectedPeriod);
  };

  const handleReset = () => {
    setDisplayPeriod(period); // Reset to default period
    setSelectedPeriod(null); // Clear selected period
    setShowCalendar(false);
    onPeriodChange?.(null as unknown as Period); // Signal reset with null
  };

  return (
    <header
      id="report-header"
      className={className}
      style={{
        backgroundColor: theme.colors.background.white,
        ...style,
      }}
    >
      {/* Top Action Bar */}
      <ActionBar
        showBackButton={showBackButton}
        showSaveButton={showSaveButton}
        showPrintButton={showPrintButton}
        hasUnsavedChanges={hasUnsavedChanges}
        onBack={onBack}
        onSave={onSave}
        onPrint={onPrint}
        onPrintVisual={onPrintVisual}
        onPrintData={onPrintData}
        onExportExcel={onExportExcel}
      />

      {/* Report Info Section - Beautiful Card Design */}
      <div
        id="report-header-content"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: `${theme.spacing.lg} clamp(1rem, 3vw, 2rem)`,
          background: theme.colors.background.white,
          position: 'relative',
          overflow: 'visible',
        }}
      >
        {/* Main Content Card - Like Chart Card */}
        <div
          style={{
            width: '100%',
            backgroundColor: theme.colors.background.white,
            borderRadius: theme.borderRadius.xl,
            border: `1px solid ${theme.colors.border.light}`,
            boxShadow: theme.shadows.lg,
            padding: `${theme.spacing.xl} ${theme.spacing.lg}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: theme.spacing.lg,
            position: 'relative',
            overflow: 'visible',
          }}
        >
          {/* Top Accent Border */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: theme.colors.border.light,
            }}
          />

          {/* Report Info */}
          <ReportInfo title={title} subtitle={subtitle} />

          {/* Period Selector with Calendar */}
          <div 
            ref={periodButtonRef}
            style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', zIndex: 100 }}
          >
            <PeriodSelector 
              period={displayPeriod} 
              onPeriodChange={() => setShowCalendar(!showCalendar)} 
            />
            
            {/* Calendar Dropdown */}
            <AnimatePresence>
              {showCalendar && (
                <PeriodCalendar
                  selectedPeriod={selectedPeriod || undefined}
                  onPeriodSelect={handlePeriodSelect}
                  onClose={() => setShowCalendar(false)}
                  onReset={handleReset}
                  triggerRef={periodButtonRef}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Decorative Corner Dots */}
          <div
            style={{
              position: 'absolute',
              top: theme.spacing.md,
              left: theme.spacing.md,
              width: '8px',
              height: '8px',
              backgroundColor: theme.colors.chart.blue,
              borderRadius: theme.borderRadius.full,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: theme.spacing.md,
              right: theme.spacing.md,
              width: '8px',
              height: '8px',
              backgroundColor: theme.colors.chart.green,
              borderRadius: theme.borderRadius.full,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: theme.spacing.md,
              left: theme.spacing.md,
              width: '8px',
              height: '8px',
              backgroundColor: theme.colors.chart.green,
              borderRadius: theme.borderRadius.full,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: theme.spacing.md,
              right: theme.spacing.md,
              width: '8px',
              height: '8px',
              backgroundColor: theme.colors.chart.blue,
              borderRadius: theme.borderRadius.full,
            }}
          />
        </div>
      </div>
    </header>
  );
};
