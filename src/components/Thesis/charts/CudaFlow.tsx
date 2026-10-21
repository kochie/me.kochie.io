'use client'

import { useState, type KeyboardEvent } from 'react'

const BLUE = '#5aaee8'
const GREEN = '#4f9d69'
const PINK = '#d4538a'
const PURPLE = '#7676d6'

const STEPS = [
  {
    title: 'Copy the processing data',
    body: 'The data the program needs is copied from main memory into the GPU’s own memory.',
  },
  {
    title: 'Instruct the processing',
    body: 'The CPU sends the instructions to the GPU to start the computation.',
  },
  {
    title: 'Execute in parallel on each core',
    body: 'The GPU runs the instructions across its many cores at once, processing the data and returning the results to GPU memory.',
  },
  {
    title: 'Copy the result',
    body: 'The finished output is copied from GPU memory back to main memory, where the rest of the program can use it.',
  },
]

const Arrow = ({
  d,
  color,
  on,
  id,
}: {
  d: string
  color: string
  on: boolean
  id: string
}) => (
  <path
    d={d}
    fill="none"
    stroke={color}
    strokeWidth={8}
    strokeLinejoin="round"
    markerEnd={`url(#cuda-${id})`}
    opacity={on ? 1 : 0.15}
    style={{ transition: 'opacity 200ms' }}
  />
)

