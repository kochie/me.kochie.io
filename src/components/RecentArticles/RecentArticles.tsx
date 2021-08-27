import React, { ReactElement } from 'react'
import Image from 'next/image'
import useSWR from 'swr'
import Link from 'next/link'

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
    title: 'Building a Contact Tracing Platform'
    summary: string
    image: string
    date_modified: string
    author: {
      name: string
      url: string
    }
  }[]
}

export default function RecentArticles(): ReactElement {
  const fetcher = (url) => fetch(url).then((res) => res.json())

  const { data, error } = useSWR<JSONFeed>(
    'https://blog.kochie.io/feed/json',
    fetcher
  )
  if (error) return <div>{error}</div>
  if (!data) return <div></div>
  // console.log(data)
  return (
    <div>
      <h2 className="text-xl mb-6">Recent Articles</h2>
      <div className="flex flex-col gap-10">
        {data.items.slice(0, 3).map((article) => (
          <div
            className="group flex rounded-xl bg-cool-gray-300 dark:bg-cool-gray-700 shadow-2xl"
            key={article.id}
          >
            <div className="overflow-hidden rounded-l-xl flex-none relative h-40 w-80">
              <a href={article.url}>
                <Image
                  className="group-hover:scale-110 transition transform-gpu duration-100"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  alt={article.title}
                  src={article.image}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAKABIDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAYEBQcI/8QAKBAAAQMDAwMDBQAAAAAAAAAAAQIDBBEFABIhBgcjMRQiEzJCUXGR/8QAFwEAAwEAAAAAAAAAAAAAAAAAAAIEBf/EABwRAAEEAwEAAAAAAAAAAAAAAAEAQQIhE9HwA//aAAwDAQACEQMRAD8AaLZceON9VUT4txmRum1FMszi6ta3wNtKSRXcmtCk/UP3lnJ5d0yb6d8kXeEwWJchC2rEw++4j1CiSEgJAAVt7qHb20ziPgFwlVvSfUvaWk1QPkNEdsePxk2Dc5l4F4M+W/OKEVSZLhc00QkClSabE/3FHnKJMqdloEihbOtEcfiuOLWu4nWo1PeT5wxFXHa1q7aPJ+0YZPjHE7RkPAaX/9k="
                />
              </a>
            </div>
            <div className="ml-5">
              <h3 className="hover:underline">
                <Link href={article.url}>{article.title}</Link>
              </h3>
              <p>{article.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
