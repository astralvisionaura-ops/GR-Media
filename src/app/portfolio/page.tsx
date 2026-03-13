import type { Metadata } from 'next'
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
  },
  {
    label: 'Hochzeit',
    slug: 'hochzeit',
    description: 'Hochzeits-Fotografie — unvergessliche Momente',
  },
  {
    label: 'Immobilien',
    slug: 'immobilien',
    description: 'Professionelle Immobilienfotografie',
  },
  {
    label: 'Sport',
    slug: 'sport',
    description: 'Dynamische Sportfotografie',
  },
  {
    label: 'Autos',
    slug: 'autos',
    description: 'Automotive Photography',
  },
  {
    label: 'Motorräder',
    slug: 'motorrader',
    description: 'Motorrad-Fotografie',
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
        <h1 className="font-display font-extrabold text-[clamp(2rem,5vw,3.5rem)] text-[#f5f3ee] tracking-tight mb-4">
          Portfolio
        </h1>
        <p className="font-sans font-light text-[#888] text-lg mb-16 max-w-xl">
          Stilvolle Fotografie für jeden Anlass — wählen Sie eine Kategorie, um mehr zu erfahren.
        </p>

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(({ label, slug, description }) => (
            <Link
              key={slug}
              href={`/portfolio/${slug}`}
              className="group relative flex flex-col justify-between rounded-[12px] border border-[#2a2a2a] bg-[#1a1a1a] p-8 aspect-[4/3] hover:border-[#444] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8ff00]"
            >
              <div />
              <div>
                <h2 className="font-display font-bold text-2xl text-[#f5f3ee] tracking-tight mb-2 group-hover:text-[#c8ff00] transition-colors duration-150">
                  {label}
                </h2>
                <p className="font-sans font-light text-[#888] text-sm mb-4">
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
