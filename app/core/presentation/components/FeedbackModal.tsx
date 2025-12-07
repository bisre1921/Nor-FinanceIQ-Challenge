/**
 * FeedbackModal Component
 * Beautiful animated modal for collecting user feedback
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '@/app/core/theme/theme';
import { MessageSquare, X, Lightbulb, CheckCircle2 } from 'lucide-react';

export interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: string) => void;
  chartTitle?: string;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  chartTitle = 'Chart',
}) => {
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleSubmit = async () => {
    if (!feedback.trim()) return;
    
    setIsSubmitting(true);
    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 500));
    onSubmit(feedback);
    setFeedback('');
    setIsSubmitting(false);
  };

  const tips = [
    'Be specific about what you\'re experiencing or suggesting',
    'Include context about your use case or workflow',
    'Mention any error messages or unexpected behavior',
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(4px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: theme.spacing.lg,
            }}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: theme.colors.background.white,
                borderRadius: theme.borderRadius.xl,
                width: '100%',
                maxWidth: '560px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                border: `1px solid ${theme.colors.border.light}`,
                overflow: 'hidden',
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: `${theme.spacing.xl} ${theme.spacing['2xl']}`,
                  borderBottom: `1px solid ${theme.colors.border.light}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: theme.borderRadius.lg,
                      background: `linear-gradient(135deg, ${theme.colors.chart.blue} 0%, ${theme.colors.status.info} 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: theme.colors.background.white,
                    }}
                  >
                    <MessageSquare size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: theme.typography.fontSize.xl,
                        fontWeight: theme.typography.fontWeight.bold,
                        color: theme.colors.text.dark,
                        marginBottom: theme.spacing.xs,
                      }}
                    >
                      Help us improve FinanceIQ
                    </h3>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: theme.borderRadius.md,
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: theme.colors.text.tertiary,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: theme.transitions.fast,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = theme.colors.background.light;
                    e.currentTarget.style.color = theme.colors.text.dark;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = theme.colors.text.tertiary;
                  }}
                >
                  <X size={20} strokeWidth={2} />
                </button>
              </div>

              {/* Body */}
              <div style={{ padding: `${theme.spacing.xl} ${theme.spacing['2xl']}` }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: theme.typography.fontWeight.semibold,
                    color: theme.colors.text.dark,
                    marginBottom: theme.spacing.sm,
                  }}
                >
                  Your feedback on {chartTitle}
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder={`Describe your experience, suggestions, or issues with ${chartTitle}...`}
                  rows={6}
                  style={{
                    width: '100%',
                    padding: theme.spacing.md,
                    fontSize: theme.typography.fontSize.base,
                    color: theme.colors.text.dark,
                    backgroundColor: theme.colors.background.light,
                    border: `2px solid ${theme.colors.border.medium}`,
                    borderRadius: theme.borderRadius.lg,
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    outline: 'none',
                    transition: theme.transitions.fast,
                    lineHeight: '1.6',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = theme.colors.chart.blue;
                    e.currentTarget.style.backgroundColor = theme.colors.background.white;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = theme.colors.border.medium;
                    e.currentTarget.style.backgroundColor = theme.colors.background.light;
                  }}
                />

                {/* Tips Section */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    marginTop: theme.spacing.lg,
                    padding: theme.spacing.lg,
                    backgroundColor: `${theme.colors.status.info}10`,
                    borderRadius: theme.borderRadius.lg,
                    border: `1px solid ${theme.colors.status.info}30`,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: theme.spacing.sm,
                      marginBottom: theme.spacing.md,
                    }}
                  >
                    <Lightbulb size={18} color={theme.colors.status.info} strokeWidth={2.5} />
                    <span
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        fontWeight: theme.typography.fontWeight.bold,
                        color: theme.colors.status.info,
                      }}
                    >
                      Tips for great feedback:
                    </span>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: theme.spacing.lg }}>
                    {tips.map((tip, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        style={{
                          fontSize: theme.typography.fontSize.sm,
                          color: theme.colors.text.secondary,
                          marginBottom: theme.spacing.sm,
                          lineHeight: '1.5',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: theme.spacing.sm,
                        }}
                      >
                        <CheckCircle2
                          size={16}
                          color={theme.colors.status.info}
                          strokeWidth={2.5}
                          style={{ marginTop: '2px', flexShrink: 0 }}
                        />
                        <span>{tip}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Footer */}
              <div
                style={{
                  padding: `${theme.spacing.lg} ${theme.spacing['2xl']}`,
                  borderTop: `1px solid ${theme.colors.border.light}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: theme.spacing.md,
                  backgroundColor: theme.colors.background.light,
                }}
              >
                <button
                  onClick={onClose}
                  style={{
                    padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
                    fontSize: theme.typography.fontSize.base,
                    fontWeight: theme.typography.fontWeight.semibold,
                    color: theme.colors.text.secondary,
                    backgroundColor: 'transparent',
                    border: `2px solid ${theme.colors.border.medium}`,
                    borderRadius: theme.borderRadius.lg,
                    cursor: 'pointer',
                    transition: theme.transitions.fast,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = theme.colors.background.white;
                    e.currentTarget.style.borderColor = theme.colors.text.secondary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = theme.colors.border.medium;
                  }}
                >
                  Cancel
                </button>
                <motion.button
                  onClick={handleSubmit}
                  disabled={!feedback.trim() || isSubmitting}
                  whileHover={{ scale: feedback.trim() ? 1.02 : 1 }}
                  whileTap={{ scale: feedback.trim() ? 0.98 : 1 }}
                  style={{
                    padding: `${theme.spacing.sm} ${theme.spacing['2xl']}`,
                    fontSize: theme.typography.fontSize.base,
                    fontWeight: theme.typography.fontWeight.bold,
                    color: theme.colors.background.white,
                    background: feedback.trim()
                      ? `linear-gradient(135deg, ${theme.colors.chart.blue} 0%, ${theme.colors.status.info} 100%)`
                      : theme.colors.border.medium,
                    border: 'none',
                    borderRadius: theme.borderRadius.lg,
                    cursor: feedback.trim() ? 'pointer' : 'not-allowed',
                    transition: theme.transitions.fast,
                    boxShadow: feedback.trim()
                      ? `0 4px 12px ${theme.colors.chart.blue}40`
                      : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.spacing.sm,
                  }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
