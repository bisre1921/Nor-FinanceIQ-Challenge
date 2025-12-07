'use client';

import { useState } from 'react';
import { DashboardScreen } from './features/Dashboard/presentation/screens/DashboardScreen';
import { ReportsScreen } from './features/Reports/presentation/screens/ReportsScreen';

export default function Home() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'reports'>('dashboard');

  const handleNavigateToReports = () => {
    setCurrentView('reports');
  };

  const handleNavigateToDashboard = () => {
    setCurrentView('dashboard');
  };

  return (
    <>
      {currentView === 'dashboard' ? (
        <DashboardScreen onNavigate={handleNavigateToReports} />
      ) : (
        <ReportsScreen onNavigateToDashboard={handleNavigateToDashboard} />
      )}
    </>
  );
}
