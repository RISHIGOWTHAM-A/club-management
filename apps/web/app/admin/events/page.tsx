"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useEventStore } from "../../../store/eventStore";
import { supabase } from "../../../lib/supabase";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { motion, AnimatePresence } from "framer-motion";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  created_at: string;
  rsvp_count: number;
  rsvps: any[];
}

export default function AdminEventsPage() {
  const router = useRouter();
  const {
    title,
    description,
    date,
    isSubmitting,
    error,
    setField,
    createEvent,
  } = useEventStore();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const { data: eventsData, error: eventsError } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: false });

      if (eventsError) throw eventsError;

      const eventsWithRsvps = await Promise.all(
        (eventsData || []).map(async (event) => {
          const { count: rsvpCount } = await supabase
            .from("rsvps")
            .select("*", { count: "exact", head: true })
            .eq("event_id", event.id);

          const { data: rsvps } = await supabase
            .from("rsvps")
            .select("*")
            .eq("event_id", event.id)
            .order("created_at", { ascending: false });

          return {
            ...event,
            rsvp_count: rsvpCount || 0,
            rsvps: rsvps || [],
          };
        })
      );

      setEvents(eventsWithRsvps);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId: number) => {
    if (!confirm("Are you sure you want to delete this event? This cannot be undone.")) return;

    const { error } = await supabase.from("events").delete().eq("id", eventId);

    if (error) {
      alert("Error: " + error.message);
    } else {
      fetchEvents();
      router.push("/admin");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-[#05070A] text-white overflow-x-hidden">
      {/* Decorative Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-violet-600/10 blur-[120px]" />
      </div>

      <Header isAdmin={true} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-400 mb-3">Authority Suite</p>
            <h1 className="text-5xl font-black tracking-tighter">Event <span className="italic bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">Control</span></h1>
          </div>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/admin"
            className="px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-white/5"
          >
            + Create New Event
          </motion.a>
        </header>

        {/* Create Event Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[3rem] border border-white/5 bg-[#0A0C10] p-10 md:p-16 shadow-2xl mb-16"
        >
          <header className="mb-10">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-400 mb-3">Quick Create</p>
            <h2 className="text-4xl font-black tracking-tighter">Create New <span className="italic bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">Event</span></h2>
          </header>

          <div className="space-y-6">
            {/* Title Input */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2 mb-2 block">Event Title</label>
              <input
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-slate-600"
                placeholder="Enter event name..."
                value={title}
                onChange={(e) => setField("title", e.target.value)}
              />
            </div>

            {/* Description Input */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2 mb-2 block">Description</label>
              <textarea
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-slate-600 resize-none"
                placeholder="Describe the event details..."
                value={description}
                onChange={(e) => setField("description", e.target.value)}
              />
            </div>

            {/* Date Input */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2 mb-2 block">Date & Time</label>
              <input
                type="datetime-local"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-indigo-500/50 transition-all text-slate-300 [color-scheme:dark]"
                value={date}
                onChange={(e) => setField("date", e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              onClick={createEvent}
              disabled={isSubmitting}
              className="w-full py-5 rounded-2xl bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:bg-indigo-500 hover:text-white active:scale-[0.98] disabled:opacity-50 mt-4 shadow-xl shadow-white/5"
            >
              {isSubmitting ? "Generating Event..." : "Deploy Event to Portal"}
            </button>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full" />
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-32 rounded-[3rem] border border-white/5 bg-[#0A0C10]">
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-6">No events found in database</p>
            <a href="/admin" className="text-indigo-400 font-black text-[10px] uppercase tracking-widest underline decoration-2 underline-offset-8">Initialize First Event</a>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Stats Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: "Active Events", val: events.length, color: "text-indigo-400" },
                { label: "Total RSVPs", val: events.reduce((s, e) => s + e.rsvp_count, 0), color: "text-fuchsia-400" },
                { label: "Live Reach", val: events.filter(e => new Date(e.date) > new Date()).length, color: "text-emerald-400" }
              ].map((stat, i) => (
                <div key={i} className="bg-[#0A0C10] border border-white/5 p-8 rounded-[2.5rem]">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{stat.label}</p>
                  <p className={`text-4xl font-black tracking-tighter ${stat.color}`}>{stat.val}</p>
                </div>
              ))}
            </div>

            {/* Managed Events List */}
            <div className="grid grid-cols-1 gap-6">
              {events.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative bg-[#0A0C10] border border-white/5 rounded-[3rem] p-8 md:p-12 hover:border-indigo-500/30 transition-all overflow-hidden"
                >
                  <div className="flex flex-col lg:flex-row gap-10">
                    {/* Info Side */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-widest border border-indigo-500/20">
                          ID: #{event.id}
                        </span>
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                          {new Date(event.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <h2 className="text-3xl font-black tracking-tighter mb-4 group-hover:text-indigo-400 transition-colors">{event.title}</h2>
                      <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-2xl">{event.description}</p>
                      
                      <div className="flex flex-wrap gap-6 text-[10px] font-black uppercase tracking-widest">
                        <div className="flex items-center gap-2 text-slate-400">
                          <span className="text-lg">📅</span> {new Date(event.date).toLocaleString([], { dateStyle: 'long', timeStyle: 'short' })}
                        </div>
                        <div className="flex items-center gap-2 text-indigo-400">
                          <span className="text-lg">👥</span> {event.rsvp_count} Registered Attendees
                        </div>
                      </div>
                    </div>

                    {/* Actions & Attendees Side */}
                    <div className="w-full lg:w-80 flex flex-col gap-6">
                      <div className="flex gap-3">
                        <a href={`/admin?edit=${event.id}`} className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center hover:bg-white/10 transition-all">Edit</a>
                        <button onClick={() => handleDeleteEvent(event.id)} className="flex-1 py-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500 hover:text-white transition-all">Delete</button>
                      </div>

                      <div className="flex-1 bg-black/40 rounded-[2rem] border border-white/5 p-6 overflow-hidden">
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">Live Attendee List</p>
                        <div className="space-y-3 max-h-[120px] overflow-y-auto pr-2 custom-scrollbar">
                          {event.rsvps.length > 0 ? (
                            event.rsvps.map((rsvp) => (
                              <div key={rsvp.id} className="flex justify-between items-center text-[10px] py-1 border-b border-white/5 last:border-0">
                                <span className="font-bold truncate max-w-[120px]">{rsvp.user_email}</span>
                                <span className="text-slate-600 font-mono italic text-[8px]">
                                  {new Date(rsvp.created_at).toLocaleDateString()}
                                </span>
                              </div>
                            ))
                          ) : (
                            <p className="text-[9px] italic text-slate-700 py-4">No registrations yet</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.2);
          border-radius: 10px;
        }
      `}</style>
    </main>
  );
}