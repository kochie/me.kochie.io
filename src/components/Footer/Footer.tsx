import React, { ReactElement } from 'react'

import style from './footer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/pro-duotone-svg-icons'
import { Guitar } from './Guitar'

export default function Footer(): ReactElement {
  const buildIso = process.env.buildTime ?? new Date().toISOString()
  const buildDate = new Date(buildIso)
  const updateLabel = buildDate.toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
  // Server component: evaluated at build time, rebaked on each deploy.
  const year = new Date().getFullYear()

  return (
    <footer className="bg-background text-foreground border-t border-border font-mono text-[11px] uppercase tracking-[0.2em] px-5 lg:px-24 py-10 flex flex-col items-center gap-5 lg:grid lg:grid-cols-3 lg:gap-0">
      <div className="flex items-center justify-self-start whitespace-nowrap">
        Robert Koch
        <FontAwesomeIcon icon={faCopyright} size="1x" className="mx-1.5" />
        {year}
      </div>
      <div id="guitar" className={`${style.guitar} text-center`}>
        <Guitar />
      </div>
      <div className="justify-self-end whitespace-nowrap">
        Updated <time dateTime={buildIso}>{updateLabel}</time>
      </div>
    </footer>
  )
}
