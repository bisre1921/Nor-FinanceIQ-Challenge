/**
 * PeriodSelector Component
 * Period selection button with calendar icon
 */

'use client';

import React from 'react';
import { theme } from '@/app/core/theme/theme';
import { Calendar } from 'lucide-react';

export interface PeriodSelectorProps {
  period?: string;
  onPeriodChange?: () => void;
}

export const PeriodSelector: React.FC<PeriodSelectorProps> = ({
  period = 'April 2025',
  onPeriodChange,
}) => {
  return (
    <button
      onClick={onPeriodChange}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: theme.spacing.md,
        padding: `${theme.spacing.md} ${theme.spacing.xl}`,
        backgroundColor: theme.colors.background.white,
        border: `1px solid ${theme.colors.border.medium}`,
        borderRadius: theme.borderRadius.lg,
        color: theme.colors.text.dark,
        fontSize: 'clamp(0.875rem, 2vw, 1rem)',
        fontWeight: theme.typography.fontWeight.semibold,
        cursor: 'pointer',
        transition: `all ${theme.transitions.fast}`,
        boxShadow: theme.shadows.sm,
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = theme.colors.primary.yellow;
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = theme.shadows.md;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = theme.colors.border.medium;
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = theme.shadows.sm;
      }}
    >
      <Calendar size={20} strokeWidth={2} />
      <span style={{ color: theme.colors.text.tertiary }}>Period:</span>
      <span
        style={{
          fontWeight: theme.typography.fontWeight.bold,
          color: theme.colors.text.dark,
        }}
      >
        {period}
      </span>
    </button>
  );
};
