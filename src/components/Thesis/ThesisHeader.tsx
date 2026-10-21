const PDF = '/Optimising_Neural_Networks_for_Embedded_Systems.pdf'
const SOURCE = 'https://bitbucket.org/kochie/fyp'

const facts = [
  { label: 'Author', value: 'Robert Koch' },
  { label: 'Supervisor', value: 'Prof. Tom Drummond' },
  { label: 'Submitted', value: '20 October 2017' },
]

export const stats = [
  {
    value: '≈20%',
    label: 'smaller model files',
    note: 'VGG saved about 100 MB',
  },
  {
    value: '≈1 s',
    label: 'faster per batch',
    note: 'AlexNet, batches of 20',
  },
  {
    value: '4–8×',
    label: 'smaller weights',
    note: '32/64-bit floats to 8-bit',
  },
]

const buttonClass =
  'inline-flex items-center gap-2 no-underline rounded-full border border-border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground transition-colors hover:border-wheat hover:text-wheat'

export function ThesisHeader() {
  return (
    <header className="pt-12 pb-4 lg:pt-20">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        <span>Research</span>
        <span aria-hidden="true" className="text-wheat">
          ·
        </span>
        <span>Final Year Project</span>
        <span aria-hidden="true" className="text-wheat">
          ·
        </span>
        <span>ECE4095, 2017</span>
      </div>
      <div className="mt-3 h-px bg-border" />

      <h1 className="mt-8 max-w-[16ch] text-[2.75rem] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
        Optimisation of Neural Networks for Embedded Systems
      </h1>

      <p className="mt-8 max-w-2xl font-display text-xl italic leading-snug text-foreground/80 lg:text-2xl">
        Replacing the non-linear activation functions in image-classification
        networks with binary and ternary steps, so that bitwise operations can
        stand in for floating point maths on small devices.
      </p>

      <dl className="mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-3">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              {fact.label}
            </dt>
            <dd className="mt-1 text-foreground">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 flex flex-wrap gap-3">
        <a href={PDF} download className={buttonClass}>
          Download PDF <span aria-hidden="true">↓</span>
        </a>
        <a
          href={SOURCE}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
        >
          Source code <span aria-hidden="true">↗</span>
        </a>
      </div>

      <dl className="mt-14 grid grid-cols-1 border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-border">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="border-b border-border py-6 last:border-b-0 sm:border-b-0 sm:px-6 sm:first:pl-0"
          >
            <dt className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              {stat.label}
            </dt>
            <dd className="mt-2 font-display text-5xl tracking-tight text-foreground">
              {stat.value}
            </dd>
            <dd className="mt-1 text-sm text-muted-foreground">{stat.note}</dd>
          </div>
        ))}
      </dl>
    </header>
  )
}
