import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-[#2a2a2a] bg-[#0a0a0a]" role="contentinfo">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16 xl:px-24 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo */}
          <Link
            href="/"
            className="font-display font-extrabold text-xl tracking-tight text-[#f5f3ee] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8ff00] rounded-[4px]"
          >
            GR<span className="text-[#c8ff00]">.</span>Media
          </Link>

          {/* Links */}
          <nav aria-label="Footer-Navigation">
            <ul className="flex flex-wrap gap-6" role="list">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm font-sans text-[#888] hover:text-[#f5f3ee] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8ff00] rounded-[4px]"
                >
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link
                  href="/imprint"
                  className="text-sm font-sans text-[#888] hover:text-[#f5f3ee] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8ff00] rounded-[4px]"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <a
                  href="mailto:ronny-goersch@g-r-media.de"
                  className="text-sm font-sans text-[#888] hover:text-[#c8ff00] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8ff00] rounded-[4px]"
                >
                  ronny-goersch@g-r-media.de
                </a>
              </li>
            </ul>
          </nav>

          {/* Copyright */}
          <p className="text-sm font-sans text-[#888]">
            &copy; 2026 GR Media &mdash; Alle Rechte vorbehalten
          </p>
        </div>
      </div>
    </footer>
  )
}
