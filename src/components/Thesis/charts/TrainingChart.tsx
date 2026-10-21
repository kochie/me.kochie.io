'use client'

import { useMemo } from 'react'

import { Plot, niceTicks, type Marker, type PlotSeries } from './Plot'
import {
  TRAINING_DATA,
  type Metric,
  type RunId,
  type Split,
} from './training-data'

const RUNS: {
  id: RunId
  label: string
  color: string
  marker: Marker
  dash?: string
}[] = [
  { id: 'alexnet', label: 'AlexNet', color: '#3b82f6', marker: 'circle' },
  {
    id: 'binarynet',
    label: 'BinaryNet',
    color: '#ef4444',
    marker: 'cross',
    dash: '2 5',
  },
  {
    id: 'xnor-binary',
    label: 'XNOR-Net (binary)',
    color: '#22c55e',
    marker: 'square',
    dash: '9 4 2 4',
  },
  {
    id: 'xnor-ternary',
    label: 'XNOR-Net (ternary)',
    color: '#eab308',
    marker: 'diamond',
    dash: '6 4',
  },
]

const METRICS: Record<
  Metric,
  { name: string; axis: string; format: (y: number) => string }
> = {
  top1: {
    name: 'Top-1 accuracy',
    axis: 'Top-1 accuracy (%)',
    format: (y) => `${y.toFixed(1)}%`,
  },
  top5: {
    name: 'Top-5 accuracy',
    axis: 'Top-5 accuracy (%)',
    format: (y) => `${y.toFixed(1)}%`,
  },
  error: {
    name: 'average loss',
    axis: 'Error (average loss)',
    format: (y) => y.toFixed(2),
  },
}

export function TrainingChart({
  metric,
  split,
}: {
  metric: Metric
  split: Split
}) {
  const { series, xMax, yDomain, yTicks, description } = useMemo(() => {
    const series: PlotSeries[] = RUNS.map((run) => ({
      id: run.id,
      label: run.label,
      color: run.color,
      marker: run.marker,
      dash: run.dash,
      points: TRAINING_DATA[run.id][split][metric].map((y, i) => ({
        x: i + 1,
        y,
      })),
    }))
    const all = series.flatMap((s) => s.points.map((p) => p.y))
    const lo = metric === 'error' ? Math.floor(Math.min(...all)) : 0
    const ticks = niceTicks(lo, Math.max(...all), 6)
    const top = ticks[ticks.length - 1]
    const step = ticks[1] - ticks[0]
    const yTop = Math.max(...all) > top ? top + step : top
    const yTicks = niceTicks(lo, yTop, 6)

    const { name, format } = METRICS[metric]
    const finals = series
      .map(
        (s) =>
          `${s.label} ends at ${format(s.points[s.points.length - 1].y)} after ${s.points.length} epochs`
      )
      .join('; ')
    return {
      series,
      xMax: Math.max(...series.map((s) => s.points.length)),
      yDomain: [lo, yTop] as [number, number],
      yTicks,
      description: `Line chart of ${split}ing ${name} per epoch for four networks. ${finals}.`,
    }
  }, [metric, split])

  return (
    <Plot
      series={series}
      discrete
      toggle
      xDomain={[1, xMax]}
      yDomain={yDomain}
      xTicks={[
        1,
        ...Array.from({ length: Math.floor(xMax / 5) }, (_, i) => (i + 1) * 5),
      ]}
      yTicks={yTicks}
      xLabel="Epoch"
      yLabel={METRICS[metric].axis}
      formatY={METRICS[metric].format}
      description={description}
    />
  )
}
