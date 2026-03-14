'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { href: '/',          label: 'Startseite' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/services',  label: 'Services' },
  { href: '/blog',      label: 'Blog' },
  { href: '/about',     label: 'Über Mich' },
  { href: '/contact',   label: 'Kontakt' },
]

export default function Nav() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header
      className="sticky top-0 z-50 border-b border-[#2a2a2a]"
      style={{ backgroundColor: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(12px)' }}
    >
      <nav
        className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16 xl:px-24 flex items-center justify-between h-16"
        aria-label="Hauptnavigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8ff00] rounded-[4px]"
          aria-label="GR Media — Startseite"
        >
          <Image
            src="/logo.png"
            alt="GR Media Logo"
            width={120}
            height={80}
            priority
            className="h-10 w-auto bg-white rounded-[4px] px-1"
          />
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={[
                  'px-3 py-2 text-sm font-sans font-medium rounded-[6px] transition-colors duration-150',
                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8ff00]',
                  isActive(href)
                    ? 'text-[#c8ff00] border-b-2 border-[#c8ff00] rounded-none pb-[6px]'
                    : 'text-[#f5f3ee] hover:text-[#c8ff00]',
                ].join(' ')}
                aria-current={isActive(href) ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop portal pill */}
        <div className="hidden md:flex items-center">
          <Link
            href="/portal"
            className="text-xs font-sans font-medium px-4 py-2 rounded-[999px] border border-[#2a2a2a] text-[#888] hover:text-[#f5f3ee] hover:border-[#444] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8ff00]"
          >
            → Portal
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            href="/portal"
            className="text-xs font-sans font-medium px-3 py-1.5 rounded-[999px] border border-[#2a2a2a] text-[#888] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8ff00]"
          >
            → Portal
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
            className="w-11 h-11 flex flex-col items-center justify-center gap-[5px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8ff00] rounded-[4px]"
          >
            <span
              className={[
                'block w-5 h-px bg-[#f5f3ee] transition-all duration-200 origin-center',
                menuOpen ? 'rotate-45 translate-y-[6px]' : '',
              ].join(' ')}
            />
            <span
              className={[
                'block w-5 h-px bg-[#f5f3ee] transition-all duration-200',
                menuOpen ? 'opacity-0' : '',
              ].join(' ')}
            />
            <span
              className={[
                'block w-5 h-px bg-[#f5f3ee] transition-all duration-200 origin-center',
                menuOpen ? '-rotate-45 -translate-y-[6px]' : '',
              ].join(' ')}
            />
          </button>
        </div>
      </nav>

      {/* Mobile slide-in menu */}
      <div
        id="mobile-menu"
        className={[
          'md:hidden border-t border-[#2a2a2a] overflow-hidden transition-all duration-200',
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
        aria-hidden={!menuOpen}
      >
        <ul className="px-4 py-4 flex flex-col gap-1" role="list">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setMenuOpen(false)}
                className={[
                  'block px-4 py-3 text-sm font-sans font-medium rounded-[8px] min-h-[44px] flex items-center transition-colors duration-150',
                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8ff00]',
                  isActive(href)
                    ? 'text-[#c8ff00] bg-[#1a1a1a]'
                    : 'text-[#f5f3ee] hover:bg-[#1a1a1a] hover:text-[#c8ff00]',
                ].join(' ')}
                aria-current={isActive(href) ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
