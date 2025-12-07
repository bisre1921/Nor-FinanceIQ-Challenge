/**
 * Sidebar Component
 * Main navigation sidebar for the FinanceIQ dashboard
 * Features: Tables/Charts tabs, collapsible menu items, sub-items
 */

'use client';

import React, { useState } from 'react';
import { theme } from '@/app/core/theme/theme';
import { ChevronLeft, LayoutDashboard } from 'lucide-react';
import { SidebarTab, SidebarItem } from '../sub-components';
import {
  getSidebarItems,
  TabType,
  SidebarItem as SidebarItemType,
} from '@/app/core/data/sidebarItems';

export interface SidebarProps {
  defaultTab?: TabType;
  onNavigate?: (path: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const Sidebar: React.FC<SidebarProps> = ({
  defaultTab = 'charts',
  onNavigate,
  className,
  style,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>(defaultTab);
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [activeSubItemId, setActiveSubItemId] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarItems = getSidebarItems(activeTab);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setExpandedItemId(null);
    setActiveItemId(null);
    setActiveSubItemId(null);
  };

  const handleItemClick = (item: SidebarItemType) => {
    // If item has sub-items, toggle expansion
    if (item.subItems && item.subItems.length > 0) {
      if (expandedItemId === item.id) {
        setExpandedItemId(null);
        setActiveItemId(null);
      } else {
        setExpandedItemId(item.id);
        setActiveItemId(item.id);
      }
    } else {
      // Navigate to item path
      setActiveItemId(item.id);
      setExpandedItemId(null);
      setActiveSubItemId(null);
      if (item.path && onNavigate) {
        onNavigate(item.path);
      }
    }
  };

  const handleSubItemClick = (itemId: string, subItemId: string) => {
    setActiveSubItemId(subItemId);
    
    const item = sidebarItems.find((i) => i.id === itemId);
    const subItem = item?.subItems?.find((si) => si.id === subItemId);
    
    if (subItem?.path && onNavigate) {
      onNavigate(subItem.path);
    }
  };

  return (
    <aside
      className={className}
      style={{
        width: isCollapsed ? '80px' : '280px',
        minWidth: isCollapsed ? '80px' : '280px',
        height: '100vh',
        backgroundColor: theme.colors.background.dark,
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        overflowY: 'auto',
        overflowX: 'hidden',
        transition: `width ${theme.transitions.normal}, min-width ${theme.transitions.normal}`,
        ...style,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: theme.spacing.md,
          borderBottom: `1px solid ${theme.colors.border.dark}`,
          minHeight: '64px',
        }}
      >
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: theme.spacing.sm,
          overflow: 'hidden',
          flex: 1,
        }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: theme.colors.primary.yellow,
              borderRadius: theme.borderRadius.md,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.background.dark,
              fontSize: theme.typography.fontSize.lg,
              flexShrink: 0,
            }}
          >
            FI
          </div>
          {!isCollapsed && (
            <span
              style={{
                fontSize: theme.typography.fontSize.base,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.text.primary,
                whiteSpace: 'nowrap',
                opacity: isCollapsed ? 0 : 1,
                transition: `opacity ${theme.transitions.fast}`,
              }}
            >
              FinanceIQ
            </span>
          )}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{
            background: 'transparent',
            border: 'none',
            color: theme.colors.text.secondary,
            cursor: 'pointer',
            padding: theme.spacing.xs,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: `transform ${theme.transitions.fast}, color ${theme.transitions.fast}`,
            transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = theme.colors.primary.yellow;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = theme.colors.text.secondary;
          }}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft size={20} />
        </button>
      </div>

      {/* Dashboard Link */}
      {!isCollapsed && (
        <div
          style={{
            padding: `${theme.spacing.md} ${theme.spacing.md}`,
            borderBottom: `1px solid ${theme.colors.border.dark}`,
          }}
        >
          <button
            onClick={() => onNavigate?.('/dashboard')}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.md,
              padding: `${theme.spacing.sm} ${theme.spacing.md}`,
              backgroundColor: 'transparent',
              border: `1px solid ${theme.colors.border.dark}`,
              borderRadius: theme.borderRadius.md,
              color: theme.colors.text.primary,
              cursor: 'pointer',
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.medium,
              transition: theme.transitions.fast,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                theme.colors.background.medium;
              e.currentTarget.style.borderColor = theme.colors.primary.yellow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = theme.colors.border.dark;
            }}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>
        </div>
      )}

      {/* Dashboard Icon Only (Collapsed) */}
      {isCollapsed && (
        <div
          style={{
            padding: `${theme.spacing.md} 0`,
            borderBottom: `1px solid ${theme.colors.border.dark}`,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <button
            onClick={() => onNavigate?.('/dashboard')}
            title="Dashboard"
            style={{
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              border: `1px solid ${theme.colors.border.dark}`,
              borderRadius: theme.borderRadius.md,
              color: theme.colors.text.primary,
              cursor: 'pointer',
              transition: theme.transitions.fast,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                theme.colors.background.medium;
              e.currentTarget.style.borderColor = theme.colors.primary.yellow;
              e.currentTarget.style.color = theme.colors.primary.yellow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = theme.colors.border.dark;
              e.currentTarget.style.color = theme.colors.text.primary;
            }}
          >
            <LayoutDashboard size={20} />
          </button>
        </div>
      )}

      {/* Tabs */}
      {!isCollapsed && (
        <SidebarTab activeTab={activeTab} onTabChange={handleTabChange} />
      )}

      {/* Tabs Icon Indicators (Collapsed) */}
      {isCollapsed && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing.xs,
            padding: `${theme.spacing.sm} 0`,
            borderBottom: `1px solid ${theme.colors.border.dark}`,
            alignItems: 'center',
          }}
        >
          <button
            onClick={() => setActiveTab('tables')}
            title="Tables"
            style={{
              width: '40px',
              height: '6px',
              backgroundColor: activeTab === 'tables' 
                ? theme.colors.primary.yellow 
                : theme.colors.border.dark,
              border: 'none',
              borderRadius: theme.borderRadius.full,
              cursor: 'pointer',
              transition: theme.transitions.fast,
            }}
          />
          <button
            onClick={() => setActiveTab('charts')}
            title="Charts"
            style={{
              width: '40px',
              height: '6px',
              backgroundColor: activeTab === 'charts' 
                ? theme.colors.primary.yellow 
                : theme.colors.border.dark,
              border: 'none',
              borderRadius: theme.borderRadius.full,
              cursor: 'pointer',
              transition: theme.transitions.fast,
            }}
          />
        </div>
      )}

      {/* Navigation Items */}
      <nav
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: `${theme.spacing.sm} 0`,
        }}
      >
        {isCollapsed ? (
          // Collapsed View - Icons Only
          sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItemId === item.id;
            
            return (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: `${theme.spacing.xs} 0`,
                }}
              >
                <button
                  onClick={() => handleItemClick(item)}
                  title={item.label}
                  style={{
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isActive
                      ? theme.colors.primary.yellow
                      : 'transparent',
                    border: 'none',
                    borderRadius: theme.borderRadius.md,
                    color: isActive
                      ? theme.colors.background.dark
                      : theme.colors.icon.primary,
                    cursor: 'pointer',
                    transition: theme.transitions.fast,
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor =
                        theme.colors.background.medium;
                      e.currentTarget.style.color = theme.colors.icon.hover;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = theme.colors.icon.primary;
                    }
                  }}
                >
                  <Icon size={20} />
                  {item.subItems && item.subItems.length > 0 && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        width: '8px',
                        height: '8px',
                        backgroundColor: theme.colors.chart.green,
                        borderRadius: theme.borderRadius.full,
                        border: `2px solid ${isActive ? theme.colors.background.dark : theme.colors.background.dark}`,
                      }}
                    />
                  )}
                </button>
              </div>
            );
          })
        ) : (
          // Expanded View - Full Items
          sidebarItems.map((item) => (
            <SidebarItem
              key={item.id}
              id={item.id}
              label={item.label}
              icon={item.icon}
              isActive={activeItemId === item.id}
              hasSubItems={!!item.subItems && item.subItems.length > 0}
              subItems={item.subItems}
              isExpanded={expandedItemId === item.id}
              onClick={() => handleItemClick(item)}
              onSubItemClick={(subItemId) =>
                handleSubItemClick(item.id, subItemId)
              }
              activeSubItemId={activeSubItemId ?? undefined}
            />
          ))
        )}
      </nav>

      {/* Footer - Coming Soon Message */}
      {activeTab === 'tables' && !isCollapsed && (
        <div
          style={{
            padding: theme.spacing.md,
            borderTop: `1px solid ${theme.colors.border.dark}`,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: theme.typography.fontSize.xs,
              color: theme.colors.text.secondary,
            }}
          >
            Table blocks coming soon
          </div>
        </div>
      )}
    </aside>
  );
};
