import App from '@/components/App/App'
import Fathom from '@/components/Fathom'
import { ThemeButton } from '@/components/Theme'
import type { Metadata, Viewport } from 'next'
import { AppleStartupImages } from './metadata'
import Providers from './providers'

const description =
  "Hi, I'm Robert. This is my site, click through to see some of the content I've worked on. I'm an electrical and software engineer, based in Melbourne, Australia."

export const viewport: Viewport = {
  // Match the broadsheet palette so the mobile address bar/PWA chrome
  // tints to the same background the body uses.
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf6ec' },
    { media: '(prefers-color-scheme: dark)', color: '#161410' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://me.kochie.io/'),
  title: 'About Robert Koch',
  description,
  alternates: {
    canonical: 'https://me.kochie.io/',
  },
  icons: {
    other: [{ url: '/images/favicon_curved.svg', rel: 'masked-icon' }],
    icon: [
      {
        url: '/images/favicon-32x32.png',
        sizes: '32x32',
      },
      {
        url: '/images/favicon-16x16.png',
        sizes: '16x16',
      },
    ],
  },
  appleWebApp: {
    title: 'About Robert Koch',
    statusBarStyle: 'black-translucent',
    startupImage: AppleStartupImages,
  },
  manifest: '/manifest.json',
  openGraph: {
    url: 'https://me.kochie.io',
    title: 'About Robert Koch',
    description,
    images: [
      {
        url: 'https://me.kochie.io/images/AirplaneMaker.jpg',
        width: 1920,
        height: 1080,
        alt: 'Airplane Maker',
      },
    ],
    type: 'website',
    siteName: 'Robert Koch',
  },
  twitter: {
    site: '@kochie',
    images: [
      {
        url: 'https://me.kochie.io/images/AirplaneMaker.jpg',
        width: 1920,
        height: 1080,
        alt: 'Airplane Maker',
      },
    ],
    creator: '@kochie',
    card: 'summary_large_image',
    description,
  },
}

export default function Page() {
  return (
    <Providers>
      <ThemeButton className="hidden xl:flex fixed top-5 right-5 z-50" />
      <Fathom />
      <App />
    </Providers>
  )
}
