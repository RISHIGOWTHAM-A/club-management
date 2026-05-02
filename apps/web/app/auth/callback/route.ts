import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const cookieStore = await cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    })
    await supabase.auth.exchangeCodeForSession(code)

    // Check if profile exists for this user
    const { data: { session } } = await supabase.auth.getSession()

    if (session?.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('id, role')
        .eq('id', session.user.id)
        .single()

      if (!profile) {
        // First time Google login — create profile
        await supabase.from('profiles').insert([
          {
            id: session.user.id,
            email: session.user.email,
            role: session.user.email === 'arishigowtham@gmail.com' ? 'admin' : 'member',
          },
        ])
        // New user → signup page
        return NextResponse.redirect(`${origin}/signup`)
      }

      // Existing user → admin or dashboard based on role
      const redirectUrl = profile.role === 'admin' ? `${origin}/admin` : `${origin}/dashboard`
      return NextResponse.redirect(redirectUrl)
    }
  }

  // Fallback → login
  return NextResponse.redirect(`${origin}/login`)
}