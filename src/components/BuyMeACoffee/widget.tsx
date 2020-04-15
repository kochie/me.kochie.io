import React, { ReactElement } from 'react'
import Head from 'next/head'

export default function Widget(): ReactElement {
  return (
    <Head>
      <script
        data-name="BMC-Widget"
        src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
        data-id="kochie"
        data-description="Support me on Buy me a coffee!"
        data-message="Thank you for visiting. You can now buy me a coffee!"
        data-color="#FF813F"
        data-position="right"
        data-x_margin="18"
        data-y_margin="18"
      />
    </Head>
  )
}
