/**
 * OptionsPanel Component
 * Checkboxes for chart options (requires save to apply)
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { theme } from '@/app/core/theme/theme';
import { CheckboxOption } from './CheckboxOption';

export interface ChartOptions {
  highlightCurrentPeriod: boolean;
  trimPeriodsWithoutResults: boolean;
  stackResults: boolean;
  alwaysShowZero: boolean;
  showGrid: boolean;
}

export interface OptionsPanelProps {
  options: ChartOptions;
  onOptionsChange: (options: ChartOptions) => void;
}

export const OptionsPanel: React.FC<OptionsPanelProps> = ({ options, onOptionsChange }) => {
  const handleOptionChange = (key: keyof ChartOptions, value: boolean) => {
    onOptionsChange({
      ...options,
      [key]: value,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <label
        style={{
          display: 'block',
          fontSize: theme.typography.fontSize.sm,
          fontWeight: theme.typography.fontWeight.medium,
          color: theme.colors.text.dark,
          marginBottom: theme.spacing.md,
        }}
      >
        Options
      </label>

      <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
        <CheckboxOption
          label="Highlight the current period"
          checked={options.highlightCurrentPeriod}
          onChange={(checked: boolean) => handleOptionChange('highlightCurrentPeriod', checked)}
        />

        <CheckboxOption
          label="Trim periods without results"
          checked={options.trimPeriodsWithoutResults}
          onChange={(checked: boolean) => handleOptionChange('trimPeriodsWithoutResults', checked)}
        />

        <CheckboxOption
          label="Stack results"
          checked={options.stackResults}
          onChange={(checked: boolean) => handleOptionChange('stackResults', checked)}
        />

        <CheckboxOption
          label="Always show zero on the vertical axes"
          checked={options.alwaysShowZero}
          onChange={(checked: boolean) => handleOptionChange('alwaysShowZero', checked)}
        />

        <CheckboxOption
          label="Show grid"
          checked={options.showGrid}
          onChange={(checked: boolean) => handleOptionChange('showGrid', checked)}
        />
      </div>
    </motion.div>
  );
};
