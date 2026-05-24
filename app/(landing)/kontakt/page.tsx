'use client'
import { useState } from 'react'

const ORANGE = '#E8711A'
const DARK = '#0D0B09'
const TEXT = '#F2EDE7'
const MUTED = '#8A8279'
const BORDER = '#332F2A'

const CHIP_STYLE = (selected: boolean) => ({
  padding: '8px 16px', borderRadius: 99,
  border: `1.5px solid ${selected ? ORANGE : BORDER}`,
  background: selected ? 'rgba(232,113,26,0.12)' : 'transparent',
  color: selected ? ORANGE : '#C4B9A8',
  fontFamily: 'inherit', fontSize: '0.85rem', fontWeight: 600,
  cursor: 'pointer', transition: 'all 0.15s ease',
})

const OPTION_STYLE = (selected: boolean) => ({
  padding: '14px 16px', borderRadius: 12,
  border: `1.5px solid ${selected ? ORANGE : BORDER}`,
  background: selected ? 'rgba(232,113,26,0.1)' : 'rgba(255,255,255,0.03)',
  color: selected ? TEXT : '#C4B9A8',
  fontFamily: 'inherit', fontSize: '0.9rem', fontWeight: 600,
  cursor: 'pointer', textAlign: 'left' as const,
  transition: 'all 0.15s ease', width: '100%', display: 'flex', alignItems: 'center', gap: 12,
})

const INPUT_STYLE = {
  width: '100%', fontFamily: 'inherit', fontSize: '0.9rem', color: TEXT,
  background: 'rgba(255,255,255,0.04)', border: `1.5px solid ${BORDER}`, borderRadius: 10,
  padding: '12px 14px', outline: 'none',
}

