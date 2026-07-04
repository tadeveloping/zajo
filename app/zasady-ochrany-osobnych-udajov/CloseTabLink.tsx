'use client'

export function CloseTabLink() {
  return (
    <button
      onClick={() => window.close()}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        color: '#8A8279',
        fontSize: '14px',
        textDecoration: 'none',
        cursor: 'pointer',
        fontFamily: 'inherit',
      }}
    >
      ← Späť na formulár
    </button>
  )
}
