'use client'
import { useState } from 'react'

const LOGO_PATH = "M 213.902344 332.1875 L 208.460938 316.855469 L 208.460938 313.875 L 213.296875 313.875 L 213.296875 303.425781 L 207.078125 303.425781 L 207.078125 332.1875 L 202.152344 332.1875 L 202.152344 299.191406 L 215.238281 299.191406 C 217.226562 299.191406 218.21875 300.199219 218.21875 302.214844 L 218.21875 314.222656 C 218.21875 316.179688 217.242188 317.1875 215.28125 317.242188 L 213.597656 317.242188 L 219.039062 332.011719 L 219.039062 332.1875 Z M 267.386719 209.125 C 267.734375 209.109375 268.03125 209.375 268.042969 209.714844 C 268.054688 210.050781 267.78125 210.335938 267.429688 210.351562 C 267.082031 210.363281 266.785156 210.101562 266.773438 209.761719 C 266.761719 209.421875 267.035156 209.136719 267.386719 209.125 Z M 358.402344 126.726562 L 358.402344 150.214844 L 339.746094 150.214844 L 339.746094 118.546875 Z M 241.382812 140.777344 L 241.382812 133.183594 L 325.867188 105.765625 L 325.867188 195.519531 L 331.015625 200.339844 L 331.015625 105.789062 L 388.21875 130.9375 L 388.21875 150.214844 L 411.976562 150.214844 L 406.828125 145.066406 L 393.367188 145.066406 L 393.367188 127.582031 L 328.59375 99.105469 L 236.234375 129.722656 L 236.234375 145.066406 L 187.726562 145.066406 L 182.574219 150.214844 L 236.234375 150.214844 L 236.234375 173.890625 L 241.382812 169.066406 Z M 221.429688 123.277344 L 329.339844 86.871094 L 408.171875 121.503906 L 408.171875 127.414062 L 329.253906 92.742188 L 221.429688 129.117188 Z M 169.167969 266.0625 L 201.410156 175.671875 L 169.167969 175.671875 L 169.167969 158.816406 L 223.664062 158.816406 L 223.664062 169.617188 L 188.808594 266.988281 L 235.488281 266.988281 L 256.503906 158.652344 L 276.140625 158.652344 L 283.703125 197.902344 C 280.9375 199.058594 278.148438 201.65625 276.808594 202.691406 C 278.421875 200.613281 280.992188 194.976562 279.191406 191.539062 C 275.621094 193.355469 273.230469 202.980469 270.585938 206.042969 C 268.609375 207.613281 265.808594 204.691406 260.921875 211.851562 C 260.429688 212.570312 260.683594 212.796875 261.179688 213.578125 C 262.265625 215.28125 263.316406 214.582031 264.90625 216.070312 C 264.296875 218.074219 262.609375 218.542969 261.011719 219.921875 C 252.933594 226.894531 254.433594 234.078125 253.289062 235.867188 C 253.054688 236.234375 251.019531 237.011719 250.625 238.511719 C 250.125 240.421875 250.980469 241.140625 252.171875 241.476562 C 252.671875 241.621094 253.230469 241.699219 253.777344 241.757812 C 254.519531 241.839844 254.84375 242.019531 255.167969 241.71875 C 255.296875 241.597656 255.429688 241.402344 255.585938 241.089844 C 255.832031 240.601562 255.949219 240.054688 255.964844 239.410156 C 256.027344 239.253906 256.101562 239.292969 256.1875 239.410156 C 256.351562 240.140625 256.335938 240.8125 256.101562 241.375 C 256.058594 241.476562 256.011719 241.574219 255.957031 241.664062 C 255.761719 242.082031 255.941406 242.238281 256.160156 242.363281 C 256.246094 242.410156 256.332031 242.460938 256.414062 242.511719 C 257.253906 243.003906 257.421875 243.175781 259.207031 243.300781 C 262.386719 243.527344 276.296875 243.21875 278.292969 241.933594 C 278.179688 238.867188 276.003906 239.132812 273.1875 238.175781 C 273.378906 235.988281 274.015625 234.304688 272.714844 231.957031 C 272 230.664062 270.765625 229.695312 268.972656 229.253906 C 267.941406 229.003906 267.867188 228.210938 269.132812 228.578125 C 270.058594 228.847656 270.8125 229.214844 271.4375 229.695312 C 273.035156 230.921875 273.179688 232.402344 274.421875 233.894531 C 275.980469 235.765625 278.046875 234.421875 276.652344 232.277344 C 276.457031 231.972656 276.25 231.722656 276.152344 231.582031 C 275.378906 230.460938 274.726562 229.613281 274.21875 228.875 C 273.046875 227.179688 272.621094 226.058594 273.140625 223.476562 C 273.5625 218.667969 273.984375 213.859375 274.402344 209.046875 C 275.707031 207.957031 281.519531 205.253906 284.390625 201.46875 L 300.199219 283.519531 L 300.199219 283.84375 L 281.707031 283.84375 L 277.941406 260.117188 L 254.539062 260.117188 L 250.777344 283.84375 L 169.167969 283.84375 Z M 425.382812 271.960938 C 425.382812 275.667969 424.402344 278.507812 422.4375 280.46875 C 420.472656 282.433594 417.691406 283.414062 414.089844 283.414062 L 373.503906 283.414062 C 366.085938 283.414062 362.378906 279.597656 362.378906 271.960938 L 362.378906 169.84375 C 362.378906 162.207031 366.085938 158.386719 373.503906 158.386719 L 414.089844 158.386719 C 417.691406 158.386719 420.472656 159.371094 422.4375 161.332031 C 424.402344 163.296875 425.382812 166.132812 425.382812 169.84375 Z M 406.726562 174.425781 L 381.035156 174.425781 L 381.035156 267.378906 L 406.726562 267.378906 Z M 358.402344 272.390625 C 358.402344 280.027344 354.582031 283.84375 346.945312 283.84375 L 311.433594 283.84375 C 307.835938 283.84375 305.054688 282.863281 303.089844 280.898438 C 301.125 278.9375 300.144531 276.097656 300.144531 272.390625 L 300.144531 244.078125 L 318.800781 244.078125 L 318.800781 267.808594 L 339.746094 267.808594 L 339.746094 158.816406 L 358.402344 158.816406 Z M 234.550781 332.1875 L 234.550781 299.191406 L 248.113281 299.191406 L 248.113281 303.554688 L 239.476562 303.554688 L 239.476562 313.183594 L 246.902344 313.183594 L 246.902344 317.460938 L 239.476562 317.460938 L 239.476562 327.824219 L 248.242188 327.824219 L 248.242188 332.1875 Z M 275.933594 332.1875 L 274.941406 325.925781 L 268.765625 325.925781 L 267.769531 332.1875 L 262.890625 332.1875 L 262.890625 332.101562 L 269.28125 299.148438 L 274.464844 299.148438 L 280.8125 332.101562 L 280.8125 332.1875 Z M 271.832031 306.792969 L 269.414062 321.691406 L 274.25 321.691406 Z M 296.066406 332.1875 L 296.066406 299.191406 L 300.988281 299.191406 L 300.988281 327.78125 L 309.023438 327.78125 L 309.023438 332.1875 Z M 324.535156 332.1875 L 324.535156 299.191406 L 329.457031 299.191406 L 329.457031 332.1875 Z M 354.902344 303.554688 L 354.902344 332.1875 L 349.980469 332.1875 L 349.980469 303.554688 L 344.582031 303.554688 L 344.582031 299.191406 L 360.34375 299.191406 L 360.34375 303.554688 Z M 385.878906 320.050781 L 385.878906 332.1875 L 380.910156 332.1875 L 380.910156 320.050781 L 374.390625 299.367188 L 374.390625 299.191406 L 379.484375 299.191406 L 383.414062 313.53125 L 387.34375 299.191406 L 392.398438 299.191406 L 392.398438 299.367188 Z"

