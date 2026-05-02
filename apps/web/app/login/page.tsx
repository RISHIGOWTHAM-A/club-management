"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    // For demo, if admin email, redirect directly to admin
    if (email === 'arishigowtham@gmail.com') {
      router.push('/admin')
      setLoading(false)
      return
    }
    // Normal sign in flow for other emails
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      alert(error.message)
    } else {
      // Fetch user profile to determine role
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single()
        if (profile) {
          router.push(profile.role === 'admin' ? '/admin' : '/dashboard')
        } else {
          // New user - create profile and redirect to dashboard
          await supabase.from('profiles').insert([
            {
              id: session.user.id,
              email: session.user.email,
              role: 'member',
            },
          ])
          router.push('/dashboard')
        }
      }
    }
  }

  const handleGoogleLogin = async () => {
    setGoogleLoading(true)

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      console.error(error)
      setGoogleLoading(false)
    }
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
        <div className="absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full bg-violet-700/15 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-fuchsia-700/10 blur-[100px]" />
        <div className="absolute top-1/2 left-0 h-[300px] w-[300px] rounded-full bg-cyan-600/8 blur-[90px]" />
      </div>

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
              Welcome Back
            </span>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#161B27] shadow-2xl shadow-black/40">

          {/* gradient top strip */}
          <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500" />

          <div className="px-8 py-10">

            {/* header */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/25">
                <span className="text-lg font-black text-white">C</span>
              </div>
              <h1 className="text-2xl font-black tracking-tight text-white">Sign in to ClubManager</h1>
              <p className="mt-1.5 text-sm text-slate-400">
                Don't have an account?{' '}
                <a href="/signup" className="font-semibold text-violet-400 transition-colors hover:text-violet-300">
                  Create one free
                </a>
              </p>
            </div>

            {/* Google OAuth */}
            <button
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="mb-6 flex w-full items-center justify-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] py-3 text-sm font-semibold text-slate-300 transition-all hover:border-white/15 hover:bg-white/[0.07] disabled:opacity-60"
            >
              {googleLoading ? (
                <>
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Redirecting…
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Continue with Google
                </>
              )}
            </button>

            {/* divider */}
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/[0.06]" />
              <span className="text-[11px] font-semibold text-slate-600">or sign in with email</span>
              <div className="h-px flex-1 bg-white/[0.06]" />
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
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/[0.08] bg-[#0D1117] py-3 pl-10 pr-4 text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">
                    Password
                  </label>
                  <a href="/forgot-password" className="text-[11px] font-semibold text-violet-400 transition-colors hover:text-violet-300">
                    Forgot password?
                  </a>
                </div>
                <div className="group relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base text-slate-500 group-focus-within:text-violet-400">
                    🔒
                  </span>
                  <input
                    type="password"
                    placeholder="Your password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-white/[0.08] bg-[#0D1117] py-3 pl-10 pr-4 text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
                  />
                </div>
              </div>

              {/* Remember me */}
              <label className="flex cursor-pointer items-center gap-3 pt-1">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-violet-500/40 bg-violet-500/10">
                  <div className="h-2 w-2 rounded-sm bg-violet-400" />
                </div>
                <span className="text-xs text-slate-400">Remember me for 30 days</span>
              </label>

              {/* Submit */}
              <a
                role="button"
                onClick={handleLogin}
                className="group relative mt-2 w-full overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-600/25 transition-all hover:scale-[1.02] hover:shadow-violet-500/40 active:scale-95 disabled:opacity-60 inline-block text-center"
                style={{ pointerEvents: loading ? 'none' : 'auto' }}
              >
                <span className="relative z-10">
                  {loading ? 'Signing in…' : 'Sign In'}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-violet-600 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>

            </div>
          </div>

          {/* bottom strip — security note */}
          <div className="border-t border-white/[0.05] bg-[#0D1117]/60 px-8 py-4">
            <p className="text-center text-[11px] text-slate-600">
              🔐 &nbsp;Secured with end-to-end encryption via Supabase Auth
            </p>
          </div>

        </div>

        {/* footer note */}
        <p className="mt-6 text-center text-[11px] text-slate-600">
          Protected by ClubManager · &copy; 2026
        </p>
      </div>
    </main>
  )
}