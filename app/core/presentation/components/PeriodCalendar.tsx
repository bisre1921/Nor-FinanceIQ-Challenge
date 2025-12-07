/**
 * PeriodCalendar Component
 * Beautiful animated calendar for selecting monthly or quarterly periods
 * Features: Tab switching, hover effects, smooth animations, click-outside to close
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '@/app/core/theme/theme';
import { Calendar, RotateCcw } from 'lucide-react';

export type PeriodType = 'monthly' | 'quarterly';
export type Month = 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec';
export type Quarter = 'Q1' | 'Q2' | 'Q3' | 'Q4';

export interface MonthlyPeriod {
  type: 'monthly';
  month: Month;
  year: number;
}

export interface QuarterlyPeriod {
  type: 'quarterly';
  quarter: Quarter;
  year: number;
}

export type Period = MonthlyPeriod | QuarterlyPeriod;

export interface PeriodCalendarProps {
  selectedPeriod?: Period;
  onPeriodSelect?: (period: Period) => void;
  onClose?: () => void;
  onReset?: () => void;
  minYear?: number;
  maxYear?: number;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export const PeriodCalendar: React.FC<PeriodCalendarProps> = ({
  selectedPeriod,
  onPeriodSelect,
  onClose,
  onReset,
  minYear = 2020,
  maxYear = 2025,
  triggerRef,
}) => {
  const [activeTab, setActiveTab] = useState<PeriodType>(
    selectedPeriod?.type || 'monthly'
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    selectedPeriod?.year || maxYear
  );
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  // Ref for click-outside detection
  const calendarRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close calendar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Check if click is outside calendar
      const clickedOutsideCalendar = calendarRef.current && !calendarRef.current.contains(target);
      
      // Check if click is on the trigger button (period selector)
      const clickedOnTrigger = triggerRef?.current && triggerRef.current.contains(target);
      
      // Close only if clicked outside calendar AND not on trigger
      if (clickedOutsideCalendar && !clickedOnTrigger) {
        onClose?.();
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose, triggerRef]);

  // Generate years array
  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => maxYear - i
  );

  // Months data
  const months: Month[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  // Quarters data
  const quarters: { quarter: Quarter; months: Month[]; range: string }[] = [
    { quarter: 'Q1', months: ['Jan', 'Feb', 'Mar'], range: '(Jan-Mar)' },
    { quarter: 'Q2', months: ['Apr', 'May', 'Jun'], range: '(Apr-Jun)' },
    { quarter: 'Q3', months: ['Jul', 'Aug', 'Sep'], range: '(Jul-Sep)' },
    { quarter: 'Q4', months: ['Oct', 'Nov', 'Dec'], range: '(Oct-Dec)' },
  ];

  // Check if period is selected
  const isMonthSelected = (month: Month) => {
    if (selectedPeriod?.type === 'monthly' && selectedPeriod.year === selectedYear) {
      return selectedPeriod.month === month;
    }
    return false;
  };

  const isQuarterSelected = (quarter: Quarter) => {
    if (selectedPeriod?.type === 'quarterly' && selectedPeriod.year === selectedYear) {
      return selectedPeriod.quarter === quarter;
    }
    return false;
  };

  // Handle period selection
  const handleMonthSelect = (month: Month) => {
    onPeriodSelect?.({
      type: 'monthly',
      month,
      year: selectedYear,
    });
    onClose?.();
  };

  const handleQuarterSelect = (quarter: Quarter) => {
    onPeriodSelect?.({
      type: 'quarterly',
      quarter,
      year: selectedYear,
    });
    onClose?.();
  };

  return (
    <motion.div
      ref={calendarRef}
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
      }}
      style={{
        backgroundColor: theme.colors.background.white,
        borderRadius: theme.borderRadius.xl,
        border: `1px solid ${theme.colors.border.light}`,
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
        padding: theme.spacing.lg,
        width: '100%',
        maxWidth: '500px',
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        marginTop: theme.spacing.md,
        zIndex: 1000,
      }}
    >
      {/* Header with Icon */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: theme.spacing.lg,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
          <Calendar size={20} color={theme.colors.primary.yellow} />
          <h3
            style={{
              margin: 0,
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.text.dark,
            }}
          >
            Select Period
          </h3>
        </div>

        {/* Reset Button */}
        {selectedPeriod && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onReset?.();
              onClose?.();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.xs,
              padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
              backgroundColor: 'transparent',
              border: `1px solid ${theme.colors.border.medium}`,
              borderRadius: theme.borderRadius.md,
              color: theme.colors.text.muted,
              fontSize: theme.typography.fontSize.xs,
              fontWeight: theme.typography.fontWeight.medium,
              cursor: 'pointer',
              transition: theme.transitions.fast,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = theme.colors.status.error;
              e.currentTarget.style.color = theme.colors.status.error;
              e.currentTarget.style.backgroundColor = `${theme.colors.status.error}10`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = theme.colors.border.medium;
              e.currentTarget.style.color = theme.colors.text.muted;
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <RotateCcw size={14} />
            Reset
          </motion.button>
        )}
      </motion.div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: theme.spacing.xs,
          marginBottom: theme.spacing.lg,
          backgroundColor: theme.colors.background.light,
          padding: theme.spacing.xs,
          borderRadius: theme.borderRadius.lg,
        }}
      >
        {(['monthly', 'quarterly'] as PeriodType[]).map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              flex: 1,
              padding: `${theme.spacing.sm} ${theme.spacing.md}`,
              backgroundColor: activeTab === tab
                ? theme.colors.background.white
                : 'transparent',
              border: activeTab === tab
                ? `1px solid ${theme.colors.border.medium}`
                : '1px solid transparent',
              borderRadius: theme.borderRadius.md,
              color: activeTab === tab
                ? theme.colors.text.dark
                : theme.colors.text.muted,
              fontSize: theme.typography.fontSize.sm,
              fontWeight: activeTab === tab
                ? theme.typography.fontWeight.semibold
                : theme.typography.fontWeight.medium,
              cursor: 'pointer',
              transition: theme.transitions.fast,
              boxShadow: activeTab === tab ? theme.shadows.sm : 'none',
            }}
          >
            {tab === 'monthly' ? 'Monthly View' : 'Quarterly View'}
          </motion.button>
        ))}
      </div>

      {/* Year Selector */}
      <div
        style={{
          marginBottom: theme.spacing.lg,
          maxHeight: '150px',
          overflowY: 'auto',
          borderRadius: theme.borderRadius.md,
          border: `1px solid ${theme.colors.border.light}`,
          backgroundColor: theme.colors.background.light,
        }}
      >
        {years.map((year, index) => (
          <motion.div
            key={year}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
            onClick={() => setSelectedYear(year)}
            style={{
              padding: `${theme.spacing.sm} ${theme.spacing.md}`,
              cursor: 'pointer',
              backgroundColor: selectedYear === year
                ? theme.colors.background.white
                : 'transparent',
              borderLeft: selectedYear === year
                ? `3px solid ${theme.colors.primary.yellow}`
                : '3px solid transparent',
              color: selectedYear === year
                ? theme.colors.text.dark
                : theme.colors.text.muted,
              fontSize: theme.typography.fontSize.sm,
              fontWeight: selectedYear === year
                ? theme.typography.fontWeight.semibold
                : theme.typography.fontWeight.medium,
              transition: theme.transitions.fast,
            }}
          >
            {year}
          </motion.div>
        ))}
      </div>

      {/* Period Selector */}
      <AnimatePresence mode="wait">
        {activeTab === 'monthly' ? (
          <motion.div
            key="monthly"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: theme.spacing.sm,
            }}
          >
            {months.map((month, index) => {
              const isSelected = isMonthSelected(month);
              const isHovered = hoveredItem === month;

              return (
                <motion.button
                  key={month}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setHoveredItem(month)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => handleMonthSelect(month)}
                  style={{
                    padding: theme.spacing.md,
                    backgroundColor: isSelected
                      ? theme.colors.primary.yellow
                      : isHovered
                      ? theme.colors.background.light
                      : theme.colors.background.white,
                    border: `1px solid ${
                      isSelected
                        ? theme.colors.primary.yellow
                        : isHovered
                        ? theme.colors.border.medium
                        : theme.colors.border.light
                    }`,
                    borderRadius: theme.borderRadius.md,
                    color: isSelected
                      ? theme.colors.background.white
                      : theme.colors.text.dark,
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: isSelected
                      ? theme.typography.fontWeight.semibold
                      : theme.typography.fontWeight.medium,
                    cursor: 'pointer',
                    transition: theme.transitions.fast,
                    boxShadow: isSelected
                      ? theme.shadows.md
                      : isHovered
                      ? theme.shadows.sm
                      : 'none',
                  }}
                >
                  {month}
                </motion.button>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key="quarterly"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: theme.spacing.md,
            }}
          >
            {quarters.map((item, index) => {
              const isSelected = isQuarterSelected(item.quarter);
              const isHovered = hoveredItem === item.quarter;

              return (
                <motion.button
                  key={item.quarter}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onMouseEnter={() => setHoveredItem(item.quarter)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => handleQuarterSelect(item.quarter)}
                  style={{
                    padding: theme.spacing.lg,
                    backgroundColor: isSelected
                      ? theme.colors.primary.yellow
                      : isHovered
                      ? theme.colors.background.light
                      : theme.colors.background.white,
                    border: `1px solid ${
                      isSelected
                        ? theme.colors.primary.yellow
                        : isHovered
                        ? theme.colors.border.medium
                        : theme.colors.border.light
                    }`,
                    borderRadius: theme.borderRadius.md,
                    cursor: 'pointer',
                    transition: theme.transitions.fast,
                    boxShadow: isSelected
                      ? theme.shadows.md
                      : isHovered
                      ? theme.shadows.sm
                      : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: theme.spacing.xs,
                  }}
                >
                  <span
                    style={{
                      fontSize: theme.typography.fontSize.xl,
                      fontWeight: theme.typography.fontWeight.bold,
                      color: isSelected
                        ? theme.colors.background.white
                        : theme.colors.text.dark,
                    }}
                  >
                    {item.quarter}
                  </span>
                  <span
                    style={{
                      fontSize: theme.typography.fontSize.xs,
                      color: isSelected
                        ? theme.colors.background.white
                        : theme.colors.text.muted,
                    }}
                  >
                    {item.range}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
