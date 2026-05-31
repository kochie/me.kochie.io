import { SectionHeader } from '@/components/SectionHeader/SectionHeader'

interface Talk {
  title: string
  date: string
  event: string
  tags: string[]
  subtitle?: string
  description: string | string[]
  video?: string
  slides?: string
}

const talks: Talk[] = [
  {
    title: 'What we learnt building our AI product',
    date: '2024-09-11',
    event: 'DDD By Night',
    tags: ['AI', 'Product', 'Engineering'],
    description:
      'Our company built an AI product and released it to customers — an immense undertaking that taught us a lot about taking an idea from prototype to the real world. The technical and business challenges, and how we solved them.',
    video: 'https://www.youtube.com/watch?v=YeH90OBy_cM',
    slides: '/What_We_Learnt_Building_Our_AI_Product.pdf',
  },
  {
    title: 'AI Data Security Risks',
    date: '2025-03-18',
    event: 'Programmable',
    tags: ['AI', 'Security', 'Engineering'],
    description: [
      "With generative AI tools rapidly integrating into every corner of the enterprise, security risks are evolving faster than ever. As developers, you're on the frontlines of this revolution — tasked with safeguarding sprawling, unstructured data that traditional security methods can't handle.",
      "We'll reveal the hidden vulnerabilities that GenAI exposes — accidental data leaks, misconfigured permissions lurking in knowledge bases — share cutting-edge security strategies, and introduce tools that can fortify your data defenses.",
    ],
    slides: '/AI_Data_Security_Risks.pdf',
  },
  {
    title: 'AI Agents That Don’t Suck',
    subtitle: 'How to Build Ones That Actually Drive Business Value',
    tags: ['AI', 'Cloud', 'Machine Learning', 'Security'],
    date: '2026-04-30',
    event: 'NDC Sydney',
    description: [
      "AI agents are everywhere - but most of them don't work. They drain engineering time, frustrate end users, and burn budgets without ever proving their worth. The result? Shiny demos that impress in the boardroom but fail in production.",
      "This session shows you how to flip that script. I'll share a practical framework for designing and deploying AI agents that create measurable business impact, agents that align with real workflows, integrate securely, and deliver results people actually care about.",
      'If you want to stop wasting resources and start building AI agents that stick, this talk will show you how.',
    ],
    slides: '/AI_Agents_That_Dont_Suck.pdf',
  },
]

const formatYear = (iso: string) => new Date(iso).getFullYear()

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

const linkClass =
  'underline-offset-4 decoration-1 hover:decoration-wheat hover:text-wheat decoration-border underline transition-colors'

const SITE_URL = 'https://me.kochie.io'
const X_HANDLE = '@kochie'

// TODO(brand voice): refine this share-text template. The default below is a
// safe starting point; tweak phrasing, hashtags, or per-tag voice to taste.
// Constraints: keep under ~240 chars (X appends a ~25-char t.co URL).
const buildShareText = (talk: Talk): string =>
  `"${talk.title}" — ${X_HANDLE} at ${talk.event}`

const buildShareToXUrl = (talk: Talk, slug: string): string => {
  const params = new URLSearchParams({
    text: buildShareText(talk),
    url: `${SITE_URL}/#${slug}`,
  })
  return `https://x.com/intent/post?${params.toString()}`
}

export default function TalksSection() {
  return (
    <div>
      <SectionHeader
        number="06"
        department="Talks"
        title="On stage, occasionally."
        note="When I'm not in front of a screen I'm sometimes in front of a room."
      />
      <ol className="flex flex-col">
        {talks.map((talk) => {
          const slug = talk.title
            .toLowerCase()
            .replace(/[‘’']/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
          return (
            <li
              key={slug}
              id={slug}
              className="flex flex-col gap-3 lg:grid lg:grid-cols-[5rem_1fr] lg:gap-x-12 lg:gap-y-2 py-10 border-t border-border last:border-b scroll-mt-7"
            >
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground lg:pt-1">
                {formatYear(talk.date)}
              </div>
              <div className="space-y-3">
                {talk.tags.length > 0 && (
                  <ul className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground flex flex-wrap gap-x-2 gap-y-1">
                    {talk.tags.map((tag, i) => (
                      <li key={tag} className="flex items-center">
                        {i > 0 && (
                          <span aria-hidden="true" className="mr-2 text-wheat">
                            ·
                          </span>
                        )}
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
                <h3 className="text-2xl lg:text-3xl text-foreground tracking-tight">
                  {talk.title}
                </h3>
                {talk.subtitle && (
                  <p className="font-display italic text-base lg:text-lg text-muted-foreground max-w-3xl">
                    {talk.subtitle}
                  </p>
                )}
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {talk.event}
                  <span aria-hidden="true" className="mx-2 text-wheat">
                    ·
                  </span>
                  <time dateTime={talk.date}>{formatDate(talk.date)}</time>
                </p>
                {Array.isArray(talk.description) ? (
                  talk.description.map((desc, i) => (
                    <p
                      key={`${slug}-${i}`}
                      className="text-foreground/80 leading-relaxed max-w-3xl"
                    >
                      {desc}
                    </p>
                  ))
                ) : (
                  <p className="text-foreground/80 leading-relaxed max-w-3xl">
                    {talk.description}
                  </p>
                )}
                <div className="pt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm font-mono uppercase tracking-[0.18em]">
                  {talk.video && (
                    <a
                      href={talk.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      Watch ↗
                    </a>
                  )}
                  {talk.slides && (
                    <a
                      href={talk.slides}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      Slides ↗
                    </a>
                  )}
                  <a
                    href={buildShareToXUrl(talk, slug)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                    aria-label={`Share "${talk.title}" on X`}
                  >
                    Share on X ↗
                  </a>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
