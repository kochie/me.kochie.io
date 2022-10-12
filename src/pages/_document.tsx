// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentInitialProps,
} from 'next/document'
import Script from 'next/script'
import React, { ReactElement } from 'react'

class MyDocument extends Document {
  static async getInitialProps(ctx): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render(): ReactElement {
    return (
      <Html lang={'en'}>
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=optional"
          />
        </Head>
        <body>
          <Main />
          <NextScript />

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
        </body>
      </Html>
    )
  }
}

export default MyDocument
