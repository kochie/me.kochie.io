import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    {
      url: 'https://me.kochie.io',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://blog.kochie.io',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]
}
