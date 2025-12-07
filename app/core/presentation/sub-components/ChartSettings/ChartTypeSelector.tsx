/**
 * ChartTypeSelector Component
 * Custom animated dropdown for selecting chart types (Line, Area, Bar)
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '@/app/core/theme/theme';
import { ChevronDown } from 'lucide-react';

export interface ChartTypeSelectorProps {
  value: 'Line' | 'Area' | 'Bar';
  onChange: (value: 'Line' | 'Area' | 'Bar') => void;
}

const chartTypeOptions: Array<'Line' | 'Area' | 'Bar'> = ['Line', 'Area', 'Bar'];

const chartTypeIcons: Record<string, string> = {
  Line: '📈',
  Area: '📊',
  Bar: '📊',
};

export const ChartTypeSelector: React.FC<ChartTypeSelectorProps> = ({
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (option: 'Line' | 'Area' | 'Bar') => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      style={{
        position: 'relative',
        width: '90px',
      }}
    >
      {/* Trigger Button */}
      <motion.button
        whileHover={{ backgroundColor: theme.colors.background.light }}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        style={{
          width: '100%',
          padding: `6px 8px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'transparent',
          border: `1px solid ${theme.colors.border.light}`,
          borderRadius: theme.borderRadius.sm,
          fontSize: theme.typography.fontSize.xs,
          color: theme.colors.text.dark,
          cursor: 'pointer',
          transition: theme.transitions.fast,
          gap: theme.spacing.xs,
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '12px' }}>{chartTypeIcons[value]}</span>
          <span>{value}</span>
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={12} color={theme.colors.text.muted} />
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
              marginTop: '4px',
              backgroundColor: theme.colors.background.white,
              border: `1px solid ${theme.colors.border.light}`,
              borderRadius: theme.borderRadius.md,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              zIndex: 1000,
              overflow: 'hidden',
            }}
          >
            {chartTypeOptions.map((option, index) => (
              <motion.button
                key={option}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{
                  backgroundColor: theme.colors.background.light,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(option);
                }}
                style={{
                  width: '100%',
                  padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor:
                    value === option
                      ? theme.colors.background.light
                      : 'transparent',
                  border: 'none',
                  fontSize: theme.typography.fontSize.xs,
                  color: theme.colors.text.dark,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: theme.transitions.fast,
                  fontWeight:
                    value === option
                      ? theme.typography.fontWeight.medium
                      : theme.typography.fontWeight.normal,
                }}
              >
                <span style={{ fontSize: '12px' }}>{chartTypeIcons[option]}</span>
                <span>{option}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
