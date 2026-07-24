import React, { useState } from 'react';
import { Settings, X, Moon, Sun, Shield, Bell, Lock, HelpCircle, Mail, Smartphone } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsModal: React.FC = () => {
  const { settingsModalOpen, setSettingsModalOpen, isDarkMode, toggleDarkMode, activeRole, setActiveRole } = useApp();

  const [notificationEmail, setNotificationEmail] = useState(true);
  const [notificationPush, setNotificationPush] = useState(true);

  if (!settingsModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090A0F]/80 backdrop-blur-sm">
      <div className="bg-[#11121A] rounded-2xl max-w-md w-full border border-slate-800 shadow-2xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-400" />
            <h3 className="font-extrabold text-base text-white">
              TechHub Settings & Preferences
            </h3>
          </div>
          <button onClick={() => setSettingsModalOpen(false)}>
            <X className="w-5 h-5 text-slate-400 hover:text-white" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          {/* Appearance */}
          <div className="p-3.5 rounded-xl bg-[#090A0F] border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-slate-200">
              {isDarkMode ? <Moon className="w-4 h-4 text-amber-400" /> : <Sun className="w-4 h-4 text-slate-400" />}
              <span>Dark Theme Mode</span>
            </div>
            <button
              onClick={toggleDarkMode}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors"
            >
              Toggle ({isDarkMode ? 'Dark' : 'Light'})
            </button>
          </div>

          {/* Active Persona / Role Switcher */}
          <div className="p-3.5 rounded-xl bg-[#090A0F] border border-slate-800 space-y-2">
            <span className="font-bold text-slate-200 block">
              Primary Account Role
            </span>
            <div className="grid grid-cols-2 gap-2 font-semibold">
              {['developer', 'recruiter', 'freelancer', 'admin'].map((role) => (
                <button
                  key={role}
                  onClick={() => setActiveRole(role)}
                  className={`p-2 rounded-lg capitalize transition-all ${
                    activeRole === role
                      ? 'bg-blue-600 text-white font-bold'
                      : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications Toggles */}
          <div className="p-3.5 rounded-xl bg-[#090A0F] border border-slate-800 space-y-2 text-slate-300">
            <span className="font-bold text-slate-200 block">
              Notifications Preferences
            </span>
            <div className="flex items-center justify-between">
              <span>Email Job Alerts</span>
              <input
                type="checkbox"
                checked={notificationEmail}
                onChange={(e) => setNotificationEmail(e.target.checked)}
                className="accent-blue-500"
              />
            </div>
            <div className="flex items-center justify-between pt-1">
              <span>Push Notifications</span>
              <input
                type="checkbox"
                checked={notificationPush}
                onChange={(e) => setNotificationPush(e.target.checked)}
                className="accent-blue-500"
              />
            </div>
          </div>

          {/* Support */}
          <div className="pt-2 text-center text-slate-500">
            <p>TechHub Zambia Platform v2.4 • Production Ready</p>
          </div>
        </div>
      </div>
    </div>
  );
};
