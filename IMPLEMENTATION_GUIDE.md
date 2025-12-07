# FinanceIQ Dashboard - Sidebar Implementation

## Overview
This is a comprehensive implementation of a financial reporting dashboard with a focus on clean architecture, reusable components, and excellent code quality.

## Project Structure

```
app/
├── core/
│   ├── data/
│   │   └── sidebarItems.ts          # Centralized sidebar navigation data
│   ├── theme/
│   │   └── theme.ts                 # Theme configuration with colors, typography
│   └── presentation/
│       ├── components/
│       │   ├── Sidebar.tsx          # Main sidebar component
│       │   ├── ReportHeader.tsx     # Report header with actions
│       │   ├── ChartCard.tsx        # Reusable chart card wrapper
│       │   └── index.ts             # Component exports
│       └── sub-components/
│           ├── SidebarTab.tsx       # Tables/Charts tab switcher
│           ├── SidebarItem.tsx      # Individual sidebar menu item
│           ├── SidebarSubItem.tsx   # Sidebar sub-menu item
│           └── index.ts             # Sub-component exports
├── features/
│   ├── Dashboard/
│   │   └── presentation/
│   │       └── screens/
│   │           └── DashboardScreen.tsx  # Main dashboard view
│   └── Reports/
│       └── presentation/
│           └── screens/
│               └── ReportsScreen.tsx    # Reports view with sidebar
└── page.tsx                         # Main entry point
```

## Key Features

### 1. Theme System (`app/core/theme/theme.ts`)
- **Centralized color palette** - No hardcoded colors in components
- Includes primary brand colors, backgrounds, text, chart colors, status colors
- Typography definitions (font sizes, weights)
- Spacing, border radius, shadows, transitions
- Z-index management
- Full TypeScript type safety

### 2. Sidebar Navigation (`app/core/presentation/components/Sidebar.tsx`)
- **Tabs system** - Switch between Tables and Charts views
- **Collapsible menu items** - Revenue section expands to show sub-items
- **Active state management** - Visual feedback for current selection
- **Icon integration** - Using lucide-react icons
- **Smooth animations** - Hover effects and transitions
- **Responsive design** - Sticky sidebar with proper scrolling

### 3. Reusable Sub-Components

#### SidebarTab (`sub-components/SidebarTab.tsx`)
- Customizable tab switcher
- Props: `activeTab`, `onTabChange`
- Visual indicators for active tab

#### SidebarItem (`sub-components/SidebarItem.tsx`)
- Main navigation item with optional sub-items
- Props: `id`, `label`, `icon`, `isActive`, `hasSubItems`, `subItems`, `isExpanded`
- Expandable/collapsible for items with sub-menus
- Hover effects with theme colors

#### SidebarSubItem (`sub-components/SidebarSubItem.tsx`)
- Sub-menu items with descriptions
- Props: `id`, `label`, `description`, `icon`, `isActive`
- Indented display with visual hierarchy

### 4. Report Header (`app/core/presentation/components/ReportHeader.tsx`)
- Action buttons: Back to Dashboard, Save Report, Print/Save
- Report icon and title display
- Period selector with calendar icon
- Unsaved changes indicator
- Fully customizable via props

### 5. Chart Card (`app/core/presentation/components/ChartCard.tsx`)
- Reusable wrapper for chart visualizations
- Action buttons: Message, Delete, Settings
- Props-based customization
- Children prop for chart content
- Hover effects on action buttons

### 6. Data Management (`app/core/data/sidebarItems.ts`)
- TypeScript interfaces for type safety
- Separate data for Charts and Tables tabs
- Icon mapping using lucide-react
- Path definitions for routing
- Sub-item configurations

## Component Properties

### Theme Usage Example
```typescript
import { theme } from '@/app/core/theme/theme';

// Using theme colors
backgroundColor: theme.colors.background.dark
color: theme.colors.text.primary

// Using theme spacing
padding: theme.spacing.md
gap: theme.spacing.lg

// Using theme typography
fontSize: theme.typography.fontSize.sm
fontWeight: theme.typography.fontWeight.semibold
```

### Sidebar Props
```typescript
interface SidebarProps {
  defaultTab?: 'tables' | 'charts';
  onNavigate?: (path: string) => void;
  className?: string;
  style?: React.CSSProperties;
}
```

### ReportHeader Props
```typescript
interface ReportHeaderProps {
  title?: string;
  subtitle?: string;
  period?: string;
  showBackButton?: boolean;
  showSaveButton?: boolean;
  showPrintButton?: boolean;
  hasUnsavedChanges?: boolean;
  onBack?: () => void;
  onSave?: () => void;
  onPrint?: () => void;
  onPeriodChange?: () => void;
}
```

## Clean Architecture Principles

1. **Separation of Concerns**
   - Data layer: `sidebarItems.ts`
   - Presentation layer: Components and sub-components
   - Theme layer: Centralized design tokens

2. **Reusability**
   - All components accept props for customization
   - Sub-components can be used independently
   - Theme system used across all components

3. **Code Quality**
   - TypeScript for type safety
   - Consistent naming conventions
   - JSDoc comments for documentation
   - No hardcoded values
   - Proper component composition

4. **Maintainability**
   - Single source of truth for data (`sidebarItems.ts`)
   - Single source of truth for design (`theme.ts`)
   - Easy to add new sidebar items
   - Easy to update colors/spacing globally

## Running the Project

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

The application will be available at `http://localhost:3000` (or 3001 if 3000 is in use).

## Navigation Flow

1. **Dashboard** - Lists all available reports
2. Click on any report → Navigate to **Reports Screen**
3. **Reports Screen** shows:
   - Sidebar with navigation
   - Report header with actions
   - Chart display area
4. Click "Back to Dashboard" → Return to Dashboard

## Sidebar Features Demonstrated

✅ Project branding (FinanceIQ logo and name)
✅ Dashboard button with icon
✅ Tables/Charts tab switcher
✅ Multiple navigation items with icons
✅ Revenue item with expandable sub-items (8 sub-items)
✅ Active state highlighting (yellow for main item)
✅ Sub-item active state with descriptions
✅ Hover effects on all interactive elements
✅ Smooth transitions and animations
✅ "Table blocks coming soon" message on Tables tab

## Design Implementation

Based on the provided designs:
- `report-sidebar.png` - Main sidebar structure ✅
- `report-sidebar-revenue.png` - Revenue expanded with sub-items ✅
- `report_sidebar_table.png` - Tables tab view ✅

All colors, spacing, and interactions match the design specifications.

## Next Steps (Future Enhancements)

1. Integrate a charting library (Chart.js, Recharts, or D3.js)
2. Add actual data fetching logic
3. Implement period selector with date picker
4. Add save/print functionality
5. Create additional report types
6. Add user authentication
7. Implement data filtering and search
8. Add responsive mobile view
9. Add dark/light theme toggle
10. Add chart customization options

## Dependencies

- **Next.js 16** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **lucide-react** - Icon library
- **Tailwind CSS** - Utility-first CSS (configured but using inline styles for consistency)

## Code Quality Standards

- ✅ No hardcoded colors (all from theme)
- ✅ TypeScript interfaces for all props
- ✅ Consistent component structure
- ✅ Reusable and composable components
- ✅ Proper prop naming and types
- ✅ JSDoc comments for documentation
- ✅ Clean file organization
- ✅ Separation of concerns
- ✅ No console errors or warnings
- ✅ Follows React best practices

## Contributing

When adding new features:
1. Follow the established architecture
2. Use theme values instead of hardcoded styles
3. Create reusable components when possible
4. Add TypeScript types for all props
5. Update this README with new features
