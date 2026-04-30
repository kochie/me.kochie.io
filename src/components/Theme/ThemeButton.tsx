'use client'
import React from 'react'

import { THEME, useTheme } from './context'

const themeLabel = {
  [THEME.dark]: 'Dark',
  [THEME.light]: 'Light',
  [THEME.system]: 'System',
}

const nextTheme = (theme: THEME): THEME => {
  if (theme === THEME.dark) return THEME.light
  if (theme === THEME.light) return THEME.system
  return THEME.dark
}

// Single SVG with three groups, only one visible per state. Each group fades
// + rotates when active, giving the button a "morphing" feel without
// requiring a path-morphing library.
const ThemeButton = () => {
  const [theme, setTheme] = useTheme()

  return (
    <div className="fixed top-5 right-5 z-50">
      <button
        type="button"
        onClick={() => setTheme(nextTheme(theme))}
        aria-label={`Theme: ${themeLabel[theme]}. Click to cycle.`}
        title={`Theme: ${themeLabel[theme]}`}
        className="group flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur text-foreground hover:text-wheat hover:border-wheat transition-colors cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
          aria-hidden="true"
        >
          {/* Sun — visible in light theme */}
          <g
            className="transition-all duration-300 origin-center"
            style={{
              opacity: theme === THEME.light ? 1 : 0,
              transform:
                theme === THEME.light
                  ? 'rotate(0deg) scale(1)'
                  : 'rotate(-90deg) scale(0.6)',
            }}
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </g>
          {/* Moon — visible in dark theme */}
          <g
            className="transition-all duration-300 origin-center"
            style={{
              opacity: theme === THEME.dark ? 1 : 0,
              transform:
                theme === THEME.dark
                  ? 'rotate(0deg) scale(1)'
                  : 'rotate(90deg) scale(0.6)',
            }}
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </g>
          {/* Auto / system — half sun half moon */}
          <g
            className="transition-all duration-300 origin-center"
            style={{
              opacity: theme === THEME.system ? 1 : 0,
              transform:
                theme === THEME.system
                  ? 'rotate(0deg) scale(1)'
                  : 'rotate(-90deg) scale(0.6)',
            }}
          >
            <circle cx="12" cy="12" r="8" />
            <path d="M12 4a8 8 0 0 0 0 16Z" fill="currentColor" />
          </g>
        </svg>
      </button>
    </div>
  )
}

export default ThemeButton
