import type { ReactNode } from 'react'

export function textOf(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(textOf).join('')
  if (typeof node === 'object' && 'props' in node) {
    return textOf((node.props as { children?: ReactNode }).children)
  }
  return ''
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const NUMBERED = /^(\d+(?:\.\d+)*)\s+(.*)$/

/** Splits "2.4.1 Backpropagation" into its number and title parts. */
export function splitHeading(text: string): { number?: string; title: string } {
  const match = NUMBERED.exec(text)
  return match ? { number: match[1], title: match[2] } : { title: text }
}
