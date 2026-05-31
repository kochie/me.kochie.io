import type { ReactNode } from 'react'

interface SectionHeaderProps {
  number: string
  department: string
  title: ReactNode
  /** Optional editor's note rendered next to the title in italic body face. */
  note?: ReactNode
  /** id used for in-page anchors. */
  id?: string
}

/**
 * Editorial section header — pairs a small mono "No. NN — DEPARTMENT" eyebrow
 * with a Fraunces title, separated by a hairline rule. Used as the spine of
 * every section on the page.
 */
export function SectionHeader({
  number,
  department,
  title,
  note,
  id,
}: SectionHeaderProps) {
  return (
    <header className="mb-8 lg:mb-12" id={id}>
      <div className="flex items-baseline gap-3 text-[11px] uppercase tracking-[0.22em] font-mono text-muted-foreground">
        <span>No. {number}</span>
        <span aria-hidden="true" className="text-wheat">
          ·
        </span>
        <span>{department}</span>
      </div>
      <div className="mt-3 h-px bg-border" />
      <div className="mt-5 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3">
        <h2 className="text-[2rem] leading-[1.05] lg:text-5xl text-foreground tracking-tight max-w-[18ch] lg:max-w-none">
          {title}
        </h2>
        {note && (
          <p className="font-display italic text-[15px] lg:text-base text-muted-foreground lg:max-w-md lg:text-right">
            {note}
          </p>
        )}
      </div>
    </header>
  )
}
