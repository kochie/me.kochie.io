'use client'

import { getCalApi } from '@calcom/embed-react'
import { useEffect, type ReactNode } from 'react'

const CAL_LINK = 'kochie'
const CAL_NAMESPACE = 'meeting'

export function CalButton({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE })
      if (cancelled) return
      cal('ui', {
        theme: 'auto',
        hideEventTypeDetails: false,
        layout: 'month_view',
      })
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <button
      type="button"
      className={className}
      data-cal-namespace={CAL_NAMESPACE}
      data-cal-link={CAL_LINK}
      data-cal-config='{"layout":"month_view"}'
    >
      {children}
    </button>
  )
}
