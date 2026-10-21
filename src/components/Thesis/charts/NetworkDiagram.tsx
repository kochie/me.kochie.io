'use client'

import { useState } from 'react'

const SIZES = [3, 4, 4, 2]
const NAMES = [
  'Input layer',
  'Hidden layer 1',
  'Hidden layer 2',
  'Output layer',
]
const FILLS = ['#a78bba', '#e0806c', '#e0806c', '#5fae98']

const WIDTH = 800
const HEIGHT = 500
const RADIUS = 31
const XS = [105, 300, 500, 695]
const GAP = 100

const nodeY = (layer: number, index: number) =>
  HEIGHT / 2 + 20 + (index - (SIZES[layer] - 1) / 2) * GAP

// Trig results differ in the last digits between Node and browsers, so round
// coordinates to keep server and client markup identical.
const r2 = (n: number) => Math.round(n * 100) / 100

interface Active {
  layer: number
  index: number
}

const edges = SIZES.slice(0, -1)
  .flatMap((count, layer) =>
    Array.from({ length: count }, (_, from) =>
      Array.from({ length: SIZES[layer + 1] }, (_, to) => {
        const x1 = XS[layer]
        const y1 = nodeY(layer, from)
        const x2 = XS[layer + 1]
        const y2 = nodeY(layer + 1, to)
        const angle = Math.atan2(y2 - y1, x2 - x1)
        const gap = RADIUS + 3
        return {
          key: `${layer}-${from}-${to}`,
          layer,
          from,
          to,
          x1: r2(x1 + Math.cos(angle) * gap),
          y1: r2(y1 + Math.sin(angle) * gap),
          x2: r2(x2 - Math.cos(angle) * (gap + 2)),
          y2: r2(y2 - Math.sin(angle) * (gap + 2)),
        }
      })
    )
  )
  .flat(2)

function describe(active: Active | null) {
  if (!active) return 'Hover over or focus a node to trace its connections.'
  const { layer, index } = active
  const parts = [`${NAMES[layer]}, node ${index + 1}`]
  if (layer === 0) parts.push('takes in one raw input value')
  else parts.push(`receives from all ${SIZES[layer - 1]} nodes before it`)
  if (layer === SIZES.length - 1) parts.push('produces one of the outputs')
  else parts.push(`sends to all ${SIZES[layer + 1]} nodes after it`)
  return `${parts[0]} — ${parts[1]} and ${parts[2]}.`
}

/** Figure 1: a small feed-forward network with traceable connections. */
export function NetworkDiagram() {
  const [active, setActive] = useState<Active | null>(null)

  const edgeOn = (e: (typeof edges)[number]) =>
    !!active &&
    ((active.layer === e.layer && active.index === e.from) ||
      (active.layer === e.layer + 1 && active.index === e.to))

  const nodeLinked = (layer: number, index: number) => {
    if (!active) return true
    if (active.layer === layer && active.index === index) return true
    return edges.some(
      (e) =>
        edgeOn(e) &&
        ((e.layer === layer && e.from === index) ||
          (e.layer + 1 === layer && e.to === index))
    )
  }

  return (
    <div>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="group"
        aria-label="Diagram of a simple feed-forward network: an input layer of three nodes, two hidden layers of four nodes each, and an output layer of two nodes, with every node connected to every node in the next layer."
        className="block h-auto w-full"
      >
        <defs>
          {[
            ['arrow', 'var(--color-border)'],
            ['arrow-on', 'var(--color-wheat)'],
          ].map(([id, fill]) => (
            <marker
              key={id}
              id={`net-${id}`}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0 0L10 5L0 10Z" fill={fill} />
            </marker>
          ))}
        </defs>

        {[
          ['Input layer', XS[0]],
          ['Hidden layers', (XS[1] + XS[2]) / 2],
          ['Output layer', XS[3]],
        ].map(([label, x]) => (
          <text
            key={label}
            x={x as number}
            y={38}
            textAnchor="middle"
            className="fill-foreground font-mono"
            fontSize={17}
            letterSpacing="0.12em"
          >
            {(label as string).toUpperCase()}
          </text>
        ))}
        <path
          d={`M${XS[1] - RADIUS} 54H${XS[2] + RADIUS}`}
          className="stroke-wheat"
          strokeWidth={2}
        />

        <g>
          {edges.map((e) => {
            const on = edgeOn(e)
            return (
              <line
                key={e.key}
                x1={e.x1}
                y1={e.y1}
                x2={e.x2}
                y2={e.y2}
                strokeWidth={on ? 2.5 : 1.5}
                className={on ? 'stroke-wheat' : 'stroke-border'}
                strokeOpacity={active && !on ? 0.25 : 1}
                markerEnd={`url(#net-${on ? 'arrow-on' : 'arrow'})`}
                style={{
                  transition: 'stroke-opacity 150ms, stroke-width 150ms',
                }}
              />
            )
          })}
        </g>

        {SIZES.map((count, layer) =>
          Array.from({ length: count }, (_, index) => {
            const isActive = active?.layer === layer && active.index === index
            return (
              <g
                key={`${layer}-${index}`}
                tabIndex={0}
                role="img"
                aria-label={describe({ layer, index })}
                onPointerEnter={() => setActive({ layer, index })}
                onPointerLeave={(event) => {
                  if (event.pointerType === 'mouse') setActive(null)
                }}
                onClick={() => setActive({ layer, index })}
                onFocus={() => setActive({ layer, index })}
                onBlur={() => setActive(null)}
                className="cursor-pointer outline-none [&:focus-visible>circle]:stroke-wheat"
                style={{
                  opacity: nodeLinked(layer, index) ? 1 : 0.35,
                  transition: 'opacity 150ms',
                }}
              >
                <circle
                  cx={XS[layer]}
                  cy={nodeY(layer, index)}
                  r={RADIUS + (isActive ? 3 : 0)}
                  fill={FILLS[layer]}
                  className="stroke-foreground"
                  strokeWidth={isActive ? 3 : 2}
                  style={{ transition: 'r 150ms' }}
                />
              </g>
            )
          })
        )}
      </svg>
      <p
        className="mt-3 min-h-10 border-t border-border pt-3 text-sm leading-relaxed text-muted-foreground"
        aria-live="polite"
      >
        {describe(active)}
      </p>
    </div>
  )
}
