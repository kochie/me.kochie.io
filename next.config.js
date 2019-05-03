/* eslint-disable @typescript-eslint/no-var-requires */
const withTypescript = require('@zeit/next-typescript')
const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/
})
const withCss = require('@zeit/next-css')
const withOffline = require('next-offline')

const config = {
    target: "serverless",
    workboxOpts: {
        swDest: 'static/service-worker.js',
        runtimeCaching: [
          {
            urlPattern: /^https?.*/,
            handler: 'networkFirst',
            options: {
              cacheName: 'https-calls',
              networkTimeoutSeconds: 15,
              expiration: {
                maxEntries: 150,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
    }
}

module.exports = withOffline(withCss(withMDX(withTypescript(config))))