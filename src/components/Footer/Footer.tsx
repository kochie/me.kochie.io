import React, { ReactElement } from 'react'

import style from './footer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core'

// import "animate.css";

export default function Footer(): ReactElement {
  const playSound = (): void => {
    const g = document.getElementById('guitar')
    g.classList.add(style.jello)
    g.addEventListener('animationend', () => {
      g.classList.remove(style.jello)
    })

    const sound = new Audio('/audio/AcousticPopMelody.mp3')
    sound.play()
  }

  const updateTime = process.env.buildTime

  return (
    <>
      <nav className="bg-gray-400 dark:bg-gray-900 text-gray-900 dark:text-gray-100 grid grid-cols-3 text-sm lg:text-base px-4 lg:px-24 py-12 items-center">
        <div className={style.name}>
          Robert Koch
          <FontAwesomeIcon
            icon={findIconDefinition({
              prefix: 'fad',
              iconName: 'copyright',
            })}
            size="1x"
            className="mx-1"
          />
          {2020}
        </div>
        <div id="guitar" className={style.guitar}>
          <FontAwesomeIcon
            onClick={playSound}
            icon={findIconDefinition({
              prefix: 'fad',
              iconName: 'guitar',
            })}
            size="2x"
          />
        </div>
        <div className={style.update}>
          <span>
            Updated on <time dateTime={updateTime}>{updateTime}</time>
          </span>
        </div>
      </nav>
    </>
  )
}
