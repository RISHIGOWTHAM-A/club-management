"use client";
import React from 'react';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#0D1117] font-sans text-white selection:bg-violet-500/30">

      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(139,92,246,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.8) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute -top-60 left-1/4 h-[600px] w-[600px] rounded-full bg-violet-700/15 blur-[130px]" />
        <div className="absolute top-[40%] right-0 h-[400px] w-[400px] rounded-full bg-cyan-600/10 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-fuchsia-700/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* ── NAVBAR ── */}
        <nav className="flex items-center justify-between border-b border-white/[0.06] py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/25">
              <span className="text-sm font-black text-white">C</span>
            </div>
            <h1 className="text-base font-bold tracking-tight text-white">ClubManager</h1>
          </div>
          <div className="hidden items-center gap-4 md:flex">
            <a href="/login" className="rounded-lg border border-violet-500/40 bg-violet-500/15 px-5 py-2 text-sm font-semibold text-violet-200 transition-all hover:bg-violet-500/25 hover:text-white">
              Login
            </a>
            <a href="/signup" className="rounded-lg border border-violet-500/40 bg-violet-500/15 px-5 py-2 text-sm font-semibold text-violet-200 transition-all hover:bg-violet-500/25 hover:text-white">
              Sign Up
            </a>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="flex flex-col items-center py-20 text-center">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-400" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-300">
              Next-Gen Community Platform
            </span>
          </div>

          <h1 className="max-w-4xl text-5xl font-black leading-[1.08] tracking-tighter text-white md:text-[4.5rem]">
            Manage Your Club
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              Like a Pro 🚀
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-slate-400">
            Create events, manage members, track RSVPs in real-time using Supabase.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <button className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-10 py-3.5 text-sm font-bold text-white shadow-xl shadow-violet-600/25 transition-all hover:scale-[1.03] active:scale-95">
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-violet-600 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
            <button className="rounded-xl border border-white/10 bg-white/5 px-10 py-3.5 text-sm font-bold text-slate-200 transition-all hover:border-white/20 hover:bg-white/10 active:scale-95">
              Live Demo
            </button>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="grid grid-cols-1 gap-4 pb-20 sm:grid-cols-3">
          {(
            [
              ['10K+', 'Active Members', 'from-violet-500 to-fuchsia-500'],
              ['500+', 'Events Hosted', 'from-cyan-400 to-blue-500'],
              ['99%', 'Satisfaction', 'from-fuchsia-500 to-pink-500'],
            ] as [string, string, string][]
          ).map(([val, label, grad]) => (
            <div
              key={label}
              className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#161B27] p-8 transition-all hover:border-violet-500/30"
            >
              <div className={`absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-gradient-to-br ${grad} opacity-[0.07] blur-lg`} />
              <div className={`mb-4 h-[3px] w-10 rounded-full bg-gradient-to-r ${grad}`} />
              <h2 className="text-4xl font-black text-white">{val}</h2>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">{label}</p>
            </div>
          ))}
        </section>

        {/* ── FEATURES ── */}
        <section className="py-20">
          <div className="mb-14 text-center">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-violet-400">What We Offer</p>
            <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">Features</h2>
            <div className="mx-auto mt-3 h-px w-16 bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {(
              [
                ['📅', 'Event Creation', 'Admins can create and manage events easily'],
                ['👥', 'Member Login', 'Secure login for all members'],
                ['✅', 'RSVP System', 'One-click RSVP for events'],
                ['⚡', 'Realtime Updates', 'Live RSVP updates using Supabase'],
                ['📊', 'Dashboard', 'Track attendance & analytics'],
                ['🔔', 'Notifications', 'Get alerts for upcoming events'],
              ] as [string, string, string][]
            ).map(([icon, title, desc], i) => (
              <div
                key={i}
                className="group rounded-2xl border border-white/[0.08] bg-[#161B27] p-6 transition-all hover:border-violet-500/35 hover:bg-[#1A1F2E]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#0D1117] text-xl ring-1 ring-white/10 group-hover:ring-violet-500/30">
                  {icon}
                </div>
                <h3 className="mb-1.5 text-sm font-bold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#161B27] p-10 md:p-16">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-violet-600/8 blur-[80px]" />
          <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-cyan-500/8 blur-[80px]" />

          <div className="relative mb-12 text-center">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-400">Simple Process</p>
            <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">How It Works</h2>
            <div className="mx-auto mt-3 h-px w-16 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          </div>

          <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-[18px] top-10 hidden h-[calc(100%-4rem)] w-px bg-gradient-to-b from-violet-500/30 via-cyan-500/20 to-transparent md:block" />
            <div className="space-y-8">
              {(
                [
                  ['Admin creates an event', 'Set up title, date, time, and capacity in seconds.'],
                  ['Members view event list or calendar', 'A clean dashboard shows all upcoming events at a glance.'],
                  ['Users RSVP to events', 'One click confirms attendance instantly.'],
                  ['Realtime updates sync instantly', 'Supabase Realtime pushes updates to every connected user live.'],
                ] as [string, string][]
              ).map((step, i) => (
                <div key={i} className="group relative flex items-start gap-5">
                  <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-violet-500/30 bg-[#0D1117] text-sm font-bold text-violet-300 transition-all group-hover:border-violet-400 group-hover:text-white">
                    {i + 1}
                  </div>
                  <div className="pt-1.5">
                    <p className="text-sm font-bold text-white">{step[0]}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-400">{step[1]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LIVE RSVP ── */}
        <section className="py-24">
          <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#161B27]">
            <div className="border-b border-white/[0.06] px-10 py-8 text-center">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-400">Powered by Supabase</p>
              <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">Live RSVP Tracking ⚡</h2>
              <p className="mt-2 text-sm italic text-slate-400">
                Watch members join instantly — powered by Supabase Realtime
              </p>
            </div>
            <div className="mx-auto max-w-md px-10 py-8">
              {(['John', 'Priya', 'Arjun'] as string[]).map((name, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-white/[0.05] py-4 last:border-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20 text-xs font-bold text-violet-200 ring-1 ring-violet-500/20">
                      {name[0]}
                    </div>
                    <span className="text-sm font-semibold text-white">{name}</span>
                  </div>
                  <span className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                    Confirmed
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="grid gap-4 pb-20 md:grid-cols-3">
          {(
            [
              'This app made managing events super easy!',
              'Realtime RSVP feature is 🔥',
              'Perfect for college clubs and communities',
            ] as string[]
          ).map((text, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/[0.08] bg-[#161B27] p-7 transition-all hover:border-violet-500/25"
            >
              <div className="mb-3 text-3xl font-black leading-none text-violet-500/40">"</div>
              <p className="text-sm italic leading-relaxed text-slate-300">"{text}"</p>
            </div>
          ))}
        </section>

        {/* ── ROLES ── */}
        <section className="py-20">
          <div className="mb-14 text-center">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-fuchsia-400">Access Levels</p>
            <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">Roles</h2>
            <div className="mx-auto mt-3 h-px w-16 bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent" />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {(
              [
                ['Admin', 'Create & manage events', true],
                ['Member', 'View & RSVP to events', false],
                ['Guest', 'View limited event details', false],
              ] as [string, string, boolean][]
            ).map(([role, desc, featured], i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-2xl border p-8 transition-all hover:-translate-y-1 ${
                  featured
                    ? 'border-violet-500/40 bg-gradient-to-br from-violet-600/20 to-fuchsia-600/10'
                    : 'border-white/[0.08] bg-[#161B27] hover:border-white/15'
                }`}
              >
                {featured && (
                  <span className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-white shadow-lg shadow-violet-500/20">
                    Popular
                  </span>
                )}
                <h3 className="mb-2 text-xl font-black uppercase tracking-tight text-white">{role}</h3>
                <p className="text-sm text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-700 via-fuchsia-700 to-violet-900 px-10 py-24 text-center shadow-2xl shadow-violet-900/40">
            <div className="absolute -left-12 -top-12 h-56 w-56 rounded-full bg-violet-400/10 blur-[60px]" />
            <div className="absolute -bottom-12 -right-12 h-56 w-56 rounded-full bg-cyan-400/10 blur-[60px]" />
            <div className="relative">
              <h2 className="text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
                Start Managing Your <br /> Club Today
              </h2>
              <button className="relative mt-12 rounded-2xl bg-white/95 px-12 py-4 text-sm font-black uppercase tracking-widest text-violet-700 shadow-xl transition-all hover:scale-105 hover:bg-white active:scale-95">
                Create Club
              </button>
            </div>
          </div>
        </section>

        <footer className="py-12 text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-600">
          &copy; 2026 ClubManager // All Rights Reserved
        </footer>
      </div>
    </main>
  );
}

