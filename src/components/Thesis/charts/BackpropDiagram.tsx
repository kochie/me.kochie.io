'use client'

import { useState, type ElementType, type ReactNode } from 'react'

const R = 27
const GREEN = '#3fa079'
const BROWN = '#d0742f'
const PURPLE = '#a78bdb'

interface Node {
  id: string
  x: number
  y: number
  sub?: string
  kind: 'input' | 'node'
  hint: string
}

const NODES: Node[] = [
  {
    id: 'x1',
    x: 70,
    y: 150,
    sub: '1',
    kind: 'input',
    hint: 'An input value fed into the network.',
  },
  {
    id: 'x2',
    x: 70,
    y: 290,
    sub: '2',
    kind: 'input',
    hint: 'An input value fed into the network.',
  },
  ...[
    ['f1', 240, 90, '1'],
    ['f2', 240, 210, '2'],
    ['f3', 240, 330, '3'],
  ].map(
    ([id, x, y, sub]): Node => ({
      id: id as string,
      x: x as number,
      y: y as number,
      sub: sub as string,
      kind: 'node',
      hint: 'A first-layer node: it applies its activation function f to the weighted sum e of its inputs.',
    })
  ),
  ...[
    ['f4', 430, 150, '4'],
    ['f5', 430, 270, '5'],
  ].map(
    ([id, x, y, sub]): Node => ({
      id: id as string,
      x: x as number,
      y: y as number,
      sub: sub as string,
      kind: 'node',
      hint: `A second-layer node. Its output y${sub} reaches the output node through the weight w${sub}6.`,
    })
  ),
  {
    id: 'f6',
    x: 610,
    y: 210,
    sub: '6',
    kind: 'node',
    hint: 'The output node. What it produces is y, which is compared with the desired output to give the error δ.',
  },
]

const at = (id: string) => NODES.find((n) => n.id === id)!

type Group = 'in' | 'mid' | 'out'
const EDGES: { from: string; to: string; group: Group }[] = [
  ...['x1', 'x2'].flatMap((from) =>
    ['f1', 'f2', 'f3'].map((to) => ({ from, to, group: 'in' as Group }))
  ),
  ...['f1', 'f2', 'f3'].flatMap((from) =>
    ['f4', 'f5'].map((to) => ({ from, to, group: 'mid' as Group }))
  ),
  { from: 'f4', to: 'f6', group: 'out' },
  { from: 'f5', to: 'f6', group: 'out' },
]

const r2 = (n: number) => Math.round(n * 100) / 100

/** A line between two nodes, trimmed to their edges and optionally offset. */
function line(fromId: string, toId: string, offset = 0) {
  const a = at(fromId)
  const b = at(toId)
  const angle = Math.atan2(b.y - a.y, b.x - a.x)
  const nx = -Math.sin(angle) * offset
  const ny = Math.cos(angle) * offset
  return {
    x1: r2(a.x + Math.cos(angle) * (R + 3) + nx),
    y1: r2(a.y + Math.sin(angle) * (R + 3) + ny),
    x2: r2(b.x - Math.cos(angle) * (R + 6) + nx),
    y2: r2(b.y - Math.sin(angle) * (R + 6) + ny),
  }
}

const Sub = ({ children }: { children: ReactNode }) => (
  <tspan dy={3} fontSize={11}>
    {children}
  </tspan>
)

// React's JSX types don't include MathML, so alias the tags we need.
const MathEl = 'math' as unknown as ElementType
const Msubsup = 'msubsup' as unknown as ElementType
const Msub = 'msub' as unknown as ElementType
const Mfrac = 'mfrac' as unknown as ElementType
const Mrow = 'mrow' as unknown as ElementType
const Mi = 'mi' as unknown as ElementType
const Mn = 'mn' as unknown as ElementType
const Mo = 'mo' as unknown as ElementType
const Mspace = 'mspace' as unknown as ElementType

function Update({ a, b }: { a: string; b: string }) {
  return (
    <MathEl display="block">
      <Msubsup>
        <Mi>w</Mi>
        <Mn>{a + b}</Mn>
        <Mo>′</Mo>
      </Msubsup>
      <Mo>=</Mo>
      <Msub>
        <Mi>w</Mi>
        <Mn>{a + b}</Mn>
      </Msub>
      <Mo>+</Mo>
      <Mspace width="0.3em" />
      <Mi>η</Mi>
      <Mspace width="0.2em" />
      <Mi>δ</Mi>
      <Mfrac>
        <Mrow>
          <Mi>d</Mi>
          <Msub>
            <Mi>f</Mi>
            <Mn>6</Mn>
          </Msub>
          <Mo stretchy="false">(</Mo>
          <Mi>e</Mi>
          <Mo stretchy="false">)</Mo>
        </Mrow>
        <Mrow>
          <Mi>d</Mi>
          <Mi>e</Mi>
        </Mrow>
      </Mfrac>
      <Mspace width="0.2em" />
      <Msub>
        <Mi>y</Mi>
        <Mn>{a}</Mn>
      </Msub>
    </MathEl>
  )
}