export default function KontaktPage() {
  const [step, setStep] = useState(1)
  const [zaujem, setZaujem] = useState('')
  const [property, setProperty] = useState('')
  const [timeline, setTimeline] = useState('')
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [callback, setCallback] = useState('')
  const [gdpr, setGdpr] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const INTEREST_OPTIONS = [
    { value: 'kúpa', icon: '🔑', label: 'Kúpa nehnuteľnosti', desc: 'Hľadám byt, dom alebo pozemok' },
    { value: 'predaj', icon: '🏷️', label: 'Predaj nehnuteľnosti', desc: 'Chcem predať svoju nehnuteľnosť' },
    { value: 'ocenenie', icon: '📊', label: 'Ocenenie nehnuteľnosti', desc: 'Zistiť trhovú hodnotu' },
    { value: 'iné', icon: '💬', label: 'Iné', desc: 'Mám inú otázku alebo dopyt' },
  ]

  const PROPERTY_OPTIONS = [
    { value: 'byt', icon: '🏢', label: 'Byt' },
    { value: 'dom', icon: '🏠', label: 'Dom' },
    { value: 'pozemok', icon: '🌿', label: 'Pozemok' },
    { value: 'iné', icon: '🏗️', label: 'Iné' },
  ]

  function goStep2() {
    if (!zaujem) { setErrors({ zaujem: 'Vyberte záujem' }); return }
    setErrors({})
    setStep(2)
  }

  function goStep3() {
    setErrors({})
    setStep(3)
  }

  function goStep4() {
    setErrors({})
    setStep(4)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs: Record<string, string> = {}
    if (!name.trim()) errs.name = 'Vyplňte meno'
    if (!phone.trim()) errs.phone = 'Vyplňte telefón'
    if (!gdpr) errs.gdpr = 'Toto pole je povinné'
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    try {
      const res = await fetch('/api/leads/cally', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || null,
          zaujem: zaujem || null,
          nehnutelnost: property || null,
          horizont: timeline || null,
          sprava: message.trim() || null,
          zavolame: callback === 'dnes' || callback === 'zajtra',
          score: zaujem === 'kúpa' || zaujem === 'predaj' ? 'WARM' : 'COLD',
          source: 'landing_page',
        }),
      })
      if (!res.ok) {
        setErrors({ submit: 'Nastala chyba, skúste znova.' })
        setLoading(false)
        return
      }
    } catch {
      setErrors({ submit: 'Nastala chyba, skúste znova.' })
      setLoading(false)
      return
    }
    setLoading(false)
    setDone(true)
  }

  const steps = 4
  const progressPct = (step / steps) * 100

  return (
    <div style={{ fontFamily: "'Manrope', 'Segoe UI', system-ui, sans-serif", background: DARK, minHeight: '100vh', color: TEXT, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Header */}
      <header style={{ width: '100%', borderBottom: `1px solid ${BORDER}`, padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="122.5 40.5 349.5 338" style={{ height: 40, width: 'auto' }}>
          <path fill={ORANGE} fillRule="nonzero" d="M 213.902344 332.1875 L 208.460938 316.855469 L 208.460938 313.875 L 213.296875 313.875 L 213.296875 303.425781 L 207.078125 303.425781 L 207.078125 332.1875 L 202.152344 332.1875 L 202.152344 299.191406 L 215.238281 299.191406 C 217.226562 299.191406 218.21875 300.199219 218.21875 302.214844 L 218.21875 314.222656 C 218.21875 316.179688 217.242188 317.1875 215.28125 317.242188 L 213.597656 317.242188 L 219.039062 332.011719 L 219.039062 332.1875 Z M 358.402344 126.726562 L 358.402344 150.214844 L 339.746094 150.214844 L 339.746094 118.546875 Z M 241.382812 140.777344 L 241.382812 133.183594 L 325.867188 105.765625 L 325.867188 195.519531 L 331.015625 200.339844 L 331.015625 105.789062 L 388.21875 130.9375 L 388.21875 150.214844 L 411.976562 150.214844 L 406.828125 145.066406 L 393.367188 145.066406 L 393.367188 127.582031 L 328.59375 99.105469 L 236.234375 129.722656 L 236.234375 145.066406 L 187.726562 145.066406 L 182.574219 150.214844 L 236.234375 150.214844 L 236.234375 173.890625 L 241.382812 169.066406 Z M 169.167969 266.0625 L 201.410156 175.671875 L 169.167969 175.671875 L 169.167969 158.816406 L 223.664062 158.816406 L 223.664062 169.617188 L 188.808594 266.988281 L 235.488281 266.988281 L 256.503906 158.652344 L 276.140625 158.652344 L 284.390625 201.46875 L 300.199219 283.519531 L 300.199219 283.84375 L 281.707031 283.84375 L 277.941406 260.117188 L 254.539062 260.117188 L 250.777344 283.84375 L 169.167969 283.84375 Z M 425.382812 271.960938 C 425.382812 275.667969 424.402344 278.507812 422.4375 280.46875 C 420.472656 282.433594 417.691406 283.414062 414.089844 283.414062 L 373.503906 283.414062 C 366.085938 283.414062 362.378906 279.597656 362.378906 271.960938 L 362.378906 169.84375 C 362.378906 162.207031 366.085938 158.386719 373.503906 158.386719 L 414.089844 158.386719 C 417.691406 158.386719 420.472656 159.371094 422.4375 161.332031 C 424.402344 163.296875 425.382812 166.132812 425.382812 169.84375 Z M 406.726562 174.425781 L 381.035156 174.425781 L 381.035156 267.378906 L 406.726562 267.378906 Z M 358.402344 272.390625 C 358.402344 280.027344 354.582031 283.84375 346.945312 283.84375 L 311.433594 283.84375 C 307.835938 283.84375 305.054688 282.863281 303.089844 280.898438 C 301.125 278.9375 300.144531 276.097656 300.144531 272.390625 L 300.144531 244.078125 L 318.800781 244.078125 L 318.800781 267.808594 L 339.746094 267.808594 L 339.746094 158.816406 L 358.402344 158.816406 Z" />
        </svg>
      </header>

      <main style={{ maxWidth: 520, width: '100%', padding: '40px 24px 60px' }}>
        {done ? (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <div style={{ width: 72, height: 72, background: 'rgba(92,184,92,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', border: '2px solid rgba(92,184,92,0.3)' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#5CB85C" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 12 }}>Žiadosť odoslaná!</h2>
            <p style={{ fontSize: '0.9rem', color: MUTED, lineHeight: 1.6 }}>Ozveme sa vám čo najskôr. Ďakujeme za váš záujem.</p>
          </div>
        ) : (
          <div>
            {/* Progress */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 32 }}>
              {Array.from({ length: steps }, (_, i) => (
                <div key={i} style={{ flex: 1, height: 3, borderRadius: 99, background: i < step ? ORANGE : BORDER, transition: 'background 0.3s ease' }} />
              ))}
            </div>

            {/* Step 1: Interest */}
            {step === 1 && (
              <div>
                <h1 style={{ fontSize: 'clamp(1.3rem,3vw,1.8rem)', fontWeight: 800, marginBottom: 8 }}>O čo máte záujem?</h1>
                <p style={{ fontSize: '0.85rem', color: MUTED, marginBottom: 24 }}>Krok 1 z 4</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {INTEREST_OPTIONS.map(opt => (
                    <button key={opt.value} type="button" onClick={() => { setZaujem(opt.value); setErrors({}) }} style={OPTION_STYLE(zaujem === opt.value)}>
                      <span style={{ fontSize: '1.4rem' }}>{opt.icon}</span>
                      <div>
                        <div style={{ fontWeight: 700 }}>{opt.label}</div>
                        <div style={{ fontSize: '0.78rem', color: MUTED, fontWeight: 400 }}>{opt.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
                {errors.zaujem && <p style={{ fontSize: '0.72rem', color: '#ef4444', marginTop: 8 }}>{errors.zaujem}</p>}
                <button type="button" onClick={goStep2} style={{ width: '100%', marginTop: 24, background: ORANGE, color: '#fff', fontFamily: 'inherit', fontSize: '1rem', fontWeight: 700, padding: '14px', border: 'none', borderRadius: 12, cursor: 'pointer' }}>
                  Pokračovať →
                </button>
              </div>
            )}

            {/* Step 2: Property type + timeline */}
            {step === 2 && (
              <div>
                <h1 style={{ fontSize: 'clamp(1.3rem,3vw,1.8rem)', fontWeight: 800, marginBottom: 8 }}>Typ nehnuteľnosti</h1>
                <p style={{ fontSize: '0.85rem', color: MUTED, marginBottom: 24 }}>Krok 2 z 4</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
                  {PROPERTY_OPTIONS.map(opt => (
                    <button key={opt.value} type="button" onClick={() => setProperty(opt.value)}
                      style={{ padding: '16px', border: `1.5px solid ${property === opt.value ? ORANGE : BORDER}`, borderRadius: 12, background: property === opt.value ? 'rgba(232,113,26,0.1)' : 'rgba(255,255,255,0.03)', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.9rem', fontWeight: 600, color: property === opt.value ? TEXT : '#C4B9A8', textAlign: 'center' as const }}>
                      <div style={{ fontSize: '1.6rem', marginBottom: 6 }}>{opt.icon}</div>
                      {opt.label}
                    </button>
                  ))}
                </div>

                <p style={{ fontSize: '0.82rem', fontWeight: 700, color: TEXT, marginBottom: 10 }}>Časový horizont</p>
                <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8, marginBottom: 24 }}>
                  {['ihneď', '1-3 mesiace', '3-6 mesiacov', 'len sa rozhliadam'].map(t => (
                    <button key={t} type="button" onClick={() => setTimeline(t)} style={CHIP_STYLE(timeline === t)}>{t}</button>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button type="button" onClick={() => setStep(1)} style={{ padding: '14px 20px', border: `1.5px solid ${BORDER}`, borderRadius: 12, background: 'transparent', fontFamily: 'inherit', fontSize: '0.9rem', cursor: 'pointer', color: '#C4B9A8' }}>← Späť</button>
                  <button type="button" onClick={goStep3} style={{ flex: 1, background: ORANGE, color: '#fff', fontFamily: 'inherit', fontSize: '1rem', fontWeight: 700, padding: '14px', border: 'none', borderRadius: 12, cursor: 'pointer' }}>Pokračovať →</button>
                </div>
              </div>
            )}

            {/* Step 3: Message */}
            {step === 3 && (
              <div>
                <h1 style={{ fontSize: 'clamp(1.3rem,3vw,1.8rem)', fontWeight: 800, marginBottom: 8 }}>Správa pre nás</h1>
                <p style={{ fontSize: '0.85rem', color: MUTED, marginBottom: 24 }}>Krok 3 z 4 — Nepovinné</p>
                <textarea
                  value={message} onChange={e => setMessage(e.target.value)}
                  placeholder="Napr. Mám záujem o 3-izbový byt v centre Trenčína, rozpočet do 150 000 €…"
                  rows={5}
                  style={{ ...INPUT_STYLE, resize: 'vertical', lineHeight: 1.5, marginBottom: 24 }}
                />
                <div style={{ display: 'flex', gap: 10 }}>
                  <button type="button" onClick={() => setStep(2)} style={{ padding: '14px 20px', border: `1.5px solid ${BORDER}`, borderRadius: 12, background: 'transparent', fontFamily: 'inherit', fontSize: '0.9rem', cursor: 'pointer', color: '#C4B9A8' }}>← Späť</button>
                  <button type="button" onClick={goStep4} style={{ flex: 1, background: ORANGE, color: '#fff', fontFamily: 'inherit', fontSize: '1rem', fontWeight: 700, padding: '14px', border: 'none', borderRadius: 12, cursor: 'pointer' }}>Pokračovať →</button>
                </div>
              </div>
            )}

            {/* Step 4: Contact */}
            {step === 4 && (
              <form onSubmit={handleSubmit} noValidate>
                <h1 style={{ fontSize: 'clamp(1.3rem,3vw,1.8rem)', fontWeight: 800, marginBottom: 8 }}>Vaše kontaktné údaje</h1>
                <p style={{ fontSize: '0.85rem', color: MUTED, marginBottom: 24 }}>Krok 4 z 4</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#C4B9A8', marginBottom: 5 }}>Meno *</label>
                    <input style={{ ...INPUT_STYLE, borderColor: errors.name ? '#ef4444' : BORDER }} type="text" value={name} onChange={e => { setName(e.target.value); setErrors(v => ({ ...v, name: '' })) }} placeholder="Ján Novák" autoComplete="name" />
                    {errors.name && <p style={{ fontSize: '0.72rem', color: '#ef4444', marginTop: 4 }}>{errors.name}</p>}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#C4B9A8', marginBottom: 5 }}>Telefón *</label>
                    <input style={{ ...INPUT_STYLE, borderColor: errors.phone ? '#ef4444' : BORDER }} type="tel" value={phone} onChange={e => { setPhone(e.target.value); setErrors(v => ({ ...v, phone: '' })) }} placeholder="+421 9XX XXX XXX" autoComplete="tel" />
                    {errors.phone && <p style={{ fontSize: '0.72rem', color: '#ef4444', marginTop: 4 }}>{errors.phone}</p>}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#C4B9A8', marginBottom: 5 }}>E-mail</label>
                    <input style={INPUT_STYLE} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jan@email.sk" autoComplete="email" />
                  </div>
                </div>

                <p style={{ fontSize: '0.82rem', fontWeight: 700, color: TEXT, marginBottom: 10 }}>Kedy vám zavolať?</p>
                <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8, marginBottom: 20 }}>
                  {['dnes', 'zajtra', 'kedykoľvek'].map(t => (
                    <button key={t} type="button" onClick={() => setCallback(t)} style={CHIP_STYLE(callback === t)}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
                  ))}
                </div>

                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', marginBottom: 20 }}>
                  <input type="checkbox" checked={gdpr} onChange={e => { setGdpr(e.target.checked); setErrors(v => ({ ...v, gdpr: '' })) }} style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.75rem', color: MUTED, lineHeight: 1.4 }}>Súhlasím so spracovaním osobných údajov *</span>
                </label>
                {errors.gdpr && <p style={{ fontSize: '0.72rem', color: '#ef4444', marginBottom: 12 }}>{errors.gdpr}</p>}
                {errors.submit && <p style={{ fontSize: '0.72rem', color: '#ef4444', marginBottom: 12 }}>{errors.submit}</p>}

                <div style={{ display: 'flex', gap: 10 }}>
                  <button type="button" onClick={() => setStep(3)} style={{ padding: '14px 20px', border: `1.5px solid ${BORDER}`, borderRadius: 12, background: 'transparent', fontFamily: 'inherit', fontSize: '0.9rem', cursor: 'pointer', color: '#C4B9A8' }}>← Späť</button>
                  <button type="submit" disabled={loading} style={{ flex: 1, background: ORANGE, color: '#fff', fontFamily: 'inherit', fontSize: '1rem', fontWeight: 700, padding: '14px', border: 'none', borderRadius: 12, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.65 : 1 }}>
                    {loading ? 'Odosielam…' : 'Odoslať žiadosť →'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </main>

      <footer style={{ width: '100%', borderTop: `1px solid ${BORDER}`, padding: '20px', textAlign: 'center', fontSize: '0.75rem', color: MUTED }}>
        © 2025 Zajo Reality · <a href="mailto:info@zajoreality.sk" style={{ color: MUTED, textDecoration: 'none' }}>info@zajoreality.sk</a>
      </footer>
    </div>
  )
}
