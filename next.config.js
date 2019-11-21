/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins');
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
})
const withCss = require('@zeit/next-css')
const withOffline = require('next-offline')
const optimizedImages = require('next-optimized-images');

const config = {
  target: "serverless",
  cssModules: true,
  cssLoaderOptions: {
    camelCase: true,
    namedExport: true
  },
  env: {
    buildTime: new Date().toDateString(),
  },
  webpack(config, options) {
    if (!options.isServer) {
      /* Using next-css */
      for (let entry of options.defaultLoaders.css) {
        if (entry.loader === 'css-loader') {
          entry.loader = 'typings-for-css-modules-loader'
          break
        }
      }
    }
    return config
  },
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

const plugins = [
  withOffline,
  withCss,
  withMDX,
  optimizedImages
]

module.exports = withPlugins(plugins, config);