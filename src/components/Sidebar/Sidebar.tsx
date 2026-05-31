import type { ReactElement } from 'react'

import Connections from '@/components/Connections/Connections'
import { PROFILE } from '@/lib/profile'

import { ParallaxCanvas } from './ParallaxCanvas'
import { RandomAvatar } from './RandomAvatar'
import { SECTIONS } from './sections'

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
            {PROFILE.name}
          </p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-cream/60">
            {PROFILE.location}
          </p>
        </header>

        <Hairline />

        {/* Avatar — random pick on load, click to shuffle. */}
        <RandomAvatar />

        {/* Tagline */}
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/75 max-w-[18rem] text-center">
          {PROFILE.tagline}
        </p>

        <Hairline />

        {/* Inside this issue — table of contents */}
        <nav aria-label="Page sections" className="w-full max-w-[18rem]">
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.32em] text-cream/55 mb-4">
            Inside this issue
          </p>
          <ol className="font-mono text-[12px] uppercase tracking-[0.16em] flex flex-col gap-y-2.5 text-cream/80">
            {SECTIONS.map((entry) => (
              <li
                key={entry.id}
                className="grid grid-cols-[1.75rem_1fr] items-baseline gap-x-3"
              >
                <span className="text-cream/45 text-right">{entry.number}</span>
                <a
                  href={`#${entry.id}`}
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
