import React, { ReactElement } from 'react'
import Script from 'next/script'
import { NextSeo } from 'next-seo'

import App from '@/components/App/App'
import Head from '@/components/Head/Head'

const Index = (): ReactElement => (
  <>
    <NextSeo
      title="About Robert Koch"
      description="Hi, I'm Robert. This is my site, click through to see some of the content I've worked on. I'm an electrical and software engineer, based in Melbourne, Australia."
      canonical="https://me.kochie.io/"
      openGraph={{
        url: 'https://me.kochie.io',
        title: 'About Robert Koch',
        description:
          "Hi, I'm Robert. This is my site, click through to see some of the content I've worked on. I'm an electrical and software engineer, based in Melbourne, Australia.",
        images: [
          {
            url: 'https://me.kochie.io/images/AirplaneMaker.jpg',
            width: 1920,
            height: 1080,
            alt: 'Airplane Maker',
          },
        ],
        site_name: 'Robert Koch',
      }}
      twitter={{
        handle: '@kochie',
        site: '@kochie',
        cardType: 'summary_large_image',
      }}
    />
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
