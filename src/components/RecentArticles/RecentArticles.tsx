import React, { ReactElement } from 'react'
import Image from "next/image";
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
  if (error) {
    console.error(error)
    return <div>{JSON.stringify(error)}</div>
  }
  if (!data) return <div></div>

  return (
    <div>
      <h2 className="text-gray-900 dark:text-white font-bold text-2xl mt-10 mb-6">
        Recent Articles
      </h2>
      <div className="flex flex-col gap-4 lg:gap-10 mb-5">
        {data.items.slice(0, 3).map((article) => (
          <div
            className="group flex flex-col lg:flex-row rounded-xl bg-gray-300 dark:bg-gray-700 shadow-2xl"
            key={article.id}
          >
            <div className="overflow-hidden rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none flex-none relative h-40 w-full lg:w-80 filter grayscale-35 group-hover:grayscale-0">
              <a href={article.url}>
                <Image
                  className="group-hover:scale-110 transition transform-gpu duration-100"
                  alt={article.title}
                  src={article.image}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAKABIDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAYEBQcI/8QAKBAAAQMDAwMDBQAAAAAAAAAAAQIDBBEFABIhBgcjMRQiEzJCUXGR/8QAFwEAAwEAAAAAAAAAAAAAAAAAAAIEBf/EABwRAAEEAwEAAAAAAAAAAAAAAAEAQQIhE9HwA//aAAwDAQACEQMRAD8AaLZceON9VUT4txmRum1FMszi6ta3wNtKSRXcmtCk/UP3lnJ5d0yb6d8kXeEwWJchC2rEw++4j1CiSEgJAAVt7qHb20ziPgFwlVvSfUvaWk1QPkNEdsePxk2Dc5l4F4M+W/OKEVSZLhc00QkClSabE/3FHnKJMqdloEihbOtEcfiuOLWu4nWo1PeT5wxFXHa1q7aPJ+0YZPjHE7RkPAaX/9k="
                  fill
                  sizes="100vw"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center"
                  }} />
              </a>
            </div>
            <div className="ml-5">
              <h3 className="hover:underline font-medium text-xl text-gray-900 dark:text-white my-3">
                <Link href={article.url} legacyBehavior>{article.title}</Link>
              </h3>
              <p className="dark:text-gray-300 text-gray-700 mr-3 mb-4">
                {article.summary}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
