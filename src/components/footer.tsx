import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)]" role="contentinfo">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16 xl:px-24 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo */}
          <Link
            href="/"
            className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)] rounded-[4px]"
            aria-label="GR Media — Startseite"
          >
            <Image
              src="/logo.png"
              alt="GR Media Logo"
              width={120}
              height={80}
              className="h-12 w-auto bg-white rounded-[4px] px-1"
            />
          </Link>

          {/* Links */}
          <nav aria-label="Footer-Navigation">
            <ul className="flex flex-wrap gap-6" role="list">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm font-sans text-[var(--text-muted)] hover:text-[var(--text)] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)] rounded-[4px]"
                >
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link
                  href="/imprint"
                  className="text-sm font-sans text-[var(--text-muted)] hover:text-[var(--text)] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)] rounded-[4px]"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <a
                  href="mailto:ronny-goersch@g-r-media.de"
                  className="text-sm font-sans text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)] rounded-[4px]"
                >
                  ronny-goersch@g-r-media.de
                </a>
              </li>
            </ul>
          </nav>

          {/* Copyright */}
          <p className="text-sm font-sans text-[var(--text-muted)]">
            &copy; 2026 GR Media &mdash; Alle Rechte vorbehalten
          </p>
        </div>
      </div>
    </footer>
  )
}
