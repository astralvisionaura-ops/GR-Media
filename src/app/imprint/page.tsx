import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum — GR Media',
  description: 'Impressum von GR Media, Ronny Goersch, gemäß §5 TMG.',
}

export default function ImprintPage() {
  return (
    <div className="py-24 px-4 md:px-8 lg:px-16 xl:px-24">
      <div className="max-w-[760px] mx-auto">
        <h1 className="font-display font-extrabold text-[clamp(1.75rem,4vw,2.5rem)] text-[#f5f3ee] tracking-tight mb-12">
          Impressum
        </h1>

        <div className="flex flex-col gap-10 font-sans font-light text-[#888] leading-relaxed text-sm">

          <section aria-labelledby="imprint-info">
            <h2 id="imprint-info" className="font-display font-bold text-lg text-[#f5f3ee] mb-3">
              Angaben gemäß §5 TMG
            </h2>
            <address className="not-italic">
              <strong className="text-[#f5f3ee] font-medium">GR Media</strong><br />
              Ronny Goersch<br />
              Große Straße 13<br />
              39326 Groß Ammensleben
            </address>
          </section>

          <section aria-labelledby="imprint-contact">
            <h2 id="imprint-contact" className="font-display font-bold text-lg text-[#f5f3ee] mb-3">
              Kontakt
            </h2>
            <p>
              E-Mail:{' '}
              <a
                href="mailto:ronny-goersch@g-r-media.de"
                className="text-[#c8ff00] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8ff00] rounded-[2px]"
              >
                ronny-goersch@g-r-media.de
              </a>
            </p>
          </section>

          <section aria-labelledby="imprint-responsible">
            <h2 id="imprint-responsible" className="font-display font-bold text-lg text-[#f5f3ee] mb-3">
              Verantwortlich für den Inhalt nach §55 Abs. 2 RStV
            </h2>
            <address className="not-italic">
              Ronny Goersch<br />
              Große Straße 13<br />
              39326 Groß Ammensleben
            </address>
          </section>

          <section aria-labelledby="imprint-liability-content">
            <h2 id="imprint-liability-content" className="font-display font-bold text-lg text-[#f5f3ee] mb-3">
              Haftung für Inhalte
            </h2>
            <p>
              Als Diensteanbieter sind wir gemäß §7 Abs. 1 TMG für eigene Inhalte auf diesen
              Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§8 bis 10 TMG sind wir
              als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder
              gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen,
              die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
          </section>

          <section aria-labelledby="imprint-liability-links">
            <h2 id="imprint-liability-links" className="font-display font-bold text-lg text-[#f5f3ee] mb-3">
              Haftung für Links
            </h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir
              keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine
              Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
              Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
          </section>

          <section aria-labelledby="imprint-copyright">
            <h2 id="imprint-copyright" className="font-display font-bold text-lg text-[#f5f3ee] mb-3">
              Urheberrecht
            </h2>
            <p>
              Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
              unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
              Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
              bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
