/**
 * FrequencySelector Component
 * Dropdown to select frequency (Month/Quarter/Year) with immediate updates
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '@/app/core/theme/theme';
import { ChevronDown } from 'lucide-react';

export type FrequencyType = 'Month' | 'Quarter' | 'Year';

export interface FrequencySelectorProps {
  frequency: FrequencyType;
  onFrequencyChange: (frequency: FrequencyType) => void;
}

const frequencyOptions: FrequencyType[] = ['Month', 'Quarter', 'Year'];

export const FrequencySelector: React.FC<FrequencySelectorProps> = ({
  frequency,
  onFrequencyChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: FrequencyType) => {
    onFrequencyChange(option);
    setIsOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      style={{ marginBottom: theme.spacing.xl }}
    >
      <label
        style={{
          display: 'block',
          fontSize: theme.typography.fontSize.sm,
          fontWeight: theme.typography.fontWeight.medium,
          color: theme.colors.text.dark,
          marginBottom: theme.spacing.sm,
        }}
      >
        Frequency of results
      </label>

      {/* Dropdown */}
      <div ref={dropdownRef} style={{ position: 'relative' }}>
        <motion.button
          whileHover={{ borderColor: theme.colors.primary.yellow }}
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: '100%',
            padding: theme.spacing.sm,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: theme.colors.background.white,
            border: `1px solid ${theme.colors.border.medium}`,
            borderRadius: theme.borderRadius.md,
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.text.dark,
            cursor: 'pointer',
            transition: theme.transitions.fast,
          }}
        >
          <span>{frequency}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </motion.button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                marginTop: theme.spacing.xs,
                backgroundColor: theme.colors.background.white,
                border: `1px solid ${theme.colors.border.light}`,
                borderRadius: theme.borderRadius.md,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                zIndex: 10,
                overflow: 'hidden',
              }}
            >
              {frequencyOptions.map((option, index) => (
                <motion.button
                  key={option}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ backgroundColor: theme.colors.background.light }}
                  onClick={() => handleSelect(option)}
                  style={{
                    width: '100%',
                    padding: theme.spacing.sm,
                    textAlign: 'left',
                    backgroundColor:
                      frequency === option ? theme.colors.background.light : 'transparent',
                    border: 'none',
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.text.dark,
                    cursor: 'pointer',
                    transition: theme.transitions.fast,
                  }}
                >
                  {option}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
