'use client'

import { useEffect, useRef } from 'react'

const BACKGROUND_SRC = '/images/background-2.webp'

// Reserve 20% of the image's vertical extent as parallax travel — guarantees
// non-zero slack even when the canvas matches the image's aspect ratio.
const PARALLAX_FACTOR = 0.8

export function ParallaxCanvas() {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1280px)')

    let rafId = 0
    let imageY = 0
    let img: HTMLImageElement | null = null

    const parallax = () => {
      if (!canvas.current || !img) return

      const main = document.getElementById('main')
      if (!main) return

      const ctx = canvas.current.getContext('2d')
      if (ctx === null) return

      const imgW = img.naturalWidth
      const imgH = img.naturalHeight
      if (imgW === 0 || imgH === 0) return

      const canvasW = canvas.current.clientWidth
      const canvasH = canvas.current.clientHeight
      if (canvasW === 0 || canvasH === 0) return

      const blurSize = 2 * window.devicePixelRatio
      const targetAR = canvasW / canvasH

      // Pick a source crop with the canvas's aspect ratio: prefer fitting by
      // image width (gives the largest possible crop on wide screens), and
      // fall back to height-fit when the image isn't wide enough.
      let sampleW = imgW
      let sampleH = sampleW / targetAR
      if (sampleH > imgH) {
        sampleH = imgH
        sampleW = sampleH * targetAR
      }

      // Reserve vertical pan room. If sampleH already has slack vs. imgH,
      // keep it; otherwise shrink the sample so we have something to pan.
      const maxSampleH = imgH * PARALLAX_FACTOR
      if (sampleH > maxSampleH) {
        sampleH = maxSampleH
        sampleW = sampleH * targetAR
      }

      const verticalPan = imgH - sampleH
      const sx = (imgW - sampleW) / 2

      // Map scroll position to a source-y inside the pan range, with the
      // existing easing toward target (0.01 lerp factor preserves the feel).
      const docHeight = main.scrollHeight
      const innerHeight = document.documentElement.clientHeight
      const scrollMax = Math.max(1, docHeight - innerHeight)
      imageY += (main.scrollTop - imageY) * 0.01
      const sy =
        (verticalPan / scrollMax) * Math.min(Math.max(imageY, 0), scrollMax)

      // Reset draw state and resize backing buffer in case the layout changed.
      ctx.restore()
      ctx.save()
      canvas.current.width = canvasW
      canvas.current.height = canvasH
      ctx.fillRect(0, 0, canvasW, canvasH)
      ctx.filter = `blur(${blurSize}px)`
      // Lower alpha = more coal showing through, easier to read text overlay.
      ctx.globalAlpha = 0.55

      ctx.drawImage(
        img,
        Math.round(sx),
        Math.round(sy),
        Math.round(sampleW),
        Math.round(sampleH),
        -blurSize,
        -blurSize,
        Math.round(canvasW) + blurSize * 2,
        Math.round(canvasH) + blurSize * 2
      )

      rafId = window.requestAnimationFrame(parallax)
    }

    const stop = () => {
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId)
        rafId = 0
      }
    }

    const start = () => {
      if (rafId !== 0) return
      if (!img) {
        img = new Image()
        img.src = BACKGROUND_SRC
        // Cached images may already be complete by the time this effect
        // runs — onload would never fire. Kick the loop off directly when
        // the image is already decoded.
        if (img.complete && img.naturalWidth > 0) {
          rafId = window.requestAnimationFrame(parallax)
        } else {
          img.onload = () => {
            rafId = window.requestAnimationFrame(parallax)
          }
        }
      } else {
        rafId = window.requestAnimationFrame(parallax)
      }
    }

    // Only run the loop when the canvas is actually visible (xl breakpoint).
    // React to viewport changes — shrinking from desktop to tablet pauses
    // the loop, growing back resumes it.
    const onChange = () => {
      if (mq.matches) start()
      else stop()
    }
    onChange()
    mq.addEventListener('change', onChange)

    return () => {
      mq.removeEventListener('change', onChange)
      stop()
    }
  }, [])

  return (
    <canvas
      className="absolute top-0 h-screen w-full invisible xl:visible"
      ref={canvas}
    />
  )
}
