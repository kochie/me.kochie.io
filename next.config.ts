import { execFileSync } from 'node:child_process'
import MDX from '@next/mdx'
import { withSentryConfig } from '@sentry/nextjs'
import type { NextConfig } from 'next'

const { VERCEL_GIT_COMMIT_SHA } = process.env

// Prefer the actual commit timestamp over wall-clock build time so the footer
// reflects when the content last changed, not when CI happened to run.
const resolveBuildTime = (): string => {
  try {
    return execFileSync('git', ['log', '-1', '--format=%cI'], {
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim()
  } catch {
    return new Date().toISOString()
  }
}

const config: NextConfig = {
  productionBrowserSourceMaps: false,
  env: {
    // Surface to client for Sentry release tagging + footer rendering. Values
    // are inlined at build time, so they cost nothing at runtime.
    buildTime: resolveBuildTime(),
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
