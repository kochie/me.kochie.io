import React, { useRef, useEffect, ReactElement } from 'react'
import NextImage from 'next/image'

import Connections from '@/components/Connections/Connections'

import style from './sidebar.module.css'

import avatar from '@/images/AfterRunning_Square.png'
const background = '/images/background-2.webp'

const Sidebar = (): ReactElement => {
  const canvas = useRef<HTMLCanvasElement>(null)
  const image = useRef<HTMLImageElement>(null)
  let imageY = 0

  const parallax = (): void => {
    // console.log(document.getElementById('main').scrollTop)

    if (!image.current) return
    if (canvas.current === null) return
    if (!document.getElementById('main')) return

    const main = document.getElementById('main')

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
    const displacement = main.scrollTop - imageY
    imageY += displacement * 0.01
    const sy = m * Math.min(Math.max(imageY, 0), docHeight - innerHeight)
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
  }

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
  }, [])

  const quote =
    'I build things, write the code for them, and run from the resulting explosion.'

  return (
    <div className="relative top-0 w-screen min-h-screen flex flex-col justify-center xl:h-screen xl:overflow-hidden xl:bg-black xl:w-1/3">
      <div className="flex flex-col z-10 text-center items-center h-full mt-20">
        <div className="rounded-full w-40 h-40 overflow-hidden">
          <NextImage layout="responsive" src={avatar} alt="me" />
        </div>
        <div className={style.quote}>{quote}</div>
        <Connections />
      </div>
      <canvas
        className="absolute top-0 h-screen w-full invisible xl:visible"
        ref={canvas}
      />
      <div className="overflow-hidden h-screen w-screen absolute xl:hidden">
        <div className="transform-gpu scale-110">
          <div className="bg-city-image md:bg-airplane-image h-screen w-screen bg-cover bg-center filter blur-sm top-0" />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
