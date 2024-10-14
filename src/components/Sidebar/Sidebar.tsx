'use client'
import React, { useRef, useEffect, ReactElement, useCallback } from 'react'
import NextImage from 'next/image'

import Connections from '@/components/Connections/Connections'

import style from './sidebar.module.css'

import avatar from '@/images/City2Surf_Crop.png'
const background = '/images/background-2.webp'

const Sidebar = (): ReactElement => {
  const canvas = useRef<HTMLCanvasElement>(null)
  const image = useRef<HTMLImageElement>(null)
  let imageY = useRef(0)

  const parallax = useCallback((): void => {
    // console.log(document.getElementById('main').scrollTop)

    if (!image.current) return
    if (!canvas.current) return

    const main = document.getElementById('main')
    if (!main) return

    const ctx = canvas.current.getContext('2d')
    if (ctx === null) return
    const blurSize = 2 * window.devicePixelRatio

    const imgHeight = image.current.naturalHeight
    const imgWidth = image.current.naturalWidth

    const innerHeight = document.documentElement.clientHeight
    const innerWidth = canvas.current.clientWidth
    if (innerWidth === 0) return

    const docHeight = main.scrollHeight

    const scale = imgHeight / (innerHeight * 1 * window.devicePixelRatio)
    // const scale = 0.85

    const m = (imgHeight - innerHeight * scale) / (docHeight - innerHeight)
    const displacement = main.scrollTop - imageY.current
    imageY.current += displacement * 0.01
    const sy =
      m * Math.min(Math.max(imageY.current, 0), docHeight - innerHeight)
    ctx.restore()
    ctx.save()
    canvas.current.height = canvas.current.clientHeight
    canvas.current.width = canvas.current.clientWidth
    ctx.fillRect(0, 0, innerWidth, innerHeight)
    ctx.filter = `blur(${blurSize}px)`
    ctx.globalAlpha = 0.7
    const sx = (imgWidth - innerWidth * scale) * 0.5
    // if (sy === 0) return;
    ctx.drawImage(
      image.current,
      Math.round(sx),
      Math.round(sy),
      Math.round(scale * innerWidth),
      Math.round(scale * innerHeight),
      -blurSize,
      -blurSize,
      Math.round(innerWidth) + blurSize * 2,
      Math.round(innerHeight) + blurSize * 2
    )
    window.requestAnimationFrame(parallax)
  }, [])

  useEffect(() => {
    let num: number
    image.current = new Image()
    image.current.src = background
    image.current.onload = (): void => {
      num = window.requestAnimationFrame(parallax)
    }

    return () => {
      window.cancelAnimationFrame(num)
    }
  }, [parallax])

  const quote =
    'I build things, write the code for them, and run from the resulting explosion.'

  return (
    <nav
      className="relative top-0 w-full min-h-screen flex flex-col justify-center xl:h-screen xl:overflow-hidden xl:bg-black xl:w-1/3"
      role="complementary"
    >
      <div className="flex flex-col z-10 text-center items-center h-full mt-20">
        <div className="rounded-full w-40 h-40 overflow-hidden">
          <NextImage
            src={avatar}
            className='hover:scale-125 transform-gpu transition duration-500'
            alt="me"
            placeholder="blur"
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </div>
        <div className={style.quote}>{quote}</div>
        <Connections />
      </div>
      <canvas
        className="absolute top-0 h-screen w-full invisible xl:visible"
        ref={canvas}
      />
      <div className="overflow-hidden h-screen w-full absolute xl:hidden">
        <div className="transform-gpu scale-110">
          <div className="bg-city-image md:bg-airplane-image h-screen w-screen bg-cover bg-center filter blur-sm top-0" />
        </div>
      </div>
    </nav>
  )
}

export default Sidebar
