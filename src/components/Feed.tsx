import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  Code2, 
  Copy, 
  Check, 
  MoreVertical, 
  Trash2, 
  Flag, 
  Send, 
  Sparkles, 
  Image as ImageIcon,
  FileCode,
  Newspaper,
  BookmarkCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Post } from '../types';

export const Feed: React.FC = () => {
  const { 
    posts, 
    userProfile, 
    toggleLikePost, 
    toggleSavePost, 
    addComment, 
    deletePost, 
    reportPost, 
    setCreatePostModalOpen 
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'code_snippet' | 'project_update' | 'article' | 'saved'>('all');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [openCommentsPostId, setOpenCommentsPostId] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [activeMenuPostId, setActiveMenuPostId] = useState<string | null>(null);

  const filteredPosts = posts.filter((post) => {
    if (activeFilter === 'saved') return post.isSaved;
    if (activeFilter === 'all') return true;
    return post.type === activeFilter;
  });

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleAddCommentSubmit = (postId: string) => {
    const text = commentInputs[postId] || '';
    if (!text.trim()) return;
    addComment(postId, text);
    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-20">
      {/* Create Post Prompt Box */}
      <div className="bg-[#11121A] rounded-2xl p-4 border border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <img
            src={userProfile.avatar}
            alt={userProfile.fullName}
            className="w-10 h-10 rounded-full object-cover border border-slate-700"
          />
          <button
            onClick={() => setCreatePostModalOpen(true)}
            className="flex-1 text-left px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-900/80 text-slate-400 text-sm font-medium border border-slate-800 transition-colors"
            id="btn-feed-create-post-input"
          >
            What are you building or learning today? Share code...
          </button>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-400">
          <button
            onClick={() => setCreatePostModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-800/60 text-blue-400 transition-colors"
            id="btn-feed-attach-code"
          >
            <Code2 className="w-4 h-4" />
            <span>Code Snippet</span>
          </button>
          <button
            onClick={() => setCreatePostModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-800/60 text-emerald-400 transition-colors"
            id="btn-feed-attach-image"
          >
            <ImageIcon className="w-4 h-4" />
            <span>Photo / Media</span>
          </button>
          <button
            onClick={() => setCreatePostModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-800/60 text-purple-400 transition-colors"
            id="btn-feed-attach-update"
          >
            <Sparkles className="w-4 h-4" />
            <span>Project Update</span>
          </button>
        </div>
      </div>

      {/* Feed Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'all', label: 'All Feed', icon: Sparkles },
          { id: 'code_snippet', label: 'Code Snippets', icon: FileCode },
          { id: 'project_update', label: 'Project Updates', icon: Sparkles },
          { id: 'article', label: 'Articles & Tips', icon: Newspaper },
          { id: 'saved', label: 'Saved Posts', icon: BookmarkCheck },
        ].map((filter) => {
          const Icon = filter.icon;
          const isActive = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id as any)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-[#11121A] text-slate-300 hover:bg-slate-800/80 border border-slate-800'
              }`}
              id={`btn-feed-filter-${filter.id}`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{filter.label}</span>
            </button>
          );
        })}
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 px-4 bg-[#11121A] rounded-2xl border border-slate-800">
            <Code2 className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-200">
              No posts found in this filter
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Be the first in the TechHub Zambia community to share code, project updates, or tech discussions!
            </p>
            <button
              onClick={() => setCreatePostModalOpen(true)}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
              id="btn-feed-empty-create"
            >
              Create Post
            </button>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-[#11121A] rounded-2xl border border-slate-800 shadow-sm overflow-hidden transition-all hover:border-slate-700"
            >
              {/* Post Header */}
              <div className="p-4 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={post.authorAvatar}
                    alt={post.authorName}
                    className="w-10 h-10 rounded-full object-cover border border-slate-700"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-white truncate">
                        {post.authorName}
                      </h3>
                      {post.communityName && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-600/10 text-blue-400 border border-blue-500/20">
                          in {post.communityName}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 truncate">
                      {post.authorHeadline}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      {post.createdAt}
                    </p>
                  </div>
                </div>

                {/* More Options Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setActiveMenuPostId(activeMenuPostId === post.id ? null : post.id)}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                    id={`btn-post-menu-${post.id}`}
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {activeMenuPostId === post.id && (
                    <div className="absolute right-0 mt-1 w-44 bg-[#11121A] rounded-xl shadow-xl border border-slate-800 py-1.5 z-20 text-xs">
                      {post.authorId === userProfile.id ? (
                        <button
                          onClick={() => {
                            deletePost(post.id);
                            setActiveMenuPostId(null);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Post</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            reportPost(post.id, 'Inappropriate or spam content');
                            setActiveMenuPostId(null);
                            alert('Post has been reported to TechHub moderators.');
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-amber-400 hover:bg-amber-500/10"
                        >
                          <Flag className="w-3.5 h-3.5" />
                          <span>Report Content</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Post Content */}
              <div className="px-4 pb-3">
                <p className="text-sm text-slate-300 whitespace-pre-line leading-relaxed">
                  {post.content}
                </p>
              </div>

              {/* Attached Code Snippet Block */}
              {post.codeSnippet && (
                <div className="mx-4 mb-3 rounded-xl overflow-hidden border border-slate-800 bg-[#090A0F] text-slate-100 text-xs font-mono">
                  <div className="px-3 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-slate-400">
                    <span className="font-bold uppercase tracking-wider text-[10px] text-cyan-400">
                      {post.codeSnippet.language} Code
                    </span>
                    <button
                      onClick={() => handleCopyCode(post.codeSnippet!.code, post.id)}
                      className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] hover:bg-slate-800 text-slate-300 transition-colors"
                      id={`btn-copy-code-${post.id}`}
                    >
                      {copiedCodeId === post.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-3.5 overflow-x-auto leading-normal text-slate-200">
                    <code>{post.codeSnippet.code}</code>
                  </pre>
                </div>
              )}

              {/* Attached Image */}
              {post.image && (
                <div className="mb-3 max-h-96 overflow-hidden">
                  <img
                    src={post.image}
                    alt="Post media"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Post Action Footer */}
              <div className="px-4 py-2.5 bg-[#090A0F]/60 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-4">
                  {/* Like Button */}
                  <button
                    onClick={() => toggleLikePost(post.id)}
                    className={`flex items-center gap-1.5 font-semibold transition-colors ${
                      post.isLiked ? 'text-rose-500 font-bold' : 'hover:text-white'
                    }`}
                    id={`btn-like-post-${post.id}`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                    <span>{post.likesCount}</span>
                  </button>

                  {/* Comment Button */}
                  <button
                    onClick={() => setOpenCommentsPostId(openCommentsPostId === post.id ? null : post.id)}
                    className="flex items-center gap-1.5 font-semibold hover:text-white transition-colors"
                    id={`btn-comment-post-${post.id}`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.commentsCount}</span>
                  </button>

                  {/* Share Button */}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Post link copied to clipboard!');
                    }}
                    className="flex items-center gap-1.5 font-semibold hover:text-white transition-colors"
                    id={`btn-share-post-${post.id}`}
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Share</span>
                  </button>
                </div>

                {/* Save Bookmark */}
                <button
                  onClick={() => toggleSavePost(post.id)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    post.isSaved ? 'text-blue-400' : 'hover:bg-slate-800'
                  }`}
                  id={`btn-save-post-${post.id}`}
                >
                  <Bookmark className={`w-4 h-4 ${post.isSaved ? 'fill-blue-400' : ''}`} />
                </button>
              </div>

              {/* Comments Thread Accordion */}
              {openCommentsPostId === post.id && (
                <div className="p-4 bg-[#090A0F] border-t border-slate-800 space-y-3">
                  {/* Comments List */}
                  {post.comments && post.comments.length > 0 ? (
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="flex items-start gap-2.5 text-xs">
                          <img
                            src={comment.authorAvatar}
                            alt={comment.authorName}
                            className="w-7 h-7 rounded-full object-cover border border-slate-700 mt-0.5"
                          />
                          <div className="flex-1 bg-[#11121A] p-2.5 rounded-xl border border-slate-800">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-white">
                                {comment.authorName}
                              </span>
                              <span className="text-[10px] text-slate-500">
                                {comment.createdAt}
                              </span>
                            </div>
                            <p className="text-slate-300 mt-1">
                              {comment.content}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic text-center py-2">
                      No comments yet. Be the first to reply!
                    </p>
                  )}

                  {/* Comment Input */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                    <input
                      type="text"
                      placeholder="Write a constructive comment..."
                      value={commentInputs[post.id] || ''}
                      onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddCommentSubmit(post.id)}
                      className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 focus:outline-none focus:border-blue-500 text-white placeholder-slate-500"
                      id={`input-comment-${post.id}`}
                    />
                    <button
                      onClick={() => handleAddCommentSubmit(post.id)}
                      className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors shadow-xs"
                      id={`btn-send-comment-${post.id}`}
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </article>
          ))
        )}
      </div>
    </div>
  );
};
