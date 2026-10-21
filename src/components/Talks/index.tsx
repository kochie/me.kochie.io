import { SectionHeader } from '@/components/SectionHeader/SectionHeader'

interface Talk {
  title: string
  date?: string
  event?: string
  tags: string[]
  subtitle?: string
  description: string | string[]
  video?: string
  slides?: string
  /** Upcoming talks have no date yet; archived ones render compactly. */
  status?: 'upcoming' | 'archived'
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
    video: 'https://www.youtube.com/watch?v=_vaIfRXXiIY',
    slides: '/AI_Agents_That_Dont_Suck.pdf',
  },
  {
    title: 'Building secure RAG pipelines',
    status: 'archived',
    tags: ['AI', 'Security', 'Engineering'],
    description: [
      "In this session learn how to build Retrieval-Augmented Generation (RAG) pipelines for AI agents. We'll explore the principles of what looks good, and how to break down complex business problems so they can be reliably solved by RAG assisted AI Agents.",
      "In this session we'll start from the basics and discover what RAG is, we'll then create a simple pipeline into a Large Language Model, finally we'll create a multi-modal RAG pipeline that can handle complex enterprise security requirements.",
    ],
  },
  {
    title: 'Python, But Fast',
    status: 'archived',
    subtitle: 'A Practical Playbook for Real-World Speedups',
    tags: ['Python', 'Performance', 'Engineering'],
    description:
      "Python is slow… until it isn't. This talk shows a no nonsense playbook for squeezing 10x more performance out of real Python code without rewriting everything in C. Through live demos we'll profile, vectorize, batch, and compile hot paths turning sluggish scripts and services into production-ready speed demons. You'll leave with a clear checklist and the confidence to know which optimization matters most in your app.",
  },
  {
    title: 'Space to Cloud',
    status: 'archived',
    subtitle: 'Building AI Pipelines from Free Satellite Data',
    tags: ['AI', 'Cloud', 'Space'],
    description: [
      'What if you could tap into satellites orbiting the Earth right now - without a billion-dollar budget or your own dish farm? Thanks to cloud-connected ground stations, anyone can capture and stream downlink data directly from satellites, process it in real time, and feed it into modern AI pipelines.',
      "In this talk, we'll go hands-on with the growing ecosystem of cloud ground stations and show how to transform raw space signals into usable datasets for computer vision, climate science, and machine learning.",
      "Whether you're an AI engineer, data scientist, or just a space geek with cloud credits to burn, this session will show you how to bring the view from orbit straight into your ML models.",
    ],
  },
  {
    title: 'One word was churning our customers',
    status: 'upcoming',
    subtitle: 'Lessons from building FDE at a startup',
    tags: ['Startups', 'Forward Deployed Engineering', 'AI'],
    description: [
      'The hardest part of building a startup is finding product-market fit while inventing the business around it. Forward deployed engineers fill the gap between what your product does and what customers actually need, and in AI, that gap is where deals die.',
      'We built an FDE team and got most of it wrong first: a single word in our positioning was teaching customers to churn, deals closed without anyone owning deployment, and my team sat squarely in the crossfire between engineering and sales.',
      'This talk covers what broke, what we fixed, and how FDEs can use their position in the middle to shape both sides - so customers get solutions, not handoffs.',
    ],
  },
]

const slugify = (title: string) =>
  title
    .toLowerCase()
    .replace(/[‘’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const featured = talks.filter((talk) => talk.status !== 'archived')
const archived = talks.filter((talk) => talk.status === 'archived')

const formatYear = (iso?: string) => (iso ? new Date(iso).getFullYear() : null)

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
  `"${talk.title}" — ${X_HANDLE}${talk.event ? ` at ${talk.event}` : ''}`

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
        number="07"
        department="Talks"
        title="On stage, occasionally."
      />
      <ol className="flex flex-col">
        {featured.map((talk) => {
          const slug = slugify(talk.title)
          return (
            <li
              key={slug}
              id={slug}
              className="flex flex-col gap-3 lg:grid lg:grid-cols-[5rem_1fr] lg:gap-x-12 lg:gap-y-2 py-10 border-t border-border last:border-b scroll-mt-7"
            >
              <div
                className={`font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground lg:pt-1 ${talk.date || talk.status === 'upcoming' ? '' : 'hidden lg:block'}`}
              >
                {talk.date
                  ? formatYear(talk.date)
                  : talk.status === 'upcoming'
                    ? 'Next'
                    : null}
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
                {(talk.event || talk.date || talk.status === 'upcoming') && (
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {talk.event}
                    {talk.event && talk.date && (
                      <span aria-hidden="true" className="mx-2 text-wheat">
                        ·
                      </span>
                    )}
                    {talk.date && (
                      <time dateTime={talk.date}>{formatDate(talk.date)}</time>
                    )}
                    {!talk.date && talk.status === 'upcoming' && (
                      <>
                        {talk.event && (
                          <span aria-hidden="true" className="mx-2 text-wheat">
                            ·
                          </span>
                        )}
                        <span className="text-wheat">Upcoming</span>
                      </>
                    )}
                  </p>
                )}
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

      {archived.length > 0 && (
        <div className="mt-14">
          <div className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <span>Archive</span>
            <span aria-hidden="true" className="text-wheat">
              ·
            </span>
            <span>Other talks I give</span>
          </div>
          <ul className="mt-4 flex flex-col">
            {archived.map((talk) => {
              const slug = slugify(talk.title)
              const paragraphs = Array.isArray(talk.description)
                ? talk.description
                : [talk.description]
              return (
                <li
                  key={slug}
                  id={slug}
                  className="border-t border-border last:border-b scroll-mt-7"
                >
                  <details className="group py-4 lg:pl-32">
                    <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 [&::-webkit-details-marker]:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wheat">
                      <span>
                        <span className="text-lg text-foreground group-hover:text-wheat transition-colors">
                          {talk.title}
                        </span>
                        {talk.subtitle && (
                          <span className="font-display italic text-muted-foreground">
                            {' '}
                            — {talk.subtitle}
                          </span>
                        )}
                        <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                          {talk.tags.join(' · ')}
                        </span>
                      </span>
                      <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                        <span className="group-open:hidden">Abstract +</span>
                        <span className="hidden group-open:inline">
                          Close −
                        </span>
                      </span>
                    </summary>
                    <div className="mt-3 space-y-3">
                      {paragraphs.map((desc, i) => (
                        <p
                          key={`${slug}-${i}`}
                          className="max-w-3xl text-sm leading-relaxed text-foreground/80"
                        >
                          {desc}
                        </p>
                      ))}
                      <a
                        href={buildShareToXUrl(talk, slug)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${linkClass} inline-block font-mono text-xs uppercase tracking-[0.18em]`}
                        aria-label={`Share "${talk.title}" on X`}
                      >
                        Share on X ↗
                      </a>
                    </div>
                  </details>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
