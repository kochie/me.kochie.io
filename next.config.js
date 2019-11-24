/* eslint-disable @typescript-eslint/no-var-requires */
// const path = require('path')
const withSass = require('@zeit/next-sass')
const withPlugins = require('next-compose-plugins');
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
})
const withCss = require('@zeit/next-css')
const withOffline = require('next-offline')
const optimizedImages = require('next-optimized-images');

const config = {
  target: "serverless",
  cssLoaderOptions: {
    modules: true,
    camelCase: true,
    namedExport: true,
  },
  env: {
    buildTime: new Date().toDateString(),
  },
  /* eslint-disable @typescript-eslint/explicit-function-return-type */
  webpack(config, options) {
    if (!options.isServer) {
      /* Using next-css */
      for (const entry of options.defaultLoaders.css) {
        if (entry.loader === 'css-loader') {
          entry.loader = 'typings-for-css-modules-loader'
          break
        }
      }

      /* Using next-sass */
      for (const entry of options.defaultLoaders.sass) {
        if (entry.loader === 'css-loader') {
          entry.loader = 'typings-for-css-modules-loader';
          break;
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
  withSass,
  withMDX,
  optimizedImages
]

module.exports = withPlugins(plugins, config);