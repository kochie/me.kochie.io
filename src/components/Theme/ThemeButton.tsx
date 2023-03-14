'use client'
import React, { ReactElement } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { THEME, useTheme } from './context'
import {
  faLightbulbSlash,
  faLightbulbOn,
  faCogs,
} from '@fortawesome/pro-duotone-svg-icons'

const ThemeButton = (): ReactElement => {
  const [theme, setTheme] = useTheme()

  const bulbOffDiv = (
    <div
      onClick={(): void => setTheme(THEME.dark)}
      className="w-full h-full"
      title={'Dark Theme'}
      role="button"
      aria-label="Dark Theme"
      tabIndex={0}
    >
      <FontAwesomeIcon icon={faLightbulbSlash} size={'2x'} className="" />
    </div>
  )
  const bulbOnDiv = (
    <div
      onClick={(): void => setTheme(THEME.light)}
      className="w-full h-full"
      title={'Light Theme'}
      role="button"
      aria-label="Light Theme"
      tabIndex={0}
    >
      <FontAwesomeIcon icon={faLightbulbOn} size={'2x'} className="" />
    </div>
  )
  const systemDiv = (
    <div
      onClick={(): void => setTheme(THEME.system)}
      className="w-full h-full"
      title={'System Theme'}
      role="button"
      aria-label="System Theme"
      tabIndex={0}
    >
      <FontAwesomeIcon icon={faCogs} size={'2x'} className="fa-stack-1x" />
    </div>
  )

  const nextTheme = (theme: THEME) => {
    if (theme === THEME.dark) return THEME.light
    if (theme === THEME.light) return THEME.system
    if (theme === THEME.system) return THEME.dark
  }

  return (
    <div className="fixed top-0 right-0 z-50">
      <div
        className={`pr-5 pt-5 pl-10 pb-10 animate duration-300 group flex-col flex gap-4 items-center text-white dark:text-black`}
      >
        <div className="relative w-16 h-16 rounded-full bg-gray-900 dark:bg-white shadow-2xl cursor-pointer">
          <div
            className={`w-full h-full bg-gray-900 dark:bg-white rounded-full animate duration-300`}
            onClick={() => setTheme(nextTheme(theme))}
            role="button"
            aria-label="Change Theme"
            tabIndex={0}
          >
            {theme === THEME.light ? bulbOnDiv : null}
            {theme === THEME.dark ? bulbOffDiv : null}
            {theme === THEME.system ? systemDiv : null}
          </div>
        </div>

        <div className="relative w-12 h-12 rounded-full shadow-2xl cursor-pointer transition transform-gpu duration-300 animate group-hover:opacity-100 opacity-0 scale-0 group-hover:scale-100 ease-in-out delay-200 group-hover:delay-0">
          <div
            onClick={(): void => setTheme(THEME.dark)}
            className="w-full h-full bg-gray-900 dark:bg-white rounded-full duration-300 animate"
            title={'Dark Theme'}
          >
            <FontAwesomeIcon icon={faLightbulbSlash} size="lg" className="" />
          </div>
        </div>

        <div className="relative w-12 h-12 rounded-full shadow-2xl cursor-pointer transition transform-gpu duration-300 animate group-hover:opacity-100 opacity-0 scale-0 group-hover:scale-100 ease-in-out delay-100">
          <div
            onClick={(): void => setTheme(THEME.light)}
            className="w-full h-full bg-gray-900 dark:bg-white rounded-full duration-300 animate"
            title={'Light Theme'}
          >
            <FontAwesomeIcon icon={faLightbulbOn} size="lg" className="" />
          </div>
        </div>

        <div className="relative w-12 h-12 rounded-full shadow-2xl cursor-pointer transition transform-gpu duration-300 animate group-hover:opacity-100 opacity-0 scale-0 group-hover:scale-100 ease-in-out delay-0 group-hover:delay-200">
          <div
            onClick={(): void => setTheme(THEME.system)}
            className="w-full h-full bg-gray-900 dark:bg-white rounded-full duration-300 animate"
            title={'System Theme'}
          >
            <FontAwesomeIcon icon={faCogs} size="lg" className="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThemeButton
