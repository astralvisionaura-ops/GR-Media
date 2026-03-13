import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Über GR Media — Ronny Goersch',
  description:
    'Lernen Sie Ronny Goersch kennen — Fotograf und Social-Media-Experte aus Groß Ammensleben. Kreativität, Professionalität und Authentizität.',
}

const values = [
  {
    title: 'Kreativität',
    description:
      'Jedes Projekt ist einzigartig. Ich entwickle individuelle visuelle Konzepte, die Ihre Botschaft authentisch transportieren.',
  },
  {
    title: 'Professionalität',
    description:
      'Von der ersten Anfrage bis zur finalen Auslieferung arbeite ich strukturiert, zuverlässig und termingerecht.',
  },
  {
    title: 'Authentizität',
    description:
      'Keine gestellten Kulissen, kein leerer Glanz — ich arbeite mit echten Momenten und echten Geschichten.',
  },
]

export default function AboutPage() {
  return (
    <div className="py-24 px-4 md:px-8 lg:px-16 xl:px-24">
      <div className="max-w-[1400px] mx-auto">
        {/* Hero */}
        <p className="flex items-center gap-3 text-[0.75rem] font-sans font-medium tracking-[0.2em] uppercase text-[#c8ff00] mb-4 before:content-[''] before:w-8 before:h-px before:bg-[#c8ff00]">
          Über GR Media
        </p>
        <h1 className="font-display font-extrabold text-[clamp(2rem,5vw,3.5rem)] text-[#f5f3ee] tracking-tight mb-16">
          Erfahrung trifft Kreativität
        </h1>

        {/* About split */}
        <section
          aria-labelledby="about-bio"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-24"
        >
          <div>
            <h2 id="about-bio" className="sr-only">
              Über Ronny Goersch
            </h2>
            <p className="font-sans font-light text-[#888] leading-relaxed text-base mb-6">
              G.R. Media – Ihre Vision ist mein Fokus. Ich biete hochwertige
              Fotografie-Dienstleistungen und individuelles Social-Media-Marketing, das exakt
              auf Ihre Bedürfnisse zugeschnitten ist.
            </p>
            <p className="font-sans font-light text-[#888] leading-relaxed text-base mb-8">
              Mein Ziel ist es, Ihre Ideen in eindrucksvolle visuelle Erlebnisse zu verwandeln
              — kreativ, professionell und authentisch. Egal ob Portrait, Hochzeit, Immobilien,
              Sport oder Automotive: Ich bringe die Persönlichkeit hinter dem Motiv zum
              Vorschein.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-[8px] bg-[#c8ff00] text-[#0a0a0a] font-display font-bold text-sm transition-shadow duration-150 hover:shadow-[0_8px_24px_rgba(200,255,0,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8ff00]"
            >
              Lass uns zusammenarbeiten →
            </Link>
          </div>

          {/* Accent block */}
          <div
            aria-hidden="true"
            className="rounded-[12px] bg-[#1a1a1a] border border-[#2a2a2a] p-8 flex flex-col justify-between aspect-[4/3]"
          >
            <div className="font-display font-extrabold text-6xl text-[#c8ff00]/10">GR</div>
            <blockquote className="font-display font-bold text-2xl text-[#f5f3ee] tracking-tight leading-tight">
              &ldquo;Ihr Partner für kreative
              <br />
              <span className="text-[#c8ff00]">und visuelle Lösungen.&rdquo;</span>
            </blockquote>
          </div>
        </section>

        {/* Values */}
        <section aria-labelledby="values-heading">
          <p className="flex items-center gap-3 text-[0.75rem] font-sans font-medium tracking-[0.2em] uppercase text-[#c8ff00] mb-4 before:content-[''] before:w-8 before:h-px before:bg-[#c8ff00]">
            Meine Werte
          </p>
          <h2
            id="values-heading"
            className="font-display font-extrabold text-[clamp(1.5rem,3vw,2rem)] text-[#f5f3ee] tracking-tight mb-12"
          >
            Was mich antreibt
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map(({ title, description }) => (
              <article
                key={title}
                className="rounded-[12px] border border-[#2a2a2a] bg-[#1a1a1a] p-8"
              >
                <h3 className="font-display font-bold text-xl text-[#c8ff00] mb-3">
                  {title}
                </h3>
                <p className="font-sans font-light text-[#888] text-sm leading-relaxed">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
