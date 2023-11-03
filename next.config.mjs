// import withPlugins from 'next-compose-plugins'
import MDX from '@next/mdx'
import PWA from 'next-pwa'

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
      NEXT_PUBLIC_COMMIT_SHA: VERCEL_GIT_COMMIT_SHA ?? "",
    },
    images: {
      domains: ['blog.kochie.io', 'holopin.io', 'assets.holopin.io'],
    },
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    experimental: {
       mdxRs: true,
       webpackBuildWorker: true
    },
  }

  const withMDX = MDX({
    extension: /\.mdx?$/,
    options: {
      remarkPlugins: [],
      rehypePlugins: [],
      // If you use `MDXProvider`, uncomment the following line.
      // providerImportSource: '@mdx-js/react',
      // development: true,
    },
  })

  const withPWA = PWA({
    dest: 'public',
    maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
  })

  if (process.NODE_ENV === 'production') {
    return withPWA(withMDX(config))
  }
  return withMDX(config)
}

export default Config
