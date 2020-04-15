import React, { ReactElement, useState, useEffect } from 'react'

import styles from './theme.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core'

enum THEME {
  dark = 'DARK',
  light = 'LIGHT',
}

export default function Theme(): ReactElement {
  const [theme, setTheme] = useState(THEME.dark)
  const bulbOff = findIconDefinition({
    prefix: 'fad',
    iconName: 'lightbulb-slash',
  })

  const bulbOn = findIconDefinition({
    prefix: 'fad',
    iconName: 'lightbulb-on',
  })

  const toggleMode = (newTheme: string): void => {
    console.log('currently:', theme, 'setting to:', newTheme)
    const isDark = theme === THEME.dark

    if (
      (newTheme === THEME.light && isDark) ||
      (newTheme === THEME.dark && !isDark)
    ) {
      document.body.classList.toggle('dark-theme')
      setTheme(isDark ? THEME.light : THEME.dark)
    }
  }

  useEffect(() => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (isDarkMode) document.body.classList.add('dark-theme')
    // const isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
    // const isNotSpecified = window.matchMedia('(prefers-color-scheme: no-preference)').matches;

    setTheme(
      (window.localStorage.getItem('theme') as THEME) || isDarkMode
        ? THEME.dark
        : THEME.light
    )

    const switchLight = (e: MediaQueryListEvent): void =>
      e.matches && toggleMode(THEME.dark)
    const switchDark = (e: MediaQueryListEvent): void =>
      e.matches && toggleMode(THEME.light)

    window.matchMedia('(prefers-color-scheme: dark)').addListener(switchLight)
    window.matchMedia('(prefers-color-scheme: light)').addListener(switchDark)

    return (): void => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeListener(switchLight)
      window
        .matchMedia('(prefers-color-scheme: light)')
        .removeListener(switchDark)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('theme', theme)
  }, [theme])

  const sunDiv = (
    <div
      onClick={(): void => toggleMode(THEME.dark)}
      className={styles.iconDiv}
    >
      <FontAwesomeIcon icon={bulbOff} size={'2x'} />
    </div>
  )
  const moonDiv = (
    <div
      onClick={(): void => toggleMode(THEME.light)}
      className={styles.iconDiv}
    >
      <FontAwesomeIcon icon={bulbOn} size={'2x'} />
    </div>
  )

  return (
    <div className={styles.button}>
      {theme === THEME.light ? sunDiv : null}
      {theme === THEME.dark ? moonDiv : null}
    </div>
  )
}
