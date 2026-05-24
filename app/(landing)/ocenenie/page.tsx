'use client'
import { useState } from 'react'

const LOGO_PATH = "M 213.902344 332.1875 L 208.460938 316.855469 L 208.460938 313.875 L 213.296875 313.875 L 213.296875 303.425781 L 207.078125 303.425781 L 207.078125 332.1875 L 202.152344 332.1875 L 202.152344 299.191406 L 215.238281 299.191406 C 217.226562 299.191406 218.21875 300.199219 218.21875 302.214844 L 218.21875 314.222656 C 218.21875 316.179688 217.242188 317.1875 215.28125 317.242188 L 213.597656 317.242188 L 219.039062 332.011719 L 219.039062 332.1875 Z M 267.386719 209.125 C 267.734375 209.109375 268.03125 209.375 268.042969 209.714844 C 268.054688 210.050781 267.78125 210.335938 267.429688 210.351562 C 267.082031 210.363281 266.785156 210.101562 266.773438 209.761719 C 266.761719 209.421875 267.035156 209.136719 267.386719 209.125 Z M 358.402344 126.726562 L 358.402344 150.214844 L 339.746094 150.214844 L 339.746094 118.546875 Z M 241.382812 140.777344 L 241.382812 133.183594 L 325.867188 105.765625 L 325.867188 195.519531 L 331.015625 200.339844 L 331.015625 105.789062 L 388.21875 130.9375 L 388.21875 150.214844 L 411.976562 150.214844 L 406.828125 145.066406 L 393.367188 145.066406 L 393.367188 127.582031 L 328.59375 99.105469 L 236.234375 129.722656 L 236.234375 145.066406 L 187.726562 145.066406 L 182.574219 150.214844 L 236.234375 150.214844 L 236.234375 173.890625 L 241.382812 169.066406 Z M 221.429688 123.277344 L 329.339844 86.871094 L 408.171875 121.503906 L 408.171875 127.414062 L 329.253906 92.742188 L 221.429688 129.117188 Z M 169.167969 266.0625 L 201.410156 175.671875 L 169.167969 175.671875 L 169.167969 158.816406 L 223.664062 158.816406 L 223.664062 169.617188 L 188.808594 266.988281 L 235.488281 266.988281 L 256.503906 158.652344 L 276.140625 158.652344 L 283.703125 197.902344 C 280.9375 199.058594 278.148438 201.65625 276.808594 202.691406 C 278.421875 200.613281 280.992188 194.976562 279.191406 191.539062 C 275.621094 193.355469 273.230469 202.980469 270.585938 206.042969 C 268.609375 207.613281 265.808594 204.691406 260.921875 211.851562 C 260.429688 212.570312 260.683594 212.796875 261.179688 213.578125 C 262.265625 215.28125 263.316406 214.582031 264.90625 216.070312 C 264.296875 218.074219 262.609375 218.542969 261.011719 219.921875 C 252.933594 226.894531 254.433594 234.078125 253.289062 235.867188 C 253.054688 236.234375 251.019531 237.011719 250.625 238.511719 C 250.125 240.421875 250.980469 241.140625 252.171875 241.476562 C 252.671875 241.621094 253.230469 241.699219 253.777344 241.757812 C 254.519531 241.839844 254.84375 242.019531 255.167969 241.71875 C 255.296875 241.597656 255.429688 241.402344 255.585938 241.089844 C 255.832031 240.601562 255.949219 240.054688 255.964844 239.410156 C 256.027344 239.253906 256.101562 239.292969 256.1875 239.410156 C 256.351562 240.140625 256.335938 240.8125 256.101562 241.375 C 256.058594 241.476562 256.011719 241.574219 255.957031 241.664062 C 255.761719 242.082031 255.941406 242.238281 256.160156 242.363281 C 256.246094 242.410156 256.332031 242.460938 256.414062 242.511719 C 257.253906 243.003906 257.421875 243.175781 259.207031 243.300781 C 262.386719 243.527344 276.296875 243.21875 278.292969 241.933594 C 278.179688 238.867188 276.003906 239.132812 273.1875 238.175781 C 273.378906 235.988281 274.015625 234.304688 272.714844 231.957031 C 272 230.664062 270.765625 229.695312 268.972656 229.253906 C 267.941406 229.003906 267.867188 228.210938 269.132812 228.578125 C 270.058594 228.847656 270.8125 229.214844 271.4375 229.695312 C 273.035156 230.921875 273.179688 232.402344 274.421875 233.894531 C 275.980469 235.765625 278.046875 234.421875 276.652344 232.277344 C 276.457031 231.972656 276.25 231.722656 276.152344 231.582031 C 275.378906 230.460938 274.726562 229.613281 274.21875 228.875 C 273.046875 227.179688 272.621094 226.058594 273.140625 223.476562 C 273.5625 218.667969 273.984375 213.859375 274.402344 209.046875 C 275.707031 207.957031 281.519531 205.253906 284.390625 201.46875 L 300.199219 283.519531 L 300.199219 283.84375 L 281.707031 283.84375 L 277.941406 260.117188 L 254.539062 260.117188 L 250.777344 283.84375 L 169.167969 283.84375 Z M 425.382812 271.960938 C 425.382812 275.667969 424.402344 278.507812 422.4375 280.46875 C 420.472656 282.433594 417.691406 283.414062 414.089844 283.414062 L 373.503906 283.414062 C 366.085938 283.414062 362.378906 279.597656 362.378906 271.960938 L 362.378906 169.84375 C 362.378906 162.207031 366.085938 158.386719 373.503906 158.386719 L 414.089844 158.386719 C 417.691406 158.386719 420.472656 159.371094 422.4375 161.332031 C 424.402344 163.296875 425.382812 166.132812 425.382812 169.84375 Z M 406.726562 174.425781 L 381.035156 174.425781 L 381.035156 267.378906 L 406.726562 267.378906 Z M 358.402344 272.390625 C 358.402344 280.027344 354.582031 283.84375 346.945312 283.84375 L 311.433594 283.84375 C 307.835938 283.84375 305.054688 282.863281 303.089844 280.898438 C 301.125 278.9375 300.144531 276.097656 300.144531 272.390625 L 300.144531 244.078125 L 318.800781 244.078125 L 318.800781 267.808594 L 339.746094 267.808594 L 339.746094 158.816406 L 358.402344 158.816406 Z M 234.550781 332.1875 L 234.550781 299.191406 L 248.113281 299.191406 L 248.113281 303.554688 L 239.476562 303.554688 L 239.476562 313.183594 L 246.902344 313.183594 L 246.902344 317.460938 L 239.476562 317.460938 L 239.476562 327.824219 L 248.242188 327.824219 L 248.242188 332.1875 Z M 275.933594 332.1875 L 274.941406 325.925781 L 268.765625 325.925781 L 267.769531 332.1875 L 262.890625 332.1875 L 262.890625 332.101562 L 269.28125 299.148438 L 274.464844 299.148438 L 280.8125 332.101562 L 280.8125 332.1875 Z M 271.832031 306.792969 L 269.414062 321.691406 L 274.25 321.691406 Z M 296.066406 332.1875 L 296.066406 299.191406 L 300.988281 299.191406 L 300.988281 327.78125 L 309.023438 327.78125 L 309.023438 332.1875 Z M 324.535156 332.1875 L 324.535156 299.191406 L 329.457031 299.191406 L 329.457031 332.1875 Z M 354.902344 303.554688 L 354.902344 332.1875 L 349.980469 332.1875 L 349.980469 303.554688 L 344.582031 303.554688 L 344.582031 299.191406 L 360.34375 299.191406 L 360.34375 303.554688 Z M 385.878906 320.050781 L 385.878906 332.1875 L 380.910156 332.1875 L 380.910156 320.050781 L 374.390625 299.367188 L 374.390625 299.191406 L 379.484375 299.191406 L 383.414062 313.53125 L 387.34375 299.191406 L 392.398438 299.191406 L 392.398438 299.367188 Z"

