import React, { ReactElement, useEffect } from 'react'
import { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import * as Fathom from 'fathom-client'

import '@fortawesome/fontawesome-svg-core/styles.css'
import 'tailwindcss/tailwind.css'
import '../assets/styles/global.css'

import { ThemeButton, ThemeProvider } from '@/components/Theme'
import { useRouter } from 'next/dist/client/router'

config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

// init()

function App({ Component, pageProps }: AppProps): ReactElement {
  const router = useRouter()

  useEffect(() => {
    // Initialize Fathom when the app loads
    // Example: yourdomain.com
    //  - Do not include https://
    //  - This must be an exact match of your domain.
    //  - If you're using www. for your domain, make sure you include that here.
    Fathom.load('FLIWZIHK', {
      includedDomains: ['me.kochie.io'],
      url: 'https://kite.kochie.io/script.js',
    })

    function onRouteChangeComplete() {
      Fathom.trackPageview()
    }
    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete)

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router.events])

  return (
    <>
      <ThemeProvider>
        <ThemeButton />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default App
