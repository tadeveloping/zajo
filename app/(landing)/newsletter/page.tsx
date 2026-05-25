'use client'
import './styles.css'
import { useState } from 'react'

const LOGO_PATH = "M 213.902344 332.1875 L 208.460938 316.855469 L 208.460938 313.875 L 213.296875 313.875 L 213.296875 303.425781 L 207.078125 303.425781 L 207.078125 332.1875 L 202.152344 332.1875 L 202.152344 299.191406 L 215.238281 299.191406 C 217.226562 299.191406 218.21875 300.199219 218.21875 302.214844 L 218.21875 314.222656 C 218.21875 316.179688 217.242188 317.1875 215.28125 317.242188 L 213.597656 317.242188 L 219.039062 332.011719 L 219.039062 332.1875 Z M 267.386719 209.125 C 267.734375 209.109375 268.03125 209.375 268.042969 209.714844 C 268.054688 210.050781 267.78125 210.335938 267.429688 210.351562 C 267.082031 210.363281 266.785156 210.101562 266.773438 209.761719 C 266.761719 209.421875 267.035156 209.136719 267.386719 209.125 Z M 358.402344 126.726562 L 358.402344 150.214844 L 339.746094 150.214844 L 339.746094 118.546875 Z M 241.382812 140.777344 L 241.382812 133.183594 L 325.867188 105.765625 L 325.867188 195.519531 L 331.015625 200.339844 L 331.015625 105.789062 L 388.21875 130.9375 L 388.21875 150.214844 L 411.976562 150.214844 L 406.828125 145.066406 L 393.367188 145.066406 L 393.367188 127.582031 L 328.59375 99.105469 L 236.234375 129.722656 L 236.234375 145.066406 L 187.726562 145.066406 L 182.574219 150.214844 L 236.234375 150.214844 L 236.234375 173.890625 L 241.382812 169.066406 Z M 221.429688 123.277344 L 329.339844 86.871094 L 408.171875 121.503906 L 408.171875 127.414062 L 329.253906 92.742188 L 221.429688 129.117188 Z M 169.167969 266.0625 L 201.410156 175.671875 L 169.167969 175.671875 L 169.167969 158.816406 L 223.664062 158.816406 L 223.664062 169.617188 L 188.808594 266.988281 L 235.488281 266.988281 L 256.503906 158.652344 L 276.140625 158.652344 L 283.703125 197.902344 C 280.9375 199.058594 278.148438 201.65625 276.808594 202.691406 C 278.421875 200.613281 280.992188 194.976562 279.191406 191.539062 C 275.621094 193.355469 273.230469 202.980469 270.585938 206.042969 C 268.609375 207.613281 265.808594 204.691406 260.921875 211.851562 C 260.429688 212.570312 260.683594 212.796875 261.179688 213.578125 C 262.265625 215.28125 263.316406 214.582031 264.90625 216.070312 C 264.296875 218.074219 262.609375 218.542969 261.011719 219.921875 C 252.933594 226.894531 254.433594 234.078125 253.289062 235.867188 C 253.054688 236.234375 251.019531 237.011719 250.625 238.511719 C 250.125 240.421875 250.980469 241.140625 252.171875 241.476562 C 252.671875 241.621094 253.230469 241.699219 253.777344 241.757812 C 254.519531 241.839844 254.84375 242.019531 255.167969 241.71875 C 255.296875 241.597656 255.429688 241.402344 255.585938 241.089844 C 255.832031 240.601562 255.949219 240.054688 255.964844 239.410156 C 256.027344 239.253906 256.101562 239.292969 256.1875 239.410156 C 256.351562 240.140625 256.335938 240.8125 256.101562 241.375 C 256.058594 241.476562 256.011719 241.574219 255.957031 241.664062 C 255.761719 242.082031 255.941406 242.238281 256.160156 242.363281 C 256.246094 242.410156 256.332031 242.460938 256.414062 242.511719 C 257.253906 243.003906 257.421875 243.175781 259.207031 243.300781 C 262.386719 243.527344 276.296875 243.21875 278.292969 241.933594 C 278.179688 238.867188 276.003906 239.132812 273.1875 238.175781 C 273.378906 235.988281 274.015625 234.304688 272.714844 231.957031 C 272 230.664062 270.765625 229.695312 268.972656 229.253906 C 267.941406 229.003906 267.867188 228.210938 269.132812 228.578125 C 270.058594 228.847656 270.8125 229.214844 271.4375 229.695312 C 273.035156 230.921875 273.179688 232.402344 274.421875 233.894531 C 275.980469 235.765625 278.046875 234.421875 276.652344 232.277344 C 276.457031 231.972656 276.25 231.722656 276.152344 231.582031 C 275.378906 230.460938 274.726562 229.613281 274.21875 228.875 C 273.046875 227.179688 272.621094 226.058594 273.140625 223.476562 C 273.5625 218.667969 273.984375 213.859375 274.402344 209.046875 C 275.707031 207.957031 281.519531 205.253906 284.390625 201.46875 L 300.199219 283.519531 L 300.199219 283.84375 L 281.707031 283.84375 L 277.941406 260.117188 L 254.539062 260.117188 L 250.777344 283.84375 L 169.167969 283.84375 Z M 425.382812 271.960938 C 425.382812 275.667969 424.402344 278.507812 422.4375 280.46875 C 420.472656 282.433594 417.691406 283.414062 414.089844 283.414062 L 373.503906 283.414062 C 366.085938 283.414062 362.378906 279.597656 362.378906 271.960938 L 362.378906 169.84375 C 362.378906 162.207031 366.085938 158.386719 373.503906 158.386719 L 414.089844 158.386719 C 417.691406 158.386719 420.472656 159.371094 422.4375 161.332031 C 424.402344 163.296875 425.382812 166.132812 425.382812 169.84375 Z M 406.726562 174.425781 L 381.035156 174.425781 L 381.035156 267.378906 L 406.726562 267.378906 Z M 358.402344 272.390625 C 358.402344 280.027344 354.582031 283.84375 346.945312 283.84375 L 311.433594 283.84375 C 307.835938 283.84375 305.054688 282.863281 303.089844 280.898438 C 301.125 278.9375 300.144531 276.097656 300.144531 272.390625 L 300.144531 244.078125 L 318.800781 244.078125 L 318.800781 267.808594 L 339.746094 267.808594 L 339.746094 158.816406 L 358.402344 158.816406 Z M 234.550781 332.1875 L 234.550781 299.191406 L 248.113281 299.191406 L 248.113281 303.554688 L 239.476562 303.554688 L 239.476562 313.183594 L 246.902344 313.183594 L 246.902344 317.460938 L 239.476562 317.460938 L 239.476562 327.824219 L 248.242188 327.824219 L 248.242188 332.1875 Z M 275.933594 332.1875 L 274.941406 325.925781 L 268.765625 325.925781 L 267.769531 332.1875 L 262.890625 332.1875 L 262.890625 332.101562 L 269.28125 299.148438 L 274.464844 299.148438 L 280.8125 332.101562 L 280.8125 332.1875 Z M 271.832031 306.792969 L 269.414062 321.691406 L 274.25 321.691406 Z M 296.066406 332.1875 L 296.066406 299.191406 L 300.988281 299.191406 L 300.988281 327.78125 L 309.023438 327.78125 L 309.023438 332.1875 Z M 324.535156 332.1875 L 324.535156 299.191406 L 329.457031 299.191406 L 329.457031 332.1875 Z M 354.902344 303.554688 L 354.902344 332.1875 L 349.980469 332.1875 L 349.980469 303.554688 L 344.582031 303.554688 L 344.582031 299.191406 L 360.34375 299.191406 L 360.34375 303.554688 Z M 385.878906 320.050781 L 385.878906 332.1875 L 380.910156 332.1875 L 380.910156 320.050781 L 374.390625 299.367188 L 374.390625 299.191406 L 379.484375 299.191406 L 383.414062 313.53125 L 387.34375 299.191406 L 392.398438 299.191406 L 392.398438 299.367188 Z"

