"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function AdminPage() {
  const [title, setTitle] = useState("Club Meeting");
  const [description, setDescription] = useState("Monthly club meeting to discuss upcoming events");
  const [date, setDate] = useState("2026-05-15T14:30");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async () => {
    if (!title.trim() || !date) {
      alert("Please fill in title and date");
      return;
    }

    setIsSubmitting(true);
    const eventDate = new Date(date);
    
    if (isNaN(eventDate.getTime())) {
      alert("Please enter a valid date");
      setIsSubmitting(false);
      return;
    }

    const { error } = await supabase.from("events").insert([
      {
        title: title.trim(),
        description: description.trim(),
        date: eventDate.toISOString(),
      },
    ]);

    if (error) {
      alert("Error creating event: " + error.message);
    } else {
      alert("Event created successfully!");
      setTitle("");
      setDescription("");
      setDate("");
    }
    setIsSubmitting(false);
  };

  return (
    <main className="relative min-h-screen w-full bg-[#05070A] text-white overflow-x-hidden">
      {/* Background Decorative Element */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute bottom-[-10%] left-[-5%] h-[500px] w-[500px] rounded-full bg-fuchsia-500/10 blur-[120px]" />
      </div>

      <Header isAdmin={true} />

      <div className="relative z-10 mx-auto max-w-2xl px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[3rem] border border-white/5 bg-[#0A0C10] p-10 md:p-16 shadow-2xl"
        >
          <header className="mb-10">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-400 mb-3">Management Console</p>
            <h1 className="text-4xl font-black tracking-tighter">Create New <span className="italic bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">Event</span></h1>
          </header>

          <div className="space-y-6">
            {/* Title Input */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2 mb-2 block">Event Title</label>
              <input
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-slate-600"
                placeholder="Enter event name..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Date Input */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2 mb-2 block">Date & Time</label>
              <input
                type="datetime-local"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-indigo-500/50 transition-all text-slate-300 [color-scheme:dark]"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <button
              onClick={handleCreate}
              disabled={isSubmitting}
              className="w-full py-5 rounded-2xl bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:bg-indigo-500 hover:text-white active:scale-[0.98] disabled:opacity-50 mt-4 shadow-xl shadow-white/5"
            >
              {isSubmitting ? "Generating Event..." : "Deploy Event to Portal"}
            </button>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}