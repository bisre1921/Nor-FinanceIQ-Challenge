/**
 * SidebarSubItem Component
 * Reusable component for rendering sub-menu items within the sidebar
 */

'use client';

import React from 'react';
import { theme } from '@/app/core/theme/theme';
import { LucideIcon } from 'lucide-react';

export interface SidebarSubItemProps {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  isActive?: boolean;
  onClick?: () => void;
}

export const SidebarSubItem: React.FC<SidebarSubItemProps> = ({
  label,
  description,
  icon: Icon,
  isActive = false,
  onClick,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing.md,
        padding: `${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.xl}`,
        backgroundColor: isActive
          ? theme.colors.background.medium
          : isHovered
          ? theme.colors.background.medium
          : 'transparent',
        cursor: 'pointer',
        transition: theme.transitions.fast,
        borderLeft: isActive
          ? `3px solid ${theme.colors.primary.yellow}`
          : '3px solid transparent',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '20px',
          height: '20px',
          flexShrink: 0,
        }}
      >
        <Icon
          size={16}
          style={{
            color: isActive
              ? theme.colors.icon.active
              : isHovered
              ? theme.colors.icon.hover
              : theme.colors.icon.primary,
          }}
        />
      </div>
      <div
        style={{
          flex: 1,
          minWidth: 0,
        }}
      >
        <div
          style={{
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.medium,
            color: isActive
              ? theme.colors.text.primary
              : theme.colors.text.primary,
            marginBottom: '2px',
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: theme.typography.fontSize.xs,
            color: theme.colors.text.secondary,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
};
