import type { ReactNode } from 'react'

interface EquationProps {
  /** Equation label as printed in the report, e.g. "1a". */
  tag: string
  children: ReactNode
}

/** Display equation with a right-aligned tag. Children are MathML. */
export function Equation({ tag, children }: EquationProps) {
  return (
    <div
      id={`eq-${tag}`}
      className="my-3 grid scroll-mt-24 grid-cols-[1fr_auto] items-center gap-4 overflow-x-auto overflow-y-hidden py-2 text-lg text-foreground"
    >
      <div className="text-center [&_math]:text-[1.15em]">{children}</div>
      <span className="font-mono text-xs text-muted-foreground">({tag})</span>
    </div>
  )
}
