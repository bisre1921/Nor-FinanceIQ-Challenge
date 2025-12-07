/**
 * StyledSelect Component
 * Reusable styled dropdown component matching the design system
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { theme } from '@/app/core/theme/theme';

export interface StyledSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  size?: 'sm' | 'md';
}

export const StyledSelect: React.FC<StyledSelectProps> = ({
  value,
  onChange,
  options,
  size = 'md',
}) => {
  const fontSize = size === 'sm' ? theme.typography.fontSize.xs : theme.typography.fontSize.sm;
  const padding = size === 'sm' 
    ? `6px 24px 6px 8px`
    : `${theme.spacing.sm} ${theme.spacing.md} ${theme.spacing.sm} ${theme.spacing.sm}`;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      style={{
        position: 'relative',
        display: 'inline-block',
      }}
    >
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding,
          fontSize,
          color: theme.colors.text.dark,
          backgroundColor: 'transparent',
          border: `1px solid ${theme.colors.border.light}`,
          borderRadius: theme.borderRadius.sm,
          cursor: 'pointer',
          outline: 'none',
          appearance: 'none',
          paddingRight: '24px',
          transition: theme.transitions.fast,
          fontWeight: theme.typography.fontWeight.normal,
          minWidth: '80px',
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {/* Custom Arrow */}
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        style={{
          position: 'absolute',
          right: '6px',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
        }}
      >
        <path
          d="M2 3L5 6L8 3"
          stroke={theme.colors.text.muted}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
};
