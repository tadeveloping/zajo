'use client'
import './styles.css'
import { useState } from 'react'

const LOGO_PATH = "M 213.902344 332.1875 L 208.460938 316.855469 L 208.460938 313.875 L 213.296875 313.875 L 213.296875 303.425781 L 207.078125 303.425781 L 207.078125 332.1875 L 202.152344 332.1875 L 202.152344 299.191406 L 215.238281 299.191406 C 217.226562 299.191406 218.21875 300.199219 218.21875 302.214844 L 218.21875 314.222656 C 218.21875 316.179688 217.242188 317.1875 215.28125 317.242188 L 213.597656 317.242188 L 219.039062 332.011719 L 219.039062 332.1875 Z M 267.386719 209.125 C 267.734375 209.109375 268.03125 209.375 268.042969 209.714844 C 268.054688 210.050781 267.78125 210.335938 267.429688 210.351562 C 267.082031 210.363281 266.785156 210.101562 266.773438 209.761719 C 266.761719 209.421875 267.035156 209.136719 267.386719 209.125 Z M 358.402344 126.726562 L 358.402344 150.214844 L 339.746094 150.214844 L 339.746094 118.546875 Z M 241.382812 140.777344 L 241.382812 133.183594 L 325.867188 105.765625 L 325.867188 195.519531 L 331.015625 200.339844 L 331.015625 105.789062 L 388.21875 130.9375 L 388.21875 150.214844 L 411.976562 150.214844 L 406.828125 145.066406 L 393.367188 145.066406 L 393.367188 127.582031 L 328.59375 99.105469 L 236.234375 129.722656 L 236.234375 145.066406 L 187.726562 145.066406 L 182.574219 150.214844 L 236.234375 150.214844 L 236.234375 173.890625 L 241.382812 169.066406 Z M 221.429688 123.277344 L 329.339844 86.871094 L 408.171875 121.503906 L 408.171875 127.414062 L 329.253906 92.742188 L 221.429688 129.117188 Z M 169.167969 266.0625 L 201.410156 175.671875 L 169.167969 175.671875 L 169.167969 158.816406 L 223.664062 158.816406 L 223.664062 169.617188 L 188.808594 266.988281 L 235.488281 266.988281 L 256.503906 158.652344 L 276.140625 158.652344 L 283.703125 197.902344 C 280.9375 199.058594 278.148438 201.65625 276.808594 202.691406 C 278.421875 200.613281 280.992188 194.976562 279.191406 191.539062 C 275.621094 193.355469 273.230469 202.980469 270.585938 206.042969 C 268.609375 207.613281 265.808594 204.691406 260.921875 211.851562 C 260.429688 212.570312 260.683594 212.796875 261.179688 213.578125 C 262.265625 215.28125 263.316406 214.582031 264.90625 216.070312 C 264.296875 218.074219 262.609375 218.542969 261.011719 219.921875 C 252.933594 226.894531 254.433594 234.078125 253.289062 235.867188 C 253.054688 236.234375 251.019531 237.011719 250.625 238.511719 C 250.125 240.421875 250.980469 241.140625 252.171875 241.476562 C 252.671875 241.621094 253.230469 241.699219 253.777344 241.757812 C 254.519531 241.839844 254.84375 242.019531 255.167969 241.71875 C 255.296875 241.597656 255.429688 241.402344 255.585938 241.089844 C 255.832031 240.601562 255.949219 240.054688 255.964844 239.410156 C 256.027344 239.253906 256.101562 239.292969 256.1875 239.410156 C 256.351562 240.140625 256.335938 240.8125 256.101562 241.375 C 256.058594 241.476562 256.011719 241.574219 255.957031 241.664062 C 255.761719 242.082031 255.941406 242.238281 256.160156 242.363281 C 256.246094 242.410156 256.332031 242.460938 256.414062 242.511719 C 257.253906 243.003906 257.421875 243.175781 259.207031 243.300781 C 262.386719 243.527344 276.296875 243.21875 278.292969 241.933594 C 278.179688 238.867188 276.003906 239.132812 273.1875 238.175781 C 273.378906 235.988281 274.015625 234.304688 272.714844 231.957031 C 272 230.664062 270.765625 229.695312 268.972656 229.253906 C 267.941406 229.003906 267.867188 228.210938 269.132812 228.578125 C 270.058594 228.847656 270.8125 229.214844 271.4375 229.695312 C 273.035156 230.921875 273.179688 232.402344 274.421875 233.894531 C 275.980469 235.765625 278.046875 234.421875 276.652344 232.277344 C 276.457031 231.972656 276.25 231.722656 276.152344 231.582031 C 275.378906 230.460938 274.726562 229.613281 274.21875 228.875 C 273.046875 227.179688 272.621094 226.058594 273.140625 223.476562 C 273.5625 218.667969 273.984375 213.859375 274.402344 209.046875 C 275.707031 207.957031 281.519531 205.253906 284.390625 201.46875 L 300.199219 283.519531 L 300.199219 283.84375 L 281.707031 283.84375 L 277.941406 260.117188 L 254.539062 260.117188 L 250.777344 283.84375 L 169.167969 283.84375 Z M 425.382812 271.960938 C 425.382812 275.667969 424.402344 278.507812 422.4375 280.46875 C 420.472656 282.433594 417.691406 283.414062 414.089844 283.414062 L 373.503906 283.414062 C 366.085938 283.414062 362.378906 279.597656 362.378906 271.960938 L 362.378906 169.84375 C 362.378906 162.207031 366.085938 158.386719 373.503906 158.386719 L 414.089844 158.386719 C 417.691406 158.386719 420.472656 159.371094 422.4375 161.332031 C 424.402344 163.296875 425.382812 166.132812 425.382812 169.84375 Z M 406.726562 174.425781 L 381.035156 174.425781 L 381.035156 267.378906 L 406.726562 267.378906 Z M 358.402344 272.390625 C 358.402344 280.027344 354.582031 283.84375 346.945312 283.84375 L 311.433594 283.84375 C 307.835938 283.84375 305.054688 282.863281 303.089844 280.898438 C 301.125 278.9375 300.144531 276.097656 300.144531 272.390625 L 300.144531 244.078125 L 318.800781 244.078125 L 318.800781 267.808594 L 339.746094 267.808594 L 339.746094 158.816406 L 358.402344 158.816406 Z M 234.550781 332.1875 L 234.550781 299.191406 L 248.113281 299.191406 L 248.113281 303.554688 L 239.476562 303.554688 L 239.476562 313.183594 L 246.902344 313.183594 L 246.902344 317.460938 L 239.476562 317.460938 L 239.476562 327.824219 L 248.242188 327.824219 L 248.242188 332.1875 Z M 275.933594 332.1875 L 274.941406 325.925781 L 268.765625 325.925781 L 267.769531 332.1875 L 262.890625 332.1875 L 262.890625 332.101562 L 269.28125 299.148438 L 274.464844 299.148438 L 280.8125 332.101562 L 280.8125 332.1875 Z M 271.832031 306.792969 L 269.414062 321.691406 L 274.25 321.691406 Z M 296.066406 332.1875 L 296.066406 299.191406 L 300.988281 299.191406 L 300.988281 327.78125 L 309.023438 327.78125 L 309.023438 332.1875 Z M 324.535156 332.1875 L 324.535156 299.191406 L 329.457031 299.191406 L 329.457031 332.1875 Z M 354.902344 303.554688 L 354.902344 332.1875 L 349.980469 332.1875 L 349.980469 303.554688 L 344.582031 303.554688 L 344.582031 299.191406 L 360.34375 299.191406 L 360.34375 303.554688 Z M 385.878906 320.050781 L 385.878906 332.1875 L 380.910156 332.1875 L 380.910156 320.050781 L 374.390625 299.367188 L 374.390625 299.191406 L 379.484375 299.191406 L 383.414062 313.53125 L 387.34375 299.191406 L 392.398438 299.191406 L 392.398438 299.367188 Z"

