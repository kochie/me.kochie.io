import type { ReactNode } from 'react'
import Image from 'next/image'

interface FigureImage {
  src: string
  width: number
  height: number
  alt: string
  /** Sub-label such as "(a)" shown beneath the image. */
  label?: string
}

interface FigureProps {
  n: string
  caption: string
  images?: FigureImage[]
  /** Interactive content in place of static images. */
  children?: ReactNode
  /** Small provenance line shown under an interactive figure. */
  note?: string
  /** Constrain a small figure so it isn't blown up to the full column. */
  maxWidth?: number
  /** Minimum rendered width in px; narrower screens scroll sideways. */
  minWidth?: number
}

/**
 * Report figure. Plots were exported with transparent backgrounds and dark
 * text, so they sit on a white plate to stay legible in both themes.
 */
export function Figure({
  n,
  caption,
  images = [],
  children,
  note,
  maxWidth,
  minWidth,
}: FigureProps) {
  return (
    <figure id={`fig-${n}`} className="my-12 scroll-mt-24 md:-mx-6 lg:-mx-10">
      {children ? (
        <div
          className="mx-auto rounded-md border border-border p-3 sm:p-5"
          style={{ maxWidth }}
        >
          {children}
          {note && (
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {note}
            </p>
          )}
        </div>
      ) : (
        <div
          className="mx-auto grid gap-4 rounded-md border border-border bg-white p-3 sm:p-5 dark:brightness-[0.93]"
          style={{
            maxWidth,
            gridTemplateColumns:
              images.length > 1
                ? 'repeat(auto-fit, minmax(14rem, 1fr))'
                : undefined,
          }}
        >
          {images.map((image) => (
            <div
              key={image.src}
              className={`flex flex-col items-center gap-2 ${minWidth ? 'overflow-x-auto' : ''}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(max-width: 768px) 100vw, 768px"
                className="h-auto w-full"
                style={minWidth ? { minWidth } : undefined}
              />
              {image.label && (
                <span className="font-mono text-[11px] tracking-[0.12em] text-neutral-500">
                  {image.label}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
      <figcaption className="mx-auto mt-4 flex gap-3 text-sm leading-relaxed text-muted-foreground md:px-2">
        <span className="shrink-0 pt-px font-mono text-[11px] uppercase tracking-[0.22em]">
          Fig. {n}
        </span>
        <span className="font-display italic">{caption}</span>
      </figcaption>
    </figure>
  )
}
