import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'
import type { ComponentProps } from 'react'

type MDXComponents = Record<string, React.ComponentType<unknown>>

const h1 = ({ children }: ComponentProps<'h1'>) => (
  <h1 className="text-gray-900 text-4xl font-extrabold mb-3.5 dark:text-white">
    {children}
  </h1>
)
const p = ({ children }: ComponentProps<'p'>) => (
  <p className="text-gray-700 my-3 leading-relaxed dark:text-gray-400">
    {children}
  </p>
)
const a = ({ children, href }: ComponentProps<'a'>) => (
  <Link
    href={href ?? '#'}
    className="underline dark:text-orange-300 dark:hover:text-orange-600 text-indigo-600 hover:text-indigo-900 cursor-pointer"
  >
    {children}
  </Link>
)
const img = ({ src, alt }: ImageProps) => (
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
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: h1 as React.ComponentType<unknown>,
    p: p as React.ComponentType<unknown>,
    a: a as React.ComponentType<unknown>,
    img: img as React.ComponentType<unknown>,
    ...components,
  }
}
