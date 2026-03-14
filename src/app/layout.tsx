import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import './globals.css'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import CookieBanner from '@/components/cookie-banner'
import { ThemeProvider } from '@/components/ThemeProvider'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'GR Media — Stilvolle Fotografie und Social Media Marketing',
  description:
    'Ihr Partner für kreative und visuelle Lösungen. Hochwertige Fotografie, individuelles Social-Media-Marketing und Videografie in Groß Ammensleben.',
  metadataBase: new URL('https://g-r-media.de'),
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: 'GR Media',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={`${syne.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body className="bg-[var(--bg)] text-[var(--text)] font-sans antialiased overflow-x-hidden">
        <ThemeProvider>
          <Nav />
          <main id="main-content">{children}</main>
          <Footer />
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  )
}
