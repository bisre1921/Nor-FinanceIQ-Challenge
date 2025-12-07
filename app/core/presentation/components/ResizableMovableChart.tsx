/**
 * ResizableMovableChart Component
 * Fully draggable and resizable chart with beautiful animations
 * Users can move it anywhere and resize by dragging edges/corners
 */

'use client';

import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '@/app/core/theme/theme';
import { 
  MessageSquare, 
  Trash2, 
  Settings, 
  ChevronDown, 
  ChevronUp, 
  Maximize2,
  Minimize2,
  Move,
} from 'lucide-react';
import { DynamicChart } from './DynamicChart';
import { ChartConfig } from '@/app/core/data/mockData';

export interface ResizableMovableChartProps {
  id: string;
  config: ChartConfig;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  onDelete?: (id: string) => void;
  onMessage?: (id: string) => void;
  onSettings?: (id: string) => void;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
}

export const ResizableMovableChart: React.FC<ResizableMovableChartProps> = ({
  id,
  config,
  defaultPosition = { x: 50, y: 50 },
  defaultSize = { width: 800, height: 500 },
  onDelete,
  onMessage,
  onSettings,
  minWidth = 400,
  minHeight = 300,
  maxWidth = 2050,
  maxHeight = 1000,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [size, setSize] = useState(defaultSize);

  // Button configurations
  const actionButtons = [
    {
      id: 'collapse',
      icon: isCollapsed ? ChevronDown : ChevronUp,
      label: isCollapsed ? 'Expand' : 'Collapse',
      onClick: () => setIsCollapsed(!isCollapsed),
      color: theme.colors.primary.yellow,
    },
    {
      id: 'maximize',
      icon: isCollapsed ? Maximize2 : Minimize2,
      label: isCollapsed ? 'Maximize' : 'Minimize',
      onClick: () => {
        if (isCollapsed) {
          setSize(defaultSize);
          setIsCollapsed(false);
        } else {
          setSize({ width: minWidth, height: minHeight });
        }
      },
      color: theme.colors.status.info,
    },
    {
      id: 'message',
      icon: MessageSquare,
      label: 'Add message',
      onClick: () => onMessage?.(id),
      color: theme.colors.status.info,
    },
    {
      id: 'settings',
      icon: Settings,
      label: 'Settings',
      onClick: () => onSettings?.(id),
      color: theme.colors.text.tertiary,
    },
    {
      id: 'delete',
      icon: Trash2,
      label: 'Delete',
      onClick: () => onDelete?.(id),
      color: theme.colors.status.error,
    },
  ];

  return (
    <Rnd
      default={{
        x: defaultPosition.x,
        y: defaultPosition.y,
        width: defaultSize.width,
        height: isCollapsed ? 80 : defaultSize.height,
      }}
      minWidth={minWidth}
      minHeight={isCollapsed ? 80 : minHeight}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      bounds="parent"
      enableResizing={{
        top: !isCollapsed,
        right: !isCollapsed,
        bottom: !isCollapsed,
        left: !isCollapsed,
        topRight: !isCollapsed,
        bottomRight: !isCollapsed,
        bottomLeft: !isCollapsed,
        topLeft: !isCollapsed,
      }}
      onDragStart={() => setIsDragging(true)}
      onDragStop={() => setIsDragging(false)}
      onResizeStart={() => setIsResizing(true)}
      onResizeStop={(e, direction, ref) => {
        setIsResizing(false);
        setSize({
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
        });
      }}
      dragHandleClassName="drag-handle"
      style={{
        zIndex: isDragging || isResizing ? 1000 : 1,
      }}
      resizeHandleStyles={{
        right: { cursor: 'ew-resize', width: '10px' },
        left: { cursor: 'ew-resize', width: '10px' },
        top: { cursor: 'ns-resize', height: '10px' },
        bottom: { cursor: 'ns-resize', height: '10px' },
        topRight: { cursor: 'nesw-resize', width: '20px', height: '20px' },
        topLeft: { cursor: 'nwse-resize', width: '20px', height: '20px' },
        bottomRight: { cursor: 'nwse-resize', width: '20px', height: '20px' },
        bottomLeft: { cursor: 'nesw-resize', width: '20px', height: '20px' },
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ 
          opacity: 1, 
          scale: isDragging ? 1.02 : isResizing ? 1.01 : 1,
          y: 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: theme.colors.background.white,
          borderRadius: theme.borderRadius.xl,
          border: `1px solid ${
            isDragging || isResizing 
              ? theme.colors.primary.yellow 
              : isHovered 
              ? theme.colors.border.medium 
              : theme.colors.border.light
          }`,
          boxShadow: isDragging || isResizing 
            ? `0 20px 60px rgba(249, 185, 49, 0.3)` 
            : isHovered
            ? theme.shadows.xl
            : theme.shadows.lg,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          transition: `box-shadow ${theme.transitions.fast}, border-color ${theme.transitions.fast}`,
        }}
      >
        {/* Header with Drag Handle */}
        <motion.div
          className="drag-handle"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: theme.spacing.lg,
            paddingBottom: isCollapsed ? theme.spacing.lg : theme.spacing.md,
            borderBottom: isCollapsed ? 'none' : `1px solid ${theme.colors.border.light}`,
            cursor: 'move',
            position: 'relative',
          }}
          whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.01)' }}
          transition={{ duration: 0.2 }}
        >
          {/* Left: Move Icon + Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md }}>
            <motion.div
              animate={{ 
                rotate: isDragging ? 180 : 0,
                scale: isDragging ? 1.2 : 1,
              }}
              transition={{ type: 'spring', stiffness: 200 }}
              style={{
                color: isDragging ? theme.colors.primary.yellow : theme.colors.text.muted,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Move size={20} />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                fontSize: theme.typography.fontSize.xl,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.text.dark,
                margin: 0,
              }}
            >
              {config.title}
            </motion.h2>
          </div>

          {/* Right: Action Buttons */}
          <div style={{ display: 'flex', gap: theme.spacing.xs }}>
            {actionButtons.map((action, index) => {
              const Icon = action.icon;
              const isButtonHovered = hoveredButton === action.id;

              return (
                <motion.button
                  key={action.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    action.onClick();
                  }}
                  onMouseEnter={() => setHoveredButton(action.id)}
                  onMouseLeave={() => setHoveredButton(null)}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -5, 5, -5, 0],
                  }}
                  whileTap={{ scale: 0.95 }}
                  title={action.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    backgroundColor: isButtonHovered
                      ? `${action.color}20`
                      : 'transparent',
                    border: `1px solid ${
                      isButtonHovered ? action.color : theme.colors.border.medium
                    }`,
                    borderRadius: theme.borderRadius.md,
                    color: isButtonHovered ? action.color : theme.colors.text.tertiary,
                    cursor: 'pointer',
                    transition: `all ${theme.transitions.fast}`,
                  }}
                >
                  <Icon size={18} />
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Chart Content with Collapse Animation */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              style={{
                flex: 1,
                padding: theme.spacing.lg,
                paddingTop: theme.spacing.md,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <DynamicChart 
                config={config} 
                height={size.height - 120} // Subtract header height
              />
              
              {/* Resize Indicator */}
              <AnimatePresence>
                {isResizing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      position: 'absolute',
                      top: theme.spacing.md,
                      right: theme.spacing.md,
                      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                      backgroundColor: theme.colors.primary.yellow,
                      color: theme.colors.background.dark,
                      borderRadius: theme.borderRadius.md,
                      fontSize: theme.typography.fontSize.sm,
                      fontWeight: theme.typography.fontWeight.semibold,
                      pointerEvents: 'none',
                    }}
                  >
                    {size.width} × {size.height}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapsed State Message */}
        {isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              padding: theme.spacing.md,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.colors.text.muted,
              fontSize: theme.typography.fontSize.sm,
            }}
          >
            <ChevronDown size={16} style={{ marginRight: theme.spacing.xs }} />
            Click to expand chart
          </motion.div>
        )}

        {/* Resize Handles Visual Enhancement */}
        {!isCollapsed && isHovered && (
          <>
            {/* Corner indicators */}
            {[
              { top: 0, left: 0 },
              { top: 0, right: 0 },
              { bottom: 0, left: 0 },
              { bottom: 0, right: 0 },
            ].map((position, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ delay: index * 0.03 }}
                style={{
                  position: 'absolute',
                  ...position,
                  width: '12px',
                  height: '12px',
                  backgroundColor: theme.colors.primary.yellow,
                  borderRadius: '50%',
                  margin: '4px',
                  pointerEvents: 'none',
                  zIndex: 10,
                }}
              />
            ))}
          </>
        )}
      </motion.div>
    </Rnd>
  );
};
