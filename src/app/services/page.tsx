import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Leistungen — GR Media',
  description:
    'Fotografie, Social Media Marketing und Videografie von GR Media — Ronny Goersch. Professionell, kreativ und authentisch.',
}

const services = [
  {
    eyebrow: 'Dienstleistung 01',
    title: 'Fotografie',
    description:
      'Jede Aufnahme erzählt eine Geschichte. Ich fotografiere mit Leidenschaft und Professionalität — egal ob für Ihr Portrait, Ihre Hochzeit, Ihr Unternehmen oder Ihr Event.',
    features: [
      'Portrait-Fotografie',
      'Hochzeits-Fotografie',
      'Immobilienfotografie',
      'Sport-Fotografie',
      'Automotive Photography',
    ],
    image: '/images/service-fotografie.jpg',
    imageAlt: 'Fotografie — Kameraausrüstung',
  },
  {
    eyebrow: 'Dienstleistung 02',
    title: 'Social Media Marketing',
    description:
      'Reichweite aufbauen, Zielgruppen begeistern, Ergebnisse erzielen. Ich entwickle individuelle Social-Media-Strategien, die Ihre Marke sichtbar machen und echte Verbindungen schaffen.',
    features: [
      'Content-Strategie',
      'Feed-Planung und -Gestaltung',
      'Redaktionsplanung',
      'Community Management',
      'Analyse und Reporting',
    ],
    image: '/images/service-social-media.jpg',
    imageAlt: 'Social Media Marketing',
  },
  {
    eyebrow: 'Dienstleistung 03',
    title: 'Videografie',
    description:
      'Bewegte Bilder, die bewegen. Von der Idee über das Drehbuch bis zum fertigen Schnitt — ich begleite Ihr Videoprojekt von Anfang bis Ende.',
    features: [
      'Konzept und Storyboard',
      'Dreh und Produktion',
      'Schnitt und Postproduktion',
      'Social-Media-Videos',
      'Image- und Werbefilme',
    ],
    image: '/images/service-videografie.jpg',
    imageAlt: 'Videografie — Kameraarbeit',
  },
]

export default function ServicesPage() {
  return (
    <div className="py-24 px-4 md:px-8 lg:px-16 xl:px-24">
      <div className="max-w-[1400px] mx-auto">
        {/* Page header */}
        <p className="flex items-center gap-3 text-[0.75rem] font-sans font-medium tracking-[0.2em] uppercase text-[#c8ff00] mb-4 before:content-[''] before:w-8 before:h-px before:bg-[#c8ff00]">
          Was ich biete
        </p>
        <h1 className="font-display font-extrabold text-[clamp(2rem,5vw,3.5rem)] text-[var(--text)] tracking-tight mb-4">
          Leistungen
        </h1>
        <p className="font-sans font-light text-[var(--text-muted)] text-lg mb-24 max-w-xl">
          Kreative und visuelle Lösungen aus einer Hand — maßgeschneidert für Ihren Bedarf.
        </p>

        {/* Service sections */}
        <div className="flex flex-col gap-24">
          {services.map(({ eyebrow, title, description, features, image, imageAlt }, index) => (
            <section
              key={title}
              aria-labelledby={`service-${index}-heading`}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
            >
              {/* Text column — alternates side on lg */}
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <p className="flex items-center gap-3 text-[0.75rem] font-sans font-medium tracking-[0.2em] uppercase text-[#c8ff00] mb-4 before:content-[''] before:w-8 before:h-px before:bg-[#c8ff00]">
                  {eyebrow}
                </p>
                <h2
                  id={`service-${index}-heading`}
                  className="font-display font-extrabold text-[clamp(1.5rem,3vw,2rem)] text-[var(--text)] tracking-tight mb-4"
                >
                  {title}
                </h2>
                <p className="font-sans font-light text-[var(--text-muted)] leading-relaxed mb-8">
                  {description}
                </p>
                <ul className="flex flex-col gap-3 mb-8" role="list">
                  {features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 font-sans text-sm text-[var(--text)]"
                    >
                      <span className="text-[#c8ff00]" aria-hidden="true">→</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-[8px] bg-[#c8ff00] text-[#0a0a0a] font-display font-bold text-sm transition-shadow duration-150 hover:shadow-[0_8px_24px_rgba(200,255,0,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8ff00]"
                >
                  Anfrage stellen →
                </Link>
              </div>

              {/* Service image */}
              <div
                className={[
                  'hidden lg:block relative rounded-[12px] overflow-hidden aspect-[4/3]',
                  index % 2 === 1 ? 'lg:order-1' : '',
                ].join(' ')}
              >
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 rounded-[12px] border border-[#c8ff00]/20 bg-[var(--bg-deep)] p-12 text-center">
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,3vw,2rem)] text-[var(--text)] tracking-tight mb-4">
            Bereit für das nächste Level?
          </h2>
          <p className="font-sans font-light text-[var(--text-muted)] mb-8">
            Lassen Sie uns gemeinsam arbeiten!
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 min-h-[52px] px-10 py-3 rounded-[8px] bg-[#c8ff00] text-[#0a0a0a] font-display font-bold text-sm transition-shadow duration-150 hover:shadow-[0_8px_24px_rgba(200,255,0,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8ff00]"
          >
            Jetzt anfragen →
          </Link>
        </div>
      </div>
    </div>
  )
}
