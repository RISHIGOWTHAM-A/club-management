"use client"

import { useState } from "react";
import { supabase } from "../../lib/supabase";

const handleSignup = async (email: string, password: string, setSuccess: (v: boolean) => void) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    alert(error.message)
    return
  }

  if (data.user) {
    await supabase.from('profiles').insert([
      {
        id: data.user.id,
        email: data.user.email,
        role: data.user.email === "arishigowtham@gmail.com" ? "admin" : "member",
      },
    ])
  }

  setSuccess(true)
  setTimeout(() => {
    setSuccess(false)
    window.location.href = '/login'
  }, 2000)
}

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState(false)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSignup(email, password, setSuccess)
  }

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0D1117] font-sans">

      {/* ── BACKGROUND ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(139,92,246,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.8) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-violet-700/15 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-fuchsia-700/10 blur-[100px]" />
        <div className="absolute top-1/2 right-0 h-[300px] w-[300px] rounded-full bg-cyan-600/8 blur-[90px]" />
      </div>

      {/* ── SUCCESS OVERLAY ── */}
      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D1117]/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-5 rounded-3xl border border-emerald-500/20 bg-[#161B27] px-14 py-12 shadow-2xl shadow-black/50">
            {/* animated check circle */}
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 ring-2 ring-emerald-500/30">
              <svg className="h-10 w-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-xl font-black tracking-tight text-white">Signup Successful!</p>
              <p className="mt-1.5 text-sm text-slate-400">Welcome to ClubManager 🎉</p>
            </div>
            {/* progress bar */}
            <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                style={{ animation: 'progress 2s linear forwards' }}
              />
            </div>
          </div>
          <style>{`
            @keyframes progress {
              from { width: 0% }
              to   { width: 100% }
            }
          `}</style>
        </div>
      )}

      {/* ── CARD ── */}
      <div className="relative z-10 w-full max-w-md px-4">

        {/* badge */}
        <div className="mb-6 flex justify-center">
          <div className="flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-400" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-300">
              Join ClubManager
            </span>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#161B27] shadow-2xl shadow-black/40">

          {/* gradient top strip */}
          <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500" />

          <div className="px-8 py-10">

            {/* header */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/25">
                <span className="text-lg font-black text-white">C</span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white">Create your account</h2>
              <p className="mt-1.5 text-sm text-slate-400">
                Already have one?{' '}
                <a href="/login" className="font-semibold text-violet-400 transition-colors hover:text-violet-300">
                  Sign in
                </a>
              </p>
            </div>

            {/* fields */}
            <div className="space-y-4">

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">
                  Email Address
                </label>
                <div className="group relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base text-slate-500 group-focus-within:text-violet-400">
                    ✉️
                  </span>
                  <input
                    placeholder="Email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/[0.08] bg-[#0D1117] py-3 pl-10 pr-4 text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">
                  Password
                </label>
                <div className="group relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base text-slate-500 group-focus-within:text-violet-400">
                    🔒
                  </span>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-white/[0.08] bg-[#0D1117] py-3 pl-10 pr-4 text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={() => handleSignup(email, password, setSuccess)}
                className="group relative mt-2 w-full overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-600/25 transition-all hover:scale-[1.02] hover:shadow-violet-500/40 active:scale-95"
              >
                <span className="relative z-10">Sign Up</span>
                <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-violet-600 opacity-0 transition-opacity group-hover:opacity-100" />
              </button>

            </div>
          </div>

          {/* bottom strip */}
          <div className="border-t border-white/[0.05] bg-[#0D1117]/60 px-8 py-4">
            <p className="text-center text-[11px] text-slate-600">
              🔐 &nbsp;Secured with end-to-end encryption via Supabase Auth
            </p>
          </div>

        </div>

        <p className="mt-6 text-center text-[11px] text-slate-600">
          Protected by ClubManager · &copy; 2026
        </p>
      </div>
    </main>
  )
}