export default function NewsletterPage() {
  const [meno, setMeno] = useState('')
  const [email, setEmail] = useState('')
  const [gdprSuhlas, setGdprSuhlas] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs: Record<string, string> = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Zadajte platnú e-mailovú adresu'
    }
    if (!gdprSuhlas) {
      errs.gdpr = 'Toto pole je povinné'
    }
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: meno.trim(), email: email.trim() }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setErrors({ submit: (data as {error?: string})?.error || 'Nastala chyba, skúste znova.' })
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

  return (
    <>
      <nav></nav>

      <section className="hero">
        <div className="deco-cards">
          <div className="deco-card"></div>
          <div className="deco-card"></div>
          <div className="deco-card"></div>
          <div className="deco-card"></div>
        </div>

        <div className="hero-logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="122.5 40.5 349.5 338" aria-label="Zajo Reality">
            <path fill="#F59E0B" fillRule="nonzero" d={LOGO_PATH} />
          </svg>
        </div>

        <h1>Najlepšie ponuky <em>skôr ako ostatní.</em></h1>
        <p className="hero-sub">Byty, domy a pozemky v Trenčianskom kraji, priamo do vášho e&#8209;mailu, skôr ako sa objavia inde.</p>

        <div className="hero-fomo">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          Pripojilo sa už 340+ ľudí z Trenčianskeho kraja
        </div>

        <div className="signup-card">
          <div className="card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <h2>Odoberať novinky zadarmo</h2>
          <p>Prihláste sa a buďte prvý, kto sa dozvie o nových ponukách.</p>

          <div className="perks">
            <div className="perk">
              <div className="perk-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg></div>
              Nové ponuky pred zverejnením na portáloch
            </div>
            <div className="perk">
              <div className="perk-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg></div>
              Trendy cien v Trenčianskom kraji
            </div>
            <div className="perk">
              <div className="perk-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg></div>
              Tipy na výhodné kúpy a investičné príležitosti
            </div>
          </div>

          <div className="divider"></div>

          {done ? (
            <div className="success-view show">
              <div className="success-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3>Ste prihlásený!</h3>
              <p>Skvelé rozhodnutie. Budete prvý, kto sa dozvie o najlepších ponukách v Trenčianskom kraji.</p>
            </div>
          ) : (
            <div className="form-fields">
              <form id="nlForm" noValidate onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="meno">Krstné meno</label>
                  <input
                    type="text" id="meno" name="meno" placeholder="Ján" autoComplete="given-name"
                    value={meno} onChange={e => setMeno(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">E-mailová adresa *</label>
                  <input
                    type="email" id="email" name="email" placeholder="jan@email.sk" autoComplete="email"
                    className={errors.email ? 'error' : ''}
                    value={email} onChange={e => { setEmail(e.target.value); setErrors(ev => ({ ...ev, email: '' })) }}
                  />
                  {errors.email && <span className="field-error show">{errors.email}</span>}
                </div>

                <div className="consent-row">
                  <label className="consent-item">
                    <input
                      type="checkbox" id="gdprSuhlas" name="gdprSuhlas"
                      checked={gdprSuhlas} onChange={e => { setGdprSuhlas(e.target.checked); setErrors(ev => ({ ...ev, gdpr: '' })) }}
                    />
                    <span>Súhlasím so <a href="/zasady-ochrany-osobnych-udajov" target="_blank" style={{ color: 'inherit', textDecoration: 'underline' }}>spracovaním osobných údajov</a></span>
                  </label>
                  {errors.gdpr && <span className="field-error show" style={{ marginTop: 2 }}>{errors.gdpr}</span>}
                </div>

                {errors.submit && <p style={{ fontSize: '.72rem', color: '#EF4444', marginTop: 8 }}>{errors.submit}</p>}

                <button type="submit" className={`submit-btn${loading ? ' loading' : ''}`} id="submitBtn" disabled={loading}>
                  <span className="btn-text">Prihlásiť sa zadarmo →</span>
                  <div className="spinner"></div>
                </button>
                <p className="form-note">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  Spam nenávidíme rovnako ako vy. Odber kedykoľvek zrušíte.
                </p>
              </form>
            </div>
          )}
        </div>
      </section>

      <section className="why">
        <div className="why-inner">
          <p className="section-eyebrow">Prečo sa prihlásiť</p>
          <h2 className="section-h2">Výhody odberu</h2>
          <div className="why-grid">
            <div className="why-item">
              <div className="why-item-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
              <div>
                <h3>Skôr ako ostatní</h3>
                <p>Niektoré ponuky posielame odberateľom ešte pred zverejnením na Nehnuteľnosti.sk a Reality.sk.</p>
              </div>
            </div>
            <div className="why-item">
              <div className="why-item-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg></div>
              <div>
                <h3>Trendy trhu</h3>
                <p>Prehľad vývoja cien v lokalitách Trenčianskeho kraja — viete kedy je správny čas kupovať.</p>
              </div>
            </div>
            <div className="why-item">
              <div className="why-item-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 8 12 13 2 8"/><path d="M2 8l10 5 10-5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/><line x1="12" y1="22" x2="12" y2="13"/></svg></div>
              <div>
                <h3>Bez spamu</h3>
                <p>Len to najlepšie — žiadne zbytočné správy. Odber zrušíte kedykoľvek jedným klikom.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>© 2025 Zajo Reality · <a href="mailto:info@zajoreality.sk">info@zajoreality.sk</a></p>
      </footer>
    </>
  )
}
