import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'
import type { ComponentProps, ComponentType } from 'react'

type MDXComponents = Record<string, ComponentType<any>>

const isExternal = (href: string) => /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(href)

const h1 = ({ children }: ComponentProps<'h1'>) => (
  <h1 className="font-display text-foreground text-4xl mb-4 tracking-tight">
    {children}
  </h1>
)

const p = ({ children }: ComponentProps<'p'>) => (
  <p className="text-foreground/85 my-3 leading-relaxed">{children}</p>
)

const a = ({ children, href, ...rest }: ComponentProps<'a'>) => {
  const target = href ?? '#'
  const linkClass = 'cursor-pointer'

  if (isExternal(target)) {
    return (
      <a
        {...rest}
        href={target}
        className={linkClass}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={target} className={linkClass} {...rest}>
      {children}
    </Link>
  )
}

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
    h1,
    p,
    a,
    img,
    ...components,
  }
}
