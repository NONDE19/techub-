import React, { useState } from 'react';
import { 
  FolderGit2, 
  Star, 
  ExternalLink, 
  Github, 
  Plus, 
  Search, 
  Bookmark, 
  Code, 
  X, 
  Sparkles,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProjectsShowcase: React.FC = () => {
  const { projects, addProject, toggleStarProject, toggleBookmarkProject, userProfile } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTechFilter, setSelectedTechFilter] = useState<string>('All');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // New project form state
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCoverImage, setNewCoverImage] = useState('');
  const [newGithubUrl, setNewGithubUrl] = useState('');
  const [newDemoUrl, setNewDemoUrl] = useState('');
  const [newTechInput, setNewTechInput] = useState('Java, SQLite, Material 3');

  const allTechnologies = ['All', 'Java', 'Android Studio', 'SQLite', 'React', 'Figma', 'TypeScript', 'Security'];

  const filteredProjects = projects.filter((proj) => {
    const matchesSearch = 
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.authorName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTech = 
      selectedTechFilter === 'All' || 
      proj.technologies.some((t) => t.toLowerCase().includes(selectedTechFilter.toLowerCase()));

    return matchesSearch && matchesTech;
  });

  const handleCreateProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim() || !newGithubUrl.trim()) return;

    const techArray = newTechInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    addProject({
      title: newTitle,
      description: newDescription,
      coverImage: newCoverImage.trim() || 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800',
      screenshots: [newCoverImage.trim() || 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800'],
      githubUrl: newGithubUrl,
      demoUrl: newDemoUrl.trim() || undefined,
      technologies: techArray.length > 0 ? techArray : ['Java', 'SQLite', 'Android']
    });

    // Reset & close
    setNewTitle('');
    setNewDescription('');
    setNewCoverImage('');
    setNewGithubUrl('');
    setNewDemoUrl('');
    setIsSubmitModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#11121A] to-slate-900 border border-slate-800 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
              <FolderGit2 className="w-4 h-4" />
              <span>Developer Project Hub</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              Discover & Showcase Tech Projects
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Explore open-source Android apps, Java libraries, cybersecurity utilities, and fintech design systems built by engineers in Zambia and worldwide.
            </p>
          </div>
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg shadow-md transition-all active:scale-95 shrink-0"
            id="btn-showcase-submit-project"
          >
            <Plus className="w-4 h-4" />
            <span>Showcase Project</span>
          </button>
        </div>
      </div>

      {/* Search & Technology Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-[#11121A] p-4 rounded-2xl border border-slate-800">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search project title or tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 focus:outline-none focus:border-blue-500 text-white placeholder-slate-500"
            id="input-search-projects"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {allTechnologies.map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedTechFilter(tech)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                selectedTechFilter === tech
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-[#11121A] rounded-2xl border border-slate-800 shadow-sm overflow-hidden flex flex-col hover:border-slate-700 transition-all group"
          >
            {/* Cover Image */}
            <div className="h-44 relative overflow-hidden bg-[#090A0F]">
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
              />
              <div className="absolute top-3 right-3 flex items-center gap-1.5">
                <button
                  onClick={() => toggleBookmarkProject(project.id)}
                  className="p-2 rounded-lg bg-[#090A0F]/80 text-white border border-slate-800 hover:bg-[#090A0F] transition-colors"
                  id={`btn-bookmark-project-${project.id}`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${project.isBookmarked ? 'fill-blue-400 text-blue-400' : ''}`} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                {/* Author Info */}
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={project.authorAvatar}
                    alt={project.authorName}
                    className="w-6 h-6 rounded-full object-cover border border-slate-700"
                  />
                  <span className="text-xs font-semibold text-slate-300">
                    {project.authorName}
                  </span>
                  <span className="text-[10px] text-slate-500 ml-auto">
                    {project.createdAt}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-slate-900 text-slate-300 rounded-md border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links & Star Button */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <button
                  onClick={() => toggleStarProject(project.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-colors ${
                    project.isStarred
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
                  }`}
                  id={`btn-star-project-${project.id}`}
                >
                  <Star className={`w-3 h-3 ${project.isStarred ? 'fill-amber-400' : ''}`} />
                  <span>{project.starsCount} Stars</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                    title="View GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-400 hover:bg-blue-600/20 transition-colors"
                      title="Live Demo / Download"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Showcase New Project Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090A0F]/80 backdrop-blur-sm">
          <div className="bg-[#11121A] rounded-2xl max-w-lg w-full border border-slate-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-blue-400" />
                <h3 className="font-extrabold text-base text-white">
                  Showcase Your Project
                </h3>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProjectSubmit} className="p-6 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. CopperPay Wallet Android App"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your project, key problem solved, and architecture..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    GitHub URL *
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={newGithubUrl}
                    onChange={(e) => setNewGithubUrl(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Demo URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://myproject.com"
                    value={newDemoUrl}
                    onChange={(e) => setNewDemoUrl(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Technologies Used (Comma Separated)
                </label>
                <input
                  type="text"
                  placeholder="Java, SQLite, Android Studio, Material 3"
                  value={newTechInput}
                  onChange={(e) => setNewTechInput(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Cover Screenshot Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newCoverImage}
                  onChange={(e) => setNewCoverImage(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors shadow-md"
                >
                  Publish Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
