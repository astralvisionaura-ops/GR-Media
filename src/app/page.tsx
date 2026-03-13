import Link from 'next/link'

// Portfolio category tiles
const portfolioCategories = [
  { label: 'Portrait',    slug: 'portrait' },
  { label: 'Hochzeit',    slug: 'hochzeit' },
  { label: 'Immobilien',  slug: 'immobilien' },
  { label: 'Sport',       slug: 'sport' },
  { label: 'Autos',       slug: 'autos' },
  { label: 'Motorräder',  slug: 'motorrader' },
]

const services = [
  {
    icon: '📷',
    title: 'Fotografie',
    description:
      'Hochwertige Fotografie für Portrait, Hochzeit, Sport, Immobilien und mehr.',
  },
  {
    icon: '📱',
    title: 'Social Media Marketing',
    description:
      'Maßgeschneidertes Social-Media-Management, das deine Reichweite steigert.',
  },
  {
    icon: '🎬',
    title: 'Videografie',
    description:
      'Von der Idee zum Storytelling — Film, der aus der Masse heraussticht.',
  },
]

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        aria-label="Hero"
        className="relative min-h-[calc(100vh-64px)] flex items-center py-24 px-4 md:px-8 lg:px-16 xl:px-24 overflow-hidden"
      >
        {/* Radial accent glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at center, rgba(200,255,0,0.05) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-[1400px] mx-auto w-full">
          {/* Eyebrow */}
          <p className="flex items-center gap-3 text-[0.75rem] font-sans font-medium tracking-[0.2em] uppercase text-[#c8ff00] mb-6 before:content-[''] before:w-8 before:h-px before:bg-[#c8ff00]">
            Fotografie · Social Media · Videografie
          </p>

          <h1 className="font-display font-extrabold text-hero text-[#f5f3ee] text-balance mb-6 max-w-3xl">
            Stilvolle Fotografie
            <br />
            <em className="not-italic text-[#c8ff00]">und Social Media</em>
          </h1>

          <p className="font-sans font-medium text-xl text-[#f5f3ee] mb-4">
            Ihre Vision, mein Handwerk.
          </p>
          <p className="font-sans font-light text-[#888] text-base leading-relaxed max-w-xl mb-10">
            Ihr Partner für kreative und visuelle Lösungen in Groß Ammensleben. Ich verwandle
            Ihre Ideen in eindrucksvolle visuelle Erlebnisse — kreativ, professionell und
            authentisch.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 min-h-[52px] px-8 py-3 rounded-[8px] bg-[#c8ff00] text-[#0a0a0a] font-display font-bold text-sm transition-shadow duration-150 hover:shadow-[0_8px_24px_rgba(200,255,0,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8ff00]"
            >
              Jetzt anfragen →
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 min-h-[52px] px-8 py-3 rounded-[8px] border border-[#2a2a2a] text-[#f5f3ee] font-sans font-medium text-sm hover:border-[#444] hover:text-[#c8ff00] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8ff00]"
            >
              Portfolio ansehen
            </Link>
          </div>
        </div>
      </section>

      {/* ── Services strip ── */}
      <section
        aria-labelledby="services-heading"
        className="py-24 px-4 md:px-8 lg:px-16 xl:px-24 border-t border-[#2a2a2a]"
      >
        <div className="max-w-[1400px] mx-auto">
          <h2 id="services-heading" className="sr-only">
            Leistungsübersicht
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {services.map(({ icon, title, description }) => (
              <article
                key={title}
                className="group rounded-[12px] border border-[#2a2a2a] bg-[#1a1a1a] p-8 hover:border-[#444] transition-colors duration-200"
              >
                <span className="text-3xl mb-6 block" role="img" aria-hidden="true">
                  {icon}
                </span>
                <h3 className="font-display font-bold text-xl text-[#f5f3ee] mb-3">
                  {title}
                </h3>
                <p className="font-sans font-light text-[#888] leading-relaxed text-sm mb-6">
                  {description}
                </p>
                <span
                  className="text-[#c8ff00] text-sm font-sans font-medium"
                  aria-hidden="true"
                >
                  →
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portfolio teaser ── */}
      <section
        aria-labelledby="portfolio-heading"
        className="py-24 px-4 md:px-8 lg:px-16 xl:px-24 border-t border-[#2a2a2a]"
      >
        <div className="max-w-[1400px] mx-auto">
          <p className="flex items-center gap-3 text-[0.75rem] font-sans font-medium tracking-[0.2em] uppercase text-[#c8ff00] mb-4 before:content-[''] before:w-8 before:h-px before:bg-[#c8ff00]">
            Meine Arbeiten
          </p>
          <h2
            id="portfolio-heading"
            className="font-display font-extrabold text-[clamp(1.75rem,4vw,2.5rem)] text-[#f5f3ee] tracking-tight mb-12"
          >
            Ausgewählte Projekte
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {portfolioCategories.map(({ label, slug }) => (
              <Link
                key={slug}
                href={`/portfolio/${slug}`}
                className="group relative aspect-[4/3] rounded-[12px] bg-[#1a1a1a] overflow-hidden border border-[#2a2a2a] hover:border-[#444] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8ff00]"
              >
                {/* Gradient overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
                />
                <span className="absolute bottom-4 left-4 font-display font-bold text-[#f5f3ee] text-lg tracking-tight group-hover:text-[#c8ff00] transition-colors duration-150">
                  {label}
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 min-h-[48px] px-8 py-3 rounded-[8px] border border-[#2a2a2a] text-[#f5f3ee] font-sans font-medium text-sm hover:border-[#444] hover:text-[#c8ff00] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8ff00]"
            >
              Alle Arbeiten ansehen →
            </Link>
          </div>
        </div>
      </section>

      {/* ── About teaser ── */}
      <section
        aria-labelledby="about-heading"
        className="py-24 px-4 md:px-8 lg:px-16 xl:px-24 border-t border-[#2a2a2a]"
      >
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <p className="flex items-center gap-3 text-[0.75rem] font-sans font-medium tracking-[0.2em] uppercase text-[#c8ff00] mb-4 before:content-[''] before:w-8 before:h-px before:bg-[#c8ff00]">
              Über mich
            </p>
            <h2
              id="about-heading"
              className="font-display font-extrabold text-[clamp(1.75rem,4vw,2.5rem)] text-[#f5f3ee] tracking-tight mb-6"
            >
              Erfahrung trifft Kreativität
            </h2>
            <p className="font-sans font-light text-[#888] leading-relaxed mb-8">
              G.R. Media – Ihre Vision ist mein Fokus. Ich biete hochwertige
              Fotografie-Dienstleistungen und individuelles Social-Media-Marketing, das exakt
              auf Ihre Bedürfnisse zugeschnitten ist. Mein Ziel ist es, Ihre Ideen in
              eindrucksvolle visuelle Erlebnisse zu verwandeln – kreativ, professionell und
              authentisch.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-[8px] border border-[#2a2a2a] text-[#f5f3ee] font-sans font-medium text-sm hover:border-[#444] hover:text-[#c8ff00] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8ff00]"
            >
              Mehr erfahren →
            </Link>
          </div>

          {/* Accent block */}
          <div
            aria-hidden="true"
            className="hidden lg:flex rounded-[12px] bg-[#1a1a1a] border border-[#2a2a2a] aspect-[4/3] items-end p-8"
          >
            <blockquote className="font-display font-bold text-2xl text-[#f5f3ee] tracking-tight leading-tight">
              &ldquo;Ihre Vision ist
              <br />
              <span className="text-[#c8ff00]">mein Fokus.&rdquo;</span>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── CTA section ── */}
      <section
        aria-labelledby="cta-heading"
        className="py-24 px-4 md:px-8 lg:px-16 xl:px-24 border-t border-[#c8ff00]/20 bg-[#0f0f0f]"
      >
        <div className="max-w-[1400px] mx-auto text-center">
          <h2
            id="cta-heading"
            className="font-display font-extrabold text-[clamp(1.75rem,4vw,2.75rem)] text-[#f5f3ee] tracking-tight mb-4"
          >
            Bereit für das nächste Level?
          </h2>
          <p className="font-sans font-light text-[#888] text-lg mb-10">
            Lassen Sie uns gemeinsam arbeiten!
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 min-h-[52px] px-10 py-3 rounded-[8px] bg-[#c8ff00] text-[#0a0a0a] font-display font-bold text-sm transition-shadow duration-150 hover:shadow-[0_8px_24px_rgba(200,255,0,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8ff00]"
          >
            Jetzt anfragen →
          </Link>
        </div>
      </section>
    </>
  )
}
