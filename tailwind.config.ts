import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black:   '#0a0a0a',
        white:   '#f5f3ee',
        accent:  '#c8ff00',
        accent2: '#ff6b35',
        gray:    '#1a1a1a',
        gray2:   '#2a2a2a',
        muted:   '#888888',
        border:  '#2a2a2a',
      },
      fontFamily: {
        sans:    ['var(--font-dm-sans)', 'sans-serif'],
        display: ['var(--font-syne)', 'sans-serif'],
      },
      fontSize: {
        hero: ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
      },
      borderRadius: {
        card: '12px',
        btn:  '8px',
        pill: '999px',
      },
      backdropBlur: {
        nav: '12px',
      },
    },
  },
  plugins: [],
}

export default config
