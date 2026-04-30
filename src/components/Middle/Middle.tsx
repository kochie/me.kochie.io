import React, { ReactElement, Suspense } from 'react'
import RecentArticles, {
  RecentArticlesSkeleton,
} from '@/components/RecentArticles/RecentArticles'
import Portfolio from '@/components/Portfolio/Portfolio'

import Hello from './intro.mdx'
import Hero from '@/components/Hero/Hero'
import GetInTouch from '@/components/GetInTouch'
import Awards from '@/components/Awards'
import Talks from '@/components/Talks'
import NewsletterForm from '../NewsletterForm'
import { SectionHeader } from '@/components/SectionHeader/SectionHeader'

export default function Middle(): ReactElement {
  return (
    <div className="px-5 pt-6 pb-16 lg:px-24 lg:pt-16 lg:pb-24 bg-background text-foreground transform-gpu transition duration-700">
      <div className="max-w-5xl mx-auto">
        <Hero />

        <section className="my-16 lg:my-24">
          <SectionHeader
            number="01"
            department="Introduction"
            title="A short bio."
            note="The longer story is below — the short one is on the cover."
          />
          <div className="intro-prose max-w-3xl">
            <Hello />
          </div>
        </section>

        <section className="my-16 lg:my-24">
          <GetInTouch />
        </section>

        <section className="my-16 lg:my-24">
          <NewsletterForm />
        </section>

        <Awards />

        <Portfolio />

        <section className="my-16 lg:my-24">
          <Talks />
        </section>

        <section className="my-16 lg:my-24">
          <Suspense fallback={<RecentArticlesSkeleton />}>
            <RecentArticles />
          </Suspense>
        </section>
      </div>
    </div>
  )
}
