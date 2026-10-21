'use client'

import { useEffect, useRef, useState } from 'react'

import { niceTicks } from './Plot'

const COLORS = { base: '#7b9be0', optimised: '#e0a64f' }
const MARGIN = { top: 26, right: 12, bottom: 34, left: 48 }

interface Group {
  name: string
  base: number
  optimised: number
}

interface GroupedBarsProps {
  groups: Group[]
  unit: string
  /** Number of decimals when printing values. */
  digits: number
  yMax: number
  /** Optional alternative baseline (the original chart's truncated axis). */
  zoomFrom?: number
  yLabel: string
  description: string
}

/** Paired bars (standard vs optimised) with value labels and a delta readout. */
function GroupedBars({
  groups,
  unit,
  digits,
  yMax,
  zoomFrom,
  yLabel,
  description,
}: GroupedBarsProps) {
  const frame = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(640)
  const [zoomed, setZoomed] = useState(false)
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    const el = frame.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) =>
      setWidth(Math.max(260, Math.round(entry.contentRect.width)))
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const yMin = zoomed && zoomFrom !== undefined ? zoomFrom : 0
  const height = Math.max(260, Math.round(width * 0.58))
  const innerW = width - MARGIN.left - MARGIN.right
  const innerH = height - MARGIN.top - MARGIN.bottom
  const sy = (v: number) =>
    MARGIN.top + (1 - (v - yMin) / (yMax - yMin)) * innerH
  const band = innerW / groups.length
  const barW = Math.min(64, band * 0.3)
  const fmt = (v: number) => v.toFixed(digits)
  const ticks = niceTicks(yMin, yMax, 5)

  const delta = (g: Group) => {
    const diff = g.base - g.optimised
    const pct = (diff / g.base) * 100
    return `${fmt(g.base)} → ${fmt(g.optimised)} ${unit}: ${fmt(diff)} ${unit} less (${pct.toFixed(0)}% smaller)`
  }

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <ul className="flex flex-wrap gap-x-5 gap-y-1" aria-label="Legend">
          {[
            ['Non-linear', COLORS.base],
            ['Piecewise linear', COLORS.optimised],
          ].map(([label, color]) => (
            <li key={label} className="flex items-center gap-2">
              <span
                className="inline-block h-3 w-3 rounded-sm"
                style={{ background: color }}
              />
              <span className="font-mono text-[11px] tracking-wide">
                {label}
              </span>
            </li>
          ))}
        </ul>
        {zoomFrom !== undefined && (
          <button
            type="button"
            aria-pressed={zoomed}
            onClick={() => setZoomed((z) => !z)}
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground underline decoration-border underline-offset-4 hover:text-wheat"
          >
            {zoomed
              ? `Axis from ${zoomFrom} (as drawn)`
              : 'Axis from 0 (to scale)'}
          </button>
        )}
      </div>

      <div ref={frame} className="w-full">
        <svg
          width={width}
          height={height}
          role="img"
          aria-label={description}
          className="block"
        >
          {ticks.map((t) => (
            <g key={t}>
              <line
                x1={MARGIN.left}
                x2={width - MARGIN.right}
                y1={sy(t)}
                y2={sy(t)}
                className="stroke-border"
                strokeWidth={t === yMin ? 1.5 : 1}
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
          <text
            transform={`translate(12 ${MARGIN.top + innerH / 2}) rotate(-90)`}
            textAnchor="middle"
            className="fill-muted-foreground font-mono"
            fontSize={11}
          >
            {yLabel}
          </text>

          {groups.map((g, i) => {
            const cx = MARGIN.left + band * (i + 0.5)
            const on = active === i
            return (
              <g
                key={g.name}
                tabIndex={0}
                aria-label={`${g.name}: ${delta(g)}`}
                onPointerEnter={() => setActive(i)}
                onPointerLeave={(event) => {
                  if (event.pointerType === 'mouse') setActive(null)
                }}
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="cursor-pointer outline-none [&:focus-visible>rect:first-child]:stroke-wheat [&:focus-visible>rect:first-child]:stroke-2"
                style={{
                  opacity: active === null || on ? 1 : 0.45,
                  transition: 'opacity 150ms',
                }}
              >
                <rect
                  x={cx - band / 2 + 8}
                  y={MARGIN.top}
                  width={band - 16}
                  height={innerH}
                  fill="transparent"
                  rx={6}
                  className={on ? 'stroke-border' : ''}
                />
                {[
                  { v: g.base, x: cx - barW - 1, color: COLORS.base },
                  { v: g.optimised, x: cx + 1, color: COLORS.optimised },
                ].map(({ v, x, color }) => (
                  <g key={color}>
                    <rect
                      x={x}
                      y={sy(v)}
                      width={barW}
                      height={Math.max(0, sy(yMin) - sy(v))}
                      fill={color}
                      rx={2}
                      style={{ transition: 'y 250ms, height 250ms' }}
                    />
                    <text
                      x={x + barW / 2}
                      y={sy(v) - 6}
                      textAnchor="middle"
                      className="fill-foreground font-mono"
                      fontSize={11}
                    >
                      ≈{fmt(v)}
                    </text>
                  </g>
                ))}
                <text
                  x={cx}
                  y={MARGIN.top + innerH + 20}
                  textAnchor="middle"
                  className="fill-foreground"
                  fontSize={13}
                >
                  {g.name}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
      <p
        className="mt-3 min-h-10 border-t border-border pt-3 text-sm leading-relaxed text-muted-foreground"
        aria-live="polite"
      >
        {active === null ? (
          'Hover over or focus a network to compare its two bars.'
        ) : (
          <>
            <span className="text-foreground">{groups[active].name}</span>
            {' — '}
            {delta(groups[active])}
          </>
        )}
      </p>
    </div>
  )
}

/** Figure 13: average batch time (batch size 20), values read from the original chart. */
export function BatchTimeChart() {
  return (
    <GroupedBars
      groups={[
        { name: 'AlexNet', base: 3.2, optimised: 2.8 },
        { name: 'VGG', base: 3.5, optimised: 3.4 },
        { name: 'Inception', base: 2.7, optimised: 2.6 },
      ]}
      unit="s"
      digits={1}
      yMax={3.5}
      zoomFrom={2.5}
      yLabel="Average batch time (s), batch size 20"
      description="Grouped bar chart of average batch time for a batch of 20, in seconds. AlexNet: about 3.2 with non-linear activations and 2.8 with piecewise linear. VGG: 3.5 and 3.4. Inception: 2.7 and 2.6."
    />
  )
}

/** Figure 14: model file size in MB, values read from the original chart. */
export function FileSizeChart() {
  return (
    <GroupedBars
      groups={[
        { name: 'AlexNet', base: 80, optimised: 68 },
        { name: 'VGG', base: 490, optimised: 377 },
        { name: 'Inception', base: 161, optimised: 134 },
      ]}
      unit="MB"
      digits={0}
      yMax={500}
      yLabel="File size (MB)"
      description="Grouped bar chart of model file size in megabytes. AlexNet: about 80 with non-linear activations and 68 with piecewise linear. VGG: 490 and 377. Inception: 161 and 134."
    />
  )
}
