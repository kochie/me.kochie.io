'use client'
import React, {
  PropsWithChildren,
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

enum THEME {
  dark = 'DARK',
  light = 'LIGHT',
  system = 'SYSTEM',
}

interface ThemeStateContext {
  setTheme: (theme: THEME) => void
  theme: THEME
}

const ThemeContext = createContext<ThemeStateContext>({
  theme: THEME.dark,
  setTheme: () => ({}),
})

const applyThemeClasses = (isDark: boolean): void => {
  const root = document.documentElement
  if (isDark) {
    root.classList.add('dark', 'dark-theme')
  } else {
    root.classList.remove('dark', 'dark-theme')
  }
}

const ThemeProvider = ({
  children,
}: PropsWithChildren<Record<never, never>>): ReactElement => {
  // Initial state must match SSR output. The inline script in layout.tsx has
  // already applied the correct class to <html> before hydration; this state
  // gets synced from localStorage in the effect below.
  const [theme, _setTheme] = useState<THEME>(THEME.system)
  const ref = useRef(theme)
  const synced = useRef(false)

  const setTheme = (theme: THEME): void => {
    ref.current = theme
    _setTheme(theme)
  }

  const value = { theme, setTheme }

  const switchToLight = useCallback((e: MediaQueryListEvent): void => {
    if (e.matches && ref.current === THEME.system) {
      applyThemeClasses(false)
    }
  }, [])

  const switchToDark = useCallback((e: MediaQueryListEvent): void => {
    if (e.matches && ref.current === THEME.system) {
      applyThemeClasses(true)
    }
  }, [])

  useEffect(() => {
    const lightMQ = window.matchMedia('(prefers-color-scheme: light)')
    const darkMQ = window.matchMedia('(prefers-color-scheme: dark)')
    lightMQ.addEventListener('change', switchToLight)
    darkMQ.addEventListener('change', switchToDark)

    return () => {
      lightMQ.removeEventListener('change', switchToLight)
      darkMQ.removeEventListener('change', switchToDark)
    }
  }, [switchToDark, switchToLight])

  useEffect(() => {
    // First run: sync state from localStorage without touching the DOM. The
    // inline script in layout.tsx already applied the right class based on
    // the same localStorage value, so the DOM is correct.
    if (!synced.current) {
      synced.current = true
      const stored = window.localStorage.getItem('theme') as THEME | null
      if (stored && stored !== theme) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing client-only localStorage on mount
        _setTheme(stored)
        ref.current = stored
      }
      return
    }

    // Subsequent runs (user changed theme): update the DOM to match.
    if (theme === THEME.system) {
      applyThemeClasses(
        window.matchMedia('(prefers-color-scheme: dark)').matches
      )
    } else {
      applyThemeClasses(theme === THEME.dark)
    }
    window.localStorage.setItem('theme', theme)
  }, [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

const useTheme = (): [THEME, (theme: THEME) => void] => {
  const { theme, setTheme } = useContext(ThemeContext)
  return [theme, setTheme]
}

export { useTheme, ThemeProvider, THEME }
