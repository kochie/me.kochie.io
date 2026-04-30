import MDX from '@next/mdx'
import { withSentryConfig } from '@sentry/nextjs'
import type { NextConfig } from 'next'

const { VERCEL_GIT_COMMIT_SHA } = process.env

const config: NextConfig = {
  productionBrowserSourceMaps: true,
  env: {
    // Make the COMMIT_SHA available to the client so that Sentry events can be
    // marked for the release they belong to. It may be undefined if running
    // outside of Vercel.
    buildTime: new Date().toDateString(),
    NEXT_PUBLIC_COMMIT_SHA: VERCEL_GIT_COMMIT_SHA ?? '',
  },
  images: {
    remotePatterns: [
      { hostname: 'blog.kochie.io' },
      { hostname: 'holopin.io' },
      { hostname: 'assets.holopin.io' },
    ],
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: {
    mdxRs: true,
  },
}

const withMDX = MDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

export default withSentryConfig(withMDX(config), {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: !process.env.CI,
  // Skip source-map upload when the auth token is missing (local builds),
  // so they don't fail without one.
  sourcemaps: {
    disable: !process.env.SENTRY_AUTH_TOKEN,
  },
})
