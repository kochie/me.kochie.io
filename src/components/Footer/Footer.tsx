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
    <>
      <footer className="bg-background text-foreground border-t border-border grid grid-cols-3 font-mono text-xs lg:text-sm uppercase tracking-[0.18em] px-4 lg:px-24 py-10 items-center">
        <div className={style.name}>
          Robert Koch
          <FontAwesomeIcon icon={faCopyright} size="1x" className="mx-1" />
          {year}
        </div>
        <div id="guitar" className={style.guitar}>
          <Guitar />
        </div>
        <div className={style.update}>
          <span>
            Updated on <time dateTime={buildIso}>{updateLabel}</time>
          </span>
        </div>
      </footer>
    </>
  )
}