const MESSAGE_PLACEHOLDERS: Record<string, string> = {
  obhliadka: 'Napr. Mám záujem o obhliadku 3-izbového bytu v centre Trenčína...',
  kúpa: 'Napr. Mám záujem o 3-izbový byt v centre Trenčína...',
  predaj: 'Napr. Chcem predať rodinný dom v Zlatovciach...',
  ocenenie: 'Napr. Chcem oceniť byt v centre Trenčína...',
  iné: 'Napr. Potrebujem poradiť s výberom vhodnej nehnuteľnosti...',
  default: 'Napr. Mám záujem o 3-izbový byt v centre Trenčína...',
}

export default function KontaktPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [interest, setInterest] = useState('')
  const [property, setProperty] = useState('')
  const [timeline, setTimeline] = useState('')
  const [message, setMessage] = useState('')
  const [propertyInterest, setPropertyInterest] = useState('')
  const [viewingDate, setViewingDate] = useState('')
  const [viewingTime, setViewingTime] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [callbackTime, setCallbackTime] = useState('')
  const [gdprSuhlas, setGdprSuhlas] = useState(false)
  const [step2BtnDisabled, setStep2BtnDisabled] = useState(true)
  const [viewingBtnDisabled, setViewingBtnDisabled] = useState(true)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [summaryRows, setSummaryRows] = useState<Array<{label: string; value: string}>>([])

  function goToStep(n: number) {
    setCurrentStep(n)
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function selectOption(field: string, val: string) {
    if (field === 'interest') {
      setInterest(val)
      setTimeout(() => goToStep(val === 'iné' ? 3 : 2), 300)
    } else if (field === 'property') {
      const newProperty = val
      setProperty(newProperty)
      setStep2BtnDisabled(!(newProperty && timeline))
    }
  }

  function selectChip(val: string) {
    setTimeline(val)
    setStep2BtnDisabled(!(property && val))
  }

  function selectCallbackChip(val: string) {
    setCallbackTime(val)
  }

  function selectViewingTime(val: string) {
    setViewingTime(val)
    setViewingBtnDisabled(!(viewingDate && val))
  }

  function validateStep4(): boolean {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = 'Vyplňte meno'
    if (!/^[\d\s+\-]{9,}$/.test(phone.trim())) e.phone = 'Vyplňte telefón'
    if (!gdprSuhlas) e.gdpr = 'Toto pole je povinné'
    const hasErrors = Object.keys(e).length > 0
    if (hasErrors) e.submit = 'Skontrolujte, prosím, vyplnené polia vyššie.'
    setErrors(e)
    return !hasErrors
  }

  function getScore() {
    if (interest === 'obhliadka') return 'HOT'
    if (timeline === 'ihneď' || timeline === '1-3 mesiace') {
      return (interest === 'predaj' || interest === 'kúpa') ? 'HOT' : 'WARM'
    } else if (timeline === '3-6 mesiacov') return 'WARM'
    return 'COLD'
  }

  function getUtm(key: string) {
    if (typeof window === 'undefined') return null
    return new URLSearchParams(window.location.search).get(key) || null
  }

  function formatViewingDate(iso: string) {
    if (!iso) return ''
    const [y, m, d] = iso.split('-')
    return `${d}.${m}.${y}`
  }

  async function submitForm() {
    if (!validateStep4()) return

    const isObhliadka = interest === 'obhliadka'

    setLoading(true)
    try {
      const res = await fetch('/api/leads/cally', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || null,
          zaujem: interest,
          nehnutelnost: isObhliadka ? (propertyInterest.trim() || null) : property,
          horizont: isObhliadka
            ? `${formatViewingDate(viewingDate)}, ${viewingTime}`.trim()
            : timeline,
          sprava: isObhliadka ? null : (message.trim() || null),
          zavolame: !!callbackTime,
          score: getScore(),
          source: 'cally',
          utm_source: getUtm('utm_source'),
          utm_campaign: getUtm('utm_campaign'),
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
    const labels: Record<string, string> = { 'kúpa': 'Kúpa', 'predaj': 'Predaj', 'ocenenie': 'Ocenenie', 'iné': 'Otázka', 'obhliadka': 'Obhliadka' }
    const cap = (s: string | null) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '—'
    setSummaryRows(
      interest === 'obhliadka'
        ? [
            { label: 'Záujem', value: labels[interest] },
            { label: 'Nehnuteľnosť', value: cap(propertyInterest) },
            { label: 'Termín', value: `${formatViewingDate(viewingDate)}, ${viewingTime}` },
          ]
        : [
            { label: 'Záujem', value: labels[interest] || cap(interest) },
            { label: 'Nehnuteľnosť', value: cap(property) },
            { label: 'Horizont', value: cap(timeline) },
            { label: 'Zavoláme', value: cap(callbackTime) },
          ]
    )
    setCurrentStep(0)
    setDone(true)
  }

  return (
    <>
      <style>{`html,body{background:#0D0B09!important;color:#F2EDE7!important;}`}</style>
      <div className="container">
        <div className="header">
          <div className="logo-wrap">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="122.5 40.5 349.5 338" aria-label="Zajo Reality">
              <path fill="#F59E0B" fillRule="nonzero" d={LOGO_PATH} />
            </svg>
          </div>
          <div className="header-sub">Ďakujeme za zavolanie, zatiaľ vyplňte krátky formulár, ihneď ako to bude možné sa Vám ozveme.</div>
        </div>

        <div className="progress-bar">
          {[1, 2, 3, 4].map(i => (
            <div key={i} id={`prog-${i}`} className={`progress-step${i < currentStep ? ' done' : ''}${i === currentStep ? ' active' : ''}`}></div>
          ))}
        </div>

        {/* Step 1 */}
        <div className={`step${currentStep === 1 ? ' active' : ''}`} id="step-1">
          <div className="step-label">Krok 1 zo 4</div>
          <div className="step-title">Ako vám môžeme pomôcť?</div>
          <div className="options" id="interest-options">
            <button className={`option${interest === 'obhliadka' ? ' selected' : ''}`} onClick={() => selectOption('interest', 'obhliadka')}>
              <div className="option-icon"><svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></div>
              <div><div className="option-label">Mám záujem o obhliadku nehnuteľnosti</div></div>
            </button>
            <button className={`option${interest === 'kúpa' ? ' selected' : ''}`} onClick={() => selectOption('interest', 'kúpa')}>
              <div className="option-icon"><svg viewBox="0 0 24 24"><path d="M21 21H3"/><path d="M3 7l9-4 9 4"/><path d="M6 7v9"/><path d="M18 7v9"/><path d="M9 21v-6h6v6"/></svg></div>
              <div><div className="option-label">Mám záujem kúpiť nehnuteľnosť</div></div>
            </button>
            <button className={`option${interest === 'predaj' ? ' selected' : ''}`} onClick={() => selectOption('interest', 'predaj')}>
              <div className="option-icon"><svg viewBox="0 0 24 24"><path d="M18 8a8 8 0 00-14 5.5A8 8 0 0018 16"/><path d="M3 10h11"/><path d="M3 14h11"/></svg></div>
              <div><div className="option-label">Mám záujem predať nehnuteľnosť</div></div>
            </button>
            <button className={`option${interest === 'ocenenie' ? ' selected' : ''}`} onClick={() => selectOption('interest', 'ocenenie')}>
              <div className="option-icon"><svg viewBox="0 0 24 24"><g transform="translate(3,2)"><path d="M9 1H2v7l7.29 7.29a1 1 0 001.42 0l5.58-5.58a1 1 0 000-1.42L9 1z"/><circle cx="5.5" cy="5.5" r="1"/></g></svg></div>
              <div><div className="option-label">Mám záujem oceniť nehnuteľnosť</div></div>
            </button>
            <button className={`option${interest === 'iné' ? ' selected' : ''}`} onClick={() => selectOption('interest', 'iné')}>
              <div className="option-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg></div>
              <div><div className="option-label">Mám otázku</div></div>
            </button>
          </div>
        </div>

        {/* Step 2 */}
        <div className={`step${currentStep === 2 ? ' active' : ''}`} id="step-2">
          <div className="step-label">Krok 2 zo 4</div>
          {interest === 'obhliadka' ? (
            <>
              <div className="step-title">O akú nehnuteľnosť máte záujem?</div>
              <div className="form-group">
                <label className="form-label">Napíšte nám adresu, názov inzerátu alebo odkaz na nehnuteľnosť</label>
                <textarea className="form-input" id="property-interest" placeholder="Napr. 3-izbový byt, Hlavná ulica, Košice" rows={4}
                  value={propertyInterest} onChange={e => setPropertyInterest(e.target.value)} />
              </div>
              <button className="btn-next" id="btn-step2" disabled={!propertyInterest.trim()} onClick={() => goToStep(3)}>Pokračovať ďalej</button>
              <button className="btn-back" onClick={() => goToStep(1)}>← Späť</button>
            </>
          ) : (
            <>
              <div className="step-title">Aký typ nehnuteľnosti?</div>
              <div className="options" id="property-options">
                <button className={`option${property === 'byt' ? ' selected' : ''}`} onClick={() => { const v = 'byt'; setProperty(v); setStep2BtnDisabled(!(v && timeline)) }}>
                  <div className="option-icon"><svg viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22V12h6v10"/><path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01"/></svg></div>
                  <div><div className="option-label">Byt</div></div>
                </button>
                <button className={`option${property === 'dom' ? ' selected' : ''}`} onClick={() => { const v = 'dom'; setProperty(v); setStep2BtnDisabled(!(v && timeline)) }}>
                  <div className="option-icon"><svg viewBox="0 0 24 24"><path d="M3 9.5L12 2l9 7.5V20a2 2 0 01-2 2H5a2 2 0 01-2-2V9.5z"/><path d="M9 22V12h6v10"/></svg></div>
                  <div><div className="option-label">Dom</div></div>
                </button>
                <button className={`option${property === 'pozemok' ? ' selected' : ''}`} onClick={() => { const v = 'pozemok'; setProperty(v); setStep2BtnDisabled(!(v && timeline)) }}>
                  <div className="option-icon"><svg viewBox="0 0 24 24"><path d="M2 22L12 2l10 20H2z"/><path d="M12 18h.01"/></svg></div>
                  <div><div className="option-label">Pozemok</div></div>
                </button>
              </div>
              <div style={{ marginTop: 28 }}>
                <div className="step-label">Časový horizont</div>
                <div className="step-title" style={{ fontSize: 20, marginBottom: 16 }}>Kedy to plánujete?</div>
                <div className="chips" id="timeline-chips">
                  {[
                    { val: 'ihneď', label: 'Čo najskôr' },
                    { val: '1-3 mesiace', label: '1–3 mesiace' },
                    { val: '3-6 mesiacov', label: '3–6 mesiacov' },
                    { val: 'len sa rozhliadam', label: 'Len sa rozhliadam' },
                  ].map(c => (
                    <button key={c.val} className={`chip${timeline === c.val ? ' selected' : ''}`} onClick={() => selectChip(c.val)}>{c.label}</button>
                  ))}
                </div>
              </div>
              <button className="btn-next" id="btn-step2" disabled={step2BtnDisabled} onClick={() => goToStep(3)}>Pokračovať ďalej</button>
              <button className="btn-back" onClick={() => goToStep(1)}>← Späť</button>
            </>
          )}
        </div>

        {/* Step 3 */}
        <div className={`step${currentStep === 3 ? ' active' : ''}`} id="step-3">
          <div className="step-label">Krok 3 zo 4</div>
          {interest === 'obhliadka' ? (
            <>
              <div className="step-title">Ktorý deň a v aký čas by vám vyhovovala obhliadka?</div>
              <div className="form-group">
                <label className="form-label">Preferovaný dátum</label>
                <input className="form-input" type="date" id="viewing-date"
                  onClick={e => (e.currentTarget as HTMLInputElement).showPicker?.()}
                  value={viewingDate} onChange={e => { setViewingDate(e.target.value); setViewingBtnDisabled(!(e.target.value && viewingTime)) }} />
              </div>
              <div className="form-group" style={{ marginTop: 20 }}>
                <label className="form-label">Preferovaný čas</label>
                <input className="form-input" type="time" id="viewing-time"
                  onClick={e => (e.currentTarget as HTMLInputElement).showPicker?.()}
                  value={viewingTime} onChange={e => selectViewingTime(e.target.value)} />
              </div>
              <button className="btn-next" disabled={viewingBtnDisabled} onClick={() => goToStep(4)}>Prejsť na kontaktné údaje</button>
              <button className="btn-back" onClick={() => goToStep(2)}>← Späť</button>
            </>
          ) : (
            <>
              <div className="step-title">Vaša správa</div>
              <div className="form-group">
                <label className="form-label">Napíšte nám bližšie vašu požiadavku (voliteľné)</label>
                <textarea className="form-input" id="message" placeholder={MESSAGE_PLACEHOLDERS[interest] || MESSAGE_PLACEHOLDERS.default} rows={4}
                  value={message} onChange={e => setMessage(e.target.value)} />
              </div>
              <button className="btn-next" onClick={() => goToStep(4)}>Prejsť na kontaktné údaje</button>
              <button className="btn-back" onClick={() => goToStep(interest === 'iné' ? 1 : 2)}>← Späť</button>
            </>
          )}
        </div>

        {/* Step 4 */}
        <div className={`step${currentStep === 4 ? ' active' : ''}`} id="step-4">
          <div className="step-label">Krok 4 zo 4</div>
          <div className="step-title">Vaše kontaktné údaje</div>
          <div className="form-group">
            <label className="form-label">Meno a priezvisko</label>
            <input className="form-input" type="text" id="name" placeholder="Ján Novák" autoComplete="name"
              value={name} onChange={e => { setName(e.target.value); setErrors(v => ({ ...v, name: '' })) }} />
            {errors.name && <span style={{ fontSize: 11, color: '#ef4444', display: 'block', marginTop: 4 }}>{errors.name}</span>}
          </div>
          <div className="form-group">
            <label className="form-label">Telefón</label>
            <input className="form-input" type="tel" id="phone" placeholder="+421 9XX XXX XXX" autoComplete="tel"
              value={phone} onChange={e => { setPhone(e.target.value); setErrors(v => ({ ...v, phone: '' })) }} />
            {errors.phone && <span style={{ fontSize: 11, color: '#ef4444', display: 'block', marginTop: 4 }}>{errors.phone}</span>}
          </div>
          <div className="form-group">
            <label className="form-label">Email (voliteľné)</label>
            <input className="form-input" type="email" id="email" placeholder="jan@email.sk" autoComplete="email"
              value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          {interest !== 'obhliadka' && (
            <div className="form-group">
              <label className="form-label">Kedy vám môžeme zavolať späť?</label>
              <div className="chips" id="callback-chips">
                {[
                  { val: 'dnes', label: 'Dnes' },
                  { val: 'zajtra', label: 'Zajtra' },
                  { val: 'kedykoľvek', label: 'Kedykoľvek' },
                ].map(c => (
                  <button key={c.val} className={`chip${callbackTime === c.val ? ' selected' : ''}`} onClick={() => selectCallbackChip(c.val)}>{c.label}</button>
                ))}
              </div>
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 14, marginBottom: 4 }}>
            <input
              type="checkbox" id="gdprSuhlas"
              style={{
                WebkitAppearance: 'none', appearance: 'none' as const,
                width: 16, height: 16, padding: 0, flexShrink: 0, marginTop: 2,
                border: '1.5px solid var(--zajo-gray-border)', borderRadius: 4,
                background: gdprSuhlas ? '#E8711A' : 'var(--zajo-gray)',
                borderColor: gdprSuhlas ? '#E8711A' : 'var(--zajo-gray-border)',
                cursor: 'pointer', position: 'relative', transition: 'background 120ms, border-color 120ms',
              }}
              checked={gdprSuhlas}
              onChange={e => { setGdprSuhlas(e.target.checked); setErrors(v => ({ ...v, gdpr: '' })) }}
            />
            <label htmlFor="gdprSuhlas" style={{ fontSize: 12, color: 'var(--zajo-text-muted)', lineHeight: 1.5, cursor: 'pointer' }}>
              Súhlasím so <a href="/zasady-ochrany-osobnych-udajov" target="_blank" style={{ color: 'var(--zajo-cream)', textDecoration: 'underline' }}>spracovaním osobných údajov</a> podľa GDPR.
            </label>
          </div>
          {errors.gdpr && <span style={{ fontSize: 11, color: '#ef4444', display: 'block', marginBottom: 4 }}>{errors.gdpr}</span>}
          {errors.submit && <p style={{ fontSize: 11, color: '#ef4444', marginBottom: 4 }}>{errors.submit}</p>}
          <button className="btn-next" id="btn-submit" disabled={loading} onClick={submitForm}>
            {loading ? 'Odosielam…' : 'Odoslať žiadosť'}
          </button>
          <button className="btn-back" onClick={() => goToStep(3)}>← Späť</button>
        </div>

        {/* Success */}
        {done && (
          <div className="success show" id="success-screen">
            <div className="success-icon">
              <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div className="success-title">Ďakujeme!</div>
            <div className="success-text">Vaša správa bola odoslaná. Ozveme sa vám čo najskôr.</div>
            <div className="success-card">
              <div className="success-card-title">Súhrn</div>
              {summaryRows.map(r => (
                <div key={r.label} className="success-card-row">
                  <span className="success-card-label">{r.label}</span>
                  <span className="success-card-value">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="footer">
          Zajo Reality · Dolný Šianec 1, 911 48 Trenčín<br />
          <a href="https://www.zajoreality.sk" target="_blank" rel="noreferrer">zajoreality.sk</a>
        </div>
      </div>
    </>
  )
}
