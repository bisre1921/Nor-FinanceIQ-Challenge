/**
 * Dashboard Screen
 * Main dashboard view showing all available reports
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { theme } from '@/app/core/theme/theme';
import { BarChart3, FileText, TrendingUp, DollarSign, ArrowRight } from 'lucide-react';

interface ReportCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: string;
  gradient: string;
}

export interface DashboardScreenProps {
  onNavigate?: (path: string) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigate,
}) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const reportCards: ReportCard[] = [
    {
      id: 'revenue-report',
      title: 'Revenue Report',
      description: 'Comprehensive revenue analysis and trends',
      icon: <DollarSign size={32} />,
      path: '/reports/revenue/chart',
      color: theme.colors.chart.green,
      gradient: 'linear-gradient(135deg, #34D399 0%, #10B981 100%)',
    },
    {
      id: 'financial-overview',
      title: 'Financial Overview',
      description: 'Complete financial performance metrics',
      icon: <BarChart3 size={32} />,
      path: '/reports/kpis',
      color: theme.colors.chart.blue,
      gradient: 'linear-gradient(135deg, #4F9CF9 0%, #2563EB 100%)',
    },
    {
      id: 'profitability',
      title: 'Profitability Analysis',
      description: 'Detailed profitability insights',
      icon: <TrendingUp size={32} />,
      path: '/reports/profitability',
      color: theme.colors.chart.orange,
      gradient: 'linear-gradient(135deg, #FB923C 0%, #F97316 100%)',
    },
    {
      id: 'custom-report',
      title: 'Custom Reports',
      description: 'Create and manage custom reports',
      icon: <FileText size={32} />,
      path: '/reports/custom',
      color: theme.colors.status.info,
      gradient: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)',
    },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1d29 0%, #0f1117 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated Background Elements */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 193, 7, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79, 156, 249, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          backgroundColor: '#252837',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          padding: `${theme.spacing['2xl']} ${theme.spacing['2xl']}`,
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.03)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: theme.spacing.lg,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.lg,
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              style={{
                width: '60px',
                height: '60px',
                background: `linear-gradient(135deg, ${theme.colors.primary.yellow} 0%, #F59E0B 100%)`,
                borderRadius: theme.borderRadius.xl,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.background.dark,
                fontSize: theme.typography.fontSize['2xl'],
                boxShadow: `0 4px 14px 0 ${theme.colors.primary.yellow}40`,
              }}
            >
              FI
            </motion.div>
            <div>
              <h1
                style={{
                  fontSize: theme.typography.fontSize['4xl'],
                  fontWeight: theme.typography.fontWeight.bold,
                  background: theme.colors.text.primary,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: theme.spacing.xs,
                }}
              >
                FinanceIQ Dashboard
              </h1>
              <p
                style={{
                  fontSize: theme.typography.fontSize.base,
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontWeight: theme.typography.fontWeight.medium,
                }}
              >
                Select a report to unlock powerful insights
              </p>
            </div>
          </div>

          
        </div>
      </motion.header>

      {/* Main Content */}
      <main
        style={{
          padding: `${theme.spacing['2xl']} ${theme.spacing['2xl']}`,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              marginBottom: theme.spacing['2xl'],
            }}
          >
            <h2
              style={{
                fontSize: theme.typography.fontSize['3xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: '#ffffff',
                marginBottom: theme.spacing.sm,
              }}
            >
              Available Reports
            </h2>
            <p
              style={{
                fontSize: theme.typography.fontSize.lg,
                color: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              Choose from our comprehensive collection of financial reports
            </p>
          </motion.div>

          {/* Report Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: theme.spacing['2xl'],
            }}
          >
            {reportCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                onHoverStart={() => setHoveredCard(card.id)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <button
                  onClick={() => onNavigate?.(card.path)}
                  style={{
                    width: '100%',
                    backgroundColor: '#252837',
                    border: `2px solid ${
                      hoveredCard === card.id ? card.color : 'rgba(255, 255, 255, 0.1)'
                    }`,
                    borderRadius: theme.borderRadius.xl,
                    padding: theme.spacing['2xl'],
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: theme.spacing.lg,
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow:
                      hoveredCard === card.id
                        ? `0 20px 40px -10px ${card.color}40`
                        : '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
                  }}
                >
                  {/* Gradient overlay on hover */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: card.gradient,
                      opacity: hoveredCard === card.id ? 1 : 0,
                      transition: 'opacity 0.3s ease',
                    }}
                  />

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <motion.div
                      animate={{
                        scale: hoveredCard === card.id ? 1.1 : 1,
                        rotate: hoveredCard === card.id ? 5 : 0,
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                      style={{
                        width: '72px',
                        height: '72px',
                        background: card.gradient,
                        borderRadius: theme.borderRadius.xl,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: theme.colors.background.white,
                        boxShadow: `0 8px 20px -5px ${card.color}50`,
                      }}
                    >
                      {card.icon}
                    </motion.div>

                    <motion.div
                      animate={{
                        x: hoveredCard === card.id ? 5 : 0,
                        opacity: hoveredCard === card.id ? 1 : 0.5,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight
                        size={24}
                        strokeWidth={2.5}
                        color={card.color}
                      />
                    </motion.div>
                  </div>

                  <div>
                    <h3
                      style={{
                        fontSize: theme.typography.fontSize.xl,
                        fontWeight: theme.typography.fontWeight.bold,
                        color: '#ffffff',
                        marginBottom: theme.spacing.sm,
                      }}
                    >
                      {card.title}
                    </h3>
                    <p
                      style={{
                        fontSize: theme.typography.fontSize.base,
                        color: 'rgba(255, 255, 255, 0.7)',
                        lineHeight: '1.6',
                        fontWeight: theme.typography.fontWeight.medium,
                      }}
                    >
                      {card.description}
                    </p>
                  </div>

                  {/* Stats badge */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredCard === card.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    style={{
                      padding: `${theme.spacing.xs} ${theme.spacing.md}`,
                      backgroundColor: `${card.color}10`,
                      borderRadius: theme.borderRadius.md,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: theme.spacing.xs,
                    }}
                  >
                    <div
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: card.color,
                      }}
                    />
                    <span
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        fontWeight: theme.typography.fontWeight.semibold,
                        color: card.color,
                      }}
                    >
                      Click to view report
                    </span>
                  </motion.div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