export default function PredajPage() {
  const [form, setForm] = useState({
    meno: '', telefon: '', email: '', typ: '', lokalita: '', casovyRamec: '', sprava: '',
  })
  const [nlSuhlas, setNlSuhlas] = useState(false)
  const [gdprSuhlas, setGdprSuhlas] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  function setField(key: string, val: string) {
    setForm(f => ({ ...f, [key]: val }))
    setErrors(e => ({ ...e, [key]: '' }))
  }

  function validate() {
    const e: Record<string, string> = {}
    if (form.meno.trim().length < 2) e.meno = 'Vyplňte meno'
    if (!/^[\d\s+\-]{9,}$/.test(form.telefon.trim())) e.telefon = 'Vyplňte telefón'
    if (!form.typ) e.typ = 'Vyberte typ'
    if (form.lokalita.trim().length < 2) e.lokalita = 'Vyplňte lokalitu'
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Neplatný e-mail'
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
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      <style>{`
:root {
  --navy: #0F172A;
  --gold: #F59E0B;
  --gold-dark: #D97706;
  --gold-light: #FEF3C7;
  --white: #FFFFFF;
  --gray-50: #F8FAFC;
  --gray-100: #F1F5F9;
  --gray-400: #94A3B8;
  --gray-600: #475569;
  --gray-700: #334155;
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
}
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; overflow-x: hidden; }
body { font-family: 'Inter', sans-serif; background: var(--white); color: var(--navy); -webkit-font-smoothing: antialiased; overflow-x: hidden; }
nav { display: none; }
.hero-logo { text-align: center; margin-bottom: 20px; }
.hero-logo svg { height: 62px; width: auto; display: block; margin: 0 auto; }
.hero-logo-tel { display: block; margin-top: 8px; font-size: 0.8rem; font-weight: 500; color: rgba(255,255,255,0.55); text-decoration: none; letter-spacing: 0.04em; }
.hero { background: var(--navy); padding: 28px 24px 0; display: flex; flex-direction: column; align-items: center; text-align: center; position: relative; overflow: visible; }
.hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 50% 20%, rgba(245,158,11,0.15) 0%, transparent 65%); pointer-events: none; }
.hero::after { content: ''; position: absolute; bottom: -2px; left: -5%; width: 110%; height: 80px; background: var(--white); border-radius: 50% 50% 0 0 / 100% 100% 0 0; pointer-events: none; }
.hero-eyebrow { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold); margin-bottom: 16px; animation: fadeUp 500ms var(--ease-out) both; }
.hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 5vw, 3.25rem); font-weight: 700; color: var(--white); line-height: 1.1; letter-spacing: -0.02em; max-width: 680px; margin: 0 auto 16px; animation: fadeUp 500ms 60ms var(--ease-out) both; }
.hero h1 em { font-style: normal; color: var(--gold); }
.hero-sub { font-size: 1.05rem; color: rgba(255,255,255,0.68); max-width: 500px; margin: 0 auto 36px; line-height: 1.65; animation: fadeUp 500ms 120ms var(--ease-out) both; }
.benefit-strip { display: flex; gap: 0; flex-wrap: wrap; justify-content: center; margin-bottom: 48px; animation: fadeUp 500ms 180ms var(--ease-out) both; }
.benefit-item { display: flex; align-items: center; gap: 8px; padding: 10px 20px; border-right: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.8); font-size: 0.875rem; }
.benefit-item:last-child { border-right: none; }
.benefit-item svg { color: var(--gold); flex-shrink: 0; }
@media (max-width: 600px) { .benefit-item { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.08); width: 100%; } .benefit-item:last-child { border-bottom: none; } }
.form-wrap { max-width: 540px; width: 100%; margin: 0 auto; position: relative; z-index: 1; animation: fadeUp 500ms 240ms var(--ease-out) both; }
.form-card { background: var(--white); border-radius: 20px; padding: 36px 36px 44px; box-shadow: 0 -8px 40px rgba(0,0,0,0.3); text-align: left; }
@media (max-width: 480px) { .form-card { padding: 24px 18px 32px; } }
.form-card h2 { font-family: 'Playfair Display', serif; font-size: 1.35rem; font-weight: 700; color: var(--navy); margin-bottom: 6px; }
.form-card > p { font-size: 0.875rem; color: var(--gray-600); margin-bottom: 24px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
@media (max-width: 480px) { .form-row { grid-template-columns: 1fr; } }
.form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px; }
.form-group.full { grid-column: 1 / -1; }
label { font-size: 0.8rem; font-weight: 600; color: var(--gray-700); letter-spacing: 0.02em; }
input:not([type=checkbox]), select, textarea { font-family: 'Inter', sans-serif; font-size: 1rem; color: var(--navy); background: var(--gray-50); border: 1.5px solid #E2E8F0; border-radius: 10px; padding: 11px 14px; outline: none; width: 100%; -webkit-appearance: none; transition: border-color 180ms var(--ease-out), box-shadow 180ms var(--ease-out), background 180ms var(--ease-out); }
input:not([type=checkbox]):focus, select:focus, textarea:focus { border-color: var(--gold); background: var(--white); box-shadow: 0 0 0 3px rgba(245,158,11,0.12); }
input:not([type=checkbox]).error, select.error { border-color: #EF4444; }
select { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; padding-right: 38px; cursor: pointer; }
textarea { resize: vertical; min-height: 80px; }
.field-error { font-size: 0.75rem; color: #EF4444; display: none; }
.field-error.show { display: block; }
.form-submit { width: 100%; background: var(--gold); color: var(--navy); font-family: 'Inter', sans-serif; font-size: 1rem; font-weight: 700; padding: 15px 24px; border: none; border-radius: 12px; cursor: pointer; margin-top: 6px; display: flex; align-items: center; justify-content: center; gap: 8px; transition: background 180ms var(--ease-out), transform 160ms var(--ease-out), box-shadow 180ms var(--ease-out); }
@media (hover: hover) { .form-submit:hover { background: var(--gold-dark); box-shadow: 0 8px 24px rgba(245,158,11,0.35); } }
.form-submit:active { transform: scale(0.97); }
.form-submit:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
.form-note { text-align: center; font-size: 0.75rem; color: var(--gray-400); margin-top: 12px; display: flex; align-items: center; justify-content: center; gap: 5px; }
.consent-row { display: flex; flex-direction: column; gap: 6px; margin-top: 12px; }
.consent-item { display: flex; align-items: flex-start; gap: 6px; cursor: pointer; }
.consent-item input[type=checkbox] { -webkit-appearance: none; appearance: none; width: 14px; height: 14px; padding: 0; flex-shrink: 0; margin-top: 2px; border: 1.5px solid var(--gray-400); border-radius: 3px; background: var(--white); cursor: pointer; position: relative; transition: background 120ms, border-color 120ms; }
.consent-item input[type=checkbox]:checked { background: var(--gray-400); border-color: var(--gray-400); }
.consent-item input[type=checkbox]:checked::after { content: ''; position: absolute; top: 1px; left: 3px; width: 4px; height: 7px; border: 1.5px solid var(--white); border-top: none; border-left: none; transform: rotate(45deg); }
.consent-item span { font-size: .66rem; font-weight: 300; color: var(--gray-400); line-height: 1.4; }
.spinner { width: 18px; height: 18px; border: 2px solid rgba(15,23,42,0.2); border-top-color: var(--navy); border-radius: 50%; animation: spin 0.6s linear infinite; display: none; }
.form-submit.loading .btn-text { display: none; }
.form-submit.loading .spinner { display: block; }
.success-state { display: none; text-align: center; padding: 16px 0; }
.success-state.show { display: block; }
.form-fields.hide { display: none; }
.success-icon { width: 64px; height: 64px; background: #D1FAE5; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; animation: popIn 400ms var(--ease-out) both; }
.success-icon svg { color: #059669; }
.success-state h3 { font-family: 'Playfair Display', serif; font-size: 1.5rem; color: var(--navy); margin-bottom: 10px; }
.success-state p { color: var(--gray-600); font-size: 0.9rem; line-height: 1.6; margin-bottom: 0; }
.process-section { background: #ffffff; }
.process { padding: 72px 24px; max-width: 900px; margin: 0 auto; }
.section-label { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gold); margin-bottom: 12px; text-align: center; }
.section-title { font-family: 'Playfair Display', serif; font-size: clamp(1.5rem, 3vw, 2.25rem); font-weight: 700; color: var(--navy); letter-spacing: -0.02em; text-align: center; margin-bottom: 48px; }
.process-steps { display: flex; flex-direction: column; gap: 0; position: relative; }
.process-steps::before { content: ''; position: absolute; left: 19px; top: 40px; bottom: 40px; width: 2px; background: linear-gradient(to bottom, var(--gold), rgba(245,158,11,0.1)); }
@media (max-width: 600px) { .process-steps::before { display: none; } }
.process-step { display: flex; gap: 24px; align-items: flex-start; padding: 20px 0; }
.process-icon { width: 40px; height: 40px; flex-shrink: 0; background: var(--gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; position: relative; z-index: 1; }
.process-icon svg { color: var(--navy); }
.process-content h3 { font-size: 1rem; font-weight: 600; color: var(--navy); margin-bottom: 6px; }
.process-content p { font-size: 0.875rem; color: var(--gray-600); line-height: 1.6; }
.why { background: var(--navy); padding: 72px 24px; }
.why-inner { max-width: 900px; margin: 0 auto; }
.why .section-label { color: var(--gold); }
.why .section-title { color: var(--white); }
.why-grid { display: grid; grid-template-columns: 1fr; gap: 14px; }
@media (min-width: 600px) { .why-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 900px) { .why-grid { grid-template-columns: repeat(4, 1fr); } }
.why-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 20px; display: flex; align-items: flex-start; gap: 14px; transition: background 200ms var(--ease-out), border-color 200ms var(--ease-out); }
@media (min-width: 600px) { .why-card { flex-direction: column; gap: 0; } }
@media (hover: hover) { .why-card:hover { background: rgba(245,158,11,0.08); border-color: rgba(245,158,11,0.25); } }
.why-card-icon { width: 40px; height: 40px; flex-shrink: 0; background: rgba(245,158,11,0.15); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 0; color: var(--gold); }
@media (min-width: 600px) { .why-card-icon { margin-bottom: 14px; } }
.why-card h3 { font-size: .95rem; font-weight: 600; color: var(--white); margin-bottom: 6px; }
.why-card p { font-size: .83rem; color: rgba(255,255,255,0.6); line-height: 1.6; }
footer { background: #060E1A; color: rgba(255,255,255,0.45); text-align: center; padding: 28px 24px; font-size: 0.8rem; }
footer a { color: rgba(255,255,255,0.55); text-decoration: none; }
footer a:hover { color: var(--gold); }
@keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes popIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }
      `}</style>

      <nav></nav>

      <section className="hero">
        <div className="hero-logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="122.5 40.5 349.5 338" aria-label="Zajo Reality">
            <path fill="#F59E0B" fillRule="nonzero" d={LOGO_PATH} />
          </svg>
        </div>
        <h1>Od fotiek až po zmluvy,<br /><em>my sa postaráme o všetko.</em></h1>
        <p className="hero-sub">Reálna cena, rýchly predaj, žiadne prekvapenia. Postaráme sa o celý proces od A po Z.</p>

        <div className="benefit-strip">
          <div className="benefit-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            Profesionálne fotografie
          </div>
          <div className="benefit-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            Právne zabezpečenie
          </div>
          <div className="benefit-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            Reálna trhová cena
          </div>
          <div className="benefit-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            Bez skrytých poplatkov
          </div>
        </div>

        <div className="form-wrap" id="formular">
          <div className="form-card">
            <h2>Mám záujem predať nehnuteľnosť</h2>
            <p>Zanechajte nám kontakt — ozveme sa a dohodneme si stretnutie.</p>

            {done ? (
              <div className="success-state show">
                <div className="success-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3>Skvelé, ozveme sa!</h3>
                <p>Dostali sme vašu žiadosť. Ozveme sa vám čo najskôr a dohodneme si nezáväzné stretnutie.</p>
              </div>
            ) : (
              <div className="form-fields">
                <form id="leadForm" noValidate onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="meno">Meno a priezvisko *</label>
                      <input type="text" id="meno" name="meno" placeholder="Ján Novák" autoComplete="name"
                        className={errors.meno ? 'error' : ''}
                        value={form.meno} onChange={e => setField('meno', e.target.value)} />
                      {errors.meno && <span className="field-error show">{errors.meno}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="telefon">Telefón *</label>
                      <input type="tel" id="telefon" name="telefon" placeholder="+421 9XX XXX XXX" autoComplete="tel"
                        className={errors.telefon ? 'error' : ''}
                        value={form.telefon} onChange={e => setField('telefon', e.target.value)} />
                      {errors.telefon && <span className="field-error show">{errors.telefon}</span>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="typ">Typ nehnuteľnosti *</label>
                      <select id="typ" name="typ"
                        className={errors.typ ? 'error' : ''}
                        value={form.typ} onChange={e => setField('typ', e.target.value)}>
                        <option value="">— Vybrať —</option>
                        <option>Byt</option>
                        <option>Rodinný dom</option>
                        <option>Pozemok</option>
                        <option>Komerčná nehnuteľnosť</option>
                        <option>Iné</option>
                      </select>
                      {errors.typ && <span className="field-error show">{errors.typ}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="lokalita">Lokalita *</label>
                      <input type="text" id="lokalita" name="lokalita" placeholder="Trenčín, Zlatovce…"
                        className={errors.lokalita ? 'error' : ''}
                        value={form.lokalita} onChange={e => setField('lokalita', e.target.value)} />
                      {errors.lokalita && <span className="field-error show">{errors.lokalita}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" name="email" placeholder="jan@email.sk" autoComplete="email"
                      className={errors.email ? 'error' : ''}
                      value={form.email} onChange={e => setField('email', e.target.value)} />
                    {errors.email && <span className="field-error show">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="casovyRamec">Kedy chcete predať?</label>
                    <select id="casovyRamec" name="casovyRamec"
                      value={form.casovyRamec} onChange={e => setField('casovyRamec', e.target.value)}>
                      <option value="">— Vybrať —</option>
                      <option>Čo najskôr</option>
                      <option>Do 3 mesiacov</option>
                      <option>Do 6 mesiacov</option>
                      <option>Zatiaľ len zisťujem možnosti</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="sprava">Doplňujúce informácie <span style={{ fontWeight: 400, color: 'var(--gray-400)' }}>(nepovinné)</span></label>
                    <textarea id="sprava" name="sprava" placeholder="Napr. rozloha, stav nehnuteľnosti, poschodie…"
                      value={form.sprava} onChange={e => setField('sprava', e.target.value)} />
                  </div>

                  <div className="consent-row">
                    <label className="consent-item">
                      <input type="checkbox" id="nlSuhlas" name="nlSuhlas"
                        checked={nlSuhlas} onChange={e => setNlSuhlas(e.target.checked)} />
                      <span>Súhlasím so zasielaním nových ponúk a aktuálnych nehnuteľností priamo na môj email</span>
                    </label>
                    <label className="consent-item">
                      <input type="checkbox" id="gdprSuhlas" name="gdprSuhlas"
                        checked={gdprSuhlas} onChange={e => { setGdprSuhlas(e.target.checked); setErrors(v => ({ ...v, gdpr: '' })) }} />
                      <span>Súhlasím so <a href="#" style={{ color: 'inherit', textDecoration: 'underline' }}>spracovaním osobných údajov</a></span>
                    </label>
                    {errors.gdpr && <span className="field-error show" style={{ marginTop: 2 }}>{errors.gdpr}</span>}
                  </div>

                  {errors.submit && <p style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: 8 }}>{errors.submit}</p>}

                  <button type="submit" className={`form-submit${loading ? ' loading' : ''}`} id="submitBtn" disabled={loading}>
                    <span className="btn-text">Chcem predať →</span>
                    <div className="spinner"></div>
                  </button>

                  <p className="form-note">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    Vaše údaje sú v bezpečí. Nikdy ich neposkytujeme tretím stranám.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="process-section"><div className="process">
        <p className="section-label">Ako to funguje</p>
        <h2 className="section-title">Predaj od A po Z — bez starostí</h2>
        <div className="process-steps">
          <div className="process-step">
            <div className="process-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.82 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <div className="process-content">
              <h3>Bezplatná konzultácia</h3>
              <p>Stretneme sa s vami, obzrieme nehnuteľnosť a zhodnotíme situáciu. Bez záväzkov, bez poplatkov.</p>
            </div>
          </div>
          <div className="process-step">
            <div className="process-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <div className="process-content">
              <h3>Stanovenie reálnej ceny</h3>
              <p>Analyzujeme aktuálny trh a nastavíme cenu, ktorá maximalizuje výnos a zároveň neodradí kupujúcich.</p>
            </div>
          </div>
          <div className="process-step">
            <div className="process-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            </div>
            <div className="process-content">
              <h3>Profesionálna prezentácia</h3>
              <p>Postaráme sa o profesionálne fotografie, pôdorys a popis. Inzeráty zverejníme na všetkých relevantných portáloch.</p>
            </div>
          </div>
          <div className="process-step">
            <div className="process-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div className="process-content">
              <h3>Obhliadky a rokovania</h3>
              <p>Organizujeme obhliadky, komunikujeme so záujemcami a rokujeme o podmienkach za vás.</p>
            </div>
          </div>
          <div className="process-step">
            <div className="process-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            </div>
            <div className="process-content">
              <h3>Zmluvy a odovzdanie</h3>
              <p>Zabezpečíme právne dokumenty, kúpnopredajnú zmluvu a hladký prevod nehnuteľnosti. Vy len podpíšete.</p>
            </div>
          </div>
        </div>
      </div></section>

      <section className="why">
        <div className="why-inner">
          <p className="section-label">Prečo Zajo Reality</p>
          <h2 className="section-title">Čo nás odlišuje</h2>
          <div className="why-grid">
            <div className="why-card">
              <div className="why-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div>
                <h3>Miestna expertíza</h3>
                <p>Poznáme Trenčiansky kraj do detailu. Vieme, kde sú najžiadanejšie lokality a za čo sa reálne predáva.</p>
              </div>
            </div>
            <div className="why-card">
              <div className="why-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 8C15.5 5.5 13 4.5 10 4.5C6.134 4.5 3 7.634 3 11.5C3 15.366 6.134 18.5 10 18.5C13 18.5 15.5 17.5 17 15"/><line x1="1" y1="10" x2="14" y2="10"/><line x1="1" y1="13" x2="14" y2="13"/></svg>
              </div>
              <div>
                <h3>Transparentné poplatky</h3>
                <p>Žiadne skryté poplatky. Vopred viete, koľko zaplatíte a za čo. Pracujeme na základe úspechu.</p>
              </div>
            </div>
            <div className="why-card">
              <div className="why-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div>
                <h3>Rýchlosť predaja</h3>
                <p>Naše nehnuteľnosti sa v priemere predajú o 40% rýchlejšie ako trhový priemer v regióne.</p>
              </div>
            </div>
            <div className="why-card">
              <div className="why-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </div>
              <div>
                <h3>Osobný prístup</h3>
                <p>Nie ste len číslo. Jeden maklér sa venuje vášmu prípadu od začiatku do konca.</p>
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
