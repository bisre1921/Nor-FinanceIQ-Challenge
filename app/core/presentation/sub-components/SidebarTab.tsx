/**
 * SidebarTab Component
 * Reusable tab component for switching between Tables and Charts views
 */

'use client';

import React from 'react';
import { theme } from '@/app/core/theme/theme';
import { Table2, LineChart } from 'lucide-react';

export interface SidebarTabProps {
  activeTab: 'tables' | 'charts';
  onTabChange: (tab: 'tables' | 'charts') => void;
}

export const SidebarTab: React.FC<SidebarTabProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    { id: 'tables' as const, label: 'Tables', icon: Table2 },
    { id: 'charts' as const, label: 'Charts', icon: LineChart },
  ];

  return (
    <div
      style={{
        display: 'flex',
        gap: theme.spacing.xs,
        padding: `${theme.spacing.sm} ${theme.spacing.md}`,
        borderBottom: `1px solid ${theme.colors.border.dark}`,
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: theme.spacing.sm,
              padding: `${theme.spacing.sm} ${theme.spacing.md}`,
              backgroundColor: 'transparent',
              color: isActive
                ? theme.colors.text.primary
                : theme.colors.text.secondary,
              border: 'none',
              borderBottom: isActive
                ? `2px solid ${theme.colors.primary.yellow}`
                : '2px solid transparent',
              cursor: 'pointer',
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.medium,
              transition: theme.transitions.fast,
              outline: 'none',
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = theme.colors.text.primary;
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = theme.colors.text.secondary;
              }
            }}
          >
            <Icon size={16} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
