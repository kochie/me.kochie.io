import Image from 'next/image'

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
    content_html?: string
    content_text?: string
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

// Strip HTML so we render the article summary as plain text. The feed comes
// from a trusted blog, but rendering raw HTML would couple this card layout
// to whatever block markup the post starts with — and avoid an XSS surface.
function htmlToText(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

function getSummary(item: JSONFeed['items'][number]): string {
  if (item.content_text) return item.content_text
  if (item.content_html) return htmlToText(item.content_html)
  return ''
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

  return (
    <div>
      <h2 className="text-gray-900 dark:text-white font-bold text-2xl mt-10 mb-6">
        Recent Articles
      </h2>
      <div className="flex flex-col gap-4 lg:gap-10 mb-5">
        {articles.map((article) => (
          <div
            className="group flex flex-col lg:flex-row rounded-xl bg-gray-300 dark:bg-gray-700 shadow-2xl"
            key={article.id}
          >
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="overflow-hidden rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none flex-none relative h-40 w-full lg:w-80 filter grayscale-35 group-hover:grayscale-0"
            >
              <Image
                className="group-hover:scale-110 transition transform-gpu duration-100"
                alt={article.title}
                src={article.image}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
            </a>
            <div className="ml-5">
              <h3 className="hover:underline font-medium text-xl text-gray-900 dark:text-white my-3">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </h3>
              <p className="dark:text-gray-300 text-gray-700 mr-3 mb-4">
                {getSummary(article)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function RecentArticlesSkeleton() {
  return (
    <div>
      <h2 className="text-gray-900 dark:text-white font-bold text-2xl mt-10 mb-6">
        Recent Articles
      </h2>
      <div className="flex flex-col gap-4 lg:gap-10 mb-5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex flex-col lg:flex-row rounded-xl bg-gray-300 dark:bg-gray-700 shadow-2xl animate-pulse"
          >
            <div className="rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none flex-none h-40 w-full lg:w-80 bg-gray-400/40 dark:bg-gray-600/40" />
            <div className="ml-5 flex-1 py-3">
              <div className="h-6 w-3/4 mb-3 rounded bg-gray-400/40 dark:bg-gray-600/40" />
              <div className="h-4 w-full mb-2 rounded bg-gray-400/40 dark:bg-gray-600/40" />
              <div className="h-4 w-5/6 mb-4 rounded bg-gray-400/40 dark:bg-gray-600/40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
