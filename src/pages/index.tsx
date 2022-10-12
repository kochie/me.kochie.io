import React, { ReactElement } from 'react'
import { NextSeo } from 'next-seo'

import App from '@/components/App/App'
import Head from '@/components/Head'

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
  </>
)

export default Index
