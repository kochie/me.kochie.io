'use client'

import { useState } from 'react'

import { Plot, niceTicks, type PlotSeries } from './Plot'

const X_DOMAIN: [number, number] = [-5, 5]
const X_TICKS = [-4, -2, 0, 2, 4]

const sample = (f: (x: number) => number, n = 240) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const x = X_DOMAIN[0] + (i / n) * (X_DOMAIN[1] - X_DOMAIN[0])
    return { x, y: f(x) }
  })

/** Scaled sigmoid from the report: 2 / (1 + e^(-kx)) - 1. */
const squish = (k: number) => (x: number) => 2 / (1 + Math.exp(-k * x)) - 1
const squishDerivative = (k: number) => (x: number) => {
  const s = 1 / (1 + Math.exp(-k * x))
  return 2 * k * s * (1 - s)
}

const fixed = (digits: number) => (y: number) => y.toFixed(digits)

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  onReset,
  hint,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
  onReset: () => void
  hint: string
}) {
  return (
    <div className="mt-5 flex flex-col gap-2 border-t border-border pt-4">
      <div className="flex items-center justify-between gap-4">
        <label
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
          htmlFor={`slider-${label}`}
        >
          {label} <span className="text-foreground tabular-nums">{value}</span>
        </label>
        <button
          type="button"
          onClick={onReset}
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground underline decoration-border underline-offset-4 hover:text-wheat"
        >
          Reset
        </button>
      </div>
      <input
        id={`slider-${label}`}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-wheat"
      />
      <p className="text-xs leading-relaxed text-muted-foreground">{hint}</p>
    </div>
  )
}

const FIG2_THRESHOLD = 2

/** Figure 2: the four activation functions, with an adjustable ternary threshold. */
export function ActivationShapes() {
  const [threshold, setThreshold] = useState(FIG2_THRESHOLD)

  const ternary = (x: number) => (x < -threshold ? -1 : x >= threshold ? 1 : 0)
  const series: PlotSeries[] = [
    {
      id: 'tanh',
      label: 'tanh',
      color: '#f97316',
      points: sample(Math.tanh),
      at: Math.tanh,
    },
    {
      id: 'sigmoid',
      label: 'sigmoid',
      color: '#22c55e',
      points: sample(squish(1)),
      at: squish(1),
    },
    {
      id: 'binary',
      label: 'binary step',
      color: '#ef4444',
      points: [
        { x: -5, y: -1 },
        { x: 0, y: -1 },
        { x: 0, y: 1 },
        { x: 5, y: 1 },
      ],
      at: (x) => (x < 0 ? -1 : 1),
    },
    {
      id: 'ternary',
      label: 'ternary step',
      color: '#a855f7',
      points: [
        { x: -5, y: -1 },
        { x: -threshold, y: -1 },
        { x: -threshold, y: 0 },
        { x: threshold, y: 0 },
        { x: threshold, y: 1 },
        { x: 5, y: 1 },
      ],
      at: ternary,
    },
  ]

  return (
    <div>
      <Plot
        series={series}
        toggle
        xDomain={X_DOMAIN}
        yDomain={[-1.1, 1.1]}
        xTicks={X_TICKS}
        yTicks={[-1, -0.5, 0, 0.5, 1]}
        xLabel="Sum of weights"
        yLabel="Node output"
        formatX={fixed(2)}
        formatY={fixed(2)}
        aspect={0.62}
        description={`Node output against sum of weights for tanh, sigmoid, a binary step and a ternary step. The ternary step outputs zero between -${threshold} and ${threshold}.`}
      />
      <Slider
        label="Ternary threshold ±"
        value={threshold}
        min={0.25}
        max={4}
        step={0.25}
        onChange={setThreshold}
        onReset={() => setThreshold(FIG2_THRESHOLD)}
        hint="Everything inside the threshold is quantised to zero. The original figure used ±2. The thesis found that a threshold of 1 already zeroed too many values and recommends going smaller."
      />
    </div>
  )
}

const FIG12_SQUISH = 4

function SigmoidPanel({ title, k }: { title: string; k: number }) {
  const f = squish(k)
  const df = squishDerivative(k)
  const yTop = Math.max(1.2, Math.ceil((k / 2) * 1.1 * 5) / 5)
  const series: PlotSeries[] = [
    { id: 'f', label: 'f(x)', color: '#ef4444', points: sample(f), at: f },
    {
      id: 'df',
      label: 'f′(x)',
      color: '#3b82f6',
      points: sample(df),
      at: df,
    },
  ]
  return (
    <div className="min-w-0">
      <p className="mb-2 font-mono text-[11px] tracking-[0.1em] text-muted-foreground">
        {title}
      </p>
      <Plot
        series={series}
        xDomain={X_DOMAIN}
        yDomain={[-1.2, yTop]}
        xTicks={X_TICKS}
        yTicks={niceTicks(-1.2, yTop, 6)}
        xLabel="x"
        yLabel="Output"
        formatX={fixed(2)}
        formatY={fixed(3)}
        aspect={0.85}
        description={`A sigmoid scaled to the range -1 to 1 with steepness ${k}, and its derivative, which peaks at ${k / 2} at x = 0.`}
      />
    </div>
  )
}

/** Figure 12: a standard sigmoid and a squished one, each with its derivative. */
export function SigmoidDerivatives() {
  const [k, setK] = useState(FIG12_SQUISH)

  return (
    <div>
      <div className="grid gap-8 md:grid-cols-2">
        <SigmoidPanel title="(a) Standard sigmoid, k = 1" k={1} />
        <SigmoidPanel title={`(b) Squished sigmoid, k = ${k}`} k={k} />
      </div>
      <Slider
        label="Squish factor k"
        value={k}
        min={1}
        max={8}
        step={0.5}
        onChange={setK}
        onReset={() => setK(FIG12_SQUISH)}
        hint="f(x) = 2 / (1 + e^(−kx)) − 1. Squishing the sigmoid makes the transition steeper and its derivative taller and narrower, closer to the step the binary network really computes. The original figure used k = 4."
      />
    </div>
  )
}
