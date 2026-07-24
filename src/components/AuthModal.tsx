import React, { useState } from 'react';
import { Lock, Mail, User, X, Code2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuthModal: React.FC = () => {
  const { authModalOpen, setAuthModalOpen, login } = useApp();

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  if (!authModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    login(email);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090A0F]/80 backdrop-blur-md">
      <div className="bg-[#11121A] rounded-2xl max-w-md w-full p-6 border border-slate-800 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-white">
              {mode === 'login' ? 'Sign In to TechHub' : mode === 'signup' ? 'Create TechHub Account' : 'Reset Password'}
            </h3>
          </div>
          <button onClick={() => setAuthModalOpen(false)}>
            <X className="w-5 h-5 text-slate-400 hover:text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          {mode === 'signup' && (
            <div>
              <label className="block font-bold text-slate-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Chileshe Mwamba"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-300 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="developer@techhub.zm"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {mode !== 'forgot' && (
            <div>
              <label className="block font-bold text-slate-300 mb-1">
                Password *
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-md transition-colors"
          >
            {mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
          </button>

          <div className="pt-2 text-center text-slate-400 font-semibold flex items-center justify-between">
            {mode === 'login' ? (
              <>
                <button type="button" onClick={() => setMode('signup')} className="text-blue-400 hover:underline">
                  Need an account? Sign up
                </button>
                <button type="button" onClick={() => setMode('forgot')} className="hover:underline hover:text-white">
                  Forgot password?
                </button>
              </>
            ) : (
              <button type="button" onClick={() => setMode('login')} className="text-blue-400 hover:underline mx-auto">
                Back to Sign In
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
