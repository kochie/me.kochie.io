import NextImage from 'next/image'
import type { ReactElement } from 'react'

import Connections from '@/components/Connections/Connections'

import avatar from '@/images/City2Surf_Crop.png'
import { ParallaxCanvas } from './ParallaxCanvas'

const TAGLINE = 'Engineer · Speaker · Occasional guitarist'

export default function Sidebar(): ReactElement {
  return (
    <nav
      className="relative top-0 w-full min-h-screen flex flex-col justify-center xl:h-screen xl:overflow-hidden xl:bg-coal xl:w-1/3"
      role="complementary"
    >
      <div className="flex flex-col z-10 text-center items-center h-full pt-24 pb-16 xl:pt-0 xl:pb-0 xl:my-auto">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-cream/70 mb-6">
          Robert Koch
        </p>
        <div className="rounded-full w-36 h-36 lg:w-40 lg:h-40 overflow-hidden ring-1 ring-white/15 shadow-2xl">
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
        <p className="mt-6 px-6 max-w-[18rem] font-display italic text-cream/85 text-base lg:text-lg leading-snug">
          &ldquo;Built to last, mostly.&rdquo;
        </p>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-cream/55 max-w-[18rem]">
          {TAGLINE}
        </p>
        <div className="mt-10">
          <Connections />
        </div>
      </div>
      <ParallaxCanvas />
      <div className="overflow-hidden h-screen w-full absolute xl:hidden">
        <div className="transform-gpu scale-110">
          <div className="bg-city-image md:bg-airplane-image h-screen w-screen bg-cover bg-center filter blur-sm top-0" />
        </div>
        <div className="absolute inset-0 bg-coal/60" />
      </div>
    </nav>
  )
}
