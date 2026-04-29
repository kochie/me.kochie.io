'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'

import backgroundImage from './board_background.png'
import logo from './logo.webp'

export interface HolopinProps {
  username: string
}

interface Sticker {
  id: string
  image: string
  name: string
}

interface StickerPosition {
  id: string
  width: number
  height: number
  rotation: number
  scale: number
  top: number
  left: number
}

interface HolopinResponse {
  page: { positions: StickerPosition[] }
  stickers: Sticker[]
}

const PAGE_EDITOR_WIDTH = 1214

const fetcher = (url: string): Promise<HolopinResponse> =>
  fetch(url).then((r) => r.json())

const Holopin = ({ username }: HolopinProps) => {
  const [pageScale, setPageScale] = useState(1)
  const ref = useRef<HTMLDivElement>(null)
  const { data, isLoading } = useSWR<HolopinResponse>(
    `/api/holopin?username=${username}`,
    fetcher
  )

  useEffect(() => {
    const scale = () => {
      if (!ref.current) return
      setPageScale(PAGE_EDITOR_WIDTH / ref.current.clientWidth)
    }

    scale()
    window.addEventListener('resize', scale)

    return () => {
      window.removeEventListener('resize', scale)
    }
  }, [])

  return (
    <div className="h-[380px] group" ref={ref}>
      <div className="relative overflow-hidden w-full h-full rounded-xl">
        <Image
          src={backgroundImage}
          alt="background image"
          className="absolute  group-hover:scale-105 transform duration-200"
          placeholder="blur"
        />
        {(data || !isLoading) &&
          data?.page?.positions.map(
            ({ id, width, height, rotation, scale, top, left }) => {
              const sticker = data.stickers.find((s) => s.id === id)
              if (!sticker) return null
              return (
                <div className="absolute w-0 h-0 top-1/2 left-1/2" key={id}>
                  <div className="relative">
                    <div className="absolute w-0 h-0">
                      <div
                        className="origin-center cursor-pointer grayscale-50 hover:grayscale-0 duration-100 transform"
                        style={{
                          width,
                          height,
                          transform: `translate(${left / pageScale}px, ${
                            top / pageScale
                          }px) scale(${
                            scale / pageScale
                          }) rotate(${rotation}deg)`,
                        }}
                      >
                        <Image
                          className="hover:scale-105 duration-200 transform"
                          id={id}
                          src={sticker.image}
                          alt={sticker.name}
                          width={width}
                          height={height}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          )}
        <Link href={`https://holopin.io/@${username}`}>
          <div className="absolute bottom-0 right-0 flex items-center m-3 bg-black hover:bg-gray-600 duration-100 transform rounded p-1.5">
            <Image src={logo} alt="logo" width={20} height={20} />
            <span className="pl-1 text-[8px] text-neutral-400 md:text-base">
              {`holopin.io/@${username}`}
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Holopin
