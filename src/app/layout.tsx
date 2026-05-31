import Script from 'next/script'
import { config } from '@fortawesome/fontawesome-svg-core'
import './index.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { Fraunces, Geist, JetBrains_Mono } from 'next/font/google'

config.autoAddCss = false

// Display: variable axis covers everything from 14pt body to 96pt poster.
const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  axes: ['SOFT', 'opsz'],
})

// Body: clean grotesque, pairs with Fraunces' soft serifs.
const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

// Mono: department labels, dates, version stamps.
const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500'],
})

// Runs synchronously before React hydrates so the dark class is on <html>
// during first paint — eliminates the light→dark flash for users who
// previously selected dark mode (or whose system prefers it).
const themeInitScript = `(function(){try{var s=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(s==='DARK'||((!s||s==='SYSTEM')&&d)){document.documentElement.classList.add('dark','dark-theme');}}catch(e){}})()`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${geist.variable} ${jetBrainsMono.variable}`}
    >
      <head>
        {/* Open the connection to origins we know we'll fetch from on
            first interaction. preconnect for origins on the critical
            path (newsletter + cal modal); dns-prefetch for the rest. */}
        <link rel="preconnect" href="https://api.beehiiv.com" />
        <link rel="preconnect" href="https://app.cal.com" />
        <link rel="dns-prefetch" href="https://blog.kochie.io" />
        <link rel="dns-prefetch" href="https://www.holopin.io" />
        <link rel="dns-prefetch" href="https://assets.holopin.io" />
        <link rel="dns-prefetch" href="https://cdnjs.buymeacoffee.com" />
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
      </head>
      <body className="font-body">
        {children}
        <Script
          data-name="BMC-Widget"
          data-cfasync="false"
          src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
          data-id="kochie"
          data-description="Support me on Buy me a coffee!"
          data-message=""
          data-color="#FF5F5F"
          data-position="Right"
          data-x_margin="18"
          data-y_margin="18"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