const STEPS: {
  title: string
  body: ReactNode
  extra?: ReactNode
}[] = [
  {
    title: 'Forward pass',
    body: 'The inputs x₁ and x₂ are pushed through the network. Each node sums its weighted inputs, applies its activation function f and passes the result on, until the output y emerges.',
  },
  {
    title: 'Measure the error',
    body: 'The output y is compared with the known, desired output for this input. The gap between them is the error δ. This is why backpropagation is a supervised algorithm: it needs a correct answer to compare against.',
  },
  {
    title: 'Send the error backwards',
    body: 'The error is calculated at the output node and then distributed back through the network, using a technique similar to the chain rule in calculus. Every weight is assigned its share of the blame.',
  },
  {
    title: 'Update the weights',
    body: 'The two weights feeding the output node each move by the error δ, times the slope of the activation function, times the output of the node they came from, scaled by a hyperparameter η.',
    extra: (
      <div className="mt-3 space-y-4 overflow-x-auto py-3 text-foreground">
        <Update a="4" b="6" />
        <Update a="5" b="6" />
      </div>
    ),
  },
  {
    title: 'Keep going, layer by layer',
    body: 'The same step repeats further back, through f₄ and f₅ to f₁–f₃, until every weight has been nudged. Then the next input arrives and the cycle starts again.',
  },
]

