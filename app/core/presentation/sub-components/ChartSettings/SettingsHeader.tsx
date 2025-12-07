/**
 * SettingsHeader Component
 * Header section with title, close button, and chart title input
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { theme } from '@/app/core/theme/theme';
import { X } from 'lucide-react';

export interface SettingsHeaderProps {
  chartTitle: string;
  seriesCount: number;
  onClose: () => void;
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = ({
  chartTitle,
  seriesCount,
  onClose,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      style={{
        padding: theme.spacing.xl,
        borderBottom: `1px solid ${theme.colors.border.light}`,
        backgroundColor: theme.colors.background.white,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: theme.spacing.md,
        }}
      >
        <div style={{ flex: 1 }}>
          <h2
            style={{
              margin: 0,
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.text.dark,
              marginBottom: theme.spacing.xs,
            }}
          >
            Edit component
          </h2>
        </div>

        {/* Close Button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: theme.borderRadius.md,
            color: theme.colors.text.muted,
            cursor: 'pointer',
            transition: theme.transitions.fast,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme.colors.background.light;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <X size={20} />
        </motion.button>
      </div>

      {/* Chart Title Section */}
      <div>
        <label
          style={{
            display: 'block',
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.medium,
            color: theme.colors.text.dark,
            marginBottom: theme.spacing.xs,
          }}
        >
          Chart title
        </label>
        <input
          type="text"
          value={chartTitle}
          readOnly
          style={{
            width: '100%',
            padding: theme.spacing.sm,
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.text.dark,
            backgroundColor: theme.colors.background.light,
            border: `1px solid ${theme.colors.border.light}`,
            borderRadius: theme.borderRadius.md,
            outline: 'none',
          }}
        />
      </div>

      {/* Series Info */}
      <div
        style={{
          marginTop: theme.spacing.md,
          fontSize: theme.typography.fontSize.xs,
          color: theme.colors.text.muted,
        }}
      >
        <strong>Series</strong> {seriesCount} of 6 selected
      </div>
    </motion.div>
  );
};
