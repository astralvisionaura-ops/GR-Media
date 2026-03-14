import type { Metadata } from 'next'
import ContactForm from './contact-form'

export const metadata: Metadata = {
  title: 'Kontakt — GR Media',
  description:
    'Nehmen Sie Kontakt mit GR Media auf. Ronny Goersch antwortet in der Regel innerhalb von 24 Stunden.',
}

export default function ContactPage() {
  return (
    <div className="py-24 px-4 md:px-8 lg:px-16 xl:px-24">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <p className="flex items-center gap-3 text-[0.75rem] font-sans font-medium tracking-[0.2em] uppercase text-[#c8ff00] mb-4 before:content-[''] before:w-8 before:h-px before:bg-[#c8ff00]">
          Schreiben Sie mir
        </p>
        <h1 className="font-display font-extrabold text-[clamp(2rem,5vw,3.5rem)] text-[var(--text)] tracking-tight mb-16">
          Kontakt aufnehmen
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">
          {/* Contact form */}
          <ContactForm />

          {/* Contact info card */}
          <aside>
            <div className="rounded-[12px] border border-[var(--border)] bg-[var(--bg-surface)] p-8">
              <h2 className="font-display font-bold text-lg text-[var(--text)] mb-6">
                Kontaktdaten
              </h2>

              <dl className="flex flex-col gap-6">
                <div>
                  <dt className="text-[0.75rem] font-sans font-medium tracking-[0.15em] uppercase text-[#c8ff00] mb-1">
                    E-Mail
                  </dt>
                  <dd>
                    <a
                      href="mailto:ronny-goersch@g-r-media.de"
                      className="font-sans text-sm text-[var(--text)] hover:text-[#c8ff00] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8ff00] rounded-[2px]"
                    >
                      ronny-goersch@g-r-media.de
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="text-[0.75rem] font-sans font-medium tracking-[0.15em] uppercase text-[#c8ff00] mb-1">
                    Adresse
                  </dt>
                  <dd className="font-sans text-sm text-[var(--text-muted)] leading-relaxed">
                    Große Straße 13
                    <br />
                    39326 Groß Ammensleben
                  </dd>
                </div>

                <div>
                  <dt className="text-[0.75rem] font-sans font-medium tracking-[0.15em] uppercase text-[#c8ff00] mb-1">
                    Antwortzeit
                  </dt>
                  <dd className="font-sans text-sm text-[var(--text-muted)] leading-relaxed">
                    Ich antworte in der Regel innerhalb von 24 Stunden.
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
