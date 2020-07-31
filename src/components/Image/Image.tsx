import React, { useEffect, useRef, CSSProperties } from 'react'
import { sharpen, blur } from './image.css'
import styles from '../App/app.module.css'

export interface Image {
  lqip: string
  src: string
  width?: number | string
  height?: number | string
  alt?: string
  style?: CSSProperties
  className?: string
  loadOnObserve?: boolean
}

const Image = ({
  lqip,
  src,
  width,
  height,
  style,
  alt,
  className = '',
  loadOnObserve = false,
}: Image) => {
  const imgRef = useRef<HTMLImageElement>(null)

  async function getImage() {
    // console.log("WOAH")
    try {
      const image = await fetch(src).catch((error) => {
        throw error
      })

      if (!image.ok) return

      const blob = await image.blob()

      if (imgRef.current) {
        imgRef.current.src = URL.createObjectURL(blob)
        imgRef.current.classList.add(sharpen)
      } else {
        console.warn('imgRef does not have a current reference!')
      }
    } catch (error) {
      console.error(error)
    }
  }

  function createIntersectionObserver(): IntersectionObserver {
    const observer = new IntersectionObserver((entries, observer) => {
      // console.log(entries.length)
      entries.forEach((entry) => {
        if (entry.isIntersecting && imgRef.current) {
          getImage()
          observer.unobserve(imgRef.current)
        }
      })
    })
    if (imgRef.current) observer.observe(imgRef.current)
    return observer
  }

  useEffect(() => {
    if (!loadOnObserve) getImage()
    else {
      const observer = createIntersectionObserver()
      return () => {
        if (imgRef.current) observer.unobserve(imgRef.current)
      }
    }
  })

  const containerClasses = [styles.container, className].join(' ')

  return (
    <div className={containerClasses} style={{ ...style, width, height }}>
      <img
        ref={imgRef}
        src={lqip}
        width={'100%'}
        height={'100%'}
        className={blur}
        alt={alt}
      />
    </div>
  )
}

export default Image
