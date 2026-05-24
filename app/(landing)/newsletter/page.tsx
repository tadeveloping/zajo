'use client'
import { useState } from 'react'

export default function NewsletterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [gdpr, setGdpr] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [gdprError, setGdprError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  function validateEmail(v: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setEmailError('')
    setGdprError('')

    if (!validateEmail(email)) {
      setEmailError('Zadajte platnú e-mailovú adresu')
      return
    }
    if (!gdpr) {
      setGdprError('Toto pole je povinné')
      return
    }

    setLoading(true)
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      })
    } catch {}
    setLoading(false)
    setDone(true)
  }

  return (
    <>
      <style>{`
        :root {
          --navy: #0F172A; --gold: #F59E0B; --gold-dark: #D97706;
          --gold-light: #FEF3C7; --white: #FFFFFF; --gray-50: #F8FAFC;
          --gray-400: #94A3B8; --gray-600: #475569; --gray-700: #334155;
          --green: #059669;
        }
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family:'Inter',system-ui,sans-serif; background:var(--white); color:var(--navy); -webkit-font-smoothing:antialiased; overflow-x:hidden; }
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;600;700&display=swap');
      `}</style>

      <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#fff', minHeight: '100vh', color: '#0F172A' }}>
        {/* Hero */}
        <section style={{
          background: 'linear-gradient(160deg,#060E1A 0%,#0F172A 55%,#1a2744 100%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', padding: '48px 24px 80px', textAlign: 'center',
          position: 'relative',
        }}>
          {/* Logo */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="122.5 40.5 349.5 338" style={{ height: 56, width: 'auto', marginBottom: 24 }}>
            <path fill="#F59E0B" fillRule="nonzero" d="M 213.902344 332.1875 L 208.460938 316.855469 L 208.460938 313.875 L 213.296875 313.875 L 213.296875 303.425781 L 207.078125 303.425781 L 207.078125 332.1875 L 202.152344 332.1875 L 202.152344 299.191406 L 215.238281 299.191406 C 217.226562 299.191406 218.21875 300.199219 218.21875 302.214844 L 218.21875 314.222656 C 218.21875 316.179688 217.242188 317.1875 215.28125 317.242188 L 213.597656 317.242188 L 219.039062 332.011719 L 219.039062 332.1875 Z M 358.402344 126.726562 L 358.402344 150.214844 L 339.746094 150.214844 L 339.746094 118.546875 Z M 241.382812 140.777344 L 241.382812 133.183594 L 325.867188 105.765625 L 325.867188 195.519531 L 331.015625 200.339844 L 331.015625 105.789062 L 388.21875 130.9375 L 388.21875 150.214844 L 411.976562 150.214844 L 406.828125 145.066406 L 393.367188 145.066406 L 393.367188 127.582031 L 328.59375 99.105469 L 236.234375 129.722656 L 236.234375 145.066406 L 187.726562 145.066406 L 182.574219 150.214844 L 236.234375 150.214844 L 236.234375 173.890625 L 241.382812 169.066406 Z M 169.167969 266.0625 L 201.410156 175.671875 L 169.167969 175.671875 L 169.167969 158.816406 L 223.664062 158.816406 L 223.664062 169.617188 L 188.808594 266.988281 L 235.488281 266.988281 L 256.503906 158.652344 L 276.140625 158.652344 L 284.390625 201.46875 L 300.199219 283.519531 L 300.199219 283.84375 L 281.707031 283.84375 L 277.941406 260.117188 L 254.539062 260.117188 L 250.777344 283.84375 L 169.167969 283.84375 Z M 425.382812 271.960938 C 425.382812 275.667969 424.402344 278.507812 422.4375 280.46875 C 420.472656 282.433594 417.691406 283.414062 414.089844 283.414062 L 373.503906 283.414062 C 366.085938 283.414062 362.378906 279.597656 362.378906 271.960938 L 362.378906 169.84375 C 362.378906 162.207031 366.085938 158.386719 373.503906 158.386719 L 414.089844 158.386719 C 417.691406 158.386719 420.472656 159.371094 422.4375 161.332031 C 424.402344 163.296875 425.382812 166.132812 425.382812 169.84375 Z M 406.726562 174.425781 L 381.035156 174.425781 L 381.035156 267.378906 L 406.726562 267.378906 Z M 358.402344 272.390625 C 358.402344 280.027344 354.582031 283.84375 346.945312 283.84375 L 311.433594 283.84375 C 307.835938 283.84375 305.054688 282.863281 303.089844 280.898438 C 301.125 278.9375 300.144531 276.097656 300.144531 272.390625 L 300.144531 244.078125 L 318.800781 244.078125 L 318.800781 267.808594 L 339.746094 267.808594 L 339.746094 158.816406 L 358.402344 158.816406 Z" />
          </svg>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(245,158,11,0.14)', border: '1px solid rgba(245,158,11,0.3)',
            color: '#F59E0B', fontSize: 11, fontWeight: 700,
            padding: '5px 14px', borderRadius: 99, textTransform: 'uppercase', letterSpacing: '0.06em',
            marginBottom: 14,
          }}>
            📬 Novinky do e-mailu
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(1.6rem, 4.5vw, 2.8rem)', fontWeight: 700, color: '#fff',
            lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: 700, margin: '0 auto 16px',
          }}>
            Najlepšie ponuky <span style={{ color: '#F59E0B' }}>skôr ako ostatní.</span>
          </h1>

          <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.62)', maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.55 }}>
            Byty, domy a pozemky v Trenčianskom kraji, priamo do vášho e-mailu, skôr ako sa objavia inde.
          </p>

          {/* Signup card */}
          <div style={{
            background: '#fff', borderRadius: 20, padding: '24px 32px 28px',
            boxShadow: '0 24px 80px rgba(0,0,0,0.45)', maxWidth: 480, width: '100%',
            position: 'relative', zIndex: 2,
          }}>
            {done ? (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <div style={{
                  width: 64, height: 64, background: '#D1FAE5', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px',
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.4rem', color: '#0F172A', marginBottom: 8 }}>Ste prihlásený!</h3>
                <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6 }}>Skvelé rozhodnutie. Budete prvý, kto sa dozvie o najlepších ponukách v Trenčianskom kraji.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div style={{ marginBottom: 12 }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: 5, letterSpacing: '0.02em' }}>
                    Krstné meno
                  </label>
                  <input
                    type="text" value={name} onChange={e => setName(e.target.value)}
                    placeholder="Ján" autoComplete="given-name"
                    style={{ width: '100%', fontFamily: 'inherit', fontSize: '0.9rem', color: '#0F172A', background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: 9, padding: '11px 14px', outline: 'none' }}
                  />
                </div>

                <div style={{ marginBottom: 12 }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: 5, letterSpacing: '0.02em' }}>
                    E-mailová adresa *
                  </label>
                  <input
                    type="email" value={email} onChange={e => { setEmail(e.target.value); setEmailError('') }}
                    placeholder="jan@email.sk" autoComplete="email"
                    style={{ width: '100%', fontFamily: 'inherit', fontSize: '0.9rem', color: '#0F172A', background: '#F8FAFC', border: `1.5px solid ${emailError ? '#EF4444' : '#E2E8F0'}`, borderRadius: 9, padding: '11px 14px', outline: 'none' }}
                  />
                  {emailError && <p style={{ fontSize: '0.72rem', color: '#EF4444', marginTop: 4 }}>{emailError}</p>}
                </div>

                <div style={{ marginTop: 12, marginBottom: 16 }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, cursor: 'pointer' }}>
                    <input
                      type="checkbox" checked={gdpr} onChange={e => { setGdpr(e.target.checked); setGdprError('') }}
                      style={{ marginTop: 2, flexShrink: 0, width: 14, height: 14 }}
                    />
                    <span style={{ fontSize: '0.68rem', fontWeight: 300, color: '#94A3B8', lineHeight: 1.4 }}>
                      Súhlasím so spracovaním osobných údajov
                    </span>
                  </label>
                  {gdprError && <p style={{ fontSize: '0.68rem', color: '#EF4444', marginTop: 4 }}>{gdprError}</p>}
                </div>

                <button
                  type="submit" disabled={loading}
                  style={{
                    width: '100%', background: '#F59E0B', color: '#0F172A',
                    fontFamily: 'inherit', fontSize: '1rem', fontWeight: 700,
                    padding: '14px 24px', border: 'none', borderRadius: 12, cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: loading ? 0.65 : 1,
                  }}
                >
                  {loading ? 'Prihlasujem…' : 'Prihlásiť sa zadarmo →'}
                </button>

                <p style={{ textAlign: 'center', fontSize: '0.7rem', color: '#94A3B8', marginTop: 10 }}>
                  🔒 Spam nenávidíme rovnako ako vy. Odber kedykoľvek zrušíte.
                </p>
              </form>
            )}
          </div>
        </section>

        {/* Why section */}
        <section style={{ padding: '64px 24px', background: '#fff' }}>
          <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#F59E0B', marginBottom: 12 }}>Prečo sa prihlásiť</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 700, color: '#0F172A', marginBottom: 40 }}>Výhody odberu</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              {[
                { icon: '⏱️', title: 'Skôr ako ostatní', desc: 'Niektoré ponuky posielame odberateľom ešte pred zverejnením na portáloch.' },
                { icon: '📊', title: 'Trendy trhu', desc: 'Prehľad vývoja cien v lokalitách Trenčianskeho kraja.' },
                { icon: '📭', title: 'Bez spamu', desc: 'Len to najlepšie. Odber zrušíte kedykoľvek jedným klikom.' },
              ].map(item => (
                <div key={item.title} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, padding: 20, textAlign: 'left' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: 12 }}>{item.icon}</div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0F172A', marginBottom: 4 }}>{item.title}</h3>
                  <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer style={{ background: '#0F172A', color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '26px 24px', fontSize: '0.78rem' }}>
          <p>© 2025 Zajo Reality · <a href="mailto:info@zajoreality.sk" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>info@zajoreality.sk</a></p>
        </footer>
      </div>
    </>
  )
}
