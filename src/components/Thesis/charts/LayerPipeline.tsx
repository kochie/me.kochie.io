'use client'

import { useEffect, useRef, useState } from 'react'

type Kind =
  | 'conv'
  | 'batch'
  | 'relu'
  | 'pool'
  | 'tmax'
  | 'tconv'
  | 'view'
  | 'softmax'

const KINDS: Record<
  Kind,
  { lines: [string] | [string, string]; fill: string; text: string }
> = {
  conv: {
    lines: ['Spatial', 'Convolution'],
    fill: '#a9c4de',
    text: 'Slides a bank of small learned filters across the image to pick out local patterns such as edges and textures.',
  },
  batch: {
    lines: ['Spatial Batch', 'Convolution'],
    fill: '#e48c7c',
    text: 'Rescales each feature map across the batch so the layers after it see well-behaved inputs.',
  },
  relu: {
    lines: ['ReLu'],
    fill: '#ecd470',
    text: 'The standard rectifier: positive values pass through unchanged and everything else becomes zero.',
  },
  pool: {
    lines: ['Max', 'Pooling'],
    fill: '#e9cf9f',
    text: 'Keeps only the strongest response in each small window, shrinking the feature maps.',
  },
  tmax: {
    lines: ['Ternary Max', 'Convolution'],
    fill: '#a58aaa',
    text: 'A ternary convolution block that includes a max-pooling step: activations are limited to −1, 0 or +1.',
  },
  tconv: {
    lines: ['Ternary', 'Convolution'],
    fill: '#9dc7bb',
    text: 'A convolution using the ternary activation from this report, so its outputs are −1, 0 or +1 and can be handled with cheap integer operations.',
  },
  view: {
    lines: ['View'],
    fill: '#3f8c74',
    text: 'Flattens the feature maps into a single vector so they can be scored by the final layer.',
  },
  softmax: {
    lines: ['Log Soft Max'],
    fill: '#c4607e',
    text: 'Turns the final scores into log-probabilities over the possible classes.',
  },
}

interface Group {
  label: string
  repeat?: boolean
  kinds: Kind[]
}

const GROUPS: Group[] = [
  { label: 'Stem · standard layers', kinds: ['conv', 'batch', 'relu', 'pool'] },
  {
    label: 'Ternary block · three ternary layers',
    repeat: true,
    kinds: ['tmax', 'tconv', 'tconv'],
  },
  {
    label: 'Ternary block · three ternary layers',
    repeat: true,
    kinds: ['tmax', 'tconv', 'tconv'],
  },
  {
    label: 'Head · standard layers, then classify',
    kinds: ['batch', 'relu', 'conv', 'view', 'softmax'],
  },
]

const NETWORK: Kind[] = GROUPS.flatMap((g) => g.kinds)
const ORDER = Object.keys(KINDS) as Kind[]

const BOX_W = 110
const BOX_H = 56
const GAP = 30
const WRAP_GAP = 34
const GROUP_GAP = 76
const PANEL_PAD = 8
const LABEL_H = 20
const PAD_X = 36
const PAD_Y = 8

interface Placed {
  group: number
  kind: Kind
  index: number
  x: number
  y: number
}

