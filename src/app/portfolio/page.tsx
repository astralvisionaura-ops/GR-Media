import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Portfolio — GR Media',
  description:
    'Entdecken Sie die Arbeiten von Ronny Goersch: Portrait, Hochzeit, Immobilien, Sport, Autos und Motorräder.',
}

const categories = [
  {
    label: 'Portrait',
    slug: 'portrait',
    description: 'Persönliche Portraitfotografie mit Charakter',
    image: '/images/service-fotografie.jpg',
  },
  {
    label: 'Hochzeit',
    slug: 'hochzeit',
    description: 'Hochzeits-Fotografie — unvergessliche Momente',
    image: '/images/service-fotografie.jpg',
  },
  {
    label: 'Immobilien',
    slug: 'immobilien',
    description: 'Professionelle Immobilienfotografie',
    image: '/images/service-fotografie.jpg',
  },
  {
    label: 'Sport',
    slug: 'sport',
    description: 'Dynamische Sportfotografie',
    image: '/images/service-fotografie.jpg',
  },
  {
    label: 'Autos',
    slug: 'autos',
    description: 'Automotive Photography',
    image: '/images/service-fotografie.jpg',
  },
  {
    label: 'Motorräder',
    slug: 'motorrader',
    description: 'Motorrad-Fotografie',
    image: '/images/service-fotografie.jpg',
  },
]

export default function PortfolioPage() {
  return (
    <div className="py-24 px-4 md:px-8 lg:px-16 xl:px-24">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <p className="flex items-center gap-3 text-[0.75rem] font-sans font-medium tracking-[0.2em] uppercase text-[#c8ff00] mb-4 before:content-[''] before:w-8 before:h-px before:bg-[#c8ff00]">
          Meine Arbeiten
        </p>
        <h1 className="font-display font-extrabold text-[clamp(2rem,5vw,3.5rem)] text-[var(--text)] tracking-tight mb-4">
          Portfolio
        </h1>
        <p className="font-sans font-light text-[var(--text-muted)] text-lg mb-16 max-w-xl">
          Stilvolle Fotografie für jeden Anlass — wählen Sie eine Kategorie, um mehr zu erfahren.
        </p>

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(({ label, slug, description, image }) => (
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
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="font-display font-bold text-2xl text-[#f5f3ee] tracking-tight mb-1 group-hover:text-[#c8ff00] transition-colors duration-150">
                  {label}
                </h2>
                <p className="font-sans font-light text-[var(--text-muted)] text-sm mb-3">
                  {description}
                </p>
                <span className="text-[#c8ff00] text-sm font-sans font-medium">
                  → Ansehen
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
