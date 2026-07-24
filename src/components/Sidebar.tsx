import React from 'react';
import { 
  Rss, 
  FolderGit2, 
  Briefcase, 
  Users, 
  GraduationCap, 
  CalendarDays, 
  MessageSquare, 
  User, 
  Smartphone, 
  ShieldCheck, 
  Settings,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ActiveTab } from '../types';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, userProfile, setSettingsModalOpen } = useApp();

  const navItems: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
    { id: 'feed', label: 'Home Feed', icon: Rss },
    { id: 'projects', label: 'Projects Showcase', icon: FolderGit2, badge: 'New' },
    { id: 'jobs', label: 'Jobs & Freelance', icon: Briefcase },
    { id: 'communities', label: 'Communities', icon: Users },
    { id: 'courses', label: 'Courses & Quizzes', icon: GraduationCap },
    { id: 'events', label: 'Events & Hackathons', icon: CalendarDays },
    { id: 'messages', label: 'Direct Messages', icon: MessageSquare },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'android_blueprint', label: 'Android Native Code', icon: Smartphone, badge: 'Java/SQLite' },
  ];

  // Admin tab if role is admin or developer
  if (userProfile.role === 'admin' || userProfile.role === 'developer') {
    navItems.push({ id: 'admin', label: 'Admin & Analytics', icon: ShieldCheck });
  }

  return (
    <>
      {/* Desktop Left Sidebar */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 p-4 border-r border-slate-800 bg-[#11121A] min-h-[calc(100vh-4rem)]">
        {/* User Mini Card */}
        <div 
          onClick={() => setActiveTab('profile')}
          className="mb-6 p-3 rounded-xl bg-[#090A0F] border border-slate-800 hover:border-slate-700 cursor-pointer transition-all group"
          id="btn-sidebar-user-card"
        >
          <div className="flex items-center gap-3">
            <img
              src={userProfile.avatar}
              alt={userProfile.fullName}
              className="w-10 h-10 rounded-lg object-cover border border-slate-700 group-hover:border-blue-500 transition-colors"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-white truncate">
                {userProfile.fullName}
              </h4>
              <p className="text-xs font-medium text-slate-400 truncate">
                @{userProfile.username}
              </p>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] font-semibold text-emerald-400 capitalize">
                  {userProfile.profession}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Section Label */}
        <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
          Platform Menu
        </p>

        {/* Main Nav Links */}
        <nav className="space-y-1 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg font-medium text-sm transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
                id={`btn-nav-${item.id}`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 text-[10px] font-bold rounded-md ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="mt-auto pt-4 border-t border-slate-800 space-y-1">
          <button
            onClick={() => setSettingsModalOpen(true)}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            id="btn-nav-settings"
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Settings & Preferences</span>
          </button>

          {/* Native Android Promotion Box */}
          <div className="mt-3 p-3 rounded-xl bg-[#090A0F] border border-slate-800 text-left">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <Sparkles className="w-4 h-4" />
              <span>Android Studio Export</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 leading-snug">
              Complete Java + SQLite database source code architecture ready for native Android builds.
            </p>
            <button
              onClick={() => setActiveTab('android_blueprint')}
              className="mt-2.5 w-full py-1.5 px-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors text-center"
              id="btn-sidebar-blueprint-cta"
            >
              Inspect Source Code
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#090A0F]/95 backdrop-blur-lg border-t border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-xl">
        {[
          { id: 'feed', label: 'Feed', icon: Rss },
          { id: 'projects', label: 'Projects', icon: FolderGit2 },
          { id: 'jobs', label: 'Jobs', icon: Briefcase },
          { id: 'communities', label: 'Groups', icon: Users },
          { id: 'messages', label: 'Chat', icon: MessageSquare },
          { id: 'profile', label: 'Profile', icon: User },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ActiveTab)}
              className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg text-[10px] font-semibold transition-all ${
                isActive
                  ? 'text-blue-400 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              id={`btn-mobile-nav-${tab.id}`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'scale-110' : ''}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
