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
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })
    setLoading(false)
    if (error || !data.session) {
      setError('Nesprávny email alebo heslo.')
    } else {
      const token = data.session.access_token
      const maxAge = data.session.expires_in ?? 3600
      document.cookie = `sb-access-token=${token}; path=/; max-age=${maxAge}; SameSite=Lax`
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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="122.5 40.5 349.5 338" aria-label="Zajo Reality" style={{ height: '72px', width: 'auto', display: 'block', margin: '0 auto 16px' }}>
            <path fill="#F59E0B" fillRule="nonzero" d="M 213.902344 332.1875 L 208.460938 316.855469 L 208.460938 313.875 L 213.296875 313.875 L 213.296875 303.425781 L 207.078125 303.425781 L 207.078125 332.1875 L 202.152344 332.1875 L 202.152344 299.191406 L 215.238281 299.191406 C 217.226562 299.191406 218.21875 300.199219 218.21875 302.214844 L 218.21875 314.222656 C 218.21875 316.179688 217.242188 317.1875 215.28125 317.242188 L 213.597656 317.242188 L 219.039062 332.011719 L 219.039062 332.1875 Z M 267.386719 209.125 C 267.734375 209.109375 268.03125 209.375 268.042969 209.714844 C 268.054688 210.050781 267.78125 210.335938 267.429688 210.351562 C 267.082031 210.363281 266.785156 210.101562 266.773438 209.761719 C 266.761719 209.421875 267.035156 209.136719 267.386719 209.125 Z M 358.402344 126.726562 L 358.402344 150.214844 L 339.746094 150.214844 L 339.746094 118.546875 Z M 241.382812 140.777344 L 241.382812 133.183594 L 325.867188 105.765625 L 325.867188 195.519531 L 331.015625 200.339844 L 331.015625 105.789062 L 388.21875 130.9375 L 388.21875 150.214844 L 411.976562 150.214844 L 406.828125 145.066406 L 393.367188 145.066406 L 393.367188 127.582031 L 328.59375 99.105469 L 236.234375 129.722656 L 236.234375 145.066406 L 187.726562 145.066406 L 182.574219 150.214844 L 236.234375 150.214844 L 236.234375 173.890625 L 241.382812 169.066406 Z M 221.429688 123.277344 L 329.339844 86.871094 L 408.171875 121.503906 L 408.171875 127.414062 L 329.253906 92.742188 L 221.429688 129.117188 Z M 169.167969 266.0625 L 201.410156 175.671875 L 169.167969 175.671875 L 169.167969 158.816406 L 223.664062 158.816406 L 223.664062 169.617188 L 188.808594 266.988281 L 235.488281 266.988281 L 256.503906 158.652344 L 276.140625 158.652344 L 283.703125 197.902344 C 280.9375 199.058594 278.148438 201.65625 276.808594 202.691406 C 278.421875 200.613281 280.992188 194.976562 279.191406 191.539062 C 275.621094 193.355469 273.230469 202.980469 270.585938 206.042969 C 268.609375 207.613281 265.808594 204.691406 260.921875 211.851562 C 260.429688 212.570312 260.683594 212.796875 261.179688 213.578125 C 262.265625 215.28125 263.316406 214.582031 264.90625 216.070312 C 264.296875 218.074219 262.609375 218.542969 261.011719 219.921875 C 252.933594 226.894531 254.433594 234.078125 253.289062 235.867188 C 253.054688 236.234375 251.019531 237.011719 250.625 238.511719 C 250.125 240.421875 250.980469 241.140625 252.171875 241.476562 C 252.671875 241.621094 253.230469 241.699219 253.777344 241.757812 C 254.519531 241.839844 254.84375 242.019531 255.167969 241.71875 C 255.296875 241.597656 255.429688 241.402344 255.585938 241.089844 C 255.832031 240.601562 255.949219 240.054688 255.964844 239.410156 C 256.027344 239.253906 256.101562 239.292969 256.1875 239.410156 C 256.351562 240.140625 256.335938 240.8125 256.101562 241.375 C 256.058594 241.476562 256.011719 241.574219 255.957031 241.664062 C 255.761719 242.082031 255.941406 242.238281 256.160156 242.363281 C 256.246094 242.410156 256.332031 242.460938 256.414062 242.511719 C 257.253906 243.003906 257.421875 243.175781 259.207031 243.300781 C 262.386719 243.527344 276.296875 243.21875 278.292969 241.933594 C 278.179688 238.867188 276.003906 239.132812 273.1875 238.175781 C 273.378906 235.988281 274.015625 234.304688 272.714844 231.957031 C 272 230.664062 270.765625 229.695312 268.972656 229.253906 C 267.941406 229.003906 267.867188 228.210938 269.132812 228.578125 C 270.058594 228.847656 270.8125 229.214844 271.4375 229.695312 C 273.035156 230.921875 273.179688 232.402344 274.421875 233.894531 C 275.980469 235.765625 278.046875 234.421875 276.652344 232.277344 C 276.457031 231.972656 276.25 231.722656 276.152344 231.582031 C 275.378906 230.460938 274.726562 229.613281 274.21875 228.875 C 273.046875 227.179688 272.621094 226.058594 273.140625 223.476562 C 273.5625 218.667969 273.984375 213.859375 274.402344 209.046875 C 275.707031 207.957031 281.519531 205.253906 284.390625 201.46875 L 300.199219 283.519531 L 300.199219 283.84375 L 281.707031 283.84375 L 277.941406 260.117188 L 254.539062 260.117188 L 250.777344 283.84375 L 169.167969 283.84375 Z M 425.382812 271.960938 C 425.382812 275.667969 424.402344 278.507812 422.4375 280.46875 C 420.472656 282.433594 417.691406 283.414062 414.089844 283.414062 L 373.503906 283.414062 C 366.085938 283.414062 362.378906 279.597656 362.378906 271.960938 L 362.378906 169.84375 C 362.378906 162.207031 366.085938 158.386719 373.503906 158.386719 L 414.089844 158.386719 C 417.691406 158.386719 420.472656 159.371094 422.4375 161.332031 C 424.402344 163.296875 425.382812 166.132812 425.382812 169.84375 Z M 406.726562 174.425781 L 381.035156 174.425781 L 381.035156 267.378906 L 406.726562 267.378906 Z M 358.402344 272.390625 C 358.402344 280.027344 354.582031 283.84375 346.945312 283.84375 L 311.433594 283.84375 C 307.835938 283.84375 305.054688 282.863281 303.089844 280.898438 C 301.125 278.9375 300.144531 276.097656 300.144531 272.390625 L 300.144531 244.078125 L 318.800781 244.078125 L 318.800781 267.808594 L 339.746094 267.808594 L 339.746094 158.816406 L 358.402344 158.816406 Z M 234.550781 332.1875 L 234.550781 299.191406 L 248.113281 299.191406 L 248.113281 303.554688 L 239.476562 303.554688 L 239.476562 313.183594 L 246.902344 313.183594 L 246.902344 317.460938 L 239.476562 317.460938 L 239.476562 327.824219 L 248.242188 327.824219 L 248.242188 332.1875 Z M 275.933594 332.1875 L 274.941406 325.925781 L 268.765625 325.925781 L 267.769531 332.1875 L 262.890625 332.1875 L 262.890625 332.101562 L 269.28125 299.148438 L 274.464844 299.148438 L 280.8125 332.101562 L 280.8125 332.1875 Z M 271.832031 306.792969 L 269.414062 321.691406 L 274.25 321.691406 Z M 296.066406 332.1875 L 296.066406 299.191406 L 300.988281 299.191406 L 300.988281 327.78125 L 309.023438 327.78125 L 309.023438 332.1875 Z M 324.535156 332.1875 L 324.535156 299.191406 L 329.457031 299.191406 L 329.457031 332.1875 Z M 354.902344 303.554688 L 354.902344 332.1875 L 349.980469 332.1875 L 349.980469 303.554688 L 344.582031 303.554688 L 344.582031 299.191406 L 360.34375 299.191406 L 360.34375 303.554688 Z M 385.878906 320.050781 L 385.878906 332.1875 L 380.910156 332.1875 L 380.910156 320.050781 L 374.390625 299.367188 L 374.390625 299.191406 L 379.484375 299.191406 L 383.414062 313.53125 L 387.34375 299.191406 L 392.398438 299.191406 L 392.398438 299.367188 Z" />
          </svg>
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
