import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung — GR Media',
  description: 'Datenschutzerklärung von GR Media, Ronny Goersch.',
}

export default function PrivacyPage() {
  return (
    <div className="py-24 px-4 md:px-8 lg:px-16 xl:px-24">
      <div className="max-w-[760px] mx-auto">
        <h1 className="font-display font-extrabold text-[clamp(1.75rem,4vw,2.5rem)] text-[#f5f3ee] tracking-tight mb-12">
          Datenschutzerklärung
        </h1>

        <div className="prose-content flex flex-col gap-10 font-sans font-light text-[#888] leading-relaxed text-sm">

          <section aria-labelledby="privacy-responsible">
            <h2 id="privacy-responsible" className="font-display font-bold text-lg text-[#f5f3ee] mb-3">
              1. Verantwortlicher
            </h2>
            <p>Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO):</p>
            <address className="not-italic mt-3">
              GR Media<br />
              Ronny Goersch<br />
              Große Straße 13<br />
              39326 Groß Ammensleben<br />
              E-Mail:{' '}
              <a
                href="mailto:ronny-goersch@g-r-media.de"
                className="text-[#c8ff00] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8ff00] rounded-[2px]"
              >
                ronny-goersch@g-r-media.de
              </a>
            </address>
          </section>

          <section aria-labelledby="privacy-data">
            <h2 id="privacy-data" className="font-display font-bold text-lg text-[#f5f3ee] mb-3">
              2. Welche Daten wir erheben
            </h2>
            <p>
              Wenn Sie das Kontaktformular auf unserer Website nutzen, erheben wir folgende
              personenbezogene Daten:
            </p>
            <ul className="mt-3 flex flex-col gap-2 list-none">
              <li className="flex items-start gap-2"><span className="text-[#c8ff00] mt-0.5">→</span> Name</li>
              <li className="flex items-start gap-2"><span className="text-[#c8ff00] mt-0.5">→</span> E-Mail-Adresse</li>
              <li className="flex items-start gap-2"><span className="text-[#c8ff00] mt-0.5">→</span> Nachrichteninhalt</li>
            </ul>
            <p className="mt-3">
              Rechtsgrundlage für die Verarbeitung dieser Daten ist Ihre ausdrückliche
              Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO, die Sie beim Absenden des
              Formulars erteilen.
            </p>
          </section>

          <section aria-labelledby="privacy-purpose">
            <h2 id="privacy-purpose" className="font-display font-bold text-lg text-[#f5f3ee] mb-3">
              3. Zweck der Datenverarbeitung
            </h2>
            <p>
              Ihre Daten werden ausschließlich zur Beantwortung Ihrer Anfrage verwendet. Eine
              Weitergabe an Dritte findet nicht statt, es sei denn, dies ist zur
              Vertragserfüllung erforderlich oder Sie haben ausdrücklich eingewilligt.
            </p>
          </section>

          <section aria-labelledby="privacy-hosting">
            <h2 id="privacy-hosting" className="font-display font-bold text-lg text-[#f5f3ee] mb-3">
              4. Hosting
            </h2>
            <p>
              Diese Website wird bei Vercel Inc. (340 Pine Street, Suite 701, San Francisco,
              CA 94104, USA) gehostet. Vercel verarbeitet dabei technisch notwendige Daten
              (z. B. IP-Adressen) zur Bereitstellung der Website. Mit Vercel besteht ein
              Auftragsverarbeitungsvertrag (DPA) gemäß Art. 28 DSGVO.
            </p>
          </section>

          <section aria-labelledby="privacy-tracking">
            <h2 id="privacy-tracking" className="font-display font-bold text-lg text-[#f5f3ee] mb-3">
              5. Tracking und Cookies
            </h2>
            <p>
              Ohne Ihre Einwilligung werden keine Tracking-Skripte oder Analyse-Tools geladen.
              Es werden ausschließlich technisch notwendige Cookies eingesetzt, die für den
              Betrieb der Website erforderlich sind.
            </p>
          </section>

          <section aria-labelledby="privacy-rights">
            <h2 id="privacy-rights" className="font-display font-bold text-lg text-[#f5f3ee] mb-3">
              6. Ihre Rechte
            </h2>
            <p>Sie haben gemäß DSGVO folgende Rechte bezüglich Ihrer personenbezogenen Daten:</p>
            <ul className="mt-3 flex flex-col gap-2 list-none">
              <li className="flex items-start gap-2"><span className="text-[#c8ff00] mt-0.5">→</span> <span><strong className="text-[#f5f3ee] font-medium">Auskunft</strong> (Art. 15 DSGVO) — Recht auf Auskunft über gespeicherte Daten</span></li>
              <li className="flex items-start gap-2"><span className="text-[#c8ff00] mt-0.5">→</span> <span><strong className="text-[#f5f3ee] font-medium">Berichtigung</strong> (Art. 16 DSGVO) — Recht auf Korrektur unrichtiger Daten</span></li>
              <li className="flex items-start gap-2"><span className="text-[#c8ff00] mt-0.5">→</span> <span><strong className="text-[#f5f3ee] font-medium">Löschung</strong> (Art. 17 DSGVO) — Recht auf Löschung Ihrer Daten</span></li>
              <li className="flex items-start gap-2"><span className="text-[#c8ff00] mt-0.5">→</span> <span><strong className="text-[#f5f3ee] font-medium">Einschränkung</strong> (Art. 18 DSGVO) — Recht auf Einschränkung der Verarbeitung</span></li>
              <li className="flex items-start gap-2"><span className="text-[#c8ff00] mt-0.5">→</span> <span><strong className="text-[#f5f3ee] font-medium">Datenübertragbarkeit</strong> (Art. 20 DSGVO) — Recht auf Herausgabe Ihrer Daten</span></li>
              <li className="flex items-start gap-2"><span className="text-[#c8ff00] mt-0.5">→</span> <span><strong className="text-[#f5f3ee] font-medium">Widerruf</strong> (Art. 7 Abs. 3 DSGVO) — Recht auf Widerruf einer erteilten Einwilligung</span></li>
            </ul>
            <p className="mt-4">
              Zur Wahrnehmung Ihrer Rechte wenden Sie sich bitte an:{' '}
              <a
                href="mailto:ronny-goersch@g-r-media.de"
                className="text-[#c8ff00] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8ff00] rounded-[2px]"
              >
                ronny-goersch@g-r-media.de
              </a>
            </p>
          </section>

          <section aria-labelledby="privacy-complaint">
            <h2 id="privacy-complaint" className="font-display font-bold text-lg text-[#f5f3ee] mb-3">
              7. Beschwerderecht
            </h2>
            <p>
              Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die
              Verarbeitung Ihrer personenbezogenen Daten zu beschweren (Art. 77 DSGVO).
            </p>
          </section>

          <p className="text-xs text-[#888]/60">Stand: März 2026</p>
        </div>
      </div>
    </div>
  )
}
