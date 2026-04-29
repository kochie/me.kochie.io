'use client'
import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLightbulbSlash,
  faLightbulbOn,
  faCogs,
} from '@fortawesome/pro-duotone-svg-icons'

import { THEME, useTheme } from './context'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

const themeIcon = {
  [THEME.dark]: faLightbulbSlash,
  [THEME.light]: faLightbulbOn,
  [THEME.system]: faCogs,
}

const themeLabel = {
  [THEME.dark]: 'Dark Theme',
  [THEME.light]: 'Light Theme',
  [THEME.system]: 'System Theme',
}

const nextTheme = (theme: THEME): THEME => {
  if (theme === THEME.dark) return THEME.light
  if (theme === THEME.light) return THEME.system
  return THEME.dark
}

const ThemeButton = () => {
  const [theme, setTheme] = useTheme()

  return (
    <div className="fixed top-0 right-0 z-50">
      <div className="pr-5 pt-5 pl-10 pb-10 animate duration-300 group flex-col flex gap-4 items-center text-white dark:text-black">
        <button
          type="button"
          className="w-full h-full animate duration-300 cursor-pointer bg-transparent border-0 p-0"
          onClick={() => setTheme(nextTheme(theme))}
          aria-label={`Switch theme — currently ${themeLabel[theme]}`}
          title={themeLabel[theme]}
        >
          <span className="fa-stack fa-2x">
            <FontAwesomeIcon
              icon={faCircle}
              className="fa-stack-2x dark:text-white text-black"
            />
            <FontAwesomeIcon
              icon={themeIcon[theme]}
              className="fa-stack-1x"
            />
          </span>
        </button>

        <button
          type="button"
          onClick={() => setTheme(THEME.dark)}
          aria-label="Dark Theme"
          title="Dark Theme"
          className="cursor-pointer transition transform-gpu duration-300 animate scale-0 group-hover:scale-100 ease-in-out delay-200 group-hover:delay-0 bg-transparent border-0 p-0"
        >
          <span className="fa-stack duration-300 animate fa-lg">
            <FontAwesomeIcon
              icon={faCircle}
              className="fa-stack-2x dark:text-white text-black"
            />
            <FontAwesomeIcon icon={faLightbulbSlash} className="fa-stack-1x" />
          </span>
        </button>

        <button
          type="button"
          onClick={() => setTheme(THEME.light)}
          aria-label="Light Theme"
          title="Light Theme"
          className="cursor-pointer transition transform-gpu duration-300 animate scale-0 group-hover:scale-100 ease-in-out delay-100 bg-transparent border-0 p-0"
        >
          <span className="fa-stack duration-300 animate fa-lg">
            <FontAwesomeIcon
              icon={faCircle}
              className="fa-stack-2x dark:text-white text-black"
            />
            <FontAwesomeIcon icon={faLightbulbOn} className="fa-stack-1x" />
          </span>
        </button>

        <button
          type="button"
          onClick={() => setTheme(THEME.system)}
          aria-label="System Theme"
          title="System Theme"
          className="cursor-pointer transition transform-gpu duration-300 animate scale-0 group-hover:scale-100 ease-in-out delay-0 group-hover:delay-200 bg-transparent border-0 p-0"
        >
          <span className="fa-stack duration-300 animate fa-lg">
            <FontAwesomeIcon
              icon={faCircle}
              className="fa-stack-2x dark:text-white text-black"
            />
            <FontAwesomeIcon icon={faCogs} className="fa-stack-1x" />
          </span>
        </button>
      </div>
    </div>
  )
}

export default ThemeButton
