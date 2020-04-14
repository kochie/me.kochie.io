import React, { useRef, useEffect, ReactElement } from 'react'

import { Connections } from '..'

import style from './sidebar.module.css'

import avatar from '../../assets/images/me.webp'
import background from '../../assets/images/background-2.webp'

const Sidebar = (): ReactElement => {
  const canvas = useRef<HTMLCanvasElement>(null)
  const image = useRef<HTMLImageElement>(null)
  let imageY = 0

  const parallax = (): void => {
    if (!image.current) return
    if (canvas.current === null) return
    const ctx = canvas.current.getContext('2d')
    if (ctx === null) return
    const blurSize = 2 * window.devicePixelRatio

    const imgHeight = image.current.naturalHeight
    const imgWidth = image.current.naturalWidth

    const innerHeight = document.documentElement.clientHeight
    const innerWidth = canvas.current.clientWidth
    if (innerWidth === 0) return

    const docHeight = document.body.scrollHeight

    const scale = imgHeight / (innerHeight * 1.1 * window.devicePixelRatio)

    const m = (imgHeight - innerHeight * scale) / (docHeight - innerHeight)
    const displacement = window.scrollY - imageY
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
    image.current = new Image()
    image.current.src = background
    image.current.onload = (): void => {
      window.requestAnimationFrame(parallax)
    }
  }, [])

  const quote =
    'I build things, write the code for them, and run from the resulting explosion.'

  return (
    <div className={style.sidebar}>
      <div className={style['sidebar-header']}>
        <div className={style.avatar}>
          <img alt="me" src={avatar} />
        </div>
        <div className={style.quote}>{quote}</div>
        <Connections />
      </div>
      <canvas className={style.canvas} ref={canvas} />
      <div className={style['bg-image']} />
    </div>
  )
}

export default Sidebar
