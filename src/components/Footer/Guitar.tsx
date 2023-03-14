'use client'

import { faGuitar } from '@fortawesome/pro-duotone-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './footer.module.css'

export const Guitar = () => {
  const playSound = (): void => {
    const g = document.getElementById('guitar')
    g.classList.add(style.jello)
    g.addEventListener('animationend', () => {
      g.classList.remove(style.jello)
    })

    const sound = new Audio('/audio/AcousticPopMelody.mp3')
    sound.play()
  }

  return <FontAwesomeIcon onClick={playSound} icon={faGuitar} size="2x" />
}
