import Image from 'next/image'
import { SectionHeader } from '@/components/SectionHeader/SectionHeader'

interface JSONFeed {
  version: string
  title: string
  home_page_url: string
  feed_url: string
  description: string
  icon: string
  author: {
    name: string
    url: string
  }
  items: {
    id: string
    url: string
    title: string
    summary?: string
    image: string
    date_modified: string
    author: {
      name: string
      url: string
    }
  }[]
}

const FEED_URL = 'https://blog.kochie.io/feed/json'
const BLUR_DATA_URL =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAKABIDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAYEBQcI/8QAKBAAAQMDAwMDBQAAAAAAAAAAAQIDBBEFABIhBgcjMRQiEzJCUXGR/8QAFwEAAwEAAAAAAAAAAAAAAAAAAAIEBf/EABwRAAEEAwEAAAAAAAAAAAAAAAEAQQIhE9HwA//aAAwDAQACEQMRAD8AaLZceON9VUT4txmRum1FMszi6ta3wNtKSRXcmtCk/UP3lnJ5d0yb6d8kXeEwWJchC2rEw++4j1CiSEgJAAVt7qHb20ziPgFwlVvSfUvaWk1QPkNEdsePxk2Dc5l4F4M+W/OKEVSZLhc00QkClSabE/3FHnKJMqdloEihbOtEcfiuOLWu4nWo1PeT5wxFXHa1q7aPJ+0YZPjHE7RkPAaX/9k='

async function fetchFeed(): Promise<JSONFeed | null> {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 3600 } })
    if (!res.ok) return null
    return (await res.json()) as JSONFeed
  } catch {
    return null
  }
}

export default async function RecentArticles() {
  const data = await fetchFeed()
  if (!data) return null

  const articles = [...data.items]
    .sort(
      (a, b) =>
        new Date(b.date_modified).getTime() -
        new Date(a.date_modified).getTime()
    )
    .slice(0, 3)

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })

  return (
    <div>
      <SectionHeader
        number="07"
        department="Writing"
        title="Recent articles."
        note={
          <>
            Posted to{' '}
            <a
              href="https://blog.kochie.io"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 decoration-1 hover:text-wheat hover:decoration-wheat decoration-border underline"
            >
              blog.kochie.io
            </a>
            .
          </>
        }
      />
      <ol className="flex flex-col">
        {articles.map((article) => (
          <li
            key={article.id}
            className="grid grid-cols-1 lg:grid-cols-[12rem_1fr] gap-x-8 gap-y-4 py-8 border-t border-border last:border-b group"
          >
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block lg:order-2 relative aspect-[4/3] overflow-hidden rounded-md border border-border filter grayscale-25 group-hover:grayscale-0 transition-[filter] duration-500"
            >
              <Image
                className="group-hover:scale-[1.03] transform-gpu transition duration-500"
                alt={article.title}
                src={article.image}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </a>
            <div className="lg:order-1 flex flex-col gap-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                <time dateTime={article.date_modified}>
                  {formatDate(article.date_modified)}
                </time>
              </p>
              <h3 className="text-2xl lg:text-3xl text-foreground tracking-tight">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group-hover:text-wheat transition-colors"
                >
                  {article.title}
                </a>
              </h3>
              <p className="text-foreground/75 leading-relaxed max-w-2xl">
                {article.summary}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function RecentArticlesSkeleton() {
  return (
    <div>
      <SectionHeader
        number="07"
        department="Writing"
        title="Recent articles."
      />
      <ol className="flex flex-col">
        {[0, 1, 2].map((i) => (
          <li
            key={i}
            className="grid grid-cols-1 lg:grid-cols-[12rem_1fr] gap-x-8 gap-y-4 py-8 border-t border-border last:border-b animate-pulse"
          >
            <div className="lg:order-2 aspect-[4/3] rounded-md bg-muted" />
            <div className="lg:order-1 flex flex-col gap-3">
              <div className="h-3 w-24 rounded bg-muted" />
              <div className="h-7 w-3/4 rounded bg-muted" />
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-5/6 rounded bg-muted" />
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
