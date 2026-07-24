import React from 'react';
import { ShieldCheck, Users, Rss, Briefcase, Flag, Check, Trash2, Ban, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminDashboard: React.FC = () => {
  const { allUsers, posts, jobs, reports, resolveReport, deletePost } = useApp();

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#11121A] to-slate-900 border border-slate-800 text-white shadow-lg flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Platform Operations & Security</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight">
            TechHub Admin Dashboard
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Monitor community metrics, manage user roles, and resolve moderation report queues.
          </p>
        </div>
      </div>

      {/* Analytics KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Members', count: allUsers.length + 1840, icon: Users, color: 'text-blue-400' },
          { label: 'Active Posts', count: posts.length, icon: Rss, color: 'text-cyan-400' },
          { label: 'Job Postings', count: jobs.length, icon: Briefcase, color: 'text-emerald-400' },
          { label: 'Pending Reports', count: reports.filter(r => r.status === 'pending').length, icon: Flag, color: 'text-rose-400' },
        ].map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="bg-[#11121A] p-4 rounded-2xl border border-slate-800 shadow-sm flex items-center gap-3"
            >
              <div className={`p-3 rounded-xl bg-[#090A0F] border border-slate-800 ${kpi.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium block">
                  {kpi.label}
                </span>
                <span className="text-xl font-black text-white">
                  {kpi.count}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Report Resolution Queue */}
      <div className="bg-[#11121A] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-sm text-white">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>Moderation Queue ({reports.filter(r => r.status === 'pending').length} Pending)</span>
          </div>
        </div>

        <div className="space-y-3">
          {reports.map((report) => (
            <div
              key={report.id}
              className="p-4 rounded-xl bg-[#090A0F] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-rose-400 uppercase text-[10px] px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">
                    {report.targetType} Report
                  </span>
                  <span className="text-slate-500">By {report.reporterName} • {report.createdAt}</span>
                </div>
                <p className="font-semibold text-slate-200 mt-1">
                  Reason: {report.reason}
                </p>
                <p className="text-slate-400 mt-0.5 italic line-clamp-1">
                  Snippet: "{report.contentSnippet}"
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {report.status === 'pending' ? (
                  <>
                    <button
                      onClick={() => {
                        deletePost(report.targetId);
                        resolveReport(report.id, 'resolve');
                      }}
                      className="px-3 py-1.5 bg-rose-600 text-white font-bold rounded-lg text-xs hover:bg-rose-500 shadow-md transition-colors"
                    >
                      Remove Content
                    </button>
                    <button
                      onClick={() => resolveReport(report.id, 'dismiss')}
                      className="px-3 py-1.5 bg-slate-800 text-slate-300 font-bold rounded-lg text-xs hover:bg-slate-700 transition-colors"
                    >
                      Dismiss Report
                    </button>
                  </>
                ) : (
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold rounded-lg uppercase text-[10px]">
                    Resolved
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
