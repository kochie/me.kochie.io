import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'
import type { ComponentProps, ComponentType } from 'react'
import { slugify, splitHeading, textOf } from '@/components/Thesis/slug'

type MDXComponents = Record<string, ComponentType<any>>

const isExternal = (href: string) => /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(href)

const h1 = ({ children }: ComponentProps<'h1'>) => (
  <h1 className="font-display text-foreground text-4xl mb-4 tracking-tight">
    {children}
  </h1>
)

const SectionNumber = ({ value }: { value: string }) => (
  <span className="mr-3 inline-block font-mono text-[0.4em] tracking-[0.12em] text-muted-foreground align-middle">
    {value}
  </span>
)

const h2 = ({ children }: ComponentProps<'h2'>) => {
  const text = textOf(children)
  const { number, title } = splitHeading(text)
  return (
    <h2
      id={slugify(text)}
      className="mt-20 mb-6 scroll-mt-24 border-t border-border pt-6 text-3xl tracking-tight text-foreground lg:text-4xl"
    >
      {number && <SectionNumber value={number} />}
      {title}
    </h2>
  )
}

const h3 = ({ children }: ComponentProps<'h3'>) => {
  const text = textOf(children)
  const { number, title } = splitHeading(text)
  return (
    <h3
      id={slugify(text)}
      className="mt-12 mb-3 scroll-mt-24 text-2xl tracking-tight text-foreground"
    >
      {number && <SectionNumber value={number} />}
      {title}
    </h3>
  )
}

const h4 = ({ children }: ComponentProps<'h4'>) => {
  const text = textOf(children)
  const { number, title } = splitHeading(text)
  return (
    <h4
      id={slugify(text)}
      className="mt-10 mb-2 scroll-mt-24 font-display text-xl tracking-tight text-foreground"
    >
      {number && <SectionNumber value={number} />}
      {title}
    </h4>
  )
}

const ul = ({ children }: ComponentProps<'ul'>) => (
  <ul className="my-4 list-disc space-y-2 pl-6 text-foreground/85 marker:text-wheat">
    {children}
  </ul>
)

const ol = ({ children }: ComponentProps<'ol'>) => (
  <ol className="my-4 list-decimal space-y-2 pl-6 text-foreground/85 marker:text-muted-foreground">
    {children}
  </ol>
)

const li = ({ children }: ComponentProps<'li'>) => (
  <li className="leading-relaxed">{children}</li>
)

const strong = ({ children }: ComponentProps<'strong'>) => (
  <strong className="font-semibold text-foreground">{children}</strong>
)

const code = ({ children }: ComponentProps<'code'>) => (
  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
    {children}
  </code>
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
    h2,
    h3,
    h4,
    ul,
    ol,
    li,
    strong,
    code,
    p,
    a,
    img,
    ...components,
  }
}