type ToggleVal = 'Áno' | 'Nie' | ''

interface BytFields {
  adresa: string; izby: string; plocha: string; stav: string; konstr: string;
  posch: string; celkPosch: string;
  balkon: ToggleVal; balkonPocet: string; balkonVymera: string;
  terasa: ToggleVal; terasaPocet: string; terasaVymera: string;
  pivnica: ToggleVal; pivnicaPocet: string;
  zahrada: ToggleVal; zahradaPocet: string;
  park: ToggleVal; parkPocet: string;
  garaz: ToggleVal; garazPocet: string;
}

interface DomFields {
  adresa: string; izby: string; plocha: string; stav: string; konstr: string; posch: string; vymeraPozemku: string;
  balkon: ToggleVal; balkonPocet: string; balkonVymera: string;
  terasa: ToggleVal; terasaPocet: string; terasaVymera: string;
  pivnica: ToggleVal; pivnicaPocet: string;
  park: ToggleVal; parkPocet: string;
  garaz: ToggleVal; garazPocet: string;
}

interface PozemokFields {
  adresa: string; vymera: string; typ: string;
}

export default function OceneniePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedType, setSelectedType] = useState<'Byt' | 'Dom' | 'Pozemok' | ''>('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [successType, setSuccessType] = useState<'predaj' | 'info' | null>(null)

  // Step 3 contact fields
  const [meno, setMeno] = useState('')
  const [telefon, setTelefon] = useState('')
  const [email, setEmail] = useState('')
  const [dovod, setDovod] = useState('')
  const [nlSuhlas, setNlSuhlas] = useState(false)
  const [gdprSuhlas, setGdprSuhlas] = useState(false)

  // Byt fields
  const [byt, setByt] = useState<BytFields>({
    adresa: '', izby: '', plocha: '', stav: '', konstr: '', posch: '', celkPosch: '',
    balkon: '', balkonPocet: '', balkonVymera: '',
    terasa: '', terasaPocet: '', terasaVymera: '',
    pivnica: '', pivnicaPocet: '',
    zahrada: '', zahradaPocet: '',
    park: '', parkPocet: '',
    garaz: '', garazPocet: '',
  })

  // Dom fields
  const [dom, setDom] = useState<DomFields>({
    adresa: '', izby: '', plocha: '', stav: '', konstr: '', posch: '', vymeraPozemku: '',
    balkon: '', balkonPocet: '', balkonVymera: '',
    terasa: '', terasaPocet: '', terasaVymera: '',
    pivnica: '', pivnicaPocet: '',
    park: '', parkPocet: '',
    garaz: '', garazPocet: '',
  })

  // Pozemok fields
  const [pozemok, setPozemok] = useState<PozemokFields>({ adresa: '', vymera: '', typ: '' })

  function goStep(to: number) {
    if (to === 2 && !selectedType) return
    if (to === 3 && !validateStep2()) return
    setCurrentStep(to)
    if (typeof window !== 'undefined') {
      const el = document.getElementById('wizard')
      if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
    }
  }

  function validateStep2(): boolean {
    const e: Record<string, string> = {}
    if (selectedType === 'Byt') {
      if (byt.adresa.trim().length <= 2) e.adresaByt = 'Vyplňte adresu'
      if (!byt.izby) e.izbByt = 'Vyberte počet izieb'
      if (!byt.plocha || Number(byt.plocha) <= 0) e.plochaByt = 'Vyplňte plochu'
      if (!byt.stav) e.stavByt = 'Vyberte stav'
    } else if (selectedType === 'Dom') {
      if (dom.adresa.trim().length <= 2) e.adresaDom = 'Vyplňte adresu'
      if (!dom.izby) e.izbDom = 'Vyberte počet izieb'
      if (!dom.plocha || Number(dom.plocha) <= 0) e.plochaDom = 'Vyplňte plochu'
      if (!dom.stav) e.stavDom = 'Vyberte stav'
    } else if (selectedType === 'Pozemok') {
      if (pozemok.adresa.trim().length <= 2) e.adresaPozemok = 'Vyplňte adresu'
      if (!pozemok.vymera || Number(pozemok.vymera) <= 0) e.vymeraPozemok = 'Vyplňte výmeru'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function validateStep3(): boolean {
    const e: Record<string, string> = {}
    if (meno.trim().length < 2) e.meno = 'Vyplňte meno'
    if (!/^[\d\s+\-]{9,}$/.test(telefon.trim())) e.telefon = 'Vyplňte telefón'
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Neplatný e-mail'
    if (!gdprSuhlas) e.gdpr = 'Toto pole je povinné'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function toggle(field: string, val: ToggleVal) {
    const setter = field.endsWith('Byt') || (selectedType === 'Byt') ? 'byt' : 'dom'
    if (selectedType === 'Byt') {
      const key = field.replace('Byt', '').toLowerCase() as keyof BytFields
      setByt(prev => ({ ...prev, [key]: val }))
    } else {
      const key = field.replace('Dom', '').toLowerCase() as keyof DomFields
      setDom(prev => ({ ...prev, [key]: val }))
    }
  }

  function collectData() {
    const base = {
      name: meno.trim() || null,
      email: email.trim() || null,
      phone: telefon.trim() || null,
      typ_nehnutelnosti: selectedType || null,
      source: 'landing_page',
      newsletter_opt: nlSuhlas,
    }
    if (selectedType === 'Byt') {
      const doplnok = [
        byt.izby ? 'Izby: ' + byt.izby : null,
        byt.konstr ? 'Konštrukcia: ' + byt.konstr : null,
        byt.posch ? 'Poschodie: ' + byt.posch : null,
        dovod ? 'Dôvod: ' + dovod : null,
      ].filter(Boolean).join('; ')
      return {
        ...base,
        lokalita: byt.adresa || null,
        rozloha: byt.plocha ? String(byt.plocha) : null,
        stav_nehnutelnosti: byt.stav || null,
        doplnujuce_info: doplnok || null,
      }
    }
    if (selectedType === 'Dom') {
      const doplnok = [
        dom.izby ? 'Izby: ' + dom.izby : null,
        dom.konstr ? 'Konštrukcia: ' + dom.konstr : null,
        dovod ? 'Dôvod: ' + dovod : null,
      ].filter(Boolean).join('; ')
      return {
        ...base,
        lokalita: dom.adresa || null,
        rozloha: dom.plocha ? String(dom.plocha) : null,
        stav_nehnutelnosti: dom.stav || null,
        doplnujuce_info: doplnok || null,
      }
    }
    // Pozemok
    return {
      ...base,
      lokalita: pozemok.adresa || null,
      rozloha: pozemok.vymera ? String(pozemok.vymera) : null,
      stav_nehnutelnosti: null,
      doplnujuce_info: pozemok.typ ? 'Druh pozemku: ' + pozemok.typ : null,
    }
  }

  async function submitForm() {
    if (!validateStep3()) return
    setLoading(true)
    try {
      const payload = collectData()
      const res = await fetch('/api/leads/ocenenie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
    setSuccessType(dovod === 'len-hodnota' ? 'info' : 'predaj')
    if (typeof window !== 'undefined') {
      const el = document.getElementById('wizard')
      if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
    }
  }

  function ToggleRow({ field, valByt, valDom, label }: { field: string; valByt: ToggleVal; valDom: ToggleVal; label: string }) {
    const val = selectedType === 'Byt' ? valByt : valDom
    return (
      <div className="form-group">
        <label>{label}</label>
        <div className="toggle-row">
          <button type="button" className={`toggle-opt${val === 'Nie' ? ' active' : ''}`}
            onClick={() => toggle(field, 'Nie')}>NIE</button>
          <button type="button" className={`toggle-opt${val === 'Áno' ? ' active' : ''}`}
            onClick={() => toggle(field, 'Áno')}>ÁNO</button>
        </div>
      </div>
    )
  }

  const progressPct = { 1: 33, 2: 66, 3: 100 }[currentStep] || 33

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
:root {
  --navy:       #0F172A;
  --gold:       #F59E0B;
  --gold-dark:  #D97706;
  --gold-light: #FEF3C7;
  --white:      #FFFFFF;
  --gray-50:    #F8FAFC;
  --gray-100:   #F1F5F9;
  --gray-300:   #CBD5E1;
  --gray-400:   #94A3B8;
  --gray-600:   #475569;
  --gray-700:   #334155;
  --green:      #059669;
  --ease-out:   cubic-bezier(0.23, 1, 0.32, 1);
}
*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
html { scroll-behavior: smooth; font-size: 16px; overflow-x: hidden; }
body { font-family: 'Inter', sans-serif; background: var(--white); color: var(--navy); -webkit-font-smoothing: antialiased; overflow-x: hidden; }
nav { display: none; }
.hero-logo { text-align: center; margin-bottom: 20px; }
.hero-logo svg { height: 62px; width: auto; display: block; margin: 0 auto; }
.hero { background: linear-gradient(150deg, #060E1A 0%, #0F172A 60%, #1a2744 100%); padding: 28px 24px 0; text-align: center; position: relative; overflow: visible; }
.hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 70% 50% at 50% 0%, rgba(245,158,11,0.18) 0%, transparent 70%); pointer-events: none; }
.hero::after { content: ''; position: absolute; bottom: -2px; left: -5%; right: -5%; width: 110%; height: 80px; background: var(--white); border-radius: 50% 50% 0 0 / 100% 100% 0 0; pointer-events: none; }
.hero-badge { display: inline-flex; align-items: center; gap: 7px; background: rgba(245,158,11,0.14); border: 1px solid rgba(245,158,11,0.32); color: var(--gold); font-size: 0.78rem; font-weight: 700; padding: 6px 16px; border-radius: 99px; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 22px; animation: fadeUp .5s var(--ease-out) both; }
.hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(1.9rem, 5vw, 3.4rem); font-weight: 700; color: var(--white); line-height: 1.1; letter-spacing: -.02em; max-width: 680px; margin: 0 auto 18px; animation: fadeUp .5s 60ms var(--ease-out) both; }
.hero h1 em { font-style: normal; color: var(--gold); }
.hero-sub { font-size: 1.05rem; color: rgba(255,255,255,.65); max-width: 460px; margin: 0 auto 36px; line-height: 1.65; animation: fadeUp .5s 120ms var(--ease-out) both; }
.trust-row { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-bottom: 44px; animation: fadeUp .5s 180ms var(--ease-out) both; }
.trust-chip { display: flex; align-items: center; gap: 6px; background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.12); color: rgba(255,255,255,.82); font-size: .8rem; font-weight: 500; padding: 6px 14px; border-radius: 99px; }
.trust-chip svg { color: var(--gold); flex-shrink: 0; }
.wizard-wrap { max-width: 620px; margin: 0 auto; animation: fadeUp .5s 240ms var(--ease-out) both; position: relative; z-index: 2; }
.wizard-card { background: var(--white); border-radius: 20px; box-shadow: 0 -12px 60px rgba(0,0,0,.35); overflow: hidden; position: relative; z-index: 1; }
.wizard-progress { height: 4px; background: var(--gray-100); position: relative; }
.wizard-progress-fill { height: 100%; background: var(--gold); border-radius: 99px; transition: width 400ms var(--ease-out); }
.wizard-header { padding: 28px 32px 0; display: flex; align-items: center; justify-content: space-between; }
@media (max-width:480px) { .wizard-header { padding: 20px 18px 0; } }
.step-indicator { font-size: .75rem; font-weight: 700; color: var(--gray-400); letter-spacing: .06em; text-transform: uppercase; }
.step-indicator span { color: var(--gold); }
.wizard-back { display: none; align-items: center; gap: 5px; background: none; border: none; cursor: pointer; font-size: .82rem; font-weight: 600; color: var(--gray-600); padding: 6px 0; transition: color 180ms var(--ease-out); }
.wizard-back:hover { color: var(--navy); }
.wizard-back svg { transition: transform 180ms var(--ease-out); }
.wizard-back:hover svg { transform: translateX(-3px); }
.wizard-back.show { display: flex; }
.wizard-body { padding: 20px 32px 32px; }
@media (max-width:480px) { .wizard-body { padding: 16px 18px 24px; } }
.wizard-title { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700; color: var(--navy); margin-bottom: 6px; }
.wizard-sub { font-size: .875rem; color: var(--gray-600); margin-bottom: 24px; }
.type-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 8px; }
@media (max-width:400px) { .type-grid { grid-template-columns: 1fr; } }
.type-btn { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 20px 12px; border: 2px solid #E2E8F0; border-radius: 14px; background: var(--gray-50); cursor: pointer; transition: border-color 200ms var(--ease-out), background 200ms var(--ease-out), transform 160ms var(--ease-out), box-shadow 200ms var(--ease-out); -webkit-appearance: none; font-family: 'Inter', sans-serif; }
@media (hover: hover) { .type-btn:hover { border-color: var(--gold); background: var(--gold-light); box-shadow: 0 4px 16px rgba(245,158,11,.15); } }
.type-btn:active { transform: scale(.97); }
.type-btn.selected { border-color: var(--gold); background: var(--gold-light); box-shadow: 0 4px 20px rgba(245,158,11,.2); }
.type-icon { width: 48px; height: 48px; background: rgba(245,158,11,.12); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--gold-dark); }
.type-btn.selected .type-icon { background: var(--gold); color: var(--navy); }
.type-label { font-size: .9rem; font-weight: 700; color: var(--navy); }
.form-section-title { font-size: .75rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--gold-dark); margin: 20px 0 12px; padding-bottom: 6px; border-bottom: 1px solid var(--gold-light); }
.form-section-title:first-child { margin-top: 0; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
@media (max-width:480px) { .form-grid { grid-template-columns: 1fr; } }
.form-grid.thirds { grid-template-columns: 1fr 1fr 1fr; }
@media (max-width:480px) { .form-grid.thirds { grid-template-columns: 1fr 1fr; } }
.form-group { display: flex; flex-direction: column; gap: 5px; }
.form-group.full { grid-column: 1 / -1; }
label { font-size: .78rem; font-weight: 600; color: var(--gray-700); letter-spacing: .02em; }
input[type=text], input[type=tel], input[type=email], input[type=number], select, textarea { font-family: 'Inter', sans-serif; font-size: .875rem; color: var(--navy); background: var(--gray-50); border: 1.5px solid #E2E8F0; border-radius: 9px; padding: 10px 12px; outline: none; width: 100%; -webkit-appearance: none; transition: border-color 180ms var(--ease-out), box-shadow 180ms var(--ease-out), background 180ms var(--ease-out); }
input:focus, select:focus, textarea:focus { border-color: var(--gold); background: var(--white); box-shadow: 0 0 0 3px rgba(245,158,11,.12); }
input.error, select.error { border-color: #EF4444; }
.field-error { font-size: .72rem; color: #EF4444; display: none; }
.field-error.show { display: block; }
select { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 10px center; padding-right: 34px; cursor: pointer; }
textarea { resize: vertical; min-height: 72px; }
.toggle-row { display: flex; align-items: center; gap: 0; border: 1.5px solid #E2E8F0; border-radius: 9px; overflow: hidden; background: var(--gray-50); }
.toggle-opt { flex: 1; padding: 10px 0; text-align: center; font-size: .82rem; font-weight: 600; cursor: pointer; color: var(--gray-600); transition: background 180ms var(--ease-out), color 180ms var(--ease-out); user-select: none; border: none; background: transparent; font-family: 'Inter', sans-serif; }
.toggle-opt + .toggle-opt { border-left: 1.5px solid #E2E8F0; }
.toggle-opt.active { background: var(--gold); color: var(--navy); }
.extras-row { display: none; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 8px; }
.extras-row.show { display: grid; }
@media (max-width:400px) { .extras-row { grid-template-columns: 1fr; } }
.wizard-btn { width: 100%; background: var(--gold); color: var(--navy); font-family: 'Inter', sans-serif; font-size: 1rem; font-weight: 700; padding: 15px 24px; border: none; border-radius: 12px; cursor: pointer; margin-top: 20px; display: flex; align-items: center; justify-content: center; gap: 8px; transition: background 180ms var(--ease-out), transform 160ms var(--ease-out), box-shadow 200ms var(--ease-out); position: relative; }
@media (hover: hover) { .wizard-btn:hover { background: var(--gold-dark); box-shadow: 0 8px 24px rgba(245,158,11,.35); } }
.wizard-btn:active { transform: scale(.97); }
.wizard-btn:disabled { opacity: .65; cursor: not-allowed; transform: none; }
.spinner { width: 18px; height: 18px; border: 2px solid rgba(15,23,42,.2); border-top-color: var(--navy); border-radius: 50%; animation: spin .6s linear infinite; display: none; }
.wizard-btn.loading .btn-text { display: none; }
.wizard-btn.loading .spinner { display: block; }
.form-note { text-align: center; font-size: .72rem; color: var(--gray-400); margin-top: 10px; display: flex; align-items: center; justify-content: center; gap: 5px; }
.consent-row { display: flex; flex-direction: column; gap: 6px; margin-top: 12px; }
.consent-item { display: flex; align-items: flex-start; gap: 6px; cursor: pointer; }
.consent-item input[type=checkbox] { -webkit-appearance: none; appearance: none; width: 12px; height: 12px; flex-shrink: 0; margin-top: 2px; border: 1px solid var(--gray-400); border-radius: 2px; background: var(--white); cursor: pointer; position: relative; transition: background 120ms, border-color 120ms; }
.consent-item input[type=checkbox]:checked { background: var(--gray-400); border-color: var(--gray-400); }
.consent-item input[type=checkbox]:checked::after { content: ''; position: absolute; top: 1px; left: 3px; width: 4px; height: 7px; border: 1.5px solid var(--white); border-top: none; border-left: none; transform: rotate(45deg); }
.consent-item span { font-size: .66rem; font-weight: 300; color: var(--gray-400); line-height: 1.4; }
.success-view { display: none; text-align: center; padding: 48px 32px; }
.success-view.show { display: block; }
.success-icon { width: 68px; height: 68px; background: #D1FAE5; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; animation: popIn .4s var(--ease-out) both; }
.success-icon svg { color: var(--green); }
.success-view h2 { font-family: 'Playfair Display', serif; font-size: 1.6rem; color: var(--navy); margin-bottom: 10px; }
.success-view p { font-size: .9rem; color: var(--gray-600); line-height: 1.65; }
.how { padding: 72px 24px; max-width: 840px; margin: 0 auto; text-align: center; }
.section-eyebrow { font-size: .72rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--gold); margin-bottom: 12px; }
.section-h2 { font-family: 'Playfair Display', serif; font-size: clamp(1.5rem, 3vw, 2.2rem); font-weight: 700; color: var(--navy); letter-spacing: -.02em; margin-bottom: 44px; }
.steps { display: grid; grid-template-columns: 1fr; gap: 20px; text-align: left; }
@media (min-width: 600px) { .steps { grid-template-columns: repeat(3, 1fr); gap: 28px; } }
.step-num { width: 42px; height: 42px; background: var(--gold-light); border-radius: 11px; display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 700; color: var(--gold-dark); margin-bottom: 12px; }
.steps h3 { font-size: .95rem; font-weight: 600; color: var(--navy); margin-bottom: 6px; }
.steps p { font-size: .84rem; color: var(--gray-600); line-height: 1.6; }
.proof { background: var(--gray-50); padding: 64px 24px; }
.proof-inner { max-width: 860px; margin: 0 auto; text-align: center; }
.stats { display: flex; justify-content: center; gap: 56px; flex-wrap: wrap; margin-bottom: 44px; }
.stat-n { font-family: 'Playfair Display', serif; font-size: 2.4rem; font-weight: 700; color: var(--navy); line-height: 1; margin-bottom: 4px; }
.stat-n span { color: var(--gold); }
.stat-l { font-size: .85rem; color: var(--gray-600); }
.reviews { display: grid; grid-template-columns: 1fr; gap: 14px; }
@media (min-width: 600px) { .reviews { grid-template-columns: repeat(3, 1fr); gap: 18px; } }
.review-card { background: var(--white); border: 1px solid #E2E8F0; border-radius: 14px; padding: 20px; text-align: left; transition: box-shadow 200ms var(--ease-out); }
@media (hover: hover) { .review-card:hover { box-shadow: 0 6px 20px rgba(15,23,42,.08); } }
.stars { color: var(--gold); font-size: .85rem; letter-spacing: 1px; margin-bottom: 8px; }
.review-card blockquote { font-size: .84rem; color: var(--gray-700); line-height: 1.6; font-style: italic; margin-bottom: 12px; }
.review-card cite { font-size: .78rem; font-weight: 700; color: var(--navy); font-style: normal; display: block; }
.review-loc { font-size: .73rem; color: var(--gray-400); }
footer { background: var(--navy); color: rgba(255,255,255,.45); text-align: center; padding: 26px 24px; font-size: .78rem; }
footer a { color: rgba(255,255,255,.55); text-decoration: none; }
footer a:hover { color: var(--gold); }
@keyframes fadeUp { from { opacity:0; transform: translateY(14px); } to { opacity:1; transform: translateY(0); } }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes popIn { from { opacity:0; transform: scale(.75); } to { opacity:1; transform: scale(1); } }
@keyframes slideIn { from { opacity:0; transform: translateX(24px); } to { opacity:1; transform: translateX(0); } }
.step-enter { animation: slideIn 280ms var(--ease-out) both; }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; } }
      `}</style>

      <nav></nav>

      <section className="hero">
        <div className="hero-logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="122.5 40.5 349.5 338" aria-label="Zajo Reality">
            <path fill="#F59E0B" fillRule="nonzero" d={LOGO_PATH} />
          </svg>
        </div>

        <h1>Za koľko môžete predať svoju <em>nehnuteľnosť</em>?</h1>
        <p className="hero-sub">Zistite reálnu predajnú cenu — bezplatne a do 24 hodín.</p>

        <div className="trust-row">
          <div className="trust-chip"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>Výsledok do 24 hodín</div>
          <div className="trust-chip"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>100% zadarmo</div>
          <div className="trust-chip"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>Bez záväzkov</div>
          <div className="trust-chip"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>Trenčiansky kraj</div>
        </div>

        <div className="wizard-wrap" id="wizard">
          <div className="wizard-card">
            <div className="wizard-progress">
              <div className="wizard-progress-fill" style={{ width: `${progressPct}%` }}></div>
            </div>

            <div className="wizard-header">
              <span className="step-indicator">Krok <span>{currentStep}</span> z 3</span>
              <button className={`wizard-back${currentStep > 1 && !successType ? ' show' : ''}`} aria-label="Späť"
                onClick={() => goStep(currentStep - 1)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                Späť
              </button>
            </div>

            <div className="wizard-body">

              {/* STEP 1 */}
              {currentStep === 1 && !successType && (
                <div>
                  <div className="wizard-title">Aký typ nehnuteľnosti chcete oceniť?</div>
                  <div className="wizard-sub">Vyberte typ — formulár sa prispôsobí automaticky.</div>
                  <div className="type-grid">
                    <button className={`type-btn${selectedType === 'Byt' ? ' selected' : ''}`} onClick={() => setSelectedType('Byt')}>
                      <div className="type-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                      </div>
                      <span className="type-label">Byt</span>
                    </button>
                    <button className={`type-btn${selectedType === 'Dom' ? ' selected' : ''}`} onClick={() => setSelectedType('Dom')}>
                      <div className="type-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                      </div>
                      <span className="type-label">Dom</span>
                    </button>
                    <button className={`type-btn${selectedType === 'Pozemok' ? ' selected' : ''}`} onClick={() => setSelectedType('Pozemok')}>
                      <div className="type-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 17l4-8 4 4 3-5 4 9"/><line x1="3" y1="21" x2="21" y2="21"/></svg>
                      </div>
                      <span className="type-label">Pozemok</span>
                    </button>
                  </div>
                  <button className="wizard-btn" onClick={() => goStep(2)} disabled={!selectedType}>
                    <span className="btn-text">Pokračovať →</span>
                  </button>
                </div>
              )}

              {/* STEP 2 */}
              {currentStep === 2 && !successType && (
                <div>
                  <div className="wizard-title">
                    {selectedType === 'Byt' ? 'Detaily bytu' : selectedType === 'Dom' ? 'Detaily domu' : 'Detaily pozemku'}
                  </div>
                  <div className="wizard-sub">Čím viac informácií, tým presnejšie ocenenie.</div>

                  {/* BYT */}
                  {selectedType === 'Byt' && (
                    <div>
                      <p className="form-section-title">Základné informácie</p>
                      <div className="form-grid">
                        <div className="form-group full">
                          <label htmlFor="adresaByt">Adresa nehnuteľnosti *</label>
                          <input type="text" id="adresaByt" placeholder="Ulica, číslo, mesto"
                            className={errors.adresaByt ? 'error' : ''}
                            value={byt.adresa} onChange={e => { setByt(p => ({ ...p, adresa: e.target.value })); setErrors(v => ({ ...v, adresaByt: '' })) }} />
                          {errors.adresaByt && <span className="field-error show">{errors.adresaByt}</span>}
                        </div>
                        <div className="form-group">
                          <label htmlFor="izbByt">Počet izieb *</label>
                          <select id="izbByt" className={errors.izbByt ? 'error' : ''}
                            value={byt.izby} onChange={e => { setByt(p => ({ ...p, izby: e.target.value })); setErrors(v => ({ ...v, izbByt: '' })) }}>
                            <option value="">— Vybrať —</option>
                            <option>1</option><option>2</option><option>3</option><option>4</option><option>5 a viac</option>
                          </select>
                          {errors.izbByt && <span className="field-error show">{errors.izbByt}</span>}
                        </div>
                        <div className="form-group">
                          <label htmlFor="plochaByt">Úžitková plocha (m²) *</label>
                          <input type="number" id="plochaByt" placeholder="napr. 65" min="10" max="1000"
                            className={errors.plochaByt ? 'error' : ''}
                            value={byt.plocha} onChange={e => { setByt(p => ({ ...p, plocha: e.target.value })); setErrors(v => ({ ...v, plochaByt: '' })) }} />
                          {errors.plochaByt && <span className="field-error show">{errors.plochaByt}</span>}
                        </div>
                      </div>
                      <p className="form-section-title">Stav a konštrukcia</p>
                      <div className="form-grid">
                        <div className="form-group">
                          <label htmlFor="stavByt">Stav nehnuteľnosti *</label>
                          <select id="stavByt" className={errors.stavByt ? 'error' : ''}
                            value={byt.stav} onChange={e => { setByt(p => ({ ...p, stav: e.target.value })); setErrors(v => ({ ...v, stavByt: '' })) }}>
                            <option value="">— Vybrať —</option>
                            <option>Novostavba</option><option>Po rekonštrukcii</option>
                            <option>Čiastočná rekonštrukcia</option><option>Pôvodný stav</option><option>Zlý stav</option>
                          </select>
                          {errors.stavByt && <span className="field-error show">{errors.stavByt}</span>}
                        </div>
                        <div className="form-group">
                          <label htmlFor="konstrByt">Konštrukcia</label>
                          <select id="konstrByt" value={byt.konstr} onChange={e => setByt(p => ({ ...p, konstr: e.target.value }))}>
                            <option value="">— Vybrať —</option>
                            <option>Tehlová</option><option>Panelová</option><option>Monolitická</option><option>Iná</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="poschByt">Poschodie</label>
                          <select id="poschByt" value={byt.posch} onChange={e => setByt(p => ({ ...p, posch: e.target.value }))}>
                            <option value="">— Vybrať —</option>
                            <option>Prízemie</option>
                            {[1,2,3,4,5,6,7,8,9].map(n => <option key={n}>{n}</option>)}
                            <option>10 a viac</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="celkPoschByt">Celk. počet poschodí</label>
                          <select id="celkPoschByt" value={byt.celkPosch} onChange={e => setByt(p => ({ ...p, celkPosch: e.target.value }))}>
                            <option value="">— Vybrať —</option>
                            {[1,2,3,4,5,6,7,8,9].map(n => <option key={n}>{n}</option>)}
                            <option>10 a viac</option>
                          </select>
                        </div>
                      </div>
                      <p className="form-section-title">Príslušenstvo</p>
                      <div className="form-grid">
                        <div className="form-group">
                          <label>Balkón / Lodžia</label>
                          <div className="toggle-row">
                            <button type="button" className={`toggle-opt${byt.balkon === 'Nie' ? ' active' : ''}`} onClick={() => setByt(p => ({ ...p, balkon: 'Nie' }))}>NIE</button>
                            <button type="button" className={`toggle-opt${byt.balkon === 'Áno' ? ' active' : ''}`} onClick={() => setByt(p => ({ ...p, balkon: 'Áno' }))}>ÁNO</button>
                          </div>
                          {byt.balkon === 'Áno' && (
                            <div className="extras-row show">
                              <div className="form-group"><label>Počet</label><input type="number" placeholder="1" min="1" value={byt.balkonPocet} onChange={e => setByt(p => ({ ...p, balkonPocet: e.target.value }))} /></div>
                              <div className="form-group"><label>Výmera (m²)</label><input type="number" placeholder="8" min="1" value={byt.balkonVymera} onChange={e => setByt(p => ({ ...p, balkonVymera: e.target.value }))} /></div>
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label>Terasa</label>
                          <div className="toggle-row">
                            <button type="button" className={`toggle-opt${byt.terasa === 'Nie' ? ' active' : ''}`} onClick={() => setByt(p => ({ ...p, terasa: 'Nie' }))}>NIE</button>
                            <button type="button" className={`toggle-opt${byt.terasa === 'Áno' ? ' active' : ''}`} onClick={() => setByt(p => ({ ...p, terasa: 'Áno' }))}>ÁNO</button>
                          </div>
                          {byt.terasa === 'Áno' && (
                            <div className="extras-row show">
                              <div className="form-group"><label>Počet</label><input type="number" placeholder="1" min="1" value={byt.terasaPocet} onChange={e => setByt(p => ({ ...p, terasaPocet: e.target.value }))} /></div>
                              <div className="form-group"><label>Výmera (m²)</label><input type="number" placeholder="15" min="1" value={byt.terasaVymera} onChange={e => setByt(p => ({ ...p, terasaVymera: e.target.value }))} /></div>
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label>Pivnica</label>
                          <div className="toggle-row">
                            <button type="button" className={`toggle-opt${byt.pivnica === 'Nie' ? ' active' : ''}`} onClick={() => setByt(p => ({ ...p, pivnica: 'Nie' }))}>NIE</button>
                            <button type="button" className={`toggle-opt${byt.pivnica === 'Áno' ? ' active' : ''}`} onClick={() => setByt(p => ({ ...p, pivnica: 'Áno' }))}>ÁNO</button>
                          </div>
                          {byt.pivnica === 'Áno' && (
                            <div className="extras-row show" style={{ gridTemplateColumns: '1fr' }}>
                              <div className="form-group"><label>Počet</label><input type="number" placeholder="1" min="1" value={byt.pivnicaPocet} onChange={e => setByt(p => ({ ...p, pivnicaPocet: e.target.value }))} /></div>
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label>Záhrada</label>
                          <div className="toggle-row">
                            <button type="button" className={`toggle-opt${byt.zahrada === 'Nie' ? ' active' : ''}`} onClick={() => setByt(p => ({ ...p, zahrada: 'Nie' }))}>NIE</button>
                            <button type="button" className={`toggle-opt${byt.zahrada === 'Áno' ? ' active' : ''}`} onClick={() => setByt(p => ({ ...p, zahrada: 'Áno' }))}>ÁNO</button>
                          </div>
                          {byt.zahrada === 'Áno' && (
                            <div className="extras-row show" style={{ gridTemplateColumns: '1fr' }}>
                              <div className="form-group"><label>Počet</label><input type="number" placeholder="1" min="1" value={byt.zahradaPocet} onChange={e => setByt(p => ({ ...p, zahradaPocet: e.target.value }))} /></div>
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label>Parkovacie miesto</label>
                          <div className="toggle-row">
                            <button type="button" className={`toggle-opt${byt.park === 'Nie' ? ' active' : ''}`} onClick={() => setByt(p => ({ ...p, park: 'Nie' }))}>NIE</button>
                            <button type="button" className={`toggle-opt${byt.park === 'Áno' ? ' active' : ''}`} onClick={() => setByt(p => ({ ...p, park: 'Áno' }))}>ÁNO</button>
                          </div>
                          {byt.park === 'Áno' && (
                            <div className="extras-row show" style={{ gridTemplateColumns: '1fr' }}>
                              <div className="form-group"><label>Počet</label><input type="number" placeholder="1" min="1" value={byt.parkPocet} onChange={e => setByt(p => ({ ...p, parkPocet: e.target.value }))} /></div>
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label>Garáž</label>
                          <div className="toggle-row">
                            <button type="button" className={`toggle-opt${byt.garaz === 'Nie' ? ' active' : ''}`} onClick={() => setByt(p => ({ ...p, garaz: 'Nie' }))}>NIE</button>
                            <button type="button" className={`toggle-opt${byt.garaz === 'Áno' ? ' active' : ''}`} onClick={() => setByt(p => ({ ...p, garaz: 'Áno' }))}>ÁNO</button>
                          </div>
                          {byt.garaz === 'Áno' && (
                            <div className="extras-row show" style={{ gridTemplateColumns: '1fr' }}>
                              <div className="form-group"><label>Počet</label><input type="number" placeholder="1" min="1" value={byt.garazPocet} onChange={e => setByt(p => ({ ...p, garazPocet: e.target.value }))} /></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* DOM */}
                  {selectedType === 'Dom' && (
                    <div>
                      <p className="form-section-title">Základné informácie</p>
                      <div className="form-grid">
                        <div className="form-group full">
                          <label htmlFor="adresaDom">Adresa nehnuteľnosti *</label>
                          <input type="text" id="adresaDom" placeholder="Ulica, číslo, mesto"
                            className={errors.adresaDom ? 'error' : ''}
                            value={dom.adresa} onChange={e => { setDom(p => ({ ...p, adresa: e.target.value })); setErrors(v => ({ ...v, adresaDom: '' })) }} />
                          {errors.adresaDom && <span className="field-error show">{errors.adresaDom}</span>}
                        </div>
                        <div className="form-group">
                          <label htmlFor="izbDom">Počet izieb *</label>
                          <select id="izbDom" className={errors.izbDom ? 'error' : ''}
                            value={dom.izby} onChange={e => { setDom(p => ({ ...p, izby: e.target.value })); setErrors(v => ({ ...v, izbDom: '' })) }}>
                            <option value="">— Vybrať —</option>
                            <option>1</option><option>2</option><option>3</option><option>4</option><option>5 a viac</option>
                          </select>
                          {errors.izbDom && <span className="field-error show">{errors.izbDom}</span>}
                        </div>
                        <div className="form-group">
                          <label htmlFor="plochaDom">Úžitková plocha (m²) *</label>
                          <input type="number" id="plochaDom" placeholder="napr. 120" min="20" max="2000"
                            className={errors.plochaDom ? 'error' : ''}
                            value={dom.plocha} onChange={e => { setDom(p => ({ ...p, plocha: e.target.value })); setErrors(v => ({ ...v, plochaDom: '' })) }} />
                          {errors.plochaDom && <span className="field-error show">{errors.plochaDom}</span>}
                        </div>
                        <div className="form-group">
                          <label htmlFor="vymeraPozemku">Výmera pozemku (m²)</label>
                          <input type="number" id="vymeraPozemku" placeholder="napr. 600" min="1"
                            value={dom.vymeraPozemku} onChange={e => setDom(p => ({ ...p, vymeraPozemku: e.target.value }))} />
                        </div>
                      </div>
                      <p className="form-section-title">Stav a konštrukcia</p>
                      <div className="form-grid">
                        <div className="form-group">
                          <label htmlFor="stavDom">Stav nehnuteľnosti *</label>
                          <select id="stavDom" className={errors.stavDom ? 'error' : ''}
                            value={dom.stav} onChange={e => { setDom(p => ({ ...p, stav: e.target.value })); setErrors(v => ({ ...v, stavDom: '' })) }}>
                            <option value="">— Vybrať —</option>
                            <option>Novostavba</option><option>Po rekonštrukcii</option>
                            <option>Čiastočná rekonštrukcia</option><option>Pôvodný stav</option><option>Zlý stav</option>
                          </select>
                          {errors.stavDom && <span className="field-error show">{errors.stavDom}</span>}
                        </div>
                        <div className="form-group">
                          <label htmlFor="konstrDom">Konštrukcia</label>
                          <select id="konstrDom" value={dom.konstr} onChange={e => setDom(p => ({ ...p, konstr: e.target.value }))}>
                            <option value="">— Vybrať —</option>
                            <option>Tehlová</option><option>Panelová</option><option>Monolitická</option><option>Iná</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="poschDom">Počet poschodí</label>
                          <select id="poschDom" value={dom.posch} onChange={e => setDom(p => ({ ...p, posch: e.target.value }))}>
                            <option value="">— Vybrať —</option>
                            <option>1 — prízemie</option>
                            <option>2 — prízemie + 1. poschodie</option>
                            <option>3 — prízemie + 2 poschodia</option>
                          </select>
                        </div>
                      </div>
                      <p className="form-section-title">Príslušenstvo</p>
                      <div className="form-grid">
                        <div className="form-group">
                          <label>Balkón / Lodžia</label>
                          <div className="toggle-row">
                            <button type="button" className={`toggle-opt${dom.balkon === 'Nie' ? ' active' : ''}`} onClick={() => setDom(p => ({ ...p, balkon: 'Nie' }))}>NIE</button>
                            <button type="button" className={`toggle-opt${dom.balkon === 'Áno' ? ' active' : ''}`} onClick={() => setDom(p => ({ ...p, balkon: 'Áno' }))}>ÁNO</button>
                          </div>
                          {dom.balkon === 'Áno' && (
                            <div className="extras-row show">
                              <div className="form-group"><label>Počet</label><input type="number" placeholder="1" min="1" value={dom.balkonPocet} onChange={e => setDom(p => ({ ...p, balkonPocet: e.target.value }))} /></div>
                              <div className="form-group"><label>Výmera (m²)</label><input type="number" placeholder="8" min="1" value={dom.balkonVymera} onChange={e => setDom(p => ({ ...p, balkonVymera: e.target.value }))} /></div>
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label>Terasa</label>
                          <div className="toggle-row">
                            <button type="button" className={`toggle-opt${dom.terasa === 'Nie' ? ' active' : ''}`} onClick={() => setDom(p => ({ ...p, terasa: 'Nie' }))}>NIE</button>
                            <button type="button" className={`toggle-opt${dom.terasa === 'Áno' ? ' active' : ''}`} onClick={() => setDom(p => ({ ...p, terasa: 'Áno' }))}>ÁNO</button>
                          </div>
                          {dom.terasa === 'Áno' && (
                            <div className="extras-row show">
                              <div className="form-group"><label>Počet</label><input type="number" placeholder="1" min="1" value={dom.terasaPocet} onChange={e => setDom(p => ({ ...p, terasaPocet: e.target.value }))} /></div>
                              <div className="form-group"><label>Výmera (m²)</label><input type="number" placeholder="20" min="1" value={dom.terasaVymera} onChange={e => setDom(p => ({ ...p, terasaVymera: e.target.value }))} /></div>
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label>Pivnica</label>
                          <div className="toggle-row">
                            <button type="button" className={`toggle-opt${dom.pivnica === 'Nie' ? ' active' : ''}`} onClick={() => setDom(p => ({ ...p, pivnica: 'Nie' }))}>NIE</button>
                            <button type="button" className={`toggle-opt${dom.pivnica === 'Áno' ? ' active' : ''}`} onClick={() => setDom(p => ({ ...p, pivnica: 'Áno' }))}>ÁNO</button>
                          </div>
                          {dom.pivnica === 'Áno' && (
                            <div className="extras-row show" style={{ gridTemplateColumns: '1fr' }}>
                              <div className="form-group"><label>Počet</label><input type="number" placeholder="1" min="1" value={dom.pivnicaPocet} onChange={e => setDom(p => ({ ...p, pivnicaPocet: e.target.value }))} /></div>
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label>Parkovacie miesto</label>
                          <div className="toggle-row">
                            <button type="button" className={`toggle-opt${dom.park === 'Nie' ? ' active' : ''}`} onClick={() => setDom(p => ({ ...p, park: 'Nie' }))}>NIE</button>
                            <button type="button" className={`toggle-opt${dom.park === 'Áno' ? ' active' : ''}`} onClick={() => setDom(p => ({ ...p, park: 'Áno' }))}>ÁNO</button>
                          </div>
                          {dom.park === 'Áno' && (
                            <div className="extras-row show" style={{ gridTemplateColumns: '1fr' }}>
                              <div className="form-group"><label>Počet</label><input type="number" placeholder="1" min="1" value={dom.parkPocet} onChange={e => setDom(p => ({ ...p, parkPocet: e.target.value }))} /></div>
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label>Garáž</label>
                          <div className="toggle-row">
                            <button type="button" className={`toggle-opt${dom.garaz === 'Nie' ? ' active' : ''}`} onClick={() => setDom(p => ({ ...p, garaz: 'Nie' }))}>NIE</button>
                            <button type="button" className={`toggle-opt${dom.garaz === 'Áno' ? ' active' : ''}`} onClick={() => setDom(p => ({ ...p, garaz: 'Áno' }))}>ÁNO</button>
                          </div>
                          {dom.garaz === 'Áno' && (
                            <div className="extras-row show" style={{ gridTemplateColumns: '1fr' }}>
                              <div className="form-group"><label>Počet</label><input type="number" placeholder="1" min="1" value={dom.garazPocet} onChange={e => setDom(p => ({ ...p, garazPocet: e.target.value }))} /></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* POZEMOK */}
                  {selectedType === 'Pozemok' && (
                    <div>
                      <p className="form-section-title">Informácie o pozemku</p>
                      <div className="form-grid">
                        <div className="form-group full">
                          <label htmlFor="adresaPozemok">Adresa / lokalita *</label>
                          <input type="text" id="adresaPozemok" placeholder="Ulica, obec, katastrálne územie"
                            className={errors.adresaPozemok ? 'error' : ''}
                            value={pozemok.adresa} onChange={e => { setPozemok(p => ({ ...p, adresa: e.target.value })); setErrors(v => ({ ...v, adresaPozemok: '' })) }} />
                          {errors.adresaPozemok && <span className="field-error show">{errors.adresaPozemok}</span>}
                        </div>
                        <div className="form-group">
                          <label htmlFor="vymeraPozemok">Výmera (m²) *</label>
                          <input type="number" id="vymeraPozemok" placeholder="napr. 800" min="1"
                            className={errors.vymeraPozemok ? 'error' : ''}
                            value={pozemok.vymera} onChange={e => { setPozemok(p => ({ ...p, vymera: e.target.value })); setErrors(v => ({ ...v, vymeraPozemok: '' })) }} />
                          {errors.vymeraPozemok && <span className="field-error show">{errors.vymeraPozemok}</span>}
                        </div>
                        <div className="form-group">
                          <label htmlFor="typPozemok">Druh pozemku</label>
                          <select id="typPozemok" value={pozemok.typ} onChange={e => setPozemok(p => ({ ...p, typ: e.target.value }))}>
                            <option value="">— Vybrať —</option>
                            <option>Stavebný</option><option>Záhradný</option><option>Orná pôda</option><option>Les</option><option>Iný</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  <button className="wizard-btn" onClick={() => goStep(3)}>
                    <span className="btn-text">Pokračovať →</span>
                  </button>
                </div>
              )}

              {/* STEP 3 */}
              {currentStep === 3 && !successType && (
                <div>
                  <div className="wizard-title">Kontaktné údaje</div>
                  <div className="wizard-sub">Ozveme sa vám do 24 hodín s výsledkom ocenenia.</div>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="meno">Meno a priezvisko *</label>
                      <input type="text" id="meno" placeholder="Ján Novák" autoComplete="name"
                        className={errors.meno ? 'error' : ''}
                        value={meno} onChange={e => { setMeno(e.target.value); setErrors(v => ({ ...v, meno: '' })) }} />
                      {errors.meno && <span className="field-error show">{errors.meno}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="telefon">Telefón *</label>
                      <input type="tel" id="telefon" placeholder="+421 9XX XXX XXX" autoComplete="tel"
                        className={errors.telefon ? 'error' : ''}
                        value={telefon} onChange={e => { setTelefon(e.target.value); setErrors(v => ({ ...v, telefon: '' })) }} />
                      {errors.telefon && <span className="field-error show">{errors.telefon}</span>}
                    </div>
                    <div className="form-group full">
                      <label htmlFor="email">E-mail</label>
                      <input type="email" id="email" placeholder="jan@email.sk" autoComplete="email"
                        className={errors.email ? 'error' : ''}
                        value={email} onChange={e => { setEmail(e.target.value); setErrors(v => ({ ...v, email: '' })) }} />
                      {errors.email && <span className="field-error show">{errors.email}</span>}
                    </div>
                    <div className="form-group full">
                      <label htmlFor="dovod">Čo plánujete s nehnuteľnosťou?</label>
                      <select id="dovod" value={dovod} onChange={e => setDovod(e.target.value)}>
                        <option value="">— Vybrať —</option>
                        <option value="predaj-hned">Predať čo najskôr</option>
                        <option value="predaj-uvaha">Predať, ale ešte sa rozhodujem</option>
                        <option value="len-hodnota">Zatiaľ nič, chcem len vedieť hodnotu</option>
                      </select>
                    </div>
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
                  {errors.submit && <p style={{ fontSize: '.72rem', color: '#EF4444', marginTop: 8 }}>{errors.submit}</p>}
                  <button className={`wizard-btn${loading ? ' loading' : ''}`} id="submitBtn" onClick={submitForm} disabled={loading}>
                    <span className="btn-text">Odoslať žiadosť o ocenenie →</span>
                    <div className="spinner"></div>
                  </button>
                  <p className="form-note">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    Vaše údaje sú v bezpečí. Nikdy ich neposkytujeme tretím stranám.
                  </p>
                </div>
              )}

              {/* SUCCESS — predaj */}
              {successType === 'predaj' && (
                <div className="success-view show">
                  <div className="success-icon">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h2>Žiadosť prijatá!</h2>
                  <p>Ďakujeme. Ozveme sa vám <strong>do 24 hodín</strong> s bezplatným odborným ocenením a poradíme vám, ako dostať za nehnuteľnosť čo najlepšiu cenu.</p>
                </div>
              )}

              {/* SUCCESS — len hodnota */}
              {successType === 'info' && (
                <div className="success-view show" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div className="success-icon" style={{ background: 'rgba(245,158,11,0.12)' }}>
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  </div>
                  <h2>Žiadosť prijatá!</h2>
                  <p>Radi zistíme hodnotu vašej nehnuteľnosti. Ozveme sa vám <strong>do 24 hodín</strong>.</p>
                  <p style={{ marginTop: 12, fontSize: '0.875rem', color: 'var(--gray-600)' }}>Keď sa rozhodnete predávať, sme tu — pomôžeme vám dostať za nehnuteľnosť čo najlepšiu cenu.</p>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      <section className="how">
        <p className="section-eyebrow">Ako to funguje</p>
        <h2 className="section-h2">Tri kroky k reálnej cene</h2>
        <div className="steps">
          <div>
            <div className="step-num">1</div>
            <h3>Vyplníte formulár</h3>
            <p>Základné informácie o nehnuteľnosti. Trvá to menej ako 3 minúty.</p>
          </div>
          <div>
            <div className="step-num">2</div>
            <h3>Analyzujeme trh</h3>
            <p>Porovnáme aktuálne predaje v lokalite. Reálne dáta, nie odhady.</p>
          </div>
          <div>
            <div className="step-num">3</div>
            <h3>Dostanete výsledok</h3>
            <p>Do 24 hodín vás kontaktujeme s ocenením. Zadarmo, bez záväzkov.</p>
          </div>
        </div>
      </section>

      <section className="proof">
        <div className="proof-inner">
          <div className="stats">
            <div><div className="stat-n">120<span>+</span></div><div className="stat-l">úspešných predajov</div></div>
            <div><div className="stat-n">24<span>h</span></div><div className="stat-l">priemerný čas odpovede</div></div>
            <div><div className="stat-n">4.9<span>★</span></div><div className="stat-l">priemerné hodnotenie</div></div>
          </div>
          <div className="reviews">
            <div className="review-card">
              <div className="stars">★★★★★</div>
              <blockquote>„Ocenenie prišlo hneď nasledujúci deň. Cena bola presná — predali sme byt za cenu, ktorú nám odporučili."</blockquote>
              <cite>Marta K.</cite><div className="review-loc">Trenčín</div>
            </div>
            <div className="review-card">
              <div className="stars">★★★★★</div>
              <blockquote>„Nevedeli sme za koľko predávať. Zajo nám poradili a výsledok bol lepší ako sme čakali."</blockquote>
              <cite>Peter a Jana H.</cite><div className="review-loc">Zlatovce</div>
            </div>
            <div className="review-card">
              <div className="stars">★★★★★</div>
              <blockquote>„Profesionálny prístup, rýchla odpoveď. Práve taký maklér, akého som hľadal."</blockquote>
              <cite>Tomáš B.</cite><div className="review-loc">Trenčianske Teplice</div>
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
