import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-800 px-6 text-center">
      <p className="text-sm uppercase tracking-widest text-gray-600 dark:text-gray-400">
        404
      </p>
      <h1 className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-white">
        Page not found
      </h1>
      <p className="mt-3 max-w-lg text-gray-700 dark:text-gray-300">
        The page you&rsquo;re looking for doesn&rsquo;t exist on this site.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded bg-purple-500 px-6 py-3 font-bold text-white transition hover:bg-purple-600"
      >
        Back home
      </Link>
    </main>
  )
}
