const withPlugins = require('next-compose-plugins');
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
})
const withOffline = require('next-offline')
const optimizedImages = require('next-optimized-images');

const config = {
  target: "serverless",
  env: {
    buildTime: new Date().toDateString(),
  },
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
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

const plugins = [
  withOffline,
  withMDX,
  optimizedImages
]

module.exports = withPlugins(plugins, config);