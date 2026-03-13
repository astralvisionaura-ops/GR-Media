import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const categoryMap: Record<string, string> = {
  portrait:   'Portrait',
  hochzeit:   'Hochzeit',
  immobilien: 'Immobilien',
  sport:      'Sport',
  autos:      'Autos',
  motorrader: 'Motorräder',
}

export function generateStaticParams() {
  return Object.keys(categoryMap).map((category) => ({ category }))
}

export async function generateMetadata({
  params,
}: {
  params: { category: string }
}): Promise<Metadata> {
  const label = categoryMap[params.category]
  if (!label) return {}
  return {
    title: `${label} — Portfolio — GR Media`,
    description: `${label}-Fotografie von Ronny Goersch / GR Media`,
  }
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const label = categoryMap[params.category]

  if (!label) notFound()

  // 6 placeholder tiles
  const placeholders = Array.from({ length: 6 }, (_, i) => i + 1)

  return (
    <div className="py-24 px-4 md:px-8 lg:px-16 xl:px-24">
      <div className="max-w-[1400px] mx-auto">
        {/* Back link */}
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-sm font-sans text-[#888] hover:text-[#c8ff00] transition-colors duration-150 mb-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8ff00] rounded-[4px]"
        >
          ← Zurück zum Portfolio
        </Link>

        {/* Header */}
        <p className="flex items-center gap-3 text-[0.75rem] font-sans font-medium tracking-[0.2em] uppercase text-[#c8ff00] mb-4 before:content-[''] before:w-8 before:h-px before:bg-[#c8ff00]">
          Portfolio
        </p>
        <h1 className="font-display font-extrabold text-[clamp(2rem,5vw,3.5rem)] text-[#f5f3ee] tracking-tight mb-16">
          {label}
        </h1>

        {/* Placeholder grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {placeholders.map((n) => (
            <div
              key={n}
              className="aspect-square rounded-[12px] bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center"
              aria-label={`Platzhalterbild ${n}`}
            >
              <p className="font-sans font-light text-[#888] text-xs text-center px-4">
                Bilder folgen bald
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
