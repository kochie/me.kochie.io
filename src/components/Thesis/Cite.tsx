interface CiteProps {
  n: number | number[]
}

/** Inline bibliography citation, e.g. [5] or [16, 15], linking to the reference. */
export function Cite({ n }: CiteProps) {
  const numbers = Array.isArray(n) ? n : [n]
  return (
    <span className="font-mono text-[0.8em] text-muted-foreground">
      [
      {numbers.map((num, i) => (
        <span key={num}>
          {i > 0 && ', '}
          <a
            href={`#ref-${num}`}
            className="underline decoration-border underline-offset-2 hover:text-foreground hover:decoration-wheat"
          >
            {num}
          </a>
        </span>
      ))}
      ]
    </span>
  )
}
