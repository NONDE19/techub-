import React, { useState } from 'react';
import { CalendarDays, MapPin, Clock, Users, Bookmark, ExternalLink, Plus, Sparkles, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const EventsView: React.FC = () => {
  const { events, toggleAttendEvent, toggleSaveEvent } = useApp();

  const [selectedType, setSelectedType] = useState('All');

  const types = ['All', 'Hackathon', 'Webinar', 'Conference', 'Workshop'];

  const filteredEvents = events.filter((e) => selectedType === 'All' || e.type === selectedType);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#11121A] to-slate-900 border border-slate-800 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <CalendarDays className="w-4 h-4" />
            <span>Tech Events & Hackathons</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight">
            Hackathons & Conferences
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-lg">
            Compete in national hackathons, attend tech webinars, connect with founders, and level up your skills.
          </p>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
              selectedType === t
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'bg-[#11121A] text-slate-300 border border-slate-800 hover:bg-slate-800'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="space-y-5">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="bg-[#11121A] rounded-2xl border border-slate-800 shadow-sm overflow-hidden flex flex-col md:flex-row hover:border-slate-700 transition-all"
          >
            <div className="md:w-72 h-48 md:h-auto relative bg-[#090A0F] shrink-0">
              <img
                src={evt.coverImage}
                alt={evt.title}
                className="w-full h-full object-cover opacity-90"
              />
              <span className="absolute top-3 left-3 px-3 py-1 text-[10px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 rounded-lg shadow-md">
                {evt.type}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{evt.date} • {evt.time}</span>
                </div>

                <h3 className="text-lg font-black text-white">
                  {evt.title}
                </h3>

                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{evt.location}</span>
                </div>

                <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                  {evt.description}
                </p>

                {/* Tag Badges */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {evt.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] font-semibold bg-slate-900 text-slate-400 border border-slate-800 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">
                  {evt.attendeesCount} Attending
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleSaveEvent(evt.id)}
                    className={`p-2 rounded-xl transition-colors ${
                      evt.isSaved ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20' : 'text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${evt.isSaved ? 'fill-amber-400' : ''}`} />
                  </button>

                  {evt.link && (
                    <a
                      href={evt.link}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800"
                      title="Event Page"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}

                  <button
                    onClick={() => toggleAttendEvent(evt.id)}
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                      evt.isAttending
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md'
                    }`}
                    id={`btn-rsvp-event-${evt.id}`}
                  >
                    {evt.isAttending ? (
                      <span className="flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Attending
                      </span>
                    ) : (
                      'RSVP / Join'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
