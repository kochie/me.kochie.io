'use client'

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-800 px-6 text-center">
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
        Something went wrong
      </h1>
      <p className="mt-3 max-w-lg text-gray-700 dark:text-gray-300">
        An error broke this page. The issue has been reported — feel free to
        try again.
      </p>
      {error.digest && (
        <p className="mt-2 text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">
          Reference: {error.digest}
        </p>
      )}
      <button
        type="button"
        onClick={reset}
        className="mt-6 cursor-pointer rounded bg-purple-500 px-6 py-3 font-bold text-white transition hover:bg-purple-600"
      >
        Try again
      </button>
    </main>
  )
}
