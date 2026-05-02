"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  isAdmin?: boolean;
};

export default function Header({ isAdmin = false }: Props) {
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#05070A]/80 backdrop-blur-xl px-6 py-4">
      <div className="mx-auto max-w-7xl flex justify-between items-center">
        
        {/* LEFT: Branding */}
        <div className="flex items-center gap-3">
          <div className="group relative">
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 opacity-70 blur transition duration-500 group-hover:opacity-100" />
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-black font-black italic tracking-tighter text-white">
              C
            </div>
          </div>
          <h1 className="font-bold text-lg tracking-tight text-white">
            ClubManager
          </h1>

          {isAdmin && (
            <span className="ml-2 text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-amber-400 to-orange-500 text-black px-2 py-0.5 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.3)]">
              Admin
            </span>
          )}
        </div>

        {/* RIGHT: Navigation & Profile */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => (window.location.href = isAdmin ? "/admin/events" : "/dashboard")}
              className="text-xs font-bold uppercase tracking-widest text-slate-400 transition-colors hover:text-white"
            >
              Events
            </button>

            {isAdmin && (
              <button
                onClick={() => (window.location.href = "/admin")}
                className="text-xs font-bold uppercase tracking-widest text-slate-400 transition-colors hover:text-white"
              >
                Create Event
              </button>
            )}
          </nav>

          {!isAdmin && (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="group relative flex items-center justify-center rounded-full bg-white/5 px-5 py-2 text-xs font-black uppercase tracking-[0.15em] text-white transition-all hover:bg-white/10 ring-1 ring-white/10 active:scale-95"
              >
                Profile
              </button>

            {/* DROPDOWN WITH ANIMATION */}
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-4 w-48 overflow-hidden rounded-2xl border border-white/10 bg-[#0D1117] p-2 shadow-2xl shadow-black"
                >
                  <div className="px-4 py-2 border-b border-white/5 mb-1">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Account</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center rounded-xl px-4 py-2.5 text-sm font-bold text-red-400 transition-all hover:bg-red-500/10"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}