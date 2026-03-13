'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

type ConsentValue = 'accepted' | 'rejected'
const STORAGE_KEY = 'cookie-consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      setVisible(true)
    }
  }, [])

  const handleConsent = (value: ConsentValue) => {
    localStorage.setItem(STORAGE_KEY, value)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie-Einwilligung"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-[9999]"
    >
      <div
        className="rounded-[12px] border border-[#2a2a2a] bg-[#1a1a1a]/95 p-6"
        style={{ backdropFilter: 'blur(16px)' }}
      >
        <p className="text-sm font-sans text-[#f5f3ee] leading-relaxed mb-4">
          Diese Website verwendet Cookies für technisch notwendige Funktionen. Mit Klick auf
          &lsquo;Akzeptieren&rsquo; stimmst du zu.{' '}
          <Link
            href="/privacy"
            className="text-[#c8ff00] underline underline-offset-2 hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8ff00] rounded-[2px]"
          >
            Datenschutzerklärung
          </Link>{' '}
          &middot;{' '}
          <Link
            href="/imprint"
            className="text-[#c8ff00] underline underline-offset-2 hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8ff00] rounded-[2px]"
          >
            Impressum
          </Link>
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => handleConsent('accepted')}
            className="flex-1 min-h-[44px] px-4 py-2 rounded-[8px] bg-[#c8ff00] text-[#0a0a0a] text-sm font-display font-bold transition-shadow duration-150 hover:shadow-[0_8px_24px_rgba(200,255,0,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8ff00]"
          >
            Akzeptieren
          </button>
          <button
            type="button"
            onClick={() => handleConsent('rejected')}
            className="flex-1 min-h-[44px] px-4 py-2 rounded-[8px] border border-[#2a2a2a] text-[#888] text-sm font-sans font-medium hover:border-[#444] hover:text-[#f5f3ee] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8ff00]"
          >
            Ablehnen
          </button>
        </div>
      </div>
    </div>
  )
}
