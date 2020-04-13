import React, { ReactElement } from 'react'
import Head from 'next/head'

export default function Heading(): ReactElement {
  return (
    <Head>
      <title>Robert Koch</title>
      <link rel="manifest" href="/manifest.json" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="UTF-8" />
      <meta
        name="keywords"
        content="Robert Koch, Robert, Koch, Portfolio, Student, Melbourne, Australia"
      />
      <meta
        name="description"
        content="Hi, I'm Robert. This is my site, click through to see some of the content I've worked on. I'm an electrical and software engineer, based in Melbourne, Australia."
      />
      <meta name="author" content="Robert Koch" />
      <meta name="theme-color" content="#333144" />
      <link rel="icon" sizes="192x192" href="/images/favicon-192.webp" />
      <link rel="icon" sizes="512x512" href="/images/favicon-512.webp" />
      <link rel="apple-touch-icon" href="/images/favicon-192.webp" />

      <meta
        name="msapplication-square310x310logo"
        content="/images/favicon-192.webp"
      />
      <meta
        name="google-site-verification"
        content="I6EWS0ziNrDQdDV1TNtuF1fWq9IFHR767zb6YIFu9wk"
      />
    </Head>
  )
}
