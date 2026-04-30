import { CalButton } from '@/components/CalButton/CalButton'
import { SectionHeader } from '@/components/SectionHeader/SectionHeader'

const links = [
  { label: 'Email', href: 'mailto:robert@kochie.io' },
  { label: 'Resume', href: '/Robert_Koch.pdf', download: true },
  { label: 'Coffee', href: 'https://buymeacoffee.com/kochie' },
  { label: 'Cotton Bureau', href: 'https://cottonbureau.com/people/robert-koch' },
  { label: 'Blog', href: 'https://blog.kochie.io' },
  { label: 'RSS', href: 'https://blog.kochie.io/feed/rss.xml' },
]

const linkClass =
  'underline-offset-4 decoration-1 hover:decoration-wheat hover:text-wheat decoration-border underline transition-colors'

const GetInTouch = () => (
  <div>
    <SectionHeader
      number="02"
      department="Correspondence"
      title="Get in touch."
      note="Best by email — calendar second, ravens third."
    />
    <div className="flex flex-col gap-4 max-w-3xl">
      <p className="text-base lg:text-lg text-foreground/85 leading-relaxed">
        Drop a line at{' '}
        <a className={linkClass} href="mailto:robert@kochie.io">
          robert@kochie.io
        </a>
        {' '}or{' '}
        <CalButton
          className={`${linkClass} bg-transparent border-0 p-0 text-inherit cursor-pointer`}
        >
          book a meeting
        </CalButton>
        .
      </p>
      <ul className="flex flex-wrap gap-x-5 gap-y-2 mt-4 text-sm font-mono uppercase tracking-[0.18em] text-muted-foreground">
        {links.map((link, i) => (
          <li key={link.label} className="flex items-center gap-5">
            {i > 0 && <span aria-hidden="true">·</span>}
            <a
              href={link.href}
              {...(link.download ? { download: '' } : {})}
              {...(link.href.startsWith('http')
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className="hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

export default GetInTouch
