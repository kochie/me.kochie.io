'use client'

import { useRef, useState } from 'react'

const POSTER_IMAGE = '/images/thesis-poster.webp'
const POSTER_PDF = '/Optimising_Neural_Networks_for_Embedded_Systems_Poster.pdf'

const controlClass =
  'rounded-full border border-border bg-background/80 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground no-underline backdrop-blur transition-colors hover:border-wheat hover:text-wheat focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wheat'

/** Button that opens the project poster in a full-screen modal. */
export function PosterButton({ className }: { className: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [zoomed, setZoomed] = useState(false)

  const open = () => {
    document.documentElement.style.overflow = 'hidden'
    dialogRef.current?.showModal()
  }

  const close = () => dialogRef.current?.close()

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        className={className}
      >
        View poster
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Project poster"
        onClose={() => {
          document.documentElement.style.overflow = ''
          window.setTimeout(() => setZoomed(false), 300)
        }}
        className="group m-0 h-dvh max-h-none w-dvw max-w-none bg-background p-0 text-foreground opacity-0 transition-[opacity,display,overlay] duration-300 ease-out transition-discrete open:opacity-100 starting:open:opacity-0 motion-reduce:transition-none backdrop:bg-black/80"
      >
        <div
          className="h-full translate-y-4 scale-[0.97] overflow-auto px-4 pb-6 pt-20 transition-transform duration-300 ease-out group-open:translate-y-0 group-open:scale-100 starting:group-open:translate-y-4 starting:group-open:scale-[0.97] motion-reduce:transition-none"
          onClick={(event) => {
            if (event.target === event.currentTarget) close()
          }}
        >
          <button
            type="button"
            onClick={() => setZoomed((z) => !z)}
            aria-label={zoomed ? 'Fit poster to screen' : 'Zoom in on poster'}
            className={`block mx-auto ${zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- static poster, loaded only when the dialog opens */}
            <img
              src={POSTER_IMAGE}
              alt="Poster for the Optimising Neural Networks for Embedded Systems final year project: abstract, activation function plots, TensorFlow and Torch frameworks, training error chart, results and the network layer pipeline."
              loading="lazy"
              className={
                zoomed
                  ? 'block h-auto w-[max(100%,900px)] max-w-[2400px]'
                  : 'block h-auto max-h-[calc(100dvh-6.5rem)] w-auto max-w-full'
              }
            />
          </button>
        </div>

        <div className="pointer-events-none fixed inset-x-0 top-0 flex items-center justify-between gap-3 p-4">
          <p className="pointer-events-auto hidden font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground sm:block">
            Final Year Project Poster · 2017
          </p>
          <div className="pointer-events-auto ml-auto flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={() => setZoomed((z) => !z)}
              className={controlClass}
            >
              {zoomed ? 'Fit to screen' : 'Zoom in'}
            </button>
            <a
              href={POSTER_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className={controlClass}
            >
              PDF <span aria-hidden="true">↗</span>
            </a>
            <button
              type="button"
              onClick={close}
              autoFocus
              className={controlClass}
            >
              Close <span aria-hidden="true">✕</span>
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}
