import { CONTENTS } from './toc-data'
import { slugify, splitHeading } from './slug'

function Label({ text }: { text: string }) {
  const { number, title } = splitHeading(text)
  return (
    <span className="flex gap-3">
      {number && (
        <span className="w-7 shrink-0 font-mono text-[11px] leading-[1.9] text-muted-foreground">
          {number}
        </span>
      )}
      <span>{title}</span>
    </span>
  )
}

export function Contents() {
  return (
    <nav
      aria-label="Contents"
      className="my-10 rounded-md border border-border bg-muted px-6 py-6 sm:px-8"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        Contents
      </p>
      <ol className="mt-5 list-none gap-x-10 p-0 sm:columns-2">
        {CONTENTS.map((entry) => (
          <li
            key={entry.title}
            className="mb-4 break-inside-avoid text-[15px] leading-snug"
          >
            <a
              href={`#${slugify(entry.title)}`}
              className="text-foreground underline decoration-transparent underline-offset-4 hover:decoration-wheat"
            >
              <Label text={entry.title} />
            </a>
            {entry.children && (
              <ol className="mt-2 list-none space-y-1.5 border-l border-border pl-4">
                {entry.children.map((child) => (
                  <li key={child} className="text-sm text-foreground/75">
                    <a
                      href={`#${slugify(child)}`}
                      className="underline decoration-transparent underline-offset-4 hover:text-foreground hover:decoration-wheat"
                    >
                      <Label text={child} />
                    </a>
                  </li>
                ))}
              </ol>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
