import React, { useState } from 'react';
import { X, Code2, Image, Sparkles, Send, FileCode } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CreatePostModal: React.FC = () => {
  const { createPostModalOpen, setCreatePostModalOpen, addPost, communities, userProfile } = useApp();

  const [content, setContent] = useState('');
  const [postType, setPostType] = useState<'general' | 'code_snippet' | 'project_update' | 'article'>('general');
  const [includeCode, setIncludeCode] = useState(false);
  const [codeLanguage, setCodeLanguage] = useState('java');
  const [codeContent, setCodeContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedCommunityId, setSelectedCommunityId] = useState('');

  if (!createPostModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !codeContent.trim()) return;

    const selectedComm = communities.find((c) => c.id === selectedCommunityId);

    addPost({
      content,
      type: postType,
      image: imageUrl.trim() ? imageUrl.trim() : undefined,
      codeSnippet: includeCode && codeContent.trim() ? { language: codeLanguage, code: codeContent } : undefined,
      communityId: selectedComm?.id,
      communityName: selectedComm?.name
    });

    // Reset & close
    setContent('');
    setCodeContent('');
    setImageUrl('');
    setIncludeCode(false);
    setCreatePostModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-xl w-full border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Create TechHub Post
            </h2>
          </div>
          <button
            onClick={() => setCreatePostModalOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            id="btn-close-create-post-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* User Info Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={userProfile.avatar}
                alt={userProfile.fullName}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/20"
              />
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {userProfile.fullName}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  @{userProfile.username}
                </p>
              </div>
            </div>

            {/* Community Dropdown */}
            <select
              value={selectedCommunityId}
              onChange={(e) => setSelectedCommunityId(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 focus:outline-none"
              id="select-post-community"
            >
              <option value="">Public Feed</option>
              {communities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Post Category Type Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {[
              { id: 'general', label: 'General' },
              { id: 'code_snippet', label: 'Code Snippet' },
              { id: 'project_update', label: 'Project Update' },
              { id: 'article', label: 'Article / Tutorial' },
            ].map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => {
                  setPostType(type.id as any);
                  if (type.id === 'code_snippet') setIncludeCode(true);
                }}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  postType === type.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Text Area */}
          <div>
            <textarea
              rows={4}
              placeholder="What software design, Java/SQLite logic, or project updates would you like to share with developers?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              required={!includeCode}
              id="textarea-post-content"
            />
          </div>

          {/* Code Snippet Option Toggle */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                <FileCode className="w-4 h-4 text-cyan-500" />
                <span>Attach Code Block</span>
              </div>
              <input
                type="checkbox"
                checked={includeCode}
                onChange={(e) => setIncludeCode(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                id="checkbox-include-code"
              />
            </div>

            {includeCode && (
              <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    Language
                  </label>
                  <select
                    value={codeLanguage}
                    onChange={(e) => setCodeLanguage(e.target.value)}
                    className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 border border-slate-200 dark:border-slate-700"
                    id="select-code-language"
                  >
                    <option value="java">Java</option>
                    <option value="kotlin">Kotlin</option>
                    <option value="typescript">TypeScript / JS</option>
                    <option value="sql">SQL / SQLite</option>
                    <option value="python">Python</option>
                    <option value="xml">Android XML</option>
                  </select>
                </div>
                <textarea
                  rows={5}
                  placeholder={`// Paste your ${codeLanguage} code here...`}
                  value={codeContent}
                  onChange={(e) => setCodeContent(e.target.value)}
                  className="w-full p-3 font-mono text-xs bg-slate-950 text-cyan-300 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500 resize-none"
                  id="textarea-code-content"
                />
              </div>
            )}
          </div>

          {/* Image URL Option */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Optional Cover / Screenshot Image URL
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="input-post-image-url"
            />
          </div>

          {/* Submit Actions */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setCreatePostModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-600/20 transition-all active:scale-95"
              id="btn-submit-create-post"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish Post</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
