import React, { ReactElement, Suspense } from 'react'
import RecentArticles, {
  RecentArticlesSkeleton,
} from '@/components/RecentArticles/RecentArticles'
import Portfolio from '@/components/Portfolio/Portfolio'

import Hello from './intro.mdx'
import GetInTouch from '@/components/GetInTouch'
import Awards from '@/components/Awards'
import Talks from '@/components/Talks'
import NewsletterForm from '../NewsletterForm'

export default function Middle(): ReactElement {
  return (
    <div className="p-2 pt-6 lg:p-24 inline-grid bg-gray-200 dark:bg-gray-800 transform-gpu transition duration-700">
      <div className="max-w-7xl">
        <Hello />
        <GetInTouch />
        <NewsletterForm />
        <Awards />
        <Portfolio />
        <Talks />
        <Suspense fallback={<RecentArticlesSkeleton />}>
          <RecentArticles />
        </Suspense>
      </div>
    </div>
  )
}
