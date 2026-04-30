import NextImage from 'next/image'
import type { ReactElement } from 'react'

import Connections from '@/components/Connections/Connections'

import avatar from '@/images/City2Surf_Crop.png'
import { ParallaxCanvas } from './ParallaxCanvas'
import style from './sidebar.module.css'

const QUOTE =
  'I build things, write the code for them, and run from the resulting explosion.'

export default function Sidebar(): ReactElement {
  return (
    <nav
      className="relative top-0 w-full min-h-screen flex flex-col justify-center xl:h-screen xl:overflow-hidden xl:bg-black xl:w-1/3"
      role="complementary"
    >
      <div className="flex flex-col z-10 text-center items-center h-full mt-20">
        <div className="rounded-full w-40 h-40 overflow-hidden">
          <NextImage
            src={avatar}
            className="hover:scale-125 transform-gpu transition duration-500"
            alt="me"
            placeholder="blur"
            sizes="100vw"
            priority
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </div>
        <div className={style.quote}>{QUOTE}</div>
        <Connections />
      </div>
      <ParallaxCanvas />
      <div className="overflow-hidden h-screen w-full absolute xl:hidden">
        <div className="transform-gpu scale-110">
          <div className="bg-city-image md:bg-airplane-image h-screen w-screen bg-cover bg-center filter blur-sm top-0" />
        </div>
      </div>
    </nav>
  )
}
