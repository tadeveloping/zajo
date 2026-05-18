'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Mode = 'login' | 'forgot' | 'forgot-sent'

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })
    setLoading(false)
    if (error) {
      setError('Nesprávny email alebo heslo.')
    } else {
      window.location.href = '/admin'
    }
  }

  async function handleForgot(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/admin`,
    })
    setLoading(false)
    if (error) {
      setError('Nepodarilo sa odoslať email. Skúste znova.')
    } else {
      setMode('forgot-sent')
    }
  }

  const inputStyle = (hasError?: boolean): React.CSSProperties => ({
    width: '100%',
    background: '#1E1C19',
    border: `1.5px solid ${hasError ? '#ef4444' : '#332F2A'}`,
    borderRadius: '10px',
    padding: '12px 14px',
    color: '#F2EDE7',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  })

  const labelStyle: React.CSSProperties = {
    display: 'block',
    color: '#8A8279',
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    marginBottom: '8px',
  }

  return (
    <main style={{
      minHeight: '100dvh',
      background: '#0D0B09',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      padding: '24px',
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ color: '#E8711A', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '6px' }}>
            ZAJO Reality
          </div>
          <h1 style={{ color: '#F2EDE7', fontSize: '24px', fontWeight: 700, margin: 0 }}>
            {mode === 'login' ? 'Admin prístup' : 'Obnovenie hesla'}
          </h1>
        </div>

        <div style={{
          background: '#141210',
          border: '1px solid #332F2A',
          borderRadius: '16px',
          padding: '32px',
        }}>

          {/* ── FORGOT SENT ── */}
          {mode === 'forgot-sent' ? (
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <div style={{
                width: '56px', height: '56px',
                background: 'rgba(232,113,26,0.15)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '24px',
              }}>✉️</div>
              <h2 style={{ color: '#F2EDE7', fontSize: '18px', fontWeight: 700, marginBottom: '10px' }}>
                Skontrolujte email
              </h2>
              <p style={{ color: '#8A8279', fontSize: '14px', lineHeight: 1.6, margin: '0 0 20px' }}>
                Poslali sme odkaz na obnovenie hesla na adresu{' '}
                <strong style={{ color: '#C4B9A8' }}>{email}</strong>.
              </p>
              <button onClick={() => setMode('login')} style={{
                background: 'none', border: 'none', color: '#E8711A',
                fontSize: '14px', cursor: 'pointer', fontWeight: 600,
              }}>
                ← Späť na prihlásenie
              </button>
            </div>

          ) : mode === 'forgot' ? (
            /* ── FORGOT FORM ── */
            <form onSubmit={handleForgot} noValidate>
              <p style={{ color: '#8A8279', fontSize: '14px', lineHeight: 1.6, margin: '0 0 20px' }}>
                Zadajte váš email a pošleme vám odkaz na nastavenie nového hesla.
              </p>
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>E-mailová adresa</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError('') }}
                  placeholder="vas@email.sk"
                  autoComplete="email"
                  autoFocus
                  style={inputStyle(!!error)}
                />
                {error && <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '8px', marginBottom: 0 }}>{error}</p>}
              </div>
              <button type="submit" disabled={loading} style={{
                width: '100%',
                background: loading ? '#b05a14' : '#E8711A',
                color: '#fff', border: 'none', borderRadius: '10px',
                padding: '13px 24px', fontSize: '15px', fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}>
                {loading ? 'Odosielam…' : 'Poslať odkaz na obnovenie'}
              </button>
              <div style={{ textAlign: 'center', marginTop: '16px' }}>
                <button type="button" onClick={() => { setMode('login'); setError('') }} style={{
                  background: 'none', border: 'none', color: '#8A8279',
                  fontSize: '13px', cursor: 'pointer',
                }}>
                  ← Späť na prihlásenie
                </button>
              </div>
            </form>

          ) : (
            /* ── LOGIN FORM ── */
            <form onSubmit={handleLogin} noValidate>
              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>E-mailová adresa</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError('') }}
                  placeholder="vas@email.sk"
                  autoComplete="email"
                  autoFocus
                  style={inputStyle(!!error)}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Heslo</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError('') }}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  style={inputStyle(!!error)}
                />
                {error && <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '8px', marginBottom: 0 }}>{error}</p>}
              </div>
              <button type="submit" disabled={loading} style={{
                width: '100%',
                background: loading ? '#b05a14' : '#E8711A',
                color: '#fff', border: 'none', borderRadius: '10px',
                padding: '13px 24px', fontSize: '15px', fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}>
                {loading ? 'Prihlasujem…' : 'Prihlásiť sa'}
              </button>
              <div style={{ textAlign: 'center', marginTop: '16px' }}>
                <button type="button" onClick={() => { setMode('forgot'); setError('') }} style={{
                  background: 'none', border: 'none', color: '#8A8279',
                  fontSize: '13px', cursor: 'pointer', textDecoration: 'underline',
                }}>
                  Zabudli ste heslo?
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
