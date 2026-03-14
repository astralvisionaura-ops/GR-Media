import Image from 'next/image'
import Link from 'next/link'

// Portfolio category tiles
const portfolioCategories = [
  { label: 'Portrait',    slug: 'portrait',   image: '/images/service-fotografie.jpg' },
  { label: 'Hochzeit',    slug: 'hochzeit',   image: '/images/service-fotografie.jpg' },
  { label: 'Immobilien',  slug: 'immobilien', image: '/images/service-fotografie.jpg' },
  { label: 'Sport',       slug: 'sport',      image: '/images/service-fotografie.jpg' },
  { label: 'Autos',       slug: 'autos',      image: '/images/service-fotografie.jpg' },
  { label: 'Motorräder',  slug: 'motorrader', image: '/images/service-fotografie.jpg' },
]

const services = [
  {
    title: 'Fotografie',
    description:
      'Hochwertige Fotografie für Portrait, Hochzeit, Sport, Immobilien und mehr.',
    image: '/images/service-fotografie.jpg',
  },
  {
    title: 'Social Media Marketing',
    description:
      'Maßgeschneidertes Social-Media-Management, das deine Reichweite steigert.',
    image: '/images/service-social-media.jpg',
  },
  {
    title: 'Videografie',
    description:
      'Von der Idee zum Storytelling — Film, der aus der Masse heraussticht.',
    image: '/images/service-videografie.jpg',
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

          <h1 className="font-display font-extrabold text-hero text-[var(--text)] text-balance mb-6 max-w-3xl">
            Stilvolle Fotografie
            <br />
            <em className="not-italic text-[#c8ff00]">und Social Media</em>
          </h1>

          <p className="font-sans font-medium text-xl text-[var(--text)] mb-4">
            Ihre Vision, mein Handwerk.
          </p>
          <p className="font-sans font-light text-[var(--text-muted)] text-base leading-relaxed max-w-xl mb-10">
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
              className="inline-flex items-center gap-2 min-h-[52px] px-8 py-3 rounded-[8px] border border-[var(--border)] text-[var(--text)] font-sans font-medium text-sm hover:border-[var(--border)] hover:text-[#c8ff00] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8ff00]"
            >
              Portfolio ansehen
            </Link>
          </div>
        </div>
      </section>

      {/* ── Services strip ── */}
      <section
        aria-labelledby="services-heading"
        className="py-24 px-4 md:px-8 lg:px-16 xl:px-24 border-t border-[var(--border)]"
      >
        <div className="max-w-[1400px] mx-auto">
          <h2 id="services-heading" className="sr-only">
            Leistungsübersicht
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {services.map(({ title, description, image }) => (
              <article
                key={title}
                className="group rounded-[12px] border border-[var(--border)] bg-[var(--bg-surface)] overflow-hidden hover:border-[var(--accent)] transition-colors duration-200"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-display font-bold text-xl text-[var(--text)] mb-3">
                    {title}
                  </h3>
                  <p className="font-sans font-light text-[var(--text-muted)] leading-relaxed text-sm mb-6">
                    {description}
                  </p>
                  <span
                    className="text-[#c8ff00] text-sm font-sans font-medium"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portfolio teaser ── */}
      <section
        aria-labelledby="portfolio-heading"
        className="py-24 px-4 md:px-8 lg:px-16 xl:px-24 border-t border-[var(--border)]"
      >
        <div className="max-w-[1400px] mx-auto">
          <p className="flex items-center gap-3 text-[0.75rem] font-sans font-medium tracking-[0.2em] uppercase text-[#c8ff00] mb-4 before:content-[''] before:w-8 before:h-px before:bg-[#c8ff00]">
            Meine Arbeiten
          </p>
          <h2
            id="portfolio-heading"
            className="font-display font-extrabold text-[clamp(1.75rem,4vw,2.5rem)] text-[var(--text)] tracking-tight mb-12"
          >
            Ausgewählte Projekte
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {portfolioCategories.map(({ label, slug, image }) => (
              <Link
                key={slug}
                href={`/portfolio/${slug}`}
                className="group relative aspect-[4/3] rounded-[12px] overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8ff00]"
              >
                <Image
                  src={image}
                  alt={label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
                />
                <span className="absolute bottom-4 left-4 font-display font-bold text-[var(--text)] text-lg tracking-tight group-hover:text-[#c8ff00] transition-colors duration-150">
                  {label}
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 min-h-[48px] px-8 py-3 rounded-[8px] border border-[var(--border)] text-[var(--text)] font-sans font-medium text-sm hover:border-[var(--border)] hover:text-[#c8ff00] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8ff00]"
            >
              Alle Arbeiten ansehen →
            </Link>
          </div>
        </div>
      </section>

      {/* ── About teaser ── */}
      <section
        aria-labelledby="about-heading"
        className="py-24 px-4 md:px-8 lg:px-16 xl:px-24 border-t border-[var(--border)]"
      >
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <p className="flex items-center gap-3 text-[0.75rem] font-sans font-medium tracking-[0.2em] uppercase text-[#c8ff00] mb-4 before:content-[''] before:w-8 before:h-px before:bg-[#c8ff00]">
              Über mich
            </p>
            <h2
              id="about-heading"
              className="font-display font-extrabold text-[clamp(1.75rem,4vw,2.5rem)] text-[var(--text)] tracking-tight mb-6"
            >
              Erfahrung trifft Kreativität
            </h2>
            <p className="font-sans font-light text-[var(--text-muted)] leading-relaxed mb-8">
              G.R. Media – Ihre Vision ist mein Fokus. Ich biete hochwertige
              Fotografie-Dienstleistungen und individuelles Social-Media-Marketing, das exakt
              auf Ihre Bedürfnisse zugeschnitten ist. Mein Ziel ist es, Ihre Ideen in
              eindrucksvolle visuelle Erlebnisse zu verwandeln – kreativ, professionell und
              authentisch.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-[8px] border border-[var(--border)] text-[var(--text)] font-sans font-medium text-sm hover:border-[var(--border)] hover:text-[#c8ff00] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8ff00]"
            >
              Mehr erfahren →
            </Link>
          </div>

          {/* About image with quote overlay */}
          <div className="hidden lg:block relative rounded-[12px] overflow-hidden aspect-[4/3]">
            <Image
              src="/images/service-fotografie.jpg"
              alt="Ronny Goersch bei der Arbeit"
              fill
              className="object-cover"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
            <blockquote className="absolute bottom-8 left-8 right-8 font-display font-bold text-2xl text-[#f5f3ee] tracking-tight leading-tight">
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
        className="py-24 px-4 md:px-8 lg:px-16 xl:px-24 border-t border-[#c8ff00]/20 bg-[var(--bg-deep)]"
      >
        <div className="max-w-[1400px] mx-auto text-center">
          <h2
            id="cta-heading"
            className="font-display font-extrabold text-[clamp(1.75rem,4vw,2.75rem)] text-[var(--text)] tracking-tight mb-4"
          >
            Bereit für das nächste Level?
          </h2>
          <p className="font-sans font-light text-[var(--text-muted)] text-lg mb-10">
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
