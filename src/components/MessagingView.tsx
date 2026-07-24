import React, { useState } from 'react';
import { 
  Send, 
  Code2, 
  Paperclip, 
  Smile, 
  Search, 
  Mic, 
  Play, 
  Pause, 
  CheckCheck, 
  MoreVertical,
  FileCode,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MessagingView: React.FC = () => {
  const { conversations, activeConversationId, setActiveConversationId, messages, sendMessage, userProfile } = useApp();

  const [messageInput, setMessageInput] = useState('');
  const [includeCode, setIncludeCode] = useState(false);
  const [codeLanguage, setCodeLanguage] = useState('java');
  const [codeContent, setCodeContent] = useState('');
  const [isPlayingAudioId, setIsPlayingAudioId] = useState<string | null>(null);

  const activeConv = conversations.find(c => c.id === activeConversationId) || conversations[0];
  const activeMessageList = activeConversationId ? messages[activeConversationId] || [] : [];

  const handleSendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeConv) return;
    if (!messageInput.trim() && !codeContent.trim()) return;

    sendMessage(
      activeConv.id, 
      messageInput, 
      includeCode && codeContent.trim() ? { language: codeLanguage, code: codeContent } : undefined
    );

    setMessageInput('');
    setCodeContent('');
    setIncludeCode(false);
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="bg-[#11121A] rounded-2xl border border-slate-800 shadow-xl overflow-hidden h-[600px] flex">
        {/* Left Sidebar: Conversations List */}
        <div className="w-80 border-r border-slate-800 flex flex-col shrink-0 bg-[#090A0F]">
          <div className="p-4 border-b border-slate-800">
            <h3 className="font-extrabold text-base text-white">
              TechHub Direct Chat
            </h3>
            <div className="relative mt-2">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search messages or contacts..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
            {conversations.map((conv) => {
              const isActive = conv.id === activeConversationId;
              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConversationId(conv.id)}
                  className={`p-3.5 flex items-center gap-3 cursor-pointer transition-all ${
                    isActive
                      ? 'bg-blue-600/10 border-l-4 border-blue-500 text-white'
                      : 'hover:bg-slate-900 text-slate-300'
                  }`}
                  id={`btn-chat-conv-${conv.id}`}
                >
                  <div className="relative">
                    <img
                      src={conv.participantAvatar}
                      alt={conv.participantName}
                      className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-700"
                    />
                    {conv.isOnline && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#090A0F]"></span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-white truncate">
                        {conv.participantName}
                      </h4>
                      <span className="text-[10px] text-slate-500">
                        {conv.lastMessageTime}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      {conv.lastMessage}
                    </p>
                  </div>

                  {conv.unreadCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Area: Chat Window */}
        {activeConv ? (
          <div className="flex-1 flex flex-col bg-[#11121A]">
            {/* Chat Top Bar */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={activeConv.participantAvatar}
                  alt={activeConv.participantName}
                  className="w-9 h-9 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <h4 className="font-bold text-sm text-white">
                    {activeConv.participantName}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {activeConv.participantHeadline}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <button className="p-1.5 hover:text-white rounded-lg">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#090A0F]/50">
              {activeMessageList.map((msg) => {
                const isMe = msg.senderId === userProfile.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col max-w-[80%] ${isMe ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                  >
                    <div
                      className={`p-3 rounded-2xl text-xs space-y-2 shadow-sm ${
                        isMe
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-[#11121A] border border-slate-800 text-slate-200 rounded-bl-none'
                      }`}
                    >
                      {msg.content && <p className="leading-relaxed">{msg.content}</p>}

                      {/* Code Snippet in Chat */}
                      {msg.codeSnippet && (
                        <div className="rounded-xl overflow-hidden bg-[#090A0F] text-cyan-300 font-mono text-[11px] p-2.5 border border-slate-800">
                          <div className="text-[9px] uppercase text-cyan-500 font-bold mb-1">
                            {msg.codeSnippet.language}
                          </div>
                          <pre className="overflow-x-auto">
                            <code>{msg.codeSnippet.code}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                    <span className="text-[9px] text-slate-500 mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Code Attachment Drawer */}
            {includeCode && (
              <div className="p-3 bg-slate-900 border-t border-slate-800 text-xs space-y-2">
                <div className="flex items-center justify-between text-cyan-400 font-bold">
                  <span className="flex items-center gap-1">
                    <FileCode className="w-4 h-4" /> Code Attachment
                  </span>
                  <button onClick={() => setIncludeCode(false)}>
                    <X className="w-4 h-4 text-slate-400 hover:text-white" />
                  </button>
                </div>
                <textarea
                  rows={3}
                  placeholder="// Paste Java / SQL code block..."
                  value={codeContent}
                  onChange={(e) => setCodeContent(e.target.value)}
                  className="w-full p-2.5 bg-[#090A0F] text-cyan-300 font-mono rounded-xl border border-slate-800 text-xs focus:outline-none"
                />
              </div>
            )}

            {/* Chat Input Bar */}
            <form onSubmit={handleSendSubmit} className="p-3 border-t border-slate-800 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIncludeCode(!includeCode)}
                className={`p-2 rounded-xl text-xs font-semibold transition-colors ${
                  includeCode ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:bg-slate-800'
                }`}
                title="Attach Code Snippet"
                id="btn-chat-attach-code"
              >
                <Code2 className="w-4 h-4" />
              </button>

              <input
                type="text"
                placeholder="Type a message or code sample..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                id="input-chat-message"
              />

              <button
                type="submit"
                className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-md transition-colors"
                id="btn-chat-send"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};
