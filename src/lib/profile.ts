/**
 * Shared identity strings — reused by the Hero, Sidebar masthead, and
 * anywhere else that needs the canonical name + tagline.
 */
export const PROFILE = {
  name: 'Robert Koch',
  location: 'Melbourne, Australia',
  /** Short, mono-cap tagline; one line everywhere it's rendered. */
  tagline: 'Engineer · Speaker · Guitarist',
} as const

/**
 * Four-line hook quote. Source of truth for the homepage hero and the
 * OG image. Line index 2 starts with "&" so the homepage can lift the
 * ampersand into a separately-styled span.
 */
export const HOOK_LINES = [
  'I build things,',
  'write the code for them,',
  '& run from the',
  'resulting explosion.',
] as const
