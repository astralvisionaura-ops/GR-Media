import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — GR Media',
  description: 'Neuigkeiten, Tipps und Einblicke von GR Media.',
}

export default function BlogPage() {
  return (
    <div className="py-24 px-4 md:px-8 lg:px-16 xl:px-24">
      <div className="max-w-[1400px] mx-auto">
        <p className="flex items-center gap-3 text-[0.75rem] font-sans font-medium tracking-[0.2em] uppercase text-[#c8ff00] mb-4 before:content-[''] before:w-8 before:h-px before:bg-[#c8ff00]">
          Aktuelles
        </p>
        <h1 className="font-display font-extrabold text-[clamp(2rem,5vw,3.5rem)] text-[#f5f3ee] tracking-tight mb-16">
          Blog
        </h1>
        <div className="rounded-[12px] border border-[#2a2a2a] bg-[#1a1a1a] p-12 text-center">
          <p className="font-sans font-light text-[#888]">
            Beiträge folgen in Kürze.
          </p>
        </div>
      </div>
    </div>
  )
}
