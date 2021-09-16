import React, { ReactElement } from 'react'
import RecentArticles from '@/components/RecentArticles/RecentArticles'
import Portfolio from '@/components/Portfolio/Portfolio'
import { MDXProvider } from '@mdx-js/react'

import Hello from './intro.mdx'
import GetInTouch from '@/components/GetInTouch'

export default function Middle(): ReactElement {
  return (
    <div className="p-2 pt-6 lg:p-24 inline-grid bg-gray-200 dark:bg-gray-800 transform-gpu transition duration-700">
      <div className="max-w-7xl">
        <MDXProvider
          components={{
            h1: ({ children }) => (
              <h1 className="text-gray-900 text-4xl font-extrabold mb-3.5 dark:text-white">
                {children}
              </h1>
            ),
            p: ({ children }) => (
              <p className="text-gray-700 my-3 leading-relaxed dark:text-gray-400">
                {children}
              </p>
            ),
            a: ({ children, href }) => (
              <a
                href={href}
                className="underline dark:text-orange-300 dark:hover:text-orange-600 text-indigo-600 hover:text-indigo-900 cursor-pointer"
              >
                {children}
              </a>
            ),
          }}
        >
          <Hello />
        </MDXProvider>
        <GetInTouch />
        <Portfolio />
        <RecentArticles />
      </div>
    </div>
  )
}
