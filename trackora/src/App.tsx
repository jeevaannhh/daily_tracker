import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { TopHeader } from './components/layout/TopHeader';
import { MobileNav } from './components/layout/MobileNav';

// Views
import { DashboardView } from './components/pages/DashboardView';
import { TodayView } from './components/pages/TodayView';
import { HabitsView } from './components/pages/HabitsView';
import { ScheduleView } from './components/pages/ScheduleView';
import { GoalsView } from './components/pages/GoalsView';
import { AnalyticsView } from './components/pages/AnalyticsView';
import { RewardsView } from './components/pages/RewardsView';
import { AISuggestionsView } from './components/pages/AISuggestionsView';
import { SettingsView } from './components/pages/SettingsView';

// Modals & Feedback
import { CreateHabitModal } from './components/modals/CreateHabitModal';
import { CreateGoalModal } from './components/modals/CreateGoalModal';
import { CreateScheduleModal } from './components/modals/CreateScheduleModal';
import { OnboardingModal } from './components/modals/OnboardingModal';
import { ToastContainer } from './components/common/ToastContainer';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'today':
        return <TodayView />;
      case 'habits':
        return <HabitsView />;
      case 'schedule':
        return <ScheduleView />;
      case 'goals':
        return <GoalsView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'rewards':
        return <RewardsView />;
      case 'ai-suggestions':
        return <AISuggestionsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden font-sans transition-colors duration-200">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        {/* Top Header */}
        <TopHeader />

        {/* Scrollable View Container */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderActiveView()}
          </div>
        </main>

        {/* Mobile / Tablet Bottom Navigation */}
        <MobileNav />
      </div>

      {/* Modals & Dialogs */}
      <CreateHabitModal />
      <CreateGoalModal />
      <CreateScheduleModal />
      <OnboardingModal />

      {/* Floating Notifications */}
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
