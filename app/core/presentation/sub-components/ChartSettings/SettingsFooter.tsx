/**
 * SettingsFooter Component
 * Footer with Save and Cancel buttons
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { theme } from '@/app/core/theme/theme';

export interface SettingsFooterProps {
  onSave: () => void;
  onCancel: () => void;
}

export const SettingsFooter: React.FC<SettingsFooterProps> = ({ onSave, onCancel }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      style={{
        padding: theme.spacing.xl,
        borderTop: `1px solid ${theme.colors.border.light}`,
        backgroundColor: theme.colors.background.white,
        display: 'flex',
        gap: theme.spacing.md,
      }}
    >
      {/* Save Button */}
      <motion.button
        whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(0, 128, 0, 0.2)' }}
        whileTap={{ scale: 0.98 }}
        onClick={onSave}
        style={{
          flex: 1,
          padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
          backgroundColor: theme.colors.chart.green,
          color: theme.colors.background.white,
          border: 'none',
          borderRadius: theme.borderRadius.md,
          fontSize: theme.typography.fontSize.sm,
          fontWeight: theme.typography.fontWeight.semibold,
          cursor: 'pointer',
          transition: theme.transitions.fast,
        }}
      >
        Save changes
      </motion.button>

      {/* Cancel Button */}
      <motion.button
        whileHover={{ scale: 1.02, backgroundColor: theme.colors.background.light }}
        whileTap={{ scale: 0.98 }}
        onClick={onCancel}
        style={{
          padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
          backgroundColor: 'transparent',
          color: theme.colors.text.dark,
          border: `1px solid ${theme.colors.border.medium}`,
          borderRadius: theme.borderRadius.md,
          fontSize: theme.typography.fontSize.sm,
          fontWeight: theme.typography.fontWeight.medium,
          cursor: 'pointer',
          transition: theme.transitions.fast,
        }}
      >
        Cancel
      </motion.button>
    </motion.div>
  );
};
