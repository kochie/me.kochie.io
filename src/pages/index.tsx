import React, { ReactElement } from 'react'
import Script from 'next/script'

import { Head, App } from '@/components/index'

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
      strategy="lazyOnload"
    />
  </>
)

export default Index