/** Figure 3: one backpropagation pass, as a step-through. */
export function BackpropDiagram() {
  const [step, setStep] = useState(0)
  const [hover, setHover] = useState<string | null>(null)

  const forwardOpacity = step === 0 ? 0.9 : step === 1 ? 0.3 : 0.18
  const ringed = (id: string) =>
    (step === 1 && id === 'f6') ||
    (step === 2 && ['f6', 'f4', 'f5'].includes(id)) ||
    (step === 3 && ['f6', 'f4', 'f5'].includes(id)) ||
    step === 4
  const showBack = (group: Group) =>
    step === 2 || step === 3 ? group === 'out' : step === 4 ? true : false
  const brown = (group: Group) => step >= 3 && group === 'out'
  const hovered = hover ? at(hover) : null

  return (
    <div>
      <style>{`
        @keyframes bp-flow { to { stroke-dashoffset: -14; } }
        @media (prefers-reduced-motion: no-preference) {
          .bp-flow { animation: bp-flow 1s linear infinite; }
        }
      `}</style>

      <svg
        viewBox="0 0 800 385"
        role="group"
        aria-label="A small network with two inputs, three first-layer nodes, two second-layer nodes feeding one output node and an output y, used to walk through one pass of backpropagation."
        className="block h-auto w-full text-foreground"
      >
        <defs>
          {[
            ['fg', 'currentColor'],
            ['green', GREEN],
            ['brown', BROWN],
          ].map(([id, fill]) => (
            <marker
              key={id}
              id={`bp-${id}`}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={fill} />
            </marker>
          ))}
        </defs>

        {EDGES.map((e) => {
          const l = line(e.from, e.to)
          const isBrown = brown(e.group)
          return (
            <line
              key={`${e.from}-${e.to}`}
              {...l}
              stroke={isBrown ? BROWN : 'currentColor'}
              strokeWidth={isBrown ? 2.5 : 1.75}
              strokeOpacity={isBrown ? 1 : forwardOpacity}
              strokeDasharray={step === 0 ? '7 7' : undefined}
              className={step === 0 ? 'bp-flow' : undefined}
              markerEnd={`url(#bp-${isBrown ? 'brown' : 'fg'})`}
              style={{ transition: 'stroke-opacity 200ms' }}
            />
          )
        })}

        <line
          x1={at('f6').x + R + 3}
          y1={210}
          x2={745}
          y2={210}
          stroke="currentColor"
          strokeWidth={2}
          strokeOpacity={step === 0 ? 0.9 : 1}
          strokeDasharray={step === 0 ? '7 7' : undefined}
          className={step === 0 ? 'bp-flow' : undefined}
          markerEnd="url(#bp-fg)"
        />
        <text
          x={768}
          y={216}
          className="fill-foreground"
          fontSize={22}
          fontStyle="italic"
          textAnchor="middle"
        >
          y
        </text>

        {EDGES.filter((e) => showBack(e.group)).map((e) => {
          const l = line(e.to, e.from, 9)
          return (
            <line
              key={`back-${e.from}-${e.to}`}
              {...l}
              stroke={GREEN}
              strokeWidth={e.group === 'out' ? 2.75 : 1.75}
              strokeOpacity={e.group === 'out' ? 1 : 0.75}
              markerEnd="url(#bp-green)"
            />
          )
        })}

        {step >= 3 && (
          <g fill={BROWN} fontSize={15} fontStyle="italic" textAnchor="middle">
            <text x={525} y={160}>
              w′
              <tspan dy={3} fontSize={11}>
                46
              </tspan>
            </text>
            <text x={525} y={278}>
              w′
              <tspan dy={3} fontSize={11}>
                56
              </tspan>
            </text>
          </g>
        )}

        {step >= 1 && (
          <g>
            <line
              x1={at('f6').x + 14}
              y1={at('f6').y - 20}
              x2={at('f6').x + 28}
              y2={at('f6').y - 50}
              stroke={GREEN}
              strokeWidth={2}
            />
            <circle
              cx={at('f6').x + 38}
              cy={at('f6').y - 68}
              r={24}
              fill="#d9c97a"
              className="stroke-foreground"
              strokeWidth={2}
            />
            <text
              x={at('f6').x + 38}
              y={at('f6').y - 60}
              textAnchor="middle"
              fontSize={24}
              fontStyle="italic"
              fill="#1c1917"
            >
              δ
            </text>
          </g>
        )}

        {NODES.map((n) => (
          <g
            key={n.id}
            tabIndex={0}
            role="img"
            aria-label={`${n.id.toUpperCase()}: ${n.hint}`}
            onPointerEnter={() => setHover(n.id)}
            onPointerLeave={(event) => {
              if (event.pointerType === 'mouse') setHover(null)
            }}
            onClick={() => setHover(n.id)}
            onFocus={() => setHover(n.id)}
            onBlur={() => setHover(null)}
            className="cursor-pointer outline-none [&:focus-visible>circle]:stroke-wheat"
          >
            {n.kind === 'input' ? (
              <text
                x={n.x - 6}
                y={n.y + 8}
                textAnchor="middle"
                fontSize={26}
                fontWeight={700}
                className="fill-foreground"
              >
                x<Sub>{n.sub}</Sub>
              </text>
            ) : (
              <>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={R}
                  fill={PURPLE}
                  className="stroke-foreground"
                  strokeWidth={ringed(n.id) || hover === n.id ? 3.5 : 2}
                  style={{ transition: 'stroke-width 150ms' }}
                />
                <text
                  x={n.x}
                  y={n.y + 5}
                  textAnchor="middle"
                  fontSize={16}
                  fontStyle="italic"
                  fill="#1c1235"
                >
                  f<Sub>{n.sub}</Sub>
                  <tspan dy={-3}>(e)</tspan>
                </text>
              </>
            )}
            {/* larger hit area for touch */}
            <circle cx={n.x} cy={n.y} r={R + 6} fill="transparent" />
          </g>
        ))}
      </svg>

      <div className="mt-4 border-t border-border pt-4">
        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Backpropagation steps"
        >
          {STEPS.map((s, i) => (
            <button
              key={s.title}
              type="button"
              aria-current={i === step ? 'step' : undefined}
              aria-label={`Step ${i + 1}: ${s.title}`}
              onClick={() => setStep(i)}
              className={`h-8 w-8 rounded-full border font-mono text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wheat ${i === step ? 'border-wheat bg-wheat text-coal' : 'border-border text-muted-foreground hover:border-wheat hover:text-wheat'}`}
            >
              {i + 1}
            </button>
          ))}
          <span className="ml-auto flex gap-4 font-mono text-[11px] uppercase tracking-[0.18em]">
            <button
              type="button"
              disabled={step === 0}
              onClick={() => setStep(step - 1)}
              className="text-muted-foreground underline decoration-border underline-offset-4 hover:text-wheat disabled:no-underline disabled:opacity-40"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={() => setStep((step + 1) % STEPS.length)}
              className="text-muted-foreground underline decoration-border underline-offset-4 hover:text-wheat"
            >
              {step === STEPS.length - 1 ? 'Restart' : 'Next →'}
            </button>
          </span>
        </div>

        <div className="mt-4 min-h-36" aria-live="polite">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Step {step + 1} of {STEPS.length}
          </p>
          <h4 className="mt-1 text-xl text-foreground">{STEPS[step].title}</h4>
          <p className="mt-2 text-[15px] leading-relaxed text-foreground/80">
            {STEPS[step].body}
          </p>
          {STEPS[step].extra}
        </div>

        <p className="mt-2 min-h-6 border-t border-border pt-3 text-xs leading-relaxed text-muted-foreground">
          {hovered
            ? `${hovered.id.toUpperCase()} — ${hovered.hint}`
            : 'Hover over or focus a node to see what it is.'}
        </p>
      </div>
    </div>
  )
}
