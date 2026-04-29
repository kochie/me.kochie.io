import Script from 'next/script'
import { config } from '@fortawesome/fontawesome-svg-core'
import "./index.css"
import '@fortawesome/fontawesome-svg-core/styles.css'
import { Source_Sans_3 } from 'next/font/google'

config.autoAddCss = false

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
      </head>
      <body className={sourceSans3.className}>
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
        />
      </body>
    </html>
  )
}
