import React from 'react';
import { Bell, X, Check, Heart, MessageSquare, Briefcase, Calendar, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NotificationsDrawer: React.FC = () => {
  const { notificationsDrawerOpen, setNotificationsDrawerOpen, notifications, markNotificationAsRead, clearAllNotifications } = useApp();

  if (!notificationsDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#090A0F]/80 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-sm bg-[#11121A] shadow-2xl border-l border-slate-800 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-400" />
              <h3 className="font-extrabold text-base text-white">
                Notifications
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={clearAllNotifications}
                className="text-[11px] font-semibold text-slate-400 hover:text-white"
              >
                Clear All
              </button>
              <button
                onClick={() => setNotificationsDrawerOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <p>No new notifications right now.</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => markNotificationAsRead(notif.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    notif.isRead
                      ? 'bg-[#090A0F] border-slate-800'
                      : 'bg-blue-600/10 border-blue-500/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <img src={notif.actorAvatar} alt="" className="w-8 h-8 rounded-full object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white">
                        {notif.actorName}
                      </p>
                      <p className="text-slate-300 mt-0.5 leading-snug">
                        {notif.message}
                      </p>
                      <span className="text-[10px] text-slate-500 mt-1 block">
                        {notif.createdAt}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
