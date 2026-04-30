import type { ReactElement } from 'react'

/**
 * Editorial hero. Promotes the explosion quote into a magazine-cover headline
 * using Fraunces' optical-size axis at large sizes. The avatar/quote that
 * lived only on the sidebar at xl is now the primary moment of the page on
 * every breakpoint.
 */
export default function Hero(): ReactElement {
  return (
    <section className="pt-2 pb-10 lg:pt-4 lg:pb-16">
      <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] font-mono text-muted-foreground">
        <span aria-hidden="true" className="h-px w-8 bg-border" />
        <span>Robert Koch · Melbourne</span>
      </div>

      <h1
        className="mt-6 text-[clamp(2.75rem,7vw,6.5rem)] font-display text-foreground tracking-[-0.02em]"
        style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
      >
        I build things,
        <br />
        write the code for them,
        <br />
        <span className="italic">&amp;</span> run from the
        <br />
        <span className="text-wheat">resulting explosion.</span>
      </h1>

      <p className="mt-8 max-w-xl font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
        Engineer · Speaker · Occasional guitarist
      </p>
    </section>
  )
}
