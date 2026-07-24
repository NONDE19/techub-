import React from 'react';
import { 
  Search, 
  Bell, 
  MessageSquare, 
  PlusCircle, 
  Sun, 
  Moon, 
  Code2, 
  ShieldCheck, 
  User as UserIcon,
  Smartphone,
  LogOut,
  Settings
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const {
    isDarkMode,
    toggleDarkMode,
    setSearchModalOpen,
    setCreatePostModalOpen,
    notificationsDrawerOpen,
    setNotificationsDrawerOpen,
    setSettingsModalOpen,
    userProfile,
    notifications,
    setActiveTab,
    activeTab,
    logout
  } = useApp();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#090A0F]/90 border-b border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand / Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('feed')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
            id="btn-brand-logo"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-600/20 group-hover:bg-blue-500 transition-colors">
              TH
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-white">
                  TechHub
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-600/10 text-blue-400 border border-blue-500/20 rounded-md">
                  ZM
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 -mt-1 hidden sm:block">
                Developer Network & Tech Hub
              </p>
            </div>
          </button>
        </div>

        {/* Middle: Quick Search Trigger */}
        <div className="flex-1 max-w-md hidden md:block">
          <button
            onClick={() => setSearchModalOpen(true)}
            className="w-full flex items-center justify-between px-4 py-2 text-sm text-slate-400 bg-slate-900 hover:bg-slate-900/80 rounded-full border border-slate-800 focus:outline-none focus:border-blue-500 transition-colors"
            id="btn-global-search-trigger"
          >
            <div className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-slate-500" />
              <span>Search technologies, jobs, or peers...</span>
            </div>
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-500 bg-slate-800 rounded border border-slate-700">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search Icon */}
          <button
            onClick={() => setSearchModalOpen(true)}
            className="md:hidden p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-colors"
            title="Search"
            id="btn-mobile-search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Android Code Blueprint Quick Shortcut */}
          <button
            onClick={() => setActiveTab('android_blueprint')}
            className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              activeTab === 'android_blueprint'
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-sm'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-emerald-500/40 hover:text-emerald-400'
            }`}
            title="View Native Android Java & SQLite Architecture"
            id="btn-android-blueprint-shortcut"
          >
            <Smartphone className="w-4 h-4" />
            <span>Android Blueprint</span>
          </button>

          {/* Direct Messages Icon */}
          <button
            onClick={() => setActiveTab('messages')}
            className={`relative p-2 bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors ${
              activeTab === 'messages' ? 'text-blue-400 border-blue-500/50 bg-blue-600/10' : 'text-slate-400 hover:text-white'
            }`}
            title="Messages"
            id="btn-messages-shortcut"
          >
            <MessageSquare className="w-4 h-4" />
          </button>

          {/* Notifications Drawer Toggle */}
          <button
            onClick={() => setNotificationsDrawerOpen(!notificationsDrawerOpen)}
            className="relative p-2 bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Notifications"
            id="btn-notifications-shortcut"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
            )}
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 text-slate-400 hover:text-white transition-colors"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            id="btn-theme-toggle"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Create Post Button */}
          <button
            onClick={() => setCreatePostModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-md shadow-blue-600/20 active:scale-95"
            id="btn-create-post-header"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Create Post</span>
          </button>

          {/* User Profile Avatar / Menu */}
          <div className="flex items-center pl-1 border-l border-slate-800">
            <button
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2 p-1 hover:bg-slate-800/50 rounded-lg transition-colors group"
              id="btn-profile-avatar-header"
            >
              <img
                src={userProfile.avatar}
                alt={userProfile.fullName}
                className="w-8 h-8 rounded-full object-cover border border-slate-700 group-hover:border-blue-500 transition-colors"
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
