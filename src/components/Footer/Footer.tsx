import React, { ReactElement } from 'react'

import style from './footer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/pro-duotone-svg-icons'
import { Guitar } from './Guitar'

export default function Footer(): ReactElement {
  const updateTime = process.env.buildTime

  return (
    <>
      <footer className="bg-gray-400 dark:bg-gray-900 text-gray-900 dark:text-gray-100 grid grid-cols-3 text-sm lg:text-base px-4 lg:px-24 py-12 items-center">
        <div className={style.name}>
          Robert Koch
          <FontAwesomeIcon icon={faCopyright} size="1x" className="mx-1" />
          {2020}
        </div>
        <div id="guitar" className={style.guitar}>
          <Guitar />
        </div>
        <div className={style.update}>
          <span>
            Updated on <time dateTime={updateTime}>{updateTime}</time>
          </span>
        </div>
      </footer>
    </>
  )
}
