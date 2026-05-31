'use client'

import { useEffect, useRef, useState } from 'react'

import ThemeButton from '@/components/Theme/ThemeButton'
import { SECTIONS, type SectionEntry } from '@/components/Sidebar/sections'

/**
 * Mobile-only sticky top bar. Slides in once the cover (sidebar) leaves the
 * viewport, exposes a wordmark, the active section eyebrow, the theme
 * toggle, and a menu sheet that mirrors the sidebar's table of contents.
 *
 * Hidden at xl+ — the persistent sidebar serves the same role there.
 */
export default function MobileTopBar() {
  const [shown, setShown] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<SectionEntry | null>(null)
  const sheetRef = useRef<HTMLDivElement>(null)

  // Show/hide: track the sidebar's intersection with the viewport. The bar
  // is shown whenever the sidebar is *not* visible (i.e., the user has
  // scrolled into the content) — works regardless of sidebar height.
  useEffect(() => {
    const sidebar = document.querySelector(
      'nav[aria-label="Site index and identity"]'
    )
    if (!sidebar) return
    const observer = new IntersectionObserver(
      ([entry]) => setShown(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(sidebar)
    return () => observer.disconnect()
  }, [])

  // Active section: the topmost section whose body sits inside the upper-
  // middle band of the viewport (30% from top, 50% from bottom).
  useEffect(() => {
    const elements = SECTIONS.map((s) => ({
      ...s,
      el: document.getElementById(s.id),
    })).filter((s): s is SectionEntry & { el: HTMLElement } => s.el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )
        if (visible.length > 0) {
          const id = visible[0].target.id
          const found = SECTIONS.find((s) => s.id === id)
          if (found) setActive(found)
        }
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: 0 }
    )
    elements.forEach(({ el }) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Close menu on Escape, and when the user clicks outside the sheet.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      {/* Cover-only floating theme toggle. Visible while the sidebar is on
          screen; cross-fades out as the topbar slides in. */}
      <div
        className={`xl:hidden fixed top-5 right-5 z-50 transition-opacity duration-300 ${
          shown ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        aria-hidden={shown}
      >
        <ThemeButton />
      </div>

      <div
        className={`xl:hidden fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ${
          shown ? 'translate-y-0' : '-translate-y-full'
        }`}
        aria-hidden={!shown}
      >
      <div className="bg-background/85 backdrop-blur-md border-b border-border">
        <div className="flex items-center px-5 py-3 gap-3 min-h-[3.25rem]">
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground hover:text-wheat transition-colors cursor-pointer bg-transparent border-0 p-0"
            aria-label="Scroll to top"
          >
            Robert Koch
          </button>
          <div className="flex-1 text-right font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground truncate">
            {active && (
              <span>
                <span className="text-wheat mr-1.5">{active.number}</span>
                {active.label}
              </span>
            )}
          </div>
          <ThemeButton className="h-9 w-9" />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close section menu' : 'Open section menu'}
            aria-expanded={open}
            aria-controls="mobile-section-menu"
            className="h-9 w-9 flex items-center justify-center rounded-full border border-border text-foreground hover:text-wheat hover:border-wheat transition-colors cursor-pointer"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="h-4 w-4 transition-transform duration-300"
              style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}
              aria-hidden="true"
            >
              {open ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>

        <div
          id="mobile-section-menu"
          ref={sheetRef}
          inert={!open}
          className="overflow-hidden transition-[max-height,opacity] duration-300"
          style={{
            maxHeight: open ? '32rem' : '0rem',
            opacity: open ? 1 : 0,
          }}
        >
          <nav
            aria-label="Site sections"
            className="px-5 py-5 border-t border-border"
          >
            <ol className="flex flex-col">
              {SECTIONS.map((s) => {
                const isActive = active?.id === s.id
                return (
                  <li
                    key={s.id}
                    className="grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-3 py-2.5 border-b border-border last:border-b-0"
                  >
                    <span
                      className={
                        'font-mono text-xs text-right ' +
                        (isActive ? 'text-wheat' : 'text-muted-foreground/60')
                      }
                    >
                      {s.number}
                    </span>
                    <a
                      href={`#${s.id}`}
                      onClick={() => setOpen(false)}
                      className={
                        'font-mono text-base uppercase tracking-[0.16em] transition-colors ' +
                        (isActive
                          ? 'text-wheat'
                          : 'text-foreground hover:text-wheat')
                      }
                    >
                      {s.label}
                    </a>
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="font-mono text-[10px] uppercase tracking-[0.22em] text-wheat"
                      >
                        Reading
                      </span>
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>
        </div>
      </div>
    </div>
    </>
  )
}
