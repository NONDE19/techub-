import React, { useState } from 'react';
import { Search, X, User, Briefcase, FolderGit2, Users, GraduationCap, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const GlobalSearchModal: React.FC = () => {
  const { searchModalOpen, setSearchModalOpen, allUsers, jobs, projects, communities, courses, setActiveTab } = useApp();

  const [query, setQuery] = useState('');

  if (!searchModalOpen) return null;

  const matchedUsers = allUsers.filter(u => u.fullName.toLowerCase().includes(query.toLowerCase()) || u.skills.some(s => s.toLowerCase().includes(query.toLowerCase())));
  const matchedJobs = jobs.filter(j => j.title.toLowerCase().includes(query.toLowerCase()) || j.company.toLowerCase().includes(query.toLowerCase()));
  const matchedProjects = projects.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) || p.technologies.some(t => t.toLowerCase().includes(query.toLowerCase())));
  const matchedCommunities = communities.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 bg-[#090A0F]/80 backdrop-blur-sm">
      <div className="bg-[#11121A] rounded-2xl max-w-xl w-full border border-slate-800 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            autoFocus
            placeholder="Search developers, Java/SQLite skills, jobs, projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-sm bg-transparent border-none focus:outline-none text-white placeholder-slate-500"
            id="input-global-search-modal"
          />
          <button
            onClick={() => setSearchModalOpen(false)}
            className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 max-h-[400px] overflow-y-auto space-y-4 text-xs">
          {!query.trim() ? (
            <div className="text-center py-8 text-slate-400">
              <p>Type keywords to search across TechHub</p>
              <div className="flex flex-wrap gap-1.5 justify-center mt-3">
                {['Java', 'SQLite', 'Android', 'Figma', 'Security', 'Remote Jobs'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 rounded-lg bg-[#090A0F] border border-slate-800 text-slate-300 font-semibold hover:bg-slate-800"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Users */}
              {matchedUsers.length > 0 && (
                <div>
                  <span className="font-bold text-slate-400 uppercase text-[10px]">Developers ({matchedUsers.length})</span>
                  <div className="space-y-1.5 mt-1">
                    {matchedUsers.map((u) => (
                      <div
                        key={u.id}
                        onClick={() => {
                          setActiveTab('profile');
                          setSearchModalOpen(false);
                        }}
                        className="p-2 rounded-xl hover:bg-slate-900 flex items-center gap-3 cursor-pointer"
                      >
                        <img src={u.avatar} alt={u.fullName} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <p className="font-bold text-white">{u.fullName}</p>
                          <p className="text-[10px] text-slate-400">{u.profession}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Jobs */}
              {matchedJobs.length > 0 && (
                <div>
                  <span className="font-bold text-slate-400 uppercase text-[10px]">Jobs ({matchedJobs.length})</span>
                  <div className="space-y-1.5 mt-1">
                    {matchedJobs.map((j) => (
                      <div
                        key={j.id}
                        onClick={() => {
                          setActiveTab('jobs');
                          setSearchModalOpen(false);
                        }}
                        className="p-2 rounded-xl hover:bg-slate-900 flex items-center justify-between cursor-pointer"
                      >
                        <div>
                          <p className="font-bold text-white">{j.title}</p>
                          <p className="text-[10px] text-slate-400">{j.company} • {j.salary}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {matchedProjects.length > 0 && (
                <div>
                  <span className="font-bold text-slate-400 uppercase text-[10px]">Projects ({matchedProjects.length})</span>
                  <div className="space-y-1.5 mt-1">
                    {matchedProjects.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          setActiveTab('projects');
                          setSearchModalOpen(false);
                        }}
                        className="p-2 rounded-xl hover:bg-slate-900 flex items-center justify-between cursor-pointer"
                      >
                        <div>
                          <p className="font-bold text-white">{p.title}</p>
                          <p className="text-[10px] text-slate-400">By {p.authorName}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
