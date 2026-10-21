import type { Metadata, Viewport } from 'next'
import Link from 'next/link'
import Fathom from '@/components/Fathom'
import { ThemeButton } from '@/components/Theme'
import Providers from '@/app/providers'

const title = 'Optimisation of Neural Networks for Embedded Systems'
const description =
  'Final-year project report: replacing non-linear activation functions in image-classification networks with binary and ternary steps, benchmarked in Torch and TensorFlow. By Robert Koch, 2017.'
const url = 'https://me.kochie.io/research/neural-networks'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf6ec' },
    { media: '(prefers-color-scheme: dark)', color: '#161410' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://me.kochie.io/'),
  title,
  description,
  authors: [{ name: 'Robert Koch', url: 'https://me.kochie.io' }],
  alternates: { canonical: url },
  icons: {
    other: [{ url: '/images/favicon_curved.svg', rel: 'masked-icon' }],
    icon: [
      { url: '/images/favicon-32x32.png', sizes: '32x32' },
      { url: '/images/favicon-16x16.png', sizes: '16x16' },
    ],
  },
  openGraph: {
    url,
    title,
    description,
    type: 'article',
    siteName: 'Robert Koch',
    publishedTime: '2017-10-20',
    authors: ['Robert Koch'],
  },
  twitter: {
    site: '@kochie',
    creator: '@kochie',
    card: 'summary_large_image',
    title,
    description,
  },
}

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <Fathom />
      <div className="min-h-screen bg-background text-foreground">
        <nav
          aria-label="Site"
          className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur"
        >
          <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
            <Link
              href="/#sec-research"
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-wheat"
            >
              <span aria-hidden="true">← </span>Robert Koch
            </Link>
            <ThemeButton className="h-9 w-9" />
          </div>
        </nav>

        <main className="thesis-prose mx-auto max-w-3xl px-6 pb-24">
          {children}
        </main>

        <footer className="border-t border-border">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-6 py-8 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <Link href="/#sec-research" className="hover:text-wheat">
              <span aria-hidden="true">← </span>Back to selected work
            </Link>
            <a
              href="/Optimising_Neural_Networks_for_Embedded_Systems.pdf"
              download
              className="hover:text-wheat"
            >
              Original PDF <span aria-hidden="true">↓</span>
            </a>
          </div>
        </footer>
      </div>
    </Providers>
  )
}
