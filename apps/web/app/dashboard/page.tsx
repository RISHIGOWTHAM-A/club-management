"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";

export default function Dashboard() {
  const [events, setEvents] = useState<any[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);

  const [activeScanner, setActiveScanner] = useState<string | null>(null);
  const [activeLink, setActiveLink] = useState<string | null>(null);

  const fetchEvents = async () => {
    const { data: eventsData, error: eventsError } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true });

    if (eventsError) {
      console.error("Error fetching events:", eventsError);
      return;
    }
    setEvents(eventsData || []);
  };

  // Central registration logic used by all methods
  const handleRegister = async (eventId: string) => {
    setLoadingId(eventId);
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      alert("Authentication required. Please login.");
      setLoadingId(null);
      return;
    }

    const { error } = await supabase.from("rsvps").insert([
      {
        event_id: eventId,
        user_id: userData.user.id,
        user_email: userData.user.email,
      },
    ]);

    if (error) {
      alert("Already registered for this event.");
    } else {
      // Close any open modals and show the big success overlay
      setActiveScanner(null);
      setActiveLink(null);
      setSuccessId(eventId);
      
      // Keep success message visible for 3 seconds
      setTimeout(() => setSuccessId(null), 3000);
      fetchEvents();
    }
    setLoadingId(null);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-[#05070A] text-white overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] h-[600px] w-[600px] rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      <Header isAdmin={false} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <header className="mb-16 text-center md:text-left">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-400 mb-3">Verified Access</p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter">Event <span className="bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent italic">Gateway</span></h1>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="group relative flex flex-col justify-between aspect-square rounded-[3rem] border border-white/5 bg-[#0A0C10] p-10 transition-all hover:border-indigo-500/40"
            >
              {/* 1. SUCCESS OVERLAY (Shows after any register action) */}
              <AnimatePresence>
                {successId === event.id && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 flex flex-col items-center justify-center rounded-[3rem] bg-indigo-600 backdrop-blur-xl"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="h-20 w-20 rounded-full bg-white flex items-center justify-center text-indigo-600 text-4xl mb-4 shadow-2xl"
                    >
                      ✓
                    </motion.div>
                    <p className="font-black uppercase tracking-[0.3em] text-white text-[10px]">Registration Successful</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 2. QR SCANNER INTERFACE */}
              <AnimatePresence>
                {activeScanner === event.id && (
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="absolute inset-0 z-40 bg-black/95 p-8 flex flex-col items-center justify-center rounded-[3rem]">
                    <div className="relative p-4 bg-white rounded-2xl mb-8">
                      <QRCodeSVG
                        value={`${window.location.origin}/register/${event.id}`}
                        size={150}
                        level="H"
                      />
                      <motion.div 
                        animate={{ y: [0, 150, 0] }} 
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }} 
                        className="absolute left-0 right-0 h-1 bg-indigo-500 shadow-[0_0_15px_indigo]" 
                      />
                    </div>
                    <button 
                      onClick={() => handleRegister(event.id)} 
                      className="w-full py-4 bg-indigo-600 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl active:scale-95 transition-transform"
                    >
                      Scan to Register
                    </button>
                    <button onClick={() => setActiveScanner(null)} className="mt-4 text-[10px] text-slate-500 uppercase font-black tracking-widest">Cancel</button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 3. SECURE LINK INTERFACE */}
              <AnimatePresence>
                {activeLink === event.id && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="absolute inset-0 z-40 bg-[#0D1117] p-8 flex flex-col items-center justify-center rounded-[3rem]">
                    <div className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl mb-6 truncate text-[10px] text-indigo-300 font-mono text-center">
                        {`${window.location.origin}/register/${event.id}`}
                    </div>
                    <button 
                        onClick={() => {
                            const shareUrl = `${window.location.origin}/register/${event.id}`;
                            navigator.clipboard.writeText(shareUrl);
                            handleRegister(event.id); // Triggers success after "copying"
                        }} 
                        className="w-full py-4 bg-white text-black font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-xl active:scale-95 transition-transform"
                    >
                      Copy Link & Join
                    </button>
                    <button onClick={() => setActiveLink(null)} className="mt-4 text-[10px] text-slate-500 uppercase font-black tracking-widest">Close</button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CARD CONTENT */}
              <div className="relative">
                <div className="flex justify-between items-center mb-8">
                  <div className="h-1.5 w-10 bg-indigo-500/40 rounded-full" />
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">
                    Member Pass
                  </span>
                </div>
                <h2 className="text-3xl font-black leading-none tracking-tighter mb-4 group-hover:text-indigo-400 transition-colors">
                  {event.title}
                </h2>
                <p className="text-sm text-slate-400 font-medium line-clamp-2 leading-relaxed">
                  {event.description}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 py-5 border-y border-white/5">
                   <div className="text-2xl">📅</div>
                   <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Event Date</p>
                    <p className="text-xs font-bold">{new Date(event.date).toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}</p>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setActiveScanner(event.id)}
                    className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-white/5 border border-white/10 py-5 hover:bg-white/10 transition-all active:scale-95"
                  >
                    <span className="text-xs font-black text-indigo-400">QR</span>
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Scanner</span>
                  </button>

                  <button 
                    onClick={() => setActiveLink(event.id)}
                    className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-indigo-600/5 border border-indigo-500/10 py-5 hover:bg-indigo-600/10 transition-all active:scale-95"
                  >
                    <span className="text-xl">🔗</span>
                    <span className="text-[8px] font-black uppercase tracking-widest text-indigo-400">Secure Link</span>
                  </button>
                </div>

                <button
                  onClick={() => handleRegister(event.id)}
                  className="w-full py-4 rounded-2xl bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:bg-indigo-500 hover:text-white"
                >
                  Quick Register
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}