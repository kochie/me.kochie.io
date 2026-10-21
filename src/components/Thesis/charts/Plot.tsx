'use client'

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from 'react'

export type Marker = 'circle' | 'square' | 'cross' | 'diamond'

export interface PlotSeries {
  id: string
  label: string
  color: string
  dash?: string
  marker?: Marker
  points: { x: number; y: number }[]
  /** Exact value for hover on continuous curves; defaults to a point lookup. */
  at?: (x: number) => number
}

interface PlotProps {
  series: PlotSeries[]
  xDomain: [number, number]
  yDomain: [number, number]
  xTicks: number[]
  yTicks: number[]
  xLabel: string
  yLabel: string
  /** Snap the hover cursor to whole x values (epochs). */
  discrete?: boolean
  formatX?: (x: number) => string
  formatY?: (y: number) => string
  /** Screen-reader summary of what the chart shows. */
  description: string
  /** Let readers hide and show series from the legend. */
  toggle?: boolean
  /** Height as a fraction of width. */
  aspect?: number
}

const MARGIN = { top: 14, right: 18, bottom: 44, left: 52 }

/** Round tick values spanning [min, max]. */
export function niceTicks(min: number, max: number, target = 6): number[] {
  const span = max - min || 1
  const raw = span / target
  const pow = Math.pow(10, Math.floor(Math.log10(raw)))
  const step = [1, 2, 2.5, 5, 10].map((m) => m * pow).find((s) => s >= raw)!
  const start = Math.ceil(min / step) * step
  const ticks: number[] = []
  for (let t = start; t <= max + step * 1e-6; t += step) {
    ticks.push(Math.round(t / step) * step)
  }
  return ticks
}

function MarkerShape({
  marker,
  x,
  y,
  color,
}: {
  marker: Marker
  x: number
  y: number
  color: string
}) {
  const r = 3.5
  switch (marker) {
    case 'square':
      return (
        <rect x={x - r} y={y - r} width={r * 2} height={r * 2} fill={color} />
      )
    case 'diamond':
      return (
        <path
          d={`M${x} ${y - r - 1}L${x + r + 1} ${y}L${x} ${y + r + 1}L${x - r - 1} ${y}Z`}
          fill={color}
        />
      )
    case 'cross':
      return (
        <path
          d={`M${x - r} ${y - r}L${x + r} ${y + r}M${x - r} ${y + r}L${x + r} ${y - r}`}
          stroke={color}
          strokeWidth={2}
          fill="none"
        />
      )
    default:
      return <circle cx={x} cy={y} r={r} fill={color} />
  }
}

function valueAt(series: PlotSeries, x: number): number | undefined {
  if (series.at) return series.at(x)
  return series.points.find((p) => p.x === x)?.y
}

