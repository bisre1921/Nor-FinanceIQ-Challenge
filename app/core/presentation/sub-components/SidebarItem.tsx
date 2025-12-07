/**
 * SidebarItem Component
 * Reusable component for rendering main sidebar menu items with optional sub-items
 */

'use client';

import React, { useState } from 'react';
import { theme } from '@/app/core/theme/theme';
import { LucideIcon, ChevronRight } from 'lucide-react';
import { SidebarSubItem } from './SidebarSubItem';
import { SidebarSubItem as SidebarSubItemType } from '@/app/core/data/sidebarItems';

export interface SidebarItemProps {
  id: string;
  label: string;
  icon: LucideIcon;
  isActive?: boolean;
  hasSubItems?: boolean;
  subItems?: SidebarSubItemType[];
  isExpanded?: boolean;
  onClick?: () => void;
  onSubItemClick?: (subItemId: string) => void;
  activeSubItemId?: string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  icon: Icon,
  isActive = false,
  hasSubItems = false,
  subItems = [],
  isExpanded = false,
  onClick,
  onSubItemClick,
  activeSubItemId,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
      {/* Main Item */}
      <div
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.md,
          padding: `${theme.spacing.md} ${theme.spacing.md}`,
          backgroundColor: isActive
            ? theme.colors.primary.yellow
            : isHovered
            ? theme.colors.background.medium
            : 'transparent',
          cursor: 'pointer',
          transition: theme.transitions.fast,
          borderRadius: isActive ? theme.borderRadius.md : '0',
          margin: isActive ? `0 ${theme.spacing.sm}` : '0',
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
            size={18}
            style={{
              color: isActive
                ? theme.colors.background.dark
                : isHovered
                ? theme.colors.icon.hover
                : theme.colors.icon.primary,
            }}
          />
        </div>
        <div
          style={{
            flex: 1,
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.medium,
            color: isActive
              ? theme.colors.background.dark
              : theme.colors.text.primary,
          }}
        >
          {label}
        </div>
        {hasSubItems && (
          <ChevronRight
            size={16}
            style={{
              color: isActive
                ? theme.colors.background.dark
                : theme.colors.icon.primary,
              transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: theme.transitions.fast,
            }}
          />
        )}
      </div>

      {/* Sub Items */}
      {hasSubItems && isExpanded && (
        <div
          style={{
            marginTop: theme.spacing.xs,
            marginBottom: theme.spacing.xs,
          }}
        >
          {subItems.map((subItem) => (
            <SidebarSubItem
              key={subItem.id}
              id={subItem.id}
              label={subItem.label}
              description={subItem.description}
              icon={subItem.icon}
              isActive={activeSubItemId === subItem.id}
              onClick={() => onSubItemClick?.(subItem.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
