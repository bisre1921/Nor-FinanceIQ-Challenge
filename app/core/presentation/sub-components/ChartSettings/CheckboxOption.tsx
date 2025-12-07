/**
 * CheckboxOption Component
 * Reusable animated checkbox component
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { theme } from '@/app/core/theme/theme';

export interface CheckboxOptionProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const CheckboxOption: React.FC<CheckboxOptionProps> = ({ label, checked, onChange }) => {
  return (
    <motion.label
      whileHover={{ x: 2 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing.sm,
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <motion.div
        whileTap={{ scale: 0.9 }}
        style={{
          position: 'relative',
          width: '20px',
          height: '20px',
          flexShrink: 0,
        }}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          style={{
            position: 'absolute',
            opacity: 0,
            width: '100%',
            height: '100%',
            cursor: 'pointer',
          }}
        />
        <motion.div
          animate={{
            backgroundColor: checked ? theme.colors.chart.blue : 'transparent',
            borderColor: checked ? theme.colors.chart.blue : theme.colors.border.medium,
          }}
          transition={{ duration: 0.2 }}
          style={{
            width: '100%',
            height: '100%',
            border: '2px solid',
            borderRadius: theme.borderRadius.sm,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {checked && (
            <motion.svg
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M2 6L5 9L10 3"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          )}
        </motion.div>
      </motion.div>
      <span
        style={{
          fontSize: theme.typography.fontSize.sm,
          color: theme.colors.text.dark,
        }}
      >
        {label}
      </span>
    </motion.label>
  );
};
