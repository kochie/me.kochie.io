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
      <nav className={style.footer}>
        <div className={style.name}>
          Robert Koch
          <FontAwesomeIcon
            style={{ padding: '0 5px' }}
            icon={findIconDefinition({
              prefix: 'fad',
              iconName: 'copyright',
            })}
          />
          {new Date().getFullYear()}
        </div>
        <div id="guitar" className={style.guitar}>
          <FontAwesomeIcon
            onClick={playSound}
            icon={findIconDefinition({
              prefix: 'fad',
              iconName: 'guitar',
            })}
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
