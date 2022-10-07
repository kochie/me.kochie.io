// import withPlugins from 'next-compose-plugins'
import MDX from '@next/mdx'
const {
  NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN,
  NODE_ENV,
  VERCEL_GIT_COMMIT_SHA,
} = process.env

process.env.SENTRY_DSN = SENTRY_DSN

const Config = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const config = {
    // topLevelAwait: true,
    productionBrowserSourceMaps: true,
    // target: 'serverless',
    env: {
      // Make the COMMIT_SHA available to the client so that Sentry events can be
      // marked for the release they belong to. It may be undefined if running
      // outside of Vercel
      buildTime: new Date().toDateString(),
      NEXT_PUBLIC_COMMIT_SHA: VERCEL_GIT_COMMIT_SHA,
    },
    experimental: { esmExternals: true },
    images: {
      domains: ['blog.kochie.io', 'holopin.io'],
    },
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    // workboxOpts: {
    //   swDest: process.env.NEXT_EXPORT
    //     ? 'service-worker.js'
    //     : 'static/service-worker.js',
    //   runtimeCaching: [
    //     {
    //       urlPattern: /^https?.*/,
    //       handler: 'NetworkFirst',
    //       options: {
    //         cacheName: 'offlineCache',
    //         expiration: {
    //           maxEntries: 200,
    //         },
    //       },
    //     },
    //   ],
    // },
    async rewrites() {
      return [
        {
          source: '/service-worker.js',
          destination: '/_next/static/service-worker.js',
        },
      ]
    },
  }

  const withMDX = MDX({
    extension: /\.mdx?$/,
    options: {
      remarkPlugins: [],
      rehypePlugins: [],
      // If you use `MDXProvider`, uncomment the following line.
      providerImportSource: '@mdx-js/react',
      development: true,
    },
  })

  // const plugins = [withMDX]

  // console.log(withPlugins(plugins, config)())
  return withMDX(config)
}

export default Config
