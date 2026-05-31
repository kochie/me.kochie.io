'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import backgroundImage from './board_background.png'
import logo from './logo.webp'
import type { HolopinResponse } from './types'

// Holopin's editor canvas is 1214px wide. Sticker positions returned by the
// API are in this coordinate space. Anchored at the canvas centre.
const PAGE_EDITOR_WIDTH = 1214

// Natural aspect ratio of the board background asset. Locking the container
// to this ratio keeps the stickers landing on the artwork at any breakpoint
// — they're all scaled by the same `pageScale` factor.
const BOARD_ASPECT = `${backgroundImage.width} / ${backgroundImage.height}`

export function HolopinBoard({
  username,
  data,
}: {
  username: string
  data: HolopinResponse
}) {
  const [pageScale, setPageScale] = useState(
    PAGE_EDITOR_WIDTH / backgroundImage.width
  )
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const update = () => {
      if (!ref.current) return
      setPageScale(PAGE_EDITOR_WIDTH / ref.current.clientWidth)
    }

    update()

    // ResizeObserver tracks container width changes — including layout shifts
    // from font load, sidebar collapse, etc. — without polling resize events.
    const observer = new ResizeObserver(update)
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="group relative w-full overflow-hidden rounded-xl"
      style={{ aspectRatio: BOARD_ASPECT }}
    >
      <Image
        src={backgroundImage}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 60rem"
        placeholder="blur"
        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        priority={false}
      />

      {/* Sticker layer — coordinate space is centred on the container. Each
          sticker's natural top-left lands exactly at (left/pageScale, top/
          pageScale) regardless of scale.

          Transform composition (right-to-left, so the listed order is the
          execution order):
          1. translate(-50%,-50%) shifts the natural bbox so its centre is at
             local origin (0,0).
          2. rotate(r) pivots around that centre.
          3. translate(50%,50%) restores the natural bbox so its top-left is
             at local origin.
          4. scale(s) with transform-origin top-left scales without moving
             the top-left.
          5. translate(tx, ty) places the top-left at the API position.

          Note: API positions reference the *natural* bounding box top-left
          (in canvas coords), not the scaled one. */}
      <div className="absolute inset-0">
        {data.page.positions.map(
          ({ id, width, height, rotation, scale, top, left }) => {
            const sticker = data.stickers.find((s) => s.id === id)
            if (!sticker) return null
            return (
              <div
                key={id}
                className="absolute left-1/2 top-1/2 h-0 w-0"
              >
                <div
                  className="transform-gpu cursor-pointer grayscale-50 transition duration-200 hover:grayscale-0 hover:scale-110"
                  style={{
                    width,
                    height,
                    transformOrigin: 'top left',
                    transform: `translate(${left / pageScale}px, ${
                      top / pageScale
                    }px) scale(${
                      scale / pageScale
                    }) translate(50%, 50%) rotate(${rotation}deg) translate(-50%, -50%)`,
                  }}
                >
                  <Image
                    id={id}
                    src={sticker.image}
                    alt={sticker.name}
                    width={width}
                    height={height}
                    sizes="120px"
                  />
                </div>
              </div>
            )
          }
        )}
      </div>

      <a
        href={`https://holopin.io/@${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-0 right-0 m-3 flex items-center rounded bg-black/85 backdrop-blur-sm p-1.5 transition-colors duration-200 hover:bg-black"
      >
        <Image src={logo} alt="" width={18} height={18} />
        <span className="pl-1.5 text-[10px] text-neutral-300 md:text-xs">
          {`holopin.io/@${username}`}
        </span>
      </a>
    </div>
  )
}
