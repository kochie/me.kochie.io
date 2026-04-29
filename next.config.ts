import MDX from '@next/mdx'
import type { NextConfig } from 'next'

const { VERCEL_GIT_COMMIT_SHA } = process.env

const config: NextConfig = {
  productionBrowserSourceMaps: true,
  env: {
    // Make the COMMIT_SHA available to the client so that Sentry events can be
    // marked for the release they belong to. It may be undefined if running
    // outside of Vercel
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

export default withMDX(config)
