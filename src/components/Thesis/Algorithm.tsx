interface AlgorithmProps {
  n: number
  title: string
  requires?: string
  /** [indent level, text] pairs; they are numbered in order. */
  lines: [number, string][]
  /** Trailing line without a number (e.g. the return statement). */
  footer?: [number, string]
}

export function Algorithm({
  n,
  title,
  requires,
  lines,
  footer,
}: AlgorithmProps) {
  return (
    <figure
      id={`alg-${n}`}
      className="my-10 scroll-mt-24 overflow-hidden rounded-md border border-border bg-muted"
    >
      <figcaption className="border-b border-border px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        Algorithm {n} <span className="text-wheat">·</span> {title}
      </figcaption>
      <div className="overflow-x-auto px-5 py-4 font-mono text-[13px] leading-6 text-foreground">
        {requires && (
          <p className="mb-2 text-muted-foreground">
            <span className="font-medium text-foreground">Require:</span>{' '}
            {requires}
          </p>
        )}
        <ol className="m-0 list-none p-0">
          {lines.map(([indent, text], i) => (
            <li key={i} className="flex gap-4 whitespace-pre">
              <span
                aria-hidden="true"
                className="w-5 shrink-0 select-none text-right text-muted-foreground"
              >
                {i + 1}
              </span>
              <span style={{ paddingLeft: `${indent * 1.5}rem` }}>{text}</span>
            </li>
          ))}
          {footer && (
            <li className="flex gap-4 whitespace-pre">
              <span className="w-5 shrink-0" aria-hidden="true" />
              <span style={{ paddingLeft: `${footer[0] * 1.5}rem` }}>
                {footer[1]}
              </span>
            </li>
          )}
        </ol>
      </div>
    </figure>
  )
}
