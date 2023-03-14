import Image from 'next/image'
import Link from 'next/link'

const h1 = ({ children }) => (
  <h1 className="text-gray-900 text-4xl font-extrabold mb-3.5 dark:text-white">
    {children}
  </h1>
)
const p = ({ children }) => (
  <p className="text-gray-700 my-3 leading-relaxed dark:text-gray-400">
    {children}
  </p>
)
const a = ({ children, href }) => (
  <Link
    href={href}
    className="underline dark:text-orange-300 dark:hover:text-orange-600 text-indigo-600 hover:text-indigo-900 cursor-pointer"
  >
    {children}
  </Link>
)
const img = ({ src, alt }) => (
  <Image
    src={src}
    alt={alt}
    className="my-10 rounded-xl"
    style={{
      maxWidth: '100%',
      height: 'auto',
    }}
  />
)
export function useMDXComponents(components) {
  return { h1, p, a, img, ...components }
}
