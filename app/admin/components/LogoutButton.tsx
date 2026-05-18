'use client'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    await supabase.auth.signOut()
    document.cookie = 'sb-access-token=; path=/; max-age=0'
    router.push('/login')
  }

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-md border border-border text-muted hover:text-red-400 hover:border-red-900/60 transition text-sm"
    >
      Odhlásiť
    </button>
  )
}
