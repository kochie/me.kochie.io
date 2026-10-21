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
import Research from '@/components/Research'
import NewsletterForm from '../NewsletterForm'
import { SectionHeader } from '@/components/SectionHeader/SectionHeader'

export default function Middle(): ReactElement {
  return (
    <div className="px-5 pt-6 pb-16 lg:pl-16 xl:pl-20 lg:pr-12 xl:pr-32 lg:pt-16 lg:pb-24 bg-background text-foreground transform-gpu transition duration-700">
      <div className="max-w-4xl">
        <Hero />

        <section id="sec-introduction" className="my-16 lg:my-24 scroll-mt-12">
          <SectionHeader number="01" department="Introduction" />
          <div className="intro-prose max-w-3xl">
            <Hello />
          </div>
        </section>

        <section
          id="sec-correspondence"
          className="my-16 lg:my-24 scroll-mt-12"
        >
          <GetInTouch />
        </section>

        <section id="sec-dispatch" className="my-16 lg:my-24 scroll-mt-12">
          <NewsletterForm />
        </section>

        <section id="sec-recognitions" className="my-16 lg:my-24 scroll-mt-12">
          <Awards />
        </section>

        <section id="sec-work" className="my-16 lg:my-24 scroll-mt-12">
          <Portfolio />
        </section>

        <section id="sec-research" className="my-16 lg:my-24 scroll-mt-12">
          <Research />
        </section>

        <section id="sec-talks" className="my-16 lg:my-24 scroll-mt-12">
          <Talks />
        </section>

        <section id="sec-writing" className="my-16 lg:my-24 scroll-mt-12">
          <Suspense fallback={<RecentArticlesSkeleton />}>
            <RecentArticles />
          </Suspense>
        </section>
      </div>
    </div>
  )
}
