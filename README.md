# FinanceIQ - Intelligent Financial Analytics

A modern, interactive financial reporting and analytics platform built with Next.js 16, featuring dynamic charts, drag-and-drop functionality, and beautiful dark theme UI.

![Next.js](https://img.shields.io/badge/Next.js-16.0.7-black)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- **Beautiful Dark Theme** - Modern, professional dark mode interface
- **Interactive Charts** - Dynamic line, area, bar, and composed charts using Recharts
- **Drag & Drop Canvas** - Freely position and resize charts on the canvas
- **Period Filtering** - Monthly and quarterly data views
- **Multiple Export Formats**
  - Styled PDF (visual charts)
  - Data PDF (tabular data)
  - Excel (.xlsx) spreadsheets
- **Feedback System** - Beautiful animated modals for user feedback
- **Smooth Animations** - Framer Motion powered transitions
- **Responsive Design** - Works seamlessly across devices

## Quick Start

### Prerequisites

- Node.js 18+ and pnpm (or npm/yarn)

### Installation

```bash
# Clone the repository
git clone https://github.com/bisre1921/Nor-FinanceIQ-Challenge.git
cd nor-task

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Build for Production

```bash
# Create optimized production build
pnpm build

# Start production server
pnpm start
```

## Project Structure

```
app/
├── core/                       # Core application code
│   ├── data/                   # Mock data and configurations
│   ├── presentation/           # Shared components
│   ├── theme/                  # Theme configuration
│   └── utils/                  # PDF/Excel generators
├── features/                   # Feature modules
│   ├── Dashboard/              # Dashboard feature
│   └── Reports/                # Reports feature
└── page.tsx                    # Root page
```

## Tech Stack

- **Framework**: [Next.js 16.0.7](https://nextjs.org/) (with Turbopack)
- **UI Library**: [React 19.2.0](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Charts**: [Recharts 3.5.1](https://recharts.org/)
- **Animations**: [Framer Motion 12.23.25](https://www.framer.com/motion/)
- **Drag & Drop**: [react-rnd 10.5.2](https://github.com/bokuweb/react-rnd)
- **Icons**: [Lucide React 0.556.0](https://lucide.dev/)
- **PDF Export**: [jsPDF 3.0.4](https://github.com/parallax/jsPDF)
- **Excel Export**: [XLSX 0.18.5](https://sheetjs.com/)

## Key Components

### Dashboard
- Animated dashboard cards with hover effects
- Gradient backgrounds and blur effects
- Status indicators and navigation

### Reports Screen
- Sidebar navigation for report types
- Free-form chart canvas with drag-and-drop
- Period filtering (monthly/quarterly)
- Export options (PDF/Excel)

### Charts
- Resizable and movable chart containers
- Dynamic data visualization
- Action buttons (collapse, message, settings, delete)

### Modals
- Feedback modal with textarea and tips
- Success modal with auto-close and animations

## Color Palette

```typescript
Background: #1a1d29 → #0f1117 (gradient)
Surface: #252837
Border: rgba(255, 255, 255, 0.1)
Text Primary: #ffffff
Text Secondary: rgba(255, 255, 255, 0.7)
Accents: Chart-specific colors
```

## Available Scripts
```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## 👤 Author

**Birat**
- GitHub: [@bisre1921](https://github.com/bisre1921)

---

Built with ❤️ using Next.js and TypeScript
