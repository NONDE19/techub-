import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Github, 
  Linkedin, 
  Globe, 
  FileText, 
  Edit3, 
  Award, 
  Code2, 
  Sparkles, 
  Check, 
  X,
  Upload
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProfileView: React.FC = () => {
  const { userProfile, updateProfile } = useApp();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Edit state
  const [headline, setHeadline] = useState(userProfile.headline);
  const [bio, setBio] = useState(userProfile.bio);
  const [profession, setProfession] = useState(userProfile.profession);
  const [company, setCompany] = useState(userProfile.company || '');
  const [university, setUniversity] = useState(userProfile.university || '');
  const [location, setLocation] = useState(userProfile.location);
  const [skillsInput, setSkillsInput] = useState(userProfile.skills.join(', '));
  const [languagesInput, setLanguagesInput] = useState(userProfile.programmingLanguages.join(', '));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      headline,
      bio,
      profession,
      company: company.trim() || undefined,
      university: university.trim() || undefined,
      location,
      skills: skillsInput.split(',').map((s) => s.trim()).filter(Boolean),
      programmingLanguages: languagesInput.split(',').map((l) => l.trim()).filter(Boolean)
    });
    setIsEditModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20">
      {/* Profile Card Container */}
      <div className="bg-[#11121A] rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        {/* Cover Image */}
        <div className="h-48 sm:h-60 relative bg-[#090A0F]">
          <img
            src={userProfile.coverImage}
            alt="Cover"
            className="w-full h-full object-cover opacity-80"
          />
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="absolute top-4 right-4 flex items-center gap-1.5 px-3.5 py-2 bg-[#090A0F]/80 hover:bg-[#090A0F] text-white text-xs font-bold rounded-lg border border-slate-800 backdrop-blur-md shadow-md transition-colors"
            id="btn-edit-cover-profile"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Profile Main Header Info */}
        <div className="px-6 pb-6 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-4">
            <div className="relative">
              <img
                src={userProfile.avatar}
                alt={userProfile.fullName}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover ring-4 ring-[#11121A] shadow-xl border border-slate-800"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  alert(`CV file "${userProfile.resumeName}" downloaded!`);
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-md transition-colors"
                id="btn-download-cv"
              >
                <FileText className="w-4 h-4" />
                <span>Download Resume / CV</span>
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white">
                {userProfile.fullName}
              </h1>
              <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                {userProfile.role}
              </span>
            </div>

            <p className="text-sm font-semibold text-slate-300 mt-1">
              {userProfile.headline}
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-400 mt-2 flex-wrap">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                {userProfile.location}
              </span>
              {userProfile.company && (
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                  {userProfile.company}
                </span>
              )}
              {userProfile.university && (
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                  {userProfile.university}
                </span>
              )}
            </div>

            <p className="text-xs text-slate-300 mt-4 leading-relaxed max-w-2xl">
              {userProfile.bio}
            </p>

            {/* Followers / Following Metrics */}
            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-800 text-xs">
              <div>
                <span className="font-extrabold text-white text-sm">
                  {userProfile.followersCount}
                </span>{' '}
                <span className="text-slate-400">Followers</span>
              </div>
              <div>
                <span className="font-extrabold text-white text-sm">
                  {userProfile.followingCount}
                </span>{' '}
                <span className="text-slate-400">Following</span>
              </div>
              <div>
                <span className="font-extrabold text-white text-sm">
                  {userProfile.yearsOfExperience} Years
                </span>{' '}
                <span className="text-slate-400">Experience</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Skills, Tech Stack, Links, Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Languages & Technical Skills */}
        <div className="bg-[#11121A] p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
            <Code2 className="w-4 h-4" />
            <span>Programming Languages & Tech Stack</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                Primary Languages
              </span>
              <div className="flex flex-wrap gap-1.5">
                {userProfile.programmingLanguages.map((lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1 font-mono font-bold bg-[#090A0F] text-cyan-400 rounded-lg text-xs border border-slate-800"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                Frameworks & Libraries
              </span>
              <div className="flex flex-wrap gap-1.5">
                {userProfile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 font-semibold bg-blue-600/10 text-blue-300 rounded-lg text-xs border border-blue-500/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Certifications & Social Links */}
        <div className="bg-[#11121A] p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
            <Award className="w-4 h-4" />
            <span>Certifications & Online Links</span>
          </div>

          <div className="space-y-2 text-xs">
            {userProfile.certifications.map((cert) => (
              <div
                key={cert}
                className="p-2.5 rounded-xl bg-[#090A0F] border border-slate-800 flex items-center gap-2 font-semibold text-slate-300"
              >
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{cert}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center gap-3">
            {userProfile.githubUrl && (
              <a
                href={userProfile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-slate-900 border border-slate-800 text-slate-300 rounded-xl hover:bg-slate-800"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {userProfile.linkedinUrl && (
              <a
                href={userProfile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-600/20"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {userProfile.websiteUrl && (
              <a
                href={userProfile.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-slate-900 border border-slate-800 text-slate-300 rounded-xl hover:bg-slate-800"
                title="Personal Website"
              >
                <Globe className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090A0F]/80 backdrop-blur-sm">
          <div className="bg-[#11121A] rounded-2xl max-w-lg w-full p-6 border border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-extrabold text-base text-white">
                Edit Developer Profile
              </h3>
              <button onClick={() => setIsEditModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400 hover:text-white" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Headline
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Biography
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Programming Languages (Comma Separated)
                </label>
                <input
                  type="text"
                  value={languagesInput}
                  onChange={(e) => setLanguagesInput(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Technical Skills (Comma Separated)
                </label>
                <input
                  type="text"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-md transition-colors"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
