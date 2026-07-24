import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  Search, 
  Bookmark, 
  CheckCircle, 
  Plus, 
  Star, 
  UserCheck, 
  Send, 
  ShieldAlert, 
  Building2, 
  X, 
  Layers, 
  Sparkles 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const JobsMarketplace: React.FC = () => {
  const { jobs, freelanceServices, addJob, addFreelanceService, toggleSaveJob, applyToJob, userProfile } = useApp();

  const [mainTab, setMainTab] = useState<'jobs' | 'freelance'>('jobs');
  const [jobSearchQuery, setJobSearchQuery] = useState('');
  const [selectedJobType, setSelectedJobType] = useState<string>('All');
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [isPostServiceModalOpen, setIsPostServiceModalOpen] = useState(false);
  const [applyingJobId, setApplyingJobId] = useState<string | null>(null);

  // New Job Form State
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobLocation, setJobLocation] = useState('Lusaka, Zambia (Hybrid)');
  const [jobType, setJobType] = useState<'Full-Time' | 'Remote' | 'Contract' | 'Part-Time'>('Full-Time');
  const [jobSalary, setJobSalary] = useState('ZMW 35,000 - 50,000 / month');
  const [jobExp, setJobExp] = useState('3+ Years');
  const [jobDesc, setJobDesc] = useState('');
  const [jobSkills, setJobSkills] = useState('Java, SQLite, Android, REST APIs');

  // New Freelance Service Form State
  const [serviceTitle, setServiceTitle] = useState('');
  const [serviceCategory, setServiceCategory] = useState('Android Development');
  const [servicePrice, setServicePrice] = useState(500);
  const [serviceDesc, setServiceDesc] = useState('');
  const [serviceDeliveryDays, setServiceDeliveryDays] = useState(5);

  const filteredJobs = jobs.filter((job) => {
    const matchesQuery = 
      job.title.toLowerCase().includes(jobSearchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(jobSearchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(jobSearchQuery.toLowerCase());

    const matchesType = selectedJobType === 'All' || job.type === selectedJobType;
    return matchesQuery && matchesType;
  });

  const handlePostJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle.trim() || !companyName.trim() || !jobDesc.trim()) return;

    addJob({
      title: jobTitle,
      company: companyName,
      companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=200',
      location: jobLocation,
      type: jobType,
      salary: jobSalary,
      experienceLevel: jobExp,
      skillsRequired: jobSkills.split(',').map((s) => s.trim()),
      description: jobDesc,
      requirements: ['Proven track record in software engineering', 'Solid problem solving abilities'],
      deadline: 'Sep 30, 2026',
      isSaved: false,
      hasApplied: false
    });

    setIsPostJobModalOpen(false);
    setJobTitle('');
    setCompanyName('');
    setJobDesc('');
  };

  const handlePostServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceTitle.trim() || !serviceDesc.trim()) return;

    addFreelanceService({
      title: serviceTitle,
      category: serviceCategory,
      startingPrice: Number(servicePrice),
      coverImage: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&q=80&w=800',
      description: serviceDesc,
      skills: ['Java', 'SQLite', 'Android SDK'],
      deliveryDays: Number(serviceDeliveryDays)
    });

    setIsPostServiceModalOpen(false);
    setServiceTitle('');
    setServiceDesc('');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#11121A] to-slate-900 border border-slate-800 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Briefcase className="w-4 h-4" />
            <span>Tech Career Hub</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight">
            Jobs & Freelance Opportunities
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-lg">
            Connect directly with top tech employers in Zambia or hire certified freelancers for mobile, web, design, and cybersecurity projects.
          </p>
        </div>

        {/* Dual Tab Switcher */}
        <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 flex items-center gap-1 shrink-0">
          <button
            onClick={() => setMainTab('jobs')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              mainTab === 'jobs'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
            id="btn-tab-job-openings"
          >
            Job Openings ({jobs.length})
          </button>
          <button
            onClick={() => setMainTab('freelance')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              mainTab === 'freelance'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
            id="btn-tab-freelance-services"
          >
            Freelance Market ({freelanceServices.length})
          </button>
        </div>
      </div>

      {/* Main Tab 1: Job Openings */}
      {mainTab === 'jobs' && (
        <div className="space-y-4">
          {/* Search & Actions Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#11121A] p-4 rounded-2xl border border-slate-800">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search job title, company, or skills..."
                value={jobSearchQuery}
                onChange={(e) => setJobSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 focus:outline-none focus:border-blue-500 text-white placeholder-slate-500"
                id="input-search-jobs"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              <select
                value={selectedJobType}
                onChange={(e) => setSelectedJobType(e.target.value)}
                className="px-3 py-2 text-xs font-semibold rounded-xl bg-slate-900 text-slate-300 border border-slate-800 focus:outline-none"
                id="select-job-type-filter"
              >
                <option value="All">All Types</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Remote">Remote</option>
                <option value="Contract">Contract</option>
              </select>

              <button
                onClick={() => setIsPostJobModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition-colors shrink-0 shadow-md"
                id="btn-post-a-job-modal-trigger"
              >
                <Plus className="w-4 h-4" />
                <span>Post a Job</span>
              </button>
            </div>
          </div>

          {/* Jobs List */}
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-[#11121A] p-5 rounded-2xl border border-slate-800 shadow-sm hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={job.companyLogo}
                    alt={job.company}
                    className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-800 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-white">
                        {job.title}
                      </h3>
                      <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-blue-600/10 text-blue-400 border border-blue-500/20">
                        {job.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-medium text-slate-400 mt-1 flex-wrap">
                      <span className="flex items-center gap-1 text-slate-200 font-semibold">
                        <Building2 className="w-3.5 h-3.5 text-blue-400" />
                        {job.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1 text-emerald-400 font-bold">
                        <DollarSign className="w-3.5 h-3.5" />
                        {job.salary}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                      {job.description}
                    </p>

                    {/* Skill Badges */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {job.skillsRequired.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 text-[10px] font-semibold bg-slate-900 text-slate-300 rounded-md border border-slate-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side Actions */}
                <div className="flex md:flex-col items-center md:items-end justify-between gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800 shrink-0">
                  <span className="text-[11px] text-slate-500 font-medium">
                    {job.applicantsCount} Applicants • {job.postedAt}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleSaveJob(job.id)}
                      className={`p-2 rounded-lg border border-slate-800 transition-colors ${
                        job.isSaved
                          ? 'bg-blue-600/10 text-blue-400 border-blue-500/20'
                          : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                      id={`btn-save-job-${job.id}`}
                    >
                      <Bookmark className={`w-4 h-4 ${job.isSaved ? 'fill-blue-400' : ''}`} />
                    </button>

                    {job.hasApplied ? (
                      <span className="flex items-center gap-1 px-4 py-2 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/20">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Applied
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          setApplyingJobId(job.id);
                        }}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition-all active:scale-95 shadow-md"
                        id={`btn-apply-job-${job.id}`}
                      >
                        Apply Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Tab 2: Freelance Services Marketplace */}
      {mainTab === 'freelance' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-[#11121A] p-4 rounded-2xl border border-slate-800">
            <div>
              <h3 className="font-bold text-sm text-white">
                Hire Verified Tech Freelancers
              </h3>
              <p className="text-xs text-slate-400">
                Custom Android development, Figma design, penetration testing & database optimization.
              </p>
            </div>
            <button
              onClick={() => setIsPostServiceModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors shrink-0 shadow-md"
              id="btn-offer-service-gig"
            >
              <Plus className="w-4 h-4" />
              <span>Offer Service</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {freelanceServices.map((service) => (
              <div
                key={service.id}
                className="bg-[#11121A] rounded-2xl border border-slate-800 overflow-hidden shadow-sm flex flex-col justify-between hover:border-slate-700 transition-all"
              >
                <div className="h-40 relative bg-[#090A0F]">
                  <img
                    src={service.coverImage}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider bg-[#090A0F]/80 text-cyan-300 rounded-lg backdrop-blur-md border border-slate-800">
                    {service.category}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={service.freelancerAvatar}
                        alt={service.freelancerName}
                        className="w-6 h-6 rounded-full object-cover border border-slate-700"
                      />
                      <span className="text-xs font-semibold text-slate-300">
                        {service.freelancerName}
                      </span>
                      <div className="ml-auto flex items-center gap-1 text-xs font-bold text-amber-400">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{service.rating} ({service.reviewsCount})</span>
                      </div>
                    </div>

                    <h4 className="text-sm font-bold text-white line-clamp-2">
                      {service.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">
                        Starting at
                      </span>
                      <span className="text-sm font-black text-emerald-400">
                        ZMW {service.startingPrice}
                      </span>
                    </div>

                    <button
                      onClick={() => alert(`Inquiry sent to ${service.freelancerName}! Direct Chat initiated.`)}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow-sm transition-colors"
                      id={`btn-hire-freelancer-${service.id}`}
                    >
                      Hire Freelancer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Apply to Job Confirmation Modal */}
      {applyingJobId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090A0F]/80 backdrop-blur-sm">
          <div className="bg-[#11121A] rounded-2xl max-w-md w-full p-6 border border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-white">
                Submit Job Application
              </h3>
              <button
                onClick={() => setApplyingJobId(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Apply using your TechHub profile resume file:
            </p>

            <div className="p-3 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center gap-3">
              <UserCheck className="w-6 h-6 text-blue-400" />
              <div>
                <p className="text-xs font-bold text-white">
                  {userProfile.fullName}
                </p>
                <p className="text-[11px] text-blue-400">
                  CV File: {userProfile.resumeName || 'Chileshe_Mwamba_CV.pdf'}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setApplyingJobId(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  applyToJob(applyingJobId);
                  setApplyingJobId(null);
                  alert('Application submitted successfully to employer!');
                }}
                className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md"
                id="btn-confirm-job-application"
              >
                Confirm & Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Post Job Modal */}
      {isPostJobModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090A0F]/80 backdrop-blur-sm">
          <div className="bg-[#11121A] rounded-2xl max-w-lg w-full border border-slate-800 shadow-2xl overflow-hidden p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-extrabold text-base text-white">
                Post Tech Position
              </h3>
              <button onClick={() => setIsPostJobModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400 hover:text-white" />
              </button>
            </div>

            <form onSubmit={handlePostJobSubmit} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Job Title *
                </label>
                <input
                  type="text"
                  placeholder="Senior Android Engineer (Java / SQLite)"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Zanaco Bank / Startup"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={jobLocation}
                    onChange={(e) => setJobLocation(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Description & Requirements *
                </label>
                <textarea
                  rows={3}
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                  required
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPostJobModalOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors shadow-md"
                >
                  Post Job Opening
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Offer Service Gig Modal */}
      {isPostServiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090A0F]/80 backdrop-blur-sm">
          <div className="bg-[#11121A] rounded-2xl max-w-lg w-full p-6 border border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-extrabold text-base text-white">
                Offer Freelance Tech Service
              </h3>
              <button onClick={() => setIsPostServiceModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400 hover:text-white" />
              </button>
            </div>

            <form onSubmit={handlePostServiceSubmit} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  placeholder="I will build a complete Native Android App using Java + SQLite"
                  value={serviceTitle}
                  onChange={(e) => setServiceTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Starting Price (ZMW)
                  </label>
                  <input
                    type="number"
                    value={servicePrice}
                    onChange={(e) => setServicePrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Delivery (Days)
                  </label>
                  <input
                    type="number"
                    value={serviceDeliveryDays}
                    onChange={(e) => setServiceDeliveryDays(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Service Details *
                </label>
                <textarea
                  rows={3}
                  value={serviceDesc}
                  onChange={(e) => setServiceDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
                  required
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPostServiceModalOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow-md transition-colors"
                >
                  Publish Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
