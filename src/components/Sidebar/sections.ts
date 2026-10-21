export interface SectionEntry {
  /** Two-digit zero-padded number for the eyebrow / index. */
  readonly number: string
  /** Display label (Title Case). */
  readonly label: string
  /** DOM id of the section anchor (no `#`). */
  readonly id: string
}

/**
 * Single source of truth for the page's section list. Used by the sidebar
 * INDEX, the mobile top bar's section menu, and the active-section
 * IntersectionObserver. Keep ordering aligned with the actual section
 * order in `Middle.tsx`.
 */
export const SECTIONS: readonly SectionEntry[] = [
  { number: '01', label: 'Introduction', id: 'sec-introduction' },
  { number: '02', label: 'Correspondence', id: 'sec-correspondence' },
  { number: '03', label: 'Dispatch', id: 'sec-dispatch' },
  { number: '04', label: 'Recognitions', id: 'sec-recognitions' },
  { number: '05', label: 'Selected Work', id: 'sec-work' },
  { number: '06', label: 'Research', id: 'sec-research' },
  { number: '07', label: 'Talks', id: 'sec-talks' },
  { number: '08', label: 'Writing', id: 'sec-writing' },
] as const
