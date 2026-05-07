import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(request: Request) {
  try {
    const { email, password, username } = await request.json()

    if (!email || !password || !username) {
      return NextResponse.json({ error: 'Email, password, and username are required' }, { status: 400 })
    }

    // 1. Create the user with admin API (confirmed)
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { username }
    })

    if (authError) throw authError

    if (authData.user) {
      // 2. Create profile record (same as in signup page)
      const { error: profileError } = await supabaseAdmin.from("profiles").insert({
        id: authData.user.id,
        username: username,
        display_name: username,
        is_published: false,
      });

      if (profileError) {
        console.error("Profile creation error:", profileError);
        // User is already created in Auth, so we continue
      }
    }

    return NextResponse.json({ message: 'Account created and confirmed successfully.' })
  } catch (error: any) {
    console.error('Signup bypass error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