/** Figure 5: the network laid out by structure so the repeated block is obvious. */
export function LayerPipeline() {
  const frame = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(720)
  const [active, setActive] = useState<number | null>(null)
  const [legendKind, setLegendKind] = useState<Kind | null>(null)

  useEffect(() => {
    const el = frame.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) =>
      setWidth(Math.max(260, Math.round(entry.contentRect.width)))
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const perRow = Math.max(
    2,
    Math.floor((width - PAD_X * 2 + GAP) / (BOX_W + GAP))
  )
  const usedCols = Math.min(perRow, 5)
  const rowWidth = usedCols * BOX_W + (usedCols - 1) * GAP
  const left = Math.max(PAD_X, (width - rowWidth) / 2)

  // Lay out each group on its own rows, wrapping inside the group if needed.
  const placed: Placed[] = []
  const panels: {
    label: string
    repeat: boolean
    labelY: number
    y: number
    h: number
  }[] = []
  const groupBottoms: number[] = []
  let y = PAD_Y
  let index = 0
  GROUPS.forEach((group, gi) => {
    const top = y + (group.repeat ? PANEL_PAD : 0)
    const boxesTop = top + LABEL_H
    const chunks = Math.ceil(group.kinds.length / perRow)
    group.kinds.forEach((kind, i) => {
      placed.push({
        group: gi,
        kind,
        index: index++,
        x: left + (i % perRow) * (BOX_W + GAP),
        y: boxesTop + Math.floor(i / perRow) * (BOX_H + WRAP_GAP),
      })
    })
    const boxesBottom = boxesTop + chunks * BOX_H + (chunks - 1) * WRAP_GAP
    const bottom = boxesBottom + (group.repeat ? PANEL_PAD : 0)
    panels.push({
      label: group.label,
      repeat: !!group.repeat,
      labelY: top,
      y,
      h: bottom - y,
    })
    groupBottoms.push(bottom)
    y = bottom + GROUP_GAP
  })
  const height = y - GROUP_GAP + PAD_Y

  const activeKind = legendKind ?? (active === null ? null : NETWORK[active])
  const count = (kind: Kind) => NETWORK.filter((k) => k === kind).length

  return (
    <div>
      <div ref={frame} className="w-full">
        <svg
          width={width}
          height={height}
          role="group"
          aria-label="The example network as fifteen layers in order. A stem of spatial convolution, spatial batch convolution, ReLu and max pooling. Then a block of ternary max convolution and two ternary convolutions, repeated twice. Then a head of spatial batch convolution, ReLu, spatial convolution, view and log soft max."
          className="block text-foreground"
        >
          <defs>
            <marker
              id="pipe-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill="currentColor" />
            </marker>
          </defs>

          {panels.map((panel) => (
            <g key={`${panel.labelY}`}>
              {panel.repeat && (
                <rect
                  x={left - 14}
                  y={panel.y}
                  width={Math.min(perRow, 3) * (BOX_W + GAP) - GAP + 28}
                  height={panel.h}
                  rx={10}
                  className="fill-wheat stroke-wheat"
                  fillOpacity={0.07}
                  strokeOpacity={0.55}
                  strokeDasharray="5 5"
                />
              )}
              <text
                x={left}
                y={panel.labelY + 11}
                fontSize={11}
                letterSpacing="0.16em"
                className={`font-mono ${panel.repeat ? 'fill-wheat' : 'fill-muted-foreground'}`}
              >
                {panel.label.toUpperCase()}
              </text>
            </g>
          ))}

          {placed.slice(0, -1).map((a, i) => {
            const b = placed[i + 1]
            const ya = a.y + BOX_H / 2
            const mid =
              a.group !== b.group
                ? groupBottoms[a.group] + GROUP_GAP / 2
                : a.y + BOX_H + WRAP_GAP / 2
            const d =
              b.y === a.y
                ? `M${a.x + BOX_W + 2} ${ya}H${b.x - 3}`
                : `M${a.x + BOX_W + 2} ${ya}H${a.x + BOX_W + 28}V${mid}H${left - 28}V${b.y + BOX_H / 2}H${b.x - 3}`
            return (
              <path
                key={i}
                d={d}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinejoin="round"
                markerEnd="url(#pipe-arrow)"
                opacity={activeKind === null ? 0.8 : 0.3}
                style={{ transition: 'opacity 150ms' }}
              />
            )
          })}

          {placed.map(({ kind, index: i, x, y: by }) => {
            const { lines, fill } = KINDS[kind]
            const dimmed = activeKind !== null && activeKind !== kind
            return (
              <g
                key={i}
                tabIndex={0}
                role="img"
                aria-label={`Layer ${i + 1}: ${lines.join(' ')}. ${KINDS[kind].text}`}
                onPointerEnter={() => setActive(i)}
                onPointerLeave={(event) => {
                  if (event.pointerType === 'mouse') setActive(null)
                }}
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="cursor-pointer outline-none [&:focus-visible>rect]:stroke-wheat [&:focus-visible>rect]:stroke-[3]"
                style={{
                  opacity: dimmed ? 0.28 : 1,
                  transition: 'opacity 150ms',
                }}
              >
                <rect
                  x={x}
                  y={by}
                  width={BOX_W}
                  height={BOX_H}
                  rx={5}
                  fill={fill}
                  className="stroke-foreground"
                  strokeWidth={active === i ? 3 : 1.5}
                />
                <text
                  x={x + 6}
                  y={by + 13}
                  fontSize={10}
                  className="font-mono"
                  fill="#1c1917"
                  opacity={0.65}
                >
                  {String(i + 1).padStart(2, '0')}
                </text>
                {lines.map((line, n) => (
                  <text
                    key={line}
                    x={x + BOX_W / 2}
                    y={
                      by +
                      BOX_H / 2 +
                      (lines.length === 1 ? 7 : n === 0 ? 0 : 16)
                    }
                    textAnchor="middle"
                    fontSize={14}
                    fill="#1c1917"
                  >
                    {line}
                  </text>
                ))}
              </g>
            )
          })}
        </svg>
      </div>

      <ul
        className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-border pt-3"
        aria-label="Layer kinds"
      >
        {ORDER.map((kind) => (
          <li key={kind}>
            <button
              type="button"
              onPointerEnter={() => setLegendKind(kind)}
              onPointerLeave={() => setLegendKind(null)}
              onFocus={() => setLegendKind(kind)}
              onBlur={() => setLegendKind(null)}
              onClick={() => setLegendKind(legendKind === kind ? null : kind)}
              className="flex items-center gap-2 rounded px-1 py-0.5 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wheat"
            >
              <span
                className="inline-block h-3 w-3 rounded-sm border border-foreground/60"
                style={{ background: KINDS[kind].fill }}
              />
              <span className="font-mono text-[11px] tracking-wide">
                {KINDS[kind].lines.join(' ')} ×{count(kind)}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <p
        className="mt-3 min-h-16 text-sm leading-relaxed text-muted-foreground"
        aria-live="polite"
      >
        {activeKind === null ? (
          'Hover over a layer or a colour to see what it does. Layers of the same kind light up together.'
        ) : (
          <>
            <span className="text-foreground">
              {active !== null && legendKind === null ? `${active + 1}. ` : ''}
              {KINDS[activeKind].lines.join(' ')}
            </span>{' '}
            <span className="font-mono text-[11px] uppercase tracking-[0.12em]">
              (used {count(activeKind)}×)
            </span>
            {' — '}
            {KINDS[activeKind].text}
          </>
        )}
      </p>
    </div>
  )
}
