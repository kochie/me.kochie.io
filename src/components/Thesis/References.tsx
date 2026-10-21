import type { ReactNode } from 'react'

export function References({ children }: { children: ReactNode }) {
  return (
    <ol className="my-6 list-none divide-y divide-border border-y border-border p-0 text-[15px]">
      {children}
    </ol>
  )
}

interface ReferenceProps {
  n: number
  authors: string
  title?: string
  /** Render the title in italics (books). */
  book?: boolean
  /** Journal, proceedings or publisher; rendered in italics. */
  source?: string
  /** Volume, pages, year and so on, printed after the source. */
  detail?: string
  href?: string
}

const hostOf = (href: string) => new URL(href).hostname.replace(/^www\./, '')

export function Reference({
  n,
  authors,
  title,
  book,
  source,
  detail,
  href,
}: ReferenceProps) {
  return (
    <li
      id={`ref-${n}`}
      className="flex scroll-mt-24 gap-4 py-4 leading-relaxed text-foreground/85 target:text-foreground"
    >
      <span className="w-8 shrink-0 pt-px text-right font-mono text-xs text-muted-foreground">
        [{n}]
      </span>
      <div className="min-w-0 [overflow-wrap:anywhere]">
        <p className="m-0">
          <span className="text-foreground">{authors}.</span>
          {title && (
            <>
              {' '}
              {book ? <em>{title}</em> : title}
              {/[.?!]$/.test(title) ? '' : '.'}
            </>
          )}
          {source && (
            <>
              {' '}
              {book ? source : <em>{source}</em>}
              {detail ? ',' : '.'}
            </>
          )}
          {detail && <> {detail}.</>}
        </p>
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block font-mono text-xs tracking-wide text-muted-foreground hover:text-wheat"
          >
            {hostOf(href)} ↗
          </a>
        )}
      </div>
    </li>
  )
}
