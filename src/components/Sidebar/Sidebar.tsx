import NextImage from 'next/image'
import type { ReactElement } from 'react'

import Connections from '@/components/Connections/Connections'

import avatar from '@/images/City2Surf_Crop.png'
import { ParallaxCanvas } from './ParallaxCanvas'

interface IndexEntry {
  number: string
  label: string
  href: string
}

const INDEX: IndexEntry[] = [
  { number: '01', label: 'Introduction', href: '#sec-introduction' },
  { number: '02', label: 'Correspondence', href: '#sec-correspondence' },
  { number: '03', label: 'Dispatch', href: '#sec-dispatch' },
  { number: '04', label: 'Recognitions', href: '#sec-recognitions' },
  { number: '05', label: 'Selected Work', href: '#sec-work' },
  { number: '06', label: 'Talks', href: '#sec-talks' },
  { number: '07', label: 'Writing', href: '#sec-writing' },
]

const Hairline = () => (
  <div className="h-px w-12 bg-cream/15" aria-hidden="true" />
)

export default function Sidebar(): ReactElement {
  return (
    <nav
      className="relative top-0 w-full min-h-screen flex flex-col xl:h-screen xl:overflow-hidden xl:bg-coal xl:w-1/3"
      aria-label="Site index and identity"
    >
      {/* Background image — smaller breakpoints only */}
      <div className="overflow-hidden h-screen w-full absolute xl:hidden">
        <div className="transform-gpu scale-110">
          <div className="bg-city-image md:bg-airplane-image h-screen w-screen bg-cover bg-center filter blur-sm top-0" />
        </div>
        <div className="absolute inset-0 bg-coal/80" />
      </div>

      {/* Parallax canvas — xl only */}
      <ParallaxCanvas />

      {/* Content stack */}
      <div className="relative z-10 flex flex-col items-center w-full px-6 py-14 xl:py-12 gap-7 xl:my-auto">
        {/* Masthead */}
        <header className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-cream/90">
            Robert Koch
          </p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-cream/60">
            Melbourne, Australia
          </p>
        </header>

        <Hairline />

        {/* Avatar */}
        <div className="rounded-full w-32 h-32 xl:w-36 xl:h-36 overflow-hidden ring-2 ring-cream/30 ring-offset-2 ring-offset-coal/40 shadow-2xl">
          <NextImage
            src={avatar}
            className="hover:scale-110 transform-gpu transition duration-700"
            alt="Robert Koch"
            placeholder="blur"
            sizes="160px"
            priority
            style={{ width: '100%', height: 'auto' }}
          />
        </div>

        {/* Quote + tagline */}
        <div className="text-center max-w-[18rem]">
          <p className="font-display italic text-cream/95 text-lg xl:text-xl leading-snug">
            &ldquo;Built to last, mostly.&rdquo;
          </p>
          <p className="mt-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-cream/70">
            Engineer · Speaker · Guitarist
          </p>
        </div>

        <Hairline />

        {/* Inside this issue — table of contents */}
        <nav aria-label="Page sections" className="w-full max-w-[18rem]">
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.32em] text-cream/55 mb-4">
            Inside this issue
          </p>
          <ol className="font-mono text-[12px] uppercase tracking-[0.16em] flex flex-col gap-y-2.5 text-cream/80">
            {INDEX.map((entry) => (
              <li
                key={entry.number}
                className="grid grid-cols-[1.75rem_1fr] items-baseline gap-x-3"
              >
                <span className="text-cream/45 text-right">{entry.number}</span>
                <a
                  href={entry.href}
                  className="hover:text-wheat transition-colors"
                >
                  {entry.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <Hairline />

        {/* Social */}
        <Connections />
      </div>
    </nav>
  )
}
