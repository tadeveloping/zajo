'use client'
import { useState } from 'react'

const INPUT = {
  width: '100%', fontFamily: 'inherit', fontSize: '0.9rem', color: '#0F172A',
  background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: 9,
  padding: '11px 14px', outline: 'none',
}
const LABEL = { display: 'block', fontSize: '0.78rem', fontWeight: 600 as const, color: '#334155', marginBottom: 5, letterSpacing: '0.02em' }
const ERR = { fontSize: '0.72rem', color: '#EF4444', marginTop: 4 }

export default function PredajPage() {
  const [form, setForm] = useState({
    meno: '', telefon: '', email: '', typ: '', lokalita: '', casovyRamec: '', sprava: '',
  })
  const [nlSuhlas, setNlSuhlas] = useState(false)
  const [gdprSuhlas, setGdprSuhlas] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  function set(key: string, val: string) {
    setForm(f => ({ ...f, [key]: val }))
    setErrors(e => ({ ...e, [key]: '' }))
  }

  function validate() {
    const e: Record<string, string> = {}
    if (!form.meno.trim()) e.meno = 'Vyplňte meno'
    if (!form.telefon.trim()) e.telefon = 'Vyplňte telefón'
    if (!form.typ) e.typ = 'Vyberte typ nehnuteľnosti'
    if (!form.lokalita.trim()) e.lokalita = 'Vyplňte lokalitu'
    if (!gdprSuhlas) e.gdpr = 'Toto pole je povinné'
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      const res = await fetch('/api/leads/predaj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.meno.trim(),
          phone: form.telefon.trim(),
          email: form.email.trim() || null,
          typ: form.typ || null,
          lokalita: form.lokalita.trim() || null,
          casovy_ramec: form.casovyRamec || null,
          sprava: form.sprava.trim() || null,
          source: 'landing_page',
          newsletter_opt: nlSuhlas,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setErrors({ submit: 'Nastala chyba, skúste znova.' })
        console.error(data)
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

  const gold = '#F59E0B'
  const navy = '#0F172A'

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#F8FAFC', minHeight: '100vh', color: navy }}>
      {/* Header */}
      <header style={{ background: navy, padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="122.5 40.5 349.5 338" style={{ height: 44, width: 'auto' }}>
          <path fill={gold} fillRule="nonzero" d="M 213.902344 332.1875 L 208.460938 316.855469 L 208.460938 313.875 L 213.296875 313.875 L 213.296875 303.425781 L 207.078125 303.425781 L 207.078125 332.1875 L 202.152344 332.1875 L 202.152344 299.191406 L 215.238281 299.191406 C 217.226562 299.191406 218.21875 300.199219 218.21875 302.214844 L 218.21875 314.222656 C 218.21875 316.179688 217.242188 317.1875 215.28125 317.242188 L 213.597656 317.242188 L 219.039062 332.011719 L 219.039062 332.1875 Z M 358.402344 126.726562 L 358.402344 150.214844 L 339.746094 150.214844 L 339.746094 118.546875 Z M 241.382812 140.777344 L 241.382812 133.183594 L 325.867188 105.765625 L 325.867188 195.519531 L 331.015625 200.339844 L 331.015625 105.789062 L 388.21875 130.9375 L 388.21875 150.214844 L 411.976562 150.214844 L 406.828125 145.066406 L 393.367188 145.066406 L 393.367188 127.582031 L 328.59375 99.105469 L 236.234375 129.722656 L 236.234375 145.066406 L 187.726562 145.066406 L 182.574219 150.214844 L 236.234375 150.214844 L 236.234375 173.890625 L 241.382812 169.066406 Z M 169.167969 266.0625 L 201.410156 175.671875 L 169.167969 175.671875 L 169.167969 158.816406 L 223.664062 158.816406 L 223.664062 169.617188 L 188.808594 266.988281 L 235.488281 266.988281 L 256.503906 158.652344 L 276.140625 158.652344 L 284.390625 201.46875 L 300.199219 283.519531 L 300.199219 283.84375 L 281.707031 283.84375 L 277.941406 260.117188 L 254.539062 260.117188 L 250.777344 283.84375 L 169.167969 283.84375 Z M 425.382812 271.960938 C 425.382812 275.667969 424.402344 278.507812 422.4375 280.46875 C 420.472656 282.433594 417.691406 283.414062 414.089844 283.414062 L 373.503906 283.414062 C 366.085938 283.414062 362.378906 279.597656 362.378906 271.960938 L 362.378906 169.84375 C 362.378906 162.207031 366.085938 158.386719 373.503906 158.386719 L 414.089844 158.386719 C 417.691406 158.386719 420.472656 159.371094 422.4375 161.332031 C 424.402344 163.296875 425.382812 166.132812 425.382812 169.84375 Z M 406.726562 174.425781 L 381.035156 174.425781 L 381.035156 267.378906 L 406.726562 267.378906 Z M 358.402344 272.390625 C 358.402344 280.027344 354.582031 283.84375 346.945312 283.84375 L 311.433594 283.84375 C 307.835938 283.84375 305.054688 282.863281 303.089844 280.898438 C 301.125 278.9375 300.144531 276.097656 300.144531 272.390625 L 300.144531 244.078125 L 318.800781 244.078125 L 318.800781 267.808594 L 339.746094 267.808594 L 339.746094 158.816406 L 358.402344 158.816406 Z" />
        </svg>
      </header>

      {/* Form */}
      <main style={{ maxWidth: 560, margin: '0 auto', padding: '40px 24px 60px' }}>
        {done ? (
          <div style={{ background: '#fff', borderRadius: 20, padding: '48px 32px', textAlign: 'center', boxShadow: '0 8px 40px rgba(15,23,42,0.08)' }}>
            <div style={{ width: 64, height: 64, background: '#D1FAE5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.6rem', fontWeight: 700, marginBottom: 12 }}>Ďakujeme!</h2>
            <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>Vaša žiadosť bola prijatá. Ozveme sa vám čo najskôr.</p>
          </div>
        ) : (
          <div style={{ background: '#fff', borderRadius: 20, padding: '32px', boxShadow: '0 8px 40px rgba(15,23,42,0.08)' }}>
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)', color: '#D97706', fontSize: '0.72rem', fontWeight: 700, padding: '4px 12px', borderRadius: 99, textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: 12 }}>
                Predaj nehnuteľnosti
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: 8 }}>Chcem predať nehnuteľnosť</h1>
              <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>Vyplňte formulár a my vás kontaktujeme s bezplatnou konzultáciou.</p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div>
                  <label style={LABEL}>Meno a priezvisko *</label>
                  <input style={{ ...INPUT, borderColor: errors.meno ? '#EF4444' : '#E2E8F0' }} type="text" value={form.meno} onChange={e => set('meno', e.target.value)} placeholder="Ján Novák" autoComplete="name" />
                  {errors.meno && <p style={ERR}>{errors.meno}</p>}
                </div>
                <div>
                  <label style={LABEL}>Telefón *</label>
                  <input style={{ ...INPUT, borderColor: errors.telefon ? '#EF4444' : '#E2E8F0' }} type="tel" value={form.telefon} onChange={e => set('telefon', e.target.value)} placeholder="+421 9XX XXX XXX" autoComplete="tel" />
                  {errors.telefon && <p style={ERR}>{errors.telefon}</p>}
                </div>
              </div>

              <div style={{ marginBottom: 12 }}>
                <label style={LABEL}>E-mail</label>
                <input style={INPUT} type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="jan@email.sk" autoComplete="email" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div>
                  <label style={LABEL}>Typ nehnuteľnosti *</label>
                  <select style={{ ...INPUT, borderColor: errors.typ ? '#EF4444' : '#E2E8F0', cursor: 'pointer' }} value={form.typ} onChange={e => set('typ', e.target.value)}>
                    <option value="">Vyberte typ</option>
                    <option value="byt">Byt</option>
                    <option value="dom">Rodinný dom</option>
                    <option value="pozemok">Pozemok</option>
                    <option value="komerčný">Komerčný objekt</option>
                    <option value="iné">Iné</option>
                  </select>
                  {errors.typ && <p style={ERR}>{errors.typ}</p>}
                </div>
                <div>
                  <label style={LABEL}>Lokalita *</label>
                  <input style={{ ...INPUT, borderColor: errors.lokalita ? '#EF4444' : '#E2E8F0' }} type="text" value={form.lokalita} onChange={e => set('lokalita', e.target.value)} placeholder="Trenčín, Zlatovce…" />
                  {errors.lokalita && <p style={ERR}>{errors.lokalita}</p>}
                </div>
              </div>

              <div style={{ marginBottom: 12 }}>
                <label style={LABEL}>Kedy chcete predávať</label>
                <select style={{ ...INPUT, cursor: 'pointer' }} value={form.casovyRamec} onChange={e => set('casovyRamec', e.target.value)}>
                  <option value="">Neviem / čo najskôr</option>
                  <option value="ihned">Ihneď</option>
                  <option value="1-3 mesiace">1–3 mesiace</option>
                  <option value="3-6 mesiacov">3–6 mesiacov</option>
                  <option value="6+ mesiacov">Za 6+ mesiacov</option>
                </select>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={LABEL}>Doplňujúce informácie</label>
                <textarea
                  style={{ ...INPUT, resize: 'vertical', minHeight: 80 }}
                  value={form.sprava} onChange={e => set('sprava', e.target.value)}
                  placeholder="Napr. rozloha, stav, poschodie, príslušenstvo…"
                  rows={3}
                />
              </div>

              <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: 16, marginBottom: 16 }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, cursor: 'pointer', marginBottom: 8 }}>
                  <input type="checkbox" checked={nlSuhlas} onChange={e => setNlSuhlas(e.target.checked)} style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: 1.4 }}>Chcem dostávať novinky o ponukách nehnuteľností na e-mail</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, cursor: 'pointer' }}>
                  <input type="checkbox" checked={gdprSuhlas} onChange={e => { setGdprSuhlas(e.target.checked); setErrors(v => ({ ...v, gdpr: '' })) }} style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: 1.4 }}>Súhlasím so spracovaním osobných údajov *</span>
                </label>
                {errors.gdpr && <p style={ERR}>{errors.gdpr}</p>}
              </div>

              {errors.submit && <p style={{ ...ERR, marginBottom: 12 }}>{errors.submit}</p>}

              <button
                type="submit" disabled={loading}
                style={{
                  width: '100%', background: gold, color: navy,
                  fontFamily: 'inherit', fontSize: '1rem', fontWeight: 700,
                  padding: '14px 24px', border: 'none', borderRadius: 12,
                  cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.65 : 1,
                }}
              >
                {loading ? 'Odosielam…' : 'Odoslať žiadosť →'}
              </button>
            </form>
          </div>
        )}
      </main>

      <footer style={{ background: navy, color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '24px', fontSize: '0.78rem' }}>
        <p>© 2025 Zajo Reality · <a href="mailto:info@zajoreality.sk" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>info@zajoreality.sk</a></p>
      </footer>
    </div>
  )
}