/** Figure 4: the CUDA processing flow as a four-step walkthrough. */
export function CudaFlow() {
  const [step, setStep] = useState<number | null>(null)
  const on = (n: number) => step === null || step === n

  const badge = (n: number, x: number, y: number) => {
    const select = () => setStep(step === n ? null : n)
    const onKey = (event: KeyboardEvent<SVGGElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        select()
      }
    }
    return (
      <g
        key={n}
        role="button"
        tabIndex={0}
        aria-label={`Step ${n}: ${STEPS[n - 1].title}`}
        aria-pressed={step === n}
        onClick={select}
        onKeyDown={onKey}
        className="cursor-pointer outline-none [&:focus-visible>circle]:stroke-wheat"
        style={{ opacity: on(n) ? 1 : 0.3, transition: 'opacity 200ms' }}
      >
        <circle
          cx={x}
          cy={y}
          r={14}
          fill={step === n ? '#d9b67a' : 'var(--color-background)'}
          className="stroke-foreground"
          strokeWidth={2}
        />
        <text
          x={x}
          y={y + 1}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={17}
          fill={step === n ? '#1c1917' : 'currentColor'}
        >
          {n}
        </text>
      </g>
    )
  }

  const cell = (x: number, y: number, w: number, h: number, fill: string) => (
    <rect
      key={`${x}-${y}`}
      x={x}
      y={y}
      width={w}
      height={h}
      fill={fill}
      className={fill === BLUE && step === 3 ? 'cuda-pulse' : undefined}
    />
  )

  const coreRows = [286, 312, 338, 364]
  const columns = [322, 420]

  return (
    <div>
      <style>{`
        @keyframes cuda-pulse { 50% { opacity: 0.35; } }
        @media (prefers-reduced-motion: no-preference) {
          .cuda-pulse { animation: cuda-pulse 1s ease-in-out infinite; }
        }
      `}</style>
      <svg
        viewBox="0 0 560 540"
        role="group"
        aria-label="Processing flow on CUDA: data is copied from main memory to GPU memory, the CPU instructs the processing, the GPU cores execute in parallel, and the result is copied back to main memory."
        className="mx-auto block h-auto w-full text-foreground"
      >
        <defs>
          {[
            ['blue', BLUE],
            ['green', GREEN],
            ['pink', PINK],
            ['purple', PURPLE],
          ].map(([id, fill]) => (
            <marker
              key={id}
              id={`cuda-${id}`}
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="2.4"
              markerHeight="2.4"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={fill} />
            </marker>
          ))}
        </defs>

        <rect
          x={90}
          y={30}
          width={130}
          height={56}
          rx={3}
          fill="#a9c4de"
          className="stroke-foreground"
          strokeWidth={2}
        />
        <text
          x={155}
          y={55}
          textAnchor="middle"
          fontSize={19}
          fontWeight={700}
          fill="#1c1917"
        >
          Main
        </text>
        <text
          x={155}
          y={77}
          textAnchor="middle"
          fontSize={19}
          fontWeight={700}
          fill="#1c1917"
        >
          Memory
        </text>

        <rect
          x={350}
          y={30}
          width={110}
          height={56}
          rx={3}
          fill="#9dc7bb"
          className="stroke-foreground"
          strokeWidth={2}
        />
        <text
          x={405}
          y={65}
          textAnchor="middle"
          fontSize={21}
          fontWeight={700}
          fill="#1c1917"
        >
          CPU
        </text>

        <rect
          x={90}
          y={182}
          width={130}
          height={62}
          rx={3}
          fill="#e8b04a"
          className="stroke-foreground"
          strokeWidth={2}
        />
        <text
          x={155}
          y={210}
          textAnchor="middle"
          fontSize={19}
          fontWeight={700}
          fill="#1c1917"
        >
          Memory
        </text>
        <text
          x={155}
          y={232}
          textAnchor="middle"
          fontSize={19}
          fontWeight={700}
          fill="#1c1917"
        >
          for GPU
        </text>

        <g>
          <rect
            x={310}
            y={240}
            width={212}
            height={286}
            rx={3}
            fill={BLUE}
            fillOpacity={0.18}
            className={step === 2 ? 'stroke-wheat' : 'stroke-foreground'}
            strokeWidth={step === 2 ? 3.5 : 2}
            style={{ transition: 'stroke-width 200ms' }}
          />
          <text
            x={290}
            y={274}
            textAnchor="end"
            fontSize={19}
            fontWeight={700}
            className="fill-foreground"
          >
            GPU
          </text>
          {columns.map((cx) => (
            <g key={cx}>
              <rect
                x={cx}
                y={250}
                width={90}
                height={28}
                className="fill-background stroke-foreground"
                strokeOpacity={0.5}
              />
              {coreRows.flatMap((ry) => [
                cell(cx, ry, 42, 22, BLUE),
                cell(cx + 48, ry, 42, 22, BLUE),
              ])}
              {[
                cell(cx, 392, 42, 22, GREEN),
                cell(cx + 48, 392, 42, 22, GREEN),
              ]}
              <rect
                x={cx}
                y={420}
                width={90}
                height={44}
                className="fill-background stroke-foreground"
                strokeOpacity={0.5}
              />
            </g>
          ))}
          {[331, 379, 427, 475].map((x) => cell(x, 474, 36, 18, BLUE))}
          <rect
            x={322}
            y={500}
            width={188}
            height={18}
            className="fill-background stroke-foreground"
            strokeOpacity={0.5}
          />
        </g>

        <Arrow id="blue" color={BLUE} on={on(1)} d="M142 88V176" />
        <Arrow id="pink" color={PINK} on={on(2)} d="M405 88V240" />
        <Arrow id="purple" color={PURPLE} on={on(3)} d="M224 213H355V278" />
        <Arrow id="blue" color={BLUE} on={on(3)} d="M312 396H152V250" />
        <Arrow id="green" color={GREEN} on={on(4)} d="M190 178V90" />

        <g
          className="fill-foreground"
          fontSize={14}
          style={{ transition: 'opacity 200ms' }}
        >
          <g opacity={on(1) ? 1 : 0.3}>
            <text x={48} y={143}>
              Copy
            </text>
            <text x={48} y={160}>
              processing
            </text>
            <text x={48} y={177}>
              data
            </text>
          </g>
          <g opacity={on(2) ? 1 : 0.3}>
            <text x={454} y={135}>
              Instruct the
            </text>
            <text x={454} y={152}>
              processing
            </text>
          </g>
          <g opacity={on(3) ? 1 : 0.3}>
            <text x={196} y={329}>
              Execute
            </text>
            <text x={196} y={346}>
              parallel in
            </text>
            <text x={196} y={363}>
              each core
            </text>
          </g>
          <g opacity={on(4) ? 1 : 0.3}>
            <text x={236} y={134}>
              Copy the
            </text>
            <text x={236} y={151}>
              result
            </text>
          </g>
          <text x={28} y={466} fontSize={23} fontWeight={700}>
            Processing
          </text>
          <text x={28} y={494} fontSize={23} fontWeight={700}>
            flow on CUDA
          </text>
        </g>

        {badge(1, 26, 138)}
        {badge(2, 432, 130)}
        {badge(3, 174, 324)}
        {badge(4, 214, 129)}
      </svg>

      <div className="mt-4 border-t border-border pt-4">
        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Processing steps"
        >
          {STEPS.map((s, i) => (
            <button
              key={s.title}
              type="button"
              aria-pressed={step === i + 1}
              aria-label={`Step ${i + 1}: ${s.title}`}
              onClick={() => setStep(step === i + 1 ? null : i + 1)}
              className={`h-8 w-8 rounded-full border font-mono text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wheat ${step === i + 1 ? 'border-wheat bg-wheat text-coal' : 'border-border text-muted-foreground hover:border-wheat hover:text-wheat'}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setStep(null)}
            className="ml-auto font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground underline decoration-border underline-offset-4 hover:text-wheat"
          >
            Show all
          </button>
        </div>
        <div className="mt-4 min-h-24" aria-live="polite">
          {step === null ? (
            <p className="text-sm leading-relaxed text-muted-foreground">
              Select a step to follow one run of a CUDA program, from the moment
              the data leaves main memory to the moment the result returns.
            </p>
          ) : (
            <>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Step {step} of {STEPS.length}
              </p>
              <h4 className="mt-1 text-xl text-foreground">
                {STEPS[step - 1].title}
              </h4>
              <p className="mt-2 text-[15px] leading-relaxed text-foreground/80">
                {STEPS[step - 1].body}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
