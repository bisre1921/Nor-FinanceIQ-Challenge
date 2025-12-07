/**
 * Dashboard Screen
 * Main dashboard view showing all available reports
 */

'use client';

import React from 'react';
import { theme } from '@/app/core/theme/theme';
import { BarChart3, FileText, TrendingUp, DollarSign } from 'lucide-react';

interface ReportCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: string;
}

export interface DashboardScreenProps {
  onNavigate?: (path: string) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigate,
}) => {
  const reportCards: ReportCard[] = [
    {
      id: 'revenue-report',
      title: 'Revenue Report',
      description: 'Comprehensive revenue analysis and trends',
      icon: <DollarSign size={32} />,
      path: '/reports/revenue/chart',
      color: theme.colors.chart.green,
    },
    {
      id: 'financial-overview',
      title: 'Financial Overview',
      description: 'Complete financial performance metrics',
      icon: <BarChart3 size={32} />,
      path: '/reports/kpis',
      color: theme.colors.chart.blue,
    },
    {
      id: 'profitability',
      title: 'Profitability Analysis',
      description: 'Detailed profitability insights',
      icon: <TrendingUp size={32} />,
      path: '/reports/profitability',
      color: theme.colors.chart.orange,
    },
    {
      id: 'custom-report',
      title: 'Custom Reports',
      description: 'Create and manage custom reports',
      icon: <FileText size={32} />,
      path: '/reports/custom',
      color: theme.colors.status.info,
    },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.colors.background.light,
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: theme.colors.background.white,
          borderBottom: `1px solid ${theme.colors.border.light}`,
          padding: `${theme.spacing.xl} ${theme.spacing['2xl']}`,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.md,
            marginBottom: theme.spacing.sm,
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              backgroundColor: theme.colors.primary.yellow,
              borderRadius: theme.borderRadius.lg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.background.dark,
              fontSize: theme.typography.fontSize['2xl'],
            }}
          >
            FI
          </div>
          <div>
            <h1
              style={{
                fontSize: theme.typography.fontSize['3xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.text.dark,
              }}
            >
              FinanceIQ Dashboard
            </h1>
            <p
              style={{
                fontSize: theme.typography.fontSize.base,
                color: theme.colors.text.tertiary,
              }}
            >
              Select a report to get started
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main
        style={{
          padding: `${theme.spacing['2xl']} ${theme.spacing['2xl']}`,
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          <h2
            style={{
              fontSize: theme.typography.fontSize['2xl'],
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.text.dark,
              marginBottom: theme.spacing.xl,
            }}
          >
            Reports
          </h2>

          {/* Report Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: theme.spacing.lg,
            }}
          >
            {reportCards.map((card) => (
              <button
                key={card.id}
                onClick={() => onNavigate?.(card.path)}
                style={{
                  backgroundColor: theme.colors.background.white,
                  border: `1px solid ${theme.colors.border.light}`,
                  borderRadius: theme.borderRadius.lg,
                  padding: theme.spacing.xl,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: theme.transitions.normal,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: theme.spacing.md,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = theme.shadows.lg;
                  e.currentTarget.style.borderColor = card.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = theme.colors.border.light;
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: `${card.color}15`,
                    borderRadius: theme.borderRadius.lg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: card.color,
                  }}
                >
                  {card.icon}
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: theme.typography.fontSize.lg,
                      fontWeight: theme.typography.fontWeight.semibold,
                      color: theme.colors.text.dark,
                      marginBottom: theme.spacing.xs,
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontSize: theme.typography.fontSize.sm,
                      color: theme.colors.text.tertiary,
                      lineHeight: '1.5',
                    }}
                  >
                    {card.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
