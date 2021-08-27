import React, { ReactElement } from 'react'
import Script from 'next/script'

import App from '@/components/App/App'
import Head from '@/components/Head/Head'

const Index = (): ReactElement => (
  <>
    <Head />
    <App />
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
      strategy="beforeInteractive"
    />
  </>
)

export default Index
