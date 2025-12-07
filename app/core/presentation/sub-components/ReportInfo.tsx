/**
 * ReportInfo Component
 * Report icon, title, subtitle display
 */

'use client';

import React from 'react';
import { theme } from '@/app/core/theme/theme';

export interface ReportInfoProps {
  title?: string;
  subtitle?: string;
}

export const ReportInfo: React.FC<ReportInfoProps> = ({
  title = 'report',
  subtitle = 'Comprehensive financial overview',
}) => {
  return (
    <>
      {/* Report Icon - Enhanced */}
      <div
        style={{
          width: '100px',
          height: '100px',
          background: `linear-gradient(135deg, ${theme.colors.background.dark} 0%, ${theme.colors.background.medium} 100%)`,
          borderRadius: theme.borderRadius.xl,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: '6px',
          padding: '16px',
          border: `2px solid ${theme.colors.border.medium}`,
          boxShadow: theme.shadows.md,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle gradient overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, transparent 0%, ${theme.colors.primary.yellow}10 100%)`,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            backgroundColor: theme.colors.background.dark,
            borderRadius: theme.borderRadius.sm,
          }}
        />
        <div
          style={{
            backgroundColor: theme.colors.chart.green,
            borderRadius: theme.borderRadius.sm,
          }}
        />
        <div
          style={{
            backgroundColor: theme.colors.chart.green,
            borderRadius: theme.borderRadius.sm,
          }}
        />
        <div
          style={{
            backgroundColor: theme.colors.background.dark,
            borderRadius: theme.borderRadius.sm,
          }}
        />
      </div>

      {/* Report Title - No border, clean text */}
      <div
        style={{
          textAlign: 'center',
          width: '100%',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 2.5rem)',
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.text.dark,
            marginBottom: theme.spacing.md,
            letterSpacing: '-0.02em',
            textTransform: 'lowercase',
          }}
        >
          {title}
        </h1>
        <div
          style={{
            width: '100px',
            height: '4px',
            backgroundColor: theme.colors.primary.yellow,
            margin: `${theme.spacing.md} auto`,
            borderRadius: theme.borderRadius.full,
          }}
        />
        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: theme.colors.text.tertiary,
            fontWeight: theme.typography.fontWeight.medium,
          }}
        >
          {subtitle}
        </p>
      </div>
    </>
  );
};
