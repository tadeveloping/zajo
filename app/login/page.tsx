'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
  .split(',')
  .map(e => e.trim().toLowerCase())
  .filter(Boolean)

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'forbidden'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = email.trim().toLowerCase()

    if (!trimmed) {
      setStatus('error')
      setErrorMsg('Zadajte emailovú adresu')
      return
    }

    // Check whitelist client-side (not a security measure — just UX)
    if (ADMIN_EMAILS.length > 0 && !ADMIN_EMAILS.includes(trimmed)) {
      setStatus('forbidden')
      return
    }

    setStatus('loading')
    const origin = window.location.origin
    const { error } = await supabase.auth.signInWithOtp({
      email: trimmed,
      options: {
        emailRedirectTo: `${origin}/admin`,
      },
    })

    if (error) {
      setStatus('error')
      setErrorMsg(error.message)
    } else {
      setStatus('success')
    }
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
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ color: '#E8711A', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '6px' }}>
            ZAJO Reality
          </div>
          <h1 style={{ color: '#F2EDE7', fontSize: '24px', fontWeight: 700, margin: 0 }}>
            Admin prístup
          </h1>
        </div>

        {/* Card */}
        <div style={{
          background: '#141210',
          border: '1px solid #332F2A',
          borderRadius: '16px',
          padding: '32px',
        }}>
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{
                width: '56px', height: '56px',
                background: 'rgba(232,113,26,0.15)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '24px',
              }}>
                ✉️
              </div>
              <h2 style={{ color: '#F2EDE7', fontSize: '18px', fontWeight: 700, marginBottom: '10px' }}>
                Skontrolujte email
              </h2>
              <p style={{ color: '#8A8279', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                Poslali sme vám prihlasovací odkaz na adresu&nbsp;
                <strong style={{ color: '#C4B9A8' }}>{email}</strong>.
                Kliknite na odkaz v emaily na prihlásenie.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  color: '#8A8279',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                }}>
                  E-mailová adresa
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setStatus('idle') }}
                  placeholder="vas@email.sk"
                  autoComplete="email"
                  autoFocus
                  style={{
                    width: '100%',
                    background: '#1E1C19',
                    border: status === 'forbidden' || status === 'error' ? '1.5px solid #ef4444' : '1.5px solid #332F2A',
                    borderRadius: '10px',
                    padding: '12px 14px',
                    color: '#F2EDE7',
                    fontSize: '15px',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
                {status === 'forbidden' && (
                  <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '8px', marginBottom: 0 }}>
                    Nemáte prístup k admin sekcii.
                  </p>
                )}
                {status === 'error' && (
                  <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '8px', marginBottom: 0 }}>
                    {errorMsg || 'Nastala chyba. Skúste znova.'}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  width: '100%',
                  background: status === 'loading' ? '#b05a14' : '#E8711A',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '13px 24px',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  transition: 'background 150ms',
                }}
              >
                {status === 'loading' ? 'Odosielam…' : 'Poslať magic link'}
              </button>

              <p style={{
                color: '#8A8279',
                fontSize: '12px',
                textAlign: 'center',
                marginTop: '16px',
                marginBottom: 0,
                lineHeight: 1.5,
              }}>
                Na váš email pošleme odkaz na jednorazové prihlásenie.
                Heslo nepotrebujete.
              </p>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