export function Plot({
  series,
  xDomain,
  yDomain,
  xTicks,
  yTicks,
  xLabel,
  yLabel,
  discrete = false,
  formatX = (x) => String(x),
  formatY = (y) => String(y),
  description,
  toggle = false,
  aspect = 0.5,
}: PlotProps) {
  const uid = useId()
  const frame = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(720)
  const [hidden, setHidden] = useState<Set<string>>(new Set())
  const [hoverX, setHoverX] = useState<number | null>(null)

  useEffect(() => {
    const el = frame.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) =>
      setWidth(Math.max(260, Math.round(entry.contentRect.width)))
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const height = Math.max(240, Math.round(width * aspect))
  const innerW = width - MARGIN.left - MARGIN.right
  const innerH = height - MARGIN.top - MARGIN.bottom

  const sx = (x: number) =>
    MARGIN.left + ((x - xDomain[0]) / (xDomain[1] - xDomain[0])) * innerW
  const sy = (y: number) =>
    MARGIN.top + (1 - (y - yDomain[0]) / (yDomain[1] - yDomain[0])) * innerH

  const visible = useMemo(
    () => series.filter((s) => !hidden.has(s.id)),
    [series, hidden]
  )

  const clampX = (x: number) => {
    const clamped = Math.min(xDomain[1], Math.max(xDomain[0], x))
    return discrete ? Math.round(clamped) : clamped
  }

  const onMove = (event: PointerEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const px = event.clientX - rect.left
    const x =
      xDomain[0] + ((px - MARGIN.left) / innerW) * (xDomain[1] - xDomain[0])
    setHoverX(clampX(x))
  }

  const onKey = (event: KeyboardEvent<SVGSVGElement>) => {
    const step = discrete ? 1 : (xDomain[1] - xDomain[0]) / 60
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault()
      const dir = event.key === 'ArrowRight' ? 1 : -1
      setHoverX((current) => clampX((current ?? xDomain[0]) + dir * step))
    } else if (event.key === 'Escape') {
      setHoverX(null)
    }
  }

  const rows =
    hoverX === null
      ? []
      : visible
          .map((s) => ({ s, y: valueAt(s, hoverX) }))
          .filter((r): r is { s: PlotSeries; y: number } => r.y !== undefined)

  const tooltipLeft = hoverX === null ? 0 : sx(hoverX)
  const flip = tooltipLeft > width * 0.6

  const epochs = discrete
    ? Array.from(new Set(series.flatMap((s) => s.points.map((p) => p.x)))).sort(
        (a, b) => a - b
      )
    : []

  return (
    <div className="w-full">
      <ul className="mb-3 flex flex-wrap gap-x-5 gap-y-2" aria-label="Legend">
        {series.map((s) => {
          const off = hidden.has(s.id)
          const swatch = (
            <svg width="26" height="12" aria-hidden="true">
              <line
                x1="1"
                x2="25"
                y1="6"
                y2="6"
                stroke={s.color}
                strokeWidth="2"
                strokeDasharray={s.dash}
              />
              {s.marker && (
                <MarkerShape marker={s.marker} x={13} y={6} color={s.color} />
              )}
            </svg>
          )
          const text = (
            <span
              className={`font-mono text-[11px] tracking-wide ${off ? 'text-muted-foreground line-through' : 'text-foreground'}`}
            >
              {s.label}
            </span>
          )
          return (
            <li key={s.id}>
              {toggle ? (
                <button
                  type="button"
                  aria-pressed={!off}
                  onClick={() =>
                    setHidden((current) => {
                      const next = new Set(current)
                      if (next.has(s.id)) next.delete(s.id)
                      else next.add(s.id)
                      return next
                    })
                  }
                  className={`flex items-center gap-2 rounded px-1 py-0.5 transition-opacity hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wheat ${off ? 'opacity-50' : ''}`}
                >
                  {swatch}
                  {text}
                </button>
              ) : (
                <span className="flex items-center gap-2 px-1 py-0.5">
                  {swatch}
                  {text}
                </span>
              )}
            </li>
          )
        })}
      </ul>

      <div ref={frame} className="relative w-full">
        <svg
          width={width}
          height={height}
          role="img"
          aria-label={description}
          tabIndex={0}
          onPointerMove={onMove}
          onPointerLeave={() => setHoverX(null)}
          onKeyDown={onKey}
          onBlur={() => setHoverX(null)}
          className="block touch-pan-y select-none rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wheat"
        >
          <defs>
            <clipPath id={`${uid}-clip`}>
              <rect
                x={MARGIN.left}
                y={MARGIN.top}
                width={innerW}
                height={innerH}
              />
            </clipPath>
          </defs>

          {yTicks.map((t) => (
            <g key={`y${t}`}>
              <line
                x1={MARGIN.left}
                x2={width - MARGIN.right}
                y1={sy(t)}
                y2={sy(t)}
                className="stroke-border"
                strokeWidth={t === 0 ? 1.5 : 1}
              />
              <text
                x={MARGIN.left - 8}
                y={sy(t)}
                textAnchor="end"
                dominantBaseline="middle"
                className="fill-muted-foreground font-mono"
                fontSize={11}
              >
                {t}
              </text>
            </g>
          ))}
          {xTicks.map((t) => (
            <g key={`x${t}`}>
              <line
                x1={sx(t)}
                x2={sx(t)}
                y1={MARGIN.top}
                y2={MARGIN.top + innerH}
                className="stroke-border"
                strokeOpacity={0.5}
              />
              <text
                x={sx(t)}
                y={MARGIN.top + innerH + 16}
                textAnchor="middle"
                className="fill-muted-foreground font-mono"
                fontSize={11}
              >
                {t}
              </text>
            </g>
          ))}
          <text
            x={MARGIN.left + innerW / 2}
            y={height - 6}
            textAnchor="middle"
            className="fill-muted-foreground font-mono"
            fontSize={11}
          >
            {xLabel}
          </text>
          <text
            transform={`translate(13 ${MARGIN.top + innerH / 2}) rotate(-90)`}
            textAnchor="middle"
            className="fill-muted-foreground font-mono"
            fontSize={11}
          >
            {yLabel}
          </text>

          <g clipPath={`url(#${uid}-clip)`}>
            {visible.map((s) => (
              <path
                key={s.id}
                d={s.points
                  .map(
                    (p, i) =>
                      `${i ? 'L' : 'M'}${sx(p.x).toFixed(1)} ${sy(p.y).toFixed(1)}`
                  )
                  .join('')}
                fill="none"
                stroke={s.color}
                strokeWidth={2}
                strokeDasharray={s.dash}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            ))}
          </g>

          {discrete &&
            visible.map((s) =>
              s.marker
                ? s.points.map((p) => (
                    <MarkerShape
                      key={`${s.id}-${p.x}`}
                      marker={s.marker!}
                      x={sx(p.x)}
                      y={sy(p.y)}
                      color={s.color}
                    />
                  ))
                : null
            )}

          {hoverX !== null && (
            <g pointerEvents="none">
              <line
                x1={sx(hoverX)}
                x2={sx(hoverX)}
                y1={MARGIN.top}
                y2={MARGIN.top + innerH}
                className="stroke-wheat"
                strokeWidth={1.5}
              />
              {rows.map(({ s, y }) => (
                <circle
                  key={s.id}
                  cx={sx(hoverX)}
                  cy={sy(y)}
                  r={5}
                  fill={s.color}
                  className="stroke-background"
                  strokeWidth={2}
                />
              ))}
            </g>
          )}
        </svg>

        {hoverX !== null && rows.length > 0 && (
          <div
            className="pointer-events-none absolute top-2 z-10 min-w-36 rounded-md border border-border bg-background/95 px-3 py-2 shadow-sm backdrop-blur-sm"
            style={{
              left: flip ? undefined : tooltipLeft + 12,
              right: flip ? width - tooltipLeft + 12 : undefined,
            }}
          >
            <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {xLabel} {formatX(hoverX)}
            </p>
            <ul className="space-y-0.5">
              {rows.map(({ s, y }) => (
                <li
                  key={s.id}
                  className="flex items-center justify-between gap-4 text-xs"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ background: s.color }}
                    />
                    {s.label}
                  </span>
                  <span className="font-mono tabular-nums">{formatY(y)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {discrete && (
        <div className="sr-only">
          <table>
            <caption>{description}</caption>
            <thead>
              <tr>
                <th scope="col">{xLabel}</th>
                {series.map((s) => (
                  <th key={s.id} scope="col">
                    {s.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {epochs.map((x) => (
                <tr key={x}>
                  <th scope="row">{x}</th>
                  {series.map((s) => {
                    const y = valueAt(s, x)
                    return (
                      <td key={s.id}>{y === undefined ? '' : formatY(y)}</td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
