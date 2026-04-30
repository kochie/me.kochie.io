import { SectionHeader } from '@/components/SectionHeader/SectionHeader'

interface Talk {
  title: string
  date: string
  event: string
  description: string | string[]
  video?: string
  slides?: string
}

const talks: Talk[] = [
  {
    title: 'What we learnt building our AI product',
    date: '2024-09-11',
    event: 'DDD By Night',
    description:
      "Our company built an AI product and released it to customers — an immense undertaking that taught us a lot about taking an idea from prototype to the real world. The technical and business challenges, and how we solved them.",
    video: 'https://www.youtube.com/watch?v=YeH90OBy_cM',
    slides: '/What_We_Learnt_Building_Our_AI_Product.pdf',
  },
  {
    title: 'AI Data Security Risks',
    date: '2025-03-18',
    event: 'Programmable',
    description: [
      "With generative AI tools rapidly integrating into every corner of the enterprise, security risks are evolving faster than ever. As developers, you're on the frontlines of this revolution — tasked with safeguarding sprawling, unstructured data that traditional security methods can't handle.",
      "We'll reveal the hidden vulnerabilities that GenAI exposes — accidental data leaks, misconfigured permissions lurking in knowledge bases — share cutting-edge security strategies, and introduce tools that can fortify your data defenses.",
    ],
    slides: '/AI_Data_Security_Risks.pdf',
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

export default function TalksSection() {
  return (
    <div>
      <SectionHeader
        number="06"
        department="Talks"
        title="On stage, occasionally."
        note="When I'm not in front of a screen I'm sometimes in front of a room."
        id="talks"
      />
      <ol className="flex flex-col">
        {talks.map((talk) => {
          const slug = talk.title.replace(/\s/g, '-').toLowerCase()
          return (
            <li
              key={slug}
              id={slug}
              className="grid grid-cols-[3rem_1fr] lg:grid-cols-[5rem_1fr] gap-x-6 lg:gap-x-12 gap-y-2 py-10 border-t border-border last:border-b scroll-mt-7"
            >
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground pt-1">
                {formatYear(talk.date)}
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl lg:text-3xl text-foreground tracking-tight">
                  {talk.title}
                </h3>
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
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
