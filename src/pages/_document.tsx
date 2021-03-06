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
import React, { ReactElement } from 'react'

class MyDocument extends Document {
  static async getInitialProps(ctx): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render(): ReactElement {
    return (
      <Html lang={'en'}>
        <Head />
        <body>
          <Main />
          <NextScript />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            (function(f, a, t, h, o, m){
            a[h]=a[h]||function(){
            (a[h].q=a[h].q||[]).push(arguments)
            };
            o=f.createElement('script'),
            m=f.getElementsByTagName('script')[0];
            o.async=1; o.src=t; o.id='fathom-script';
            m.parentNode.insertBefore(o,m)
            })(document, window, 'https://kite.kochie.io/tracker.js', 'fathom');
            fathom('set', 'siteId', 'FLIWZIHK');
            fathom('trackPageview');
          `,
            }}
          />
        </body>
      </Html>
    )
  }
}

export default MyDocument
