import Image from 'next/image'
import Link from 'next/link'
import React, { MouseEvent, useEffect, useRef, useState } from 'react'
import useSWR from 'swr'

import backgroundImage from './board_background.png'
import logo from './logo.webp'

import data from './data.json'

export interface HolopinProps {
  username: string
}

const PAGE_EDITOR_WIDTH = 1214

const Modal = ({}) => {
  const modalRef = useRef<HTMLDivElement>(null)

  const openModal = (event: MouseEvent) => {
    const pageScale = 1
    // console.log(modalRef.current, event)
    if (modalRef.current) {
      // const rect = modalRef.current.getBoundingClientRect()
      // var x = event.clientX - rect.left //x position within the element.
      // var y = event.clientY - rect.top

      const id = (event.target as any).id
      const position = data.page.positions.find((p) => p.id === id)
      const sticker = data.stickers.find((s) => s.id === id)

      modalRef.current.style.display = 'block'
      modalRef.current.style.transform = `translate(${
        position.left / pageScale
      }px, ${position.top / pageScale}px)`

      modalRef.current.innerHTML = `<div class="text-base">${sticker.name}</div><div class="text-sm">${sticker.description}</div>`
    }
    // modalRef.current.style.display = 'block'
  }

  return (
    <div className="absolute w-0 h-0 top-1/2 left-1/2">
      <div className="relative">
        <div className="absolute w-0 h-0">
          <div className="">
            <div
              id="modal"
              style={{ display: 'none' }}
              className="absolute rounded-md bg-slate-800 p-5 z-50 origin-top-right"
              ref={modalRef}
            >
              <div
                className="p-1 hover:bg-slate-100 bg-slate-500 rounded-sm cursor-pointer duration-75 transform"
                onClick={() => (modalRef.current.style.display = 'none')}
              >
                Close
              </div>
              Modal
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const fetcher = (url) => fetch(url).then((r) => r.json())

const Holopin = ({ username }: HolopinProps) => {
  const [pageScale, setPageScale] = useState(1)
  const ref = useRef<HTMLDivElement>(null)
  const { data, error, isLoading } = useSWR(
    `https://www.holopin.io/api/auth/user/page?username=${username}`,
    fetcher
  )

  useEffect(() => {
    const scale = () => {
      setPageScale(PAGE_EDITOR_WIDTH / ref.current.clientWidth)
    }

    scale()
    window.addEventListener('resize', scale)

    return () => {
      window.removeEventListener('resize', scale)
    }
  }, [])

  // useEffect(() => {
  //   console.log(pageScale)
  // }, [pageScale])

  return (
    <div className="h-[380px] group" ref={ref}>
      <div className="relative overflow-hidden w-full h-full rounded-xl">
        <Image
          src={backgroundImage}
          alt="background image"
          className="absolute  group-hover:scale-105 transform duration-200"
          placeholder="blur"
        />
        {data.page.positions.map(
          ({ id, width, height, rotation, scale, top, left }) => {
            const sticker = data.stickers.find((sticker) => sticker.id === id)
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
                        // onClick={openModal}
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
          <a>
            <div className="absolute bottom-0 right-0 flex items-center m-3 bg-black hover:bg-gray-600 duration-100 transform rounded p-1.5">
              <Image src={logo} alt="logo" width={20} height={20} />
              <span className="pl-1 text-[8px] text-neutral-400 md:text-base">
                {`holopin.io/@${username}`}
              </span>
            </div>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Holopin
