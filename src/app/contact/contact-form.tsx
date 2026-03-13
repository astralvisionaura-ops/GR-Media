'use client'

import { useState, useId } from 'react'
import Link from 'next/link'

type FieldErrors = Partial<Record<'name' | 'email' | 'message' | 'consent', string[]>>

type FormState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success' }
  | { status: 'error'; message: string; fields?: FieldErrors }

const INITIAL_STATE: FormState = { status: 'idle' }

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>(INITIAL_STATE)
  const uid = useId()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormState({ status: 'loading' })

    const form = event.currentTarget
    const data = new FormData(form)

    const payload = {
      name:     data.get('name') as string,
      email:    data.get('email') as string,
      message:  data.get('message') as string,
      consent:  data.get('consent') === 'on' ? true : false,
      honeypot: data.get('honeypot') as string,
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        setFormState({ status: 'success' })
        form.reset()
        return
      }

      const json = await response.json().catch(() => null)
      const message =
        json?.error?.message ?? 'Ein unbekannter Fehler ist aufgetreten.'
      const fields = json?.error?.fields as FieldErrors | undefined
      setFormState({ status: 'error', message, fields })
    } catch {
      setFormState({
        status: 'error',
        message: 'Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut.',
      })
    }
  }

  const isLoading = formState.status === 'loading'
  const fieldErrors = formState.status === 'error' ? formState.fields : undefined

  return (
    <section aria-label="Kontaktformular">
      {formState.status === 'success' ? (
        <div
          role="alert"
          className="rounded-[12px] border border-[#c8ff00]/30 bg-[#1a1a1a] p-10 text-center"
        >
          <p className="font-display font-bold text-2xl text-[#f5f3ee] mb-3">
            Vielen Dank!
          </p>
          <p className="font-sans font-light text-[#888] mb-8">
            Ihre Nachricht wurde gesendet. Ich melde mich in der Regel innerhalb von 24 Stunden.
          </p>
          <button
            type="button"
            onClick={() => setFormState(INITIAL_STATE)}
            className="inline-flex items-center gap-2 min-h-[44px] px-6 py-2 rounded-[8px] border border-[#2a2a2a] text-[#f5f3ee] text-sm font-sans font-medium hover:border-[#444] hover:text-[#c8ff00] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8ff00]"
          >
            Weitere Nachricht senden
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate aria-label="Kontaktformular">
          {/* Honeypot — hidden from real users */}
          <div aria-hidden="true" className="absolute left-[-9999px] w-px h-px overflow-hidden">
            <label htmlFor={`${uid}-honeypot`}>Dieses Feld nicht ausfüllen</label>
            <input
              id={`${uid}-honeypot`}
              name="honeypot"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col gap-6">
            {/* Name */}
            <div>
              <label
                htmlFor={`${uid}-name`}
                className="block text-sm font-sans font-medium text-[#f5f3ee] mb-2"
              >
                Name <span className="text-[#c8ff00]" aria-label="Pflichtfeld">*</span>
              </label>
              <input
                id={`${uid}-name`}
                name="name"
                type="text"
                required
                autoComplete="name"
                disabled={isLoading}
                aria-invalid={fieldErrors?.name ? 'true' : undefined}
                aria-describedby={fieldErrors?.name ? `${uid}-name-error` : undefined}
                className="w-full min-h-[48px] px-4 py-3 rounded-[8px] border border-[#2a2a2a] bg-[#1a1a1a] text-[#f5f3ee] text-sm font-sans placeholder:text-[#888] focus:outline-none focus:border-[#c8ff00] transition-colors duration-150 disabled:opacity-60"
                placeholder="Ihr Name"
              />
              {fieldErrors?.name && (
                <p id={`${uid}-name-error`} role="alert" className="mt-2 text-xs font-sans text-[#ff6b35]">
                  {fieldErrors.name[0]}
                </p>
              )}
            </div>

            {/* E-Mail */}
            <div>
              <label
                htmlFor={`${uid}-email`}
                className="block text-sm font-sans font-medium text-[#f5f3ee] mb-2"
              >
                E-Mail <span className="text-[#c8ff00]" aria-label="Pflichtfeld">*</span>
              </label>
              <input
                id={`${uid}-email`}
                name="email"
                type="email"
                required
                autoComplete="email"
                disabled={isLoading}
                aria-invalid={fieldErrors?.email ? 'true' : undefined}
                aria-describedby={fieldErrors?.email ? `${uid}-email-error` : undefined}
                className="w-full min-h-[48px] px-4 py-3 rounded-[8px] border border-[#2a2a2a] bg-[#1a1a1a] text-[#f5f3ee] text-sm font-sans placeholder:text-[#888] focus:outline-none focus:border-[#c8ff00] transition-colors duration-150 disabled:opacity-60"
                placeholder="ihre@email.de"
              />
              {fieldErrors?.email && (
                <p id={`${uid}-email-error`} role="alert" className="mt-2 text-xs font-sans text-[#ff6b35]">
                  {fieldErrors.email[0]}
                </p>
              )}
            </div>

            {/* Nachricht */}
            <div>
              <label
                htmlFor={`${uid}-message`}
                className="block text-sm font-sans font-medium text-[#f5f3ee] mb-2"
              >
                Nachricht <span className="text-[#c8ff00]" aria-label="Pflichtfeld">*</span>
              </label>
              <textarea
                id={`${uid}-message`}
                name="message"
                required
                rows={6}
                disabled={isLoading}
                aria-invalid={fieldErrors?.message ? 'true' : undefined}
                aria-describedby={fieldErrors?.message ? `${uid}-message-error` : undefined}
                className="w-full px-4 py-3 rounded-[8px] border border-[#2a2a2a] bg-[#1a1a1a] text-[#f5f3ee] text-sm font-sans placeholder:text-[#888] focus:outline-none focus:border-[#c8ff00] transition-colors duration-150 resize-y disabled:opacity-60"
                placeholder="Wie kann ich Ihnen helfen?"
              />
              {fieldErrors?.message && (
                <p id={`${uid}-message-error`} role="alert" className="mt-2 text-xs font-sans text-[#ff6b35]">
                  {fieldErrors.message[0]}
                </p>
              )}
            </div>

            {/* GDPR consent checkbox */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  name="consent"
                  type="checkbox"
                  required
                  disabled={isLoading}
                  aria-invalid={fieldErrors?.consent ? 'true' : undefined}
                  className="mt-1 w-4 h-4 min-w-[16px] rounded border border-[#2a2a2a] bg-[#1a1a1a] accent-[#c8ff00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8ff00] cursor-pointer"
                />
                <span className="text-xs font-sans font-light text-[#888] leading-relaxed">
                  Ich bin damit einverstanden, dass diese Daten zum Zwecke der Kontaktaufnahme
                  gespeichert und verarbeitet werden. Weitere Informationen finden Sie in der{' '}
                  <Link
                    href="/privacy"
                    className="text-[#c8ff00] underline underline-offset-2 hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8ff00] rounded-[2px]"
                  >
                    Datenschutzerklärung
                  </Link>
                  .{' '}
                  <span className="text-[#c8ff00]">*</span>
                </span>
              </label>
              {fieldErrors?.consent && (
                <p role="alert" className="mt-2 text-xs font-sans text-[#ff6b35]">
                  {fieldErrors.consent[0]}
                </p>
              )}
            </div>

            {/* Global error */}
            {formState.status === 'error' && (
              <div role="alert" className="rounded-[8px] border border-[#ff6b35]/30 bg-[#ff6b35]/10 px-4 py-3">
                <p className="text-sm font-sans text-[#ff6b35]">{formState.message}</p>
              </div>
            )}

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center gap-2 min-h-[52px] px-8 py-3 rounded-[8px] bg-[#c8ff00] text-[#0a0a0a] font-display font-bold text-sm transition-all duration-150 hover:shadow-[0_8px_24px_rgba(200,255,0,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8ff00] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Wird gesendet…' : 'Absenden →'}
              </button>
            </div>
          </div>
        </form>
      )}
    </section>
  )
}
