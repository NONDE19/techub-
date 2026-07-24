import React, { useState } from 'react';
import { Users, Plus, Check, ShieldAlert, Sparkles, X, MessageSquare, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Communities: React.FC = () => {
  const { communities, toggleJoinCommunity, addCommunity, setActiveTab } = useApp();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // New Community Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Android Development');
  const [icon, setIcon] = useState('📱');
  const [coverImage, setCoverImage] = useState('');

  const categories = ['All', 'Android Development', 'Java Programming', 'Cybersecurity', 'UI/UX Design', 'AI & ML'];

  const filteredCommunities = communities.filter(c => selectedCategory === 'All' || c.category === selectedCategory);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    addCommunity({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      description,
      category,
      icon,
      coverImage: coverImage.trim() || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000',
      rules: ['Respect fellow developers', 'Share verified code', 'No spam']
    });

    setIsCreateModalOpen(false);
    setName('');
    setDescription('');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#11121A] to-slate-900 border border-slate-800 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Users className="w-4 h-4" />
            <span>Developer Groups & Guilds</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight">
            Tech Communities
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-lg">
            Join domain-specific tech communities. Collaborate with Android Java software engineers, cybersecurity red teams, and product designers.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-lg shadow-md transition-all active:scale-95 shrink-0"
          id="btn-create-community-trigger"
        >
          <Plus className="w-4 h-4" />
          <span>Create Community</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-[#11121A] text-slate-300 border border-slate-800 hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Communities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredCommunities.map((community) => (
          <div
            key={community.id}
            className="bg-[#11121A] rounded-2xl border border-slate-800 overflow-hidden shadow-sm hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div className="h-28 relative bg-[#090A0F]">
              <img
                src={community.coverImage}
                alt={community.name}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute -bottom-5 left-5 w-12 h-12 rounded-xl bg-[#11121A] border-2 border-slate-800 flex items-center justify-center text-2xl shadow-md">
                {community.icon}
              </div>
            </div>

            <div className="p-5 pt-8 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">
                    {community.name}
                  </h3>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {community.membersCount} Members
                  </span>
                </div>

                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {community.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => {
                    setActiveTab('feed');
                  }}
                  className="flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:underline"
                >
                  <span>View Group Discussions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => toggleJoinCommunity(community.id)}
                  className={`px-4 py-2 font-bold text-xs rounded-lg transition-all ${
                    community.isJoined
                      ? 'bg-slate-900 text-slate-300 border border-slate-800'
                      : 'bg-blue-600 text-white hover:bg-blue-500 shadow-md'
                  }`}
                  id={`btn-join-community-${community.id}`}
                >
                  {community.isJoined ? (
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Check className="w-3.5 h-3.5" /> Joined
                    </span>
                  ) : (
                    'Join Group'
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Community Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090A0F]/80 backdrop-blur-sm">
          <div className="bg-[#11121A] rounded-2xl max-w-md w-full p-6 border border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-extrabold text-base text-white">
                Create Tech Community
              </h3>
              <button onClick={() => setIsCreateModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400 hover:text-white" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Community Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Zambia Mobile Developers Guild"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none"
                  >
                    <option value="Android Development">Android Development</option>
                    <option value="Java Programming">Java Programming</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Emoji Icon
                  </label>
                  <input
                    type="text"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                  required
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-md transition-colors"
                >
                  Create Community
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
