import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Feed } from './components/Feed';
import { CreatePostModal } from './components/CreatePostModal';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { JobsMarketplace } from './components/JobsMarketplace';
import { Communities } from './components/Communities';
import { CoursesView } from './components/CoursesView';
import { EventsView } from './components/EventsView';
import { MessagingView } from './components/MessagingView';
import { ProfileView } from './components/ProfileView';
import { AdminDashboard } from './components/AdminDashboard';
import { AndroidCodeBlueprint } from './components/AndroidCodeBlueprint';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { NotificationsDrawer } from './components/NotificationsDrawer';
import { SettingsModal } from './components/SettingsModal';
import { AuthModal } from './components/AuthModal';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 bg-[#090A0F] transition-colors">
      {activeTab === 'feed' && <Feed />}
      {activeTab === 'projects' && <ProjectsShowcase />}
      {(activeTab === 'jobs' || activeTab === 'freelance') && <JobsMarketplace />}
      {activeTab === 'communities' && <Communities />}
      {activeTab === 'courses' && <CoursesView />}
      {activeTab === 'events' && <EventsView />}
      {activeTab === 'messages' && <MessagingView />}
      {activeTab === 'profile' && <ProfileView />}
      {activeTab === 'admin' && <AdminDashboard />}
      {activeTab === 'android_blueprint' && <AndroidCodeBlueprint />}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#090A0F] text-slate-300 font-sans flex flex-col antialiased selection:bg-blue-600 selection:text-white">
        <Header />
        <div className="flex-1 flex max-w-7xl w-full mx-auto">
          <Sidebar />
          <MainContent />
        </div>

        {/* Global Floating Modals & Drawers */}
        <CreatePostModal />
        <GlobalSearchModal />
        <NotificationsDrawer />
        <SettingsModal />
        <AuthModal />
      </div>
    </AppProvider>
  );
}
