/**
 * ActionBar Component
 * Top action bar with back button and action buttons
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { theme } from '@/app/core/theme/theme';
import { ArrowLeft, Save, Printer, ChevronDown, FileSpreadsheet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ActionBarProps {
  showBackButton?: boolean;
  showSaveButton?: boolean;
  showPrintButton?: boolean;
  hasUnsavedChanges?: boolean;
  onBack?: () => void;
  onSave?: () => void;
  onPrint?: () => void;
  onPrintVisual?: () => void;
  onPrintData?: () => void;
  onExportExcel?: () => void;
}

export const ActionBar: React.FC<ActionBarProps> = ({
  showBackButton = true,
  showSaveButton = true,
  showPrintButton = true,
  hasUnsavedChanges = false,
  onBack,
  onSave,
  onPrint,
  onPrintVisual,
  onPrintData,
  onExportExcel,
}) => {
  const [isHoveringBack, setIsHoveringBack] = useState(false);
  const [isHoveringSave, setIsHoveringSave] = useState(false);
  const [isHoveringPrint, setIsHoveringPrint] = useState(false);
  const [showPrintDropdown, setShowPrintDropdown] = useState(false);
  const printDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (printDropdownRef.current && !printDropdownRef.current.contains(event.target as Node)) {
        setShowPrintDropdown(false);
      }
    };

    if (showPrintDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPrintDropdown]);

  return (
    <div
      style={{
        padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
        borderBottom: `2px solid ${theme.colors.border.light}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: theme.spacing.md,
      }}
    >
      {/* Back Button */}
      {showBackButton && (
        <button
          onClick={onBack}
          onMouseEnter={() => setIsHoveringBack(true)}
          onMouseLeave={() => setIsHoveringBack(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.sm,
            padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
            backgroundColor: isHoveringBack
              ? theme.colors.background.light
              : 'transparent',
            border: `2px solid ${
              isHoveringBack
                ? theme.colors.primary.yellow
                : theme.colors.border.medium
            }`,
            borderRadius: theme.borderRadius.md,
            color: isHoveringBack
              ? theme.colors.primary.yellow
              : theme.colors.text.dark,
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.semibold,
            cursor: 'pointer',
            transition: `all ${theme.transitions.fast}`,
            transform: isHoveringBack ? 'translateX(-4px)' : 'translateX(0)',
          }}
        >
          <ArrowLeft size={18} strokeWidth={2.5} />
          <span style={{ whiteSpace: 'nowrap' }}>Back to Dashboard</span>
        </button>
      )}

      {/* Action Buttons */}
      <div
        style={{
          display: 'flex',
          gap: theme.spacing.md,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {hasUnsavedChanges && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.sm,
              padding: `${theme.spacing.sm} ${theme.spacing.md}`,
              backgroundColor: `${theme.colors.status.warning}15`,
              borderRadius: theme.borderRadius.md,
              border: `1px solid ${theme.colors.status.warning}`,
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                backgroundColor: theme.colors.status.warning,
                borderRadius: theme.borderRadius.full,
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }}
            />
            <span
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.status.warning,
                fontWeight: theme.typography.fontWeight.medium,
                whiteSpace: 'nowrap',
              }}
            >
              Unsaved changes
            </span>
          </div>
        )}

        {showSaveButton && (
          <button
            onClick={onSave}
            onMouseEnter={() => setIsHoveringSave(true)}
            onMouseLeave={() => setIsHoveringSave(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.sm,
              padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
              backgroundColor: isHoveringSave
                ? theme.colors.primary.yellow
                : theme.colors.primary.yellowLight,
              border: `2px solid ${theme.colors.primary.yellow}`,
              borderRadius: theme.borderRadius.md,
              color: isHoveringSave ? theme.colors.background.dark : '#B8860B',
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.bold,
              cursor: 'pointer',
              transition: `all ${theme.transitions.fast}`,
              transform: isHoveringSave ? 'translateY(-2px)' : 'translateY(0)',
              boxShadow: isHoveringSave ? theme.shadows.md : 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <Save size={18} strokeWidth={2.5} />
            <span>Save Report *</span>
          </button>
        )}

        {showPrintButton && (
          <div ref={printDropdownRef} style={{ position: 'relative' }}>
            <button
              onClick={() => {
                // If no dropdown handlers, use old onPrint
                if (!onPrintVisual && !onPrintData) {
                  onPrint?.();
                } else {
                  setShowPrintDropdown(!showPrintDropdown);
                }
              }}
              onMouseEnter={() => setIsHoveringPrint(true)}
              onMouseLeave={() => setIsHoveringPrint(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.sm,
                padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
                backgroundColor: isHoveringPrint
                  ? theme.colors.background.light
                  : 'transparent',
                border: `2px solid ${
                  isHoveringPrint
                    ? theme.colors.text.dark
                    : theme.colors.border.medium
                }`,
                borderRadius: theme.borderRadius.md,
                color: theme.colors.text.dark,
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.semibold,
                cursor: 'pointer',
                transition: `all ${theme.transitions.fast}`,
                transform: isHoveringPrint ? 'translateY(-2px)' : 'translateY(0)',
                whiteSpace: 'nowrap',
              }}
            >
              <Printer size={18} strokeWidth={2.5} />
              <span>Print/Save</span>
              {(onPrintVisual || onPrintData) && (
                <ChevronDown size={16} strokeWidth={2.5} />
              )}
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {showPrintDropdown && (onPrintVisual || onPrintData || onExportExcel) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: theme.spacing.xs,
                    backgroundColor: theme.colors.background.white,
                    border: `1px solid ${theme.colors.border.light}`,
                    borderRadius: theme.borderRadius.md,
                    boxShadow: theme.shadows.xl,
                    zIndex: 1000,
                    minWidth: '240px',
                    overflow: 'hidden',
                  }}
                >
                  {onPrintVisual && (
                    <motion.button
                      whileHover={{ backgroundColor: theme.colors.background.light }}
                      onClick={() => {
                        onPrintVisual();
                        setShowPrintDropdown(false);
                      }}
                      style={{
                        width: '100%',
                        padding: `${theme.spacing.md} ${theme.spacing.lg}`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: theme.spacing.sm,
                        backgroundColor: 'transparent',
                        border: 'none',
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.dark,
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: theme.transitions.fast,
                      }}
                    >
                      <Printer size={16} />
                      <div>
                        <div style={{ fontWeight: theme.typography.fontWeight.semibold }}>
                          Styled PDF
                        </div>
                        <div style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.text.muted }}>
                          With charts & full styling
                        </div>
                      </div>
                    </motion.button>
                  )}
                  
                  {onPrintData && (
                    <motion.button
                      whileHover={{ backgroundColor: theme.colors.background.light }}
                      onClick={() => {
                        onPrintData();
                        setShowPrintDropdown(false);
                      }}
                      style={{
                        width: '100%',
                        padding: `${theme.spacing.md} ${theme.spacing.lg}`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: theme.spacing.sm,
                        backgroundColor: 'transparent',
                        border: 'none',
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.dark,
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: theme.transitions.fast,
                        borderTop: `1px solid ${theme.colors.border.light}`,
                      }}
                    >
                      <Save size={16} />
                      <div>
                        <div style={{ fontWeight: theme.typography.fontWeight.semibold }}>
                          Data PDF
                        </div>
                        <div style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.text.muted }}>
                          Text-based data tables
                        </div>
                      </div>
                    </motion.button>
                  )}
                  
                  {onExportExcel && (
                    <motion.button
                      whileHover={{ backgroundColor: theme.colors.background.light }}
                      onClick={() => {
                        onExportExcel();
                        setShowPrintDropdown(false);
                      }}
                      style={{
                        width: '100%',
                        padding: `${theme.spacing.md} ${theme.spacing.lg}`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: theme.spacing.sm,
                        backgroundColor: 'transparent',
                        border: 'none',
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.dark,
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: theme.transitions.fast,
                        borderTop: `1px solid ${theme.colors.border.light}`,
                      }}
                    >
                      <FileSpreadsheet size={16} />
                      <div>
                        <div style={{ fontWeight: theme.typography.fontWeight.semibold }}>
                          Excel Export
                        </div>
                        <div style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.text.muted }}>
                          Download as .xlsx file
                        </div>
                      </div>
                    </motion.button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Add CSS animation for pulse */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .5;
          }
        }
      `}</style>
    </div>
  );
};
