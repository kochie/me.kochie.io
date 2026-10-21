import Image from 'next/image'
import Link from 'next/link'

import Tensorflow from '@/images/tensorflow.jpeg'
import { SectionHeader } from '@/components/SectionHeader/SectionHeader'
import { stats } from '@/components/Thesis/ThesisHeader'

const REPORT = '/research/neural-networks'
const PDF = '/Optimising_Neural_Networks_for_Embedded_Systems.pdf'
const SOURCE = 'https://bitbucket.org/kochie/fyp'
const VIDEO = 'https://youtu.be/Vpi2-mYYwT8'

const linkClass =
  'font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground hover:text-wheat transition-colors underline underline-offset-4 decoration-1 decoration-border'

export default function Research() {
  return (
    <div>
      <SectionHeader
        number="06"
        department="Research"
        title="Neural networks for small devices."
        note="Final-year thesis for Electrical and Computer Systems Engineering."
      />
      <article className="group grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-8 lg:gap-12">
        <Link
          href={REPORT}
          className="block relative overflow-hidden rounded-md border border-border bg-muted aspect-[4/3] filter grayscale-25 group-hover:grayscale-0 transition-[filter] duration-500"
        >
          <Image
            src={Tensorflow}
            alt="Optimising Neural Networks for Embedded Systems"
            placeholder="blur"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="group-hover:scale-[1.03] transform-gpu transition duration-700"
            style={{ objectFit: 'cover' }}
          />
        </Link>
        <div className="flex flex-col gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Final-year thesis · October 2017
          </p>
          <h3 className="text-2xl lg:text-3xl text-foreground tracking-tight">
            <Link
              href={REPORT}
              className="group-hover:text-wheat transition-colors"
            >
              Optimising Neural Networks for Embedded Systems
            </Link>
          </h3>
          <p className="text-foreground/75 leading-relaxed max-w-xl">
            Convolutional networks are too heavy for small devices. This thesis
            modifies their activation layers so models are smaller and faster to
            run on embedded hardware, and measures what it costs in accuracy.
          </p>
          <dl className="grid grid-cols-3 gap-4 border-y border-border py-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-2xl lg:text-3xl text-foreground">
                  {s.value}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-muted-foreground">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href={REPORT} className={linkClass}>
              Read the report ↗
            </Link>
            <a
              href={VIDEO}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Watch ↗
            </a>
            <a href={PDF} className={linkClass}>
              PDF
            </a>
            <a
              href={SOURCE}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Source code ↗
            </a>
          </div>
        </div>
      </article>
    </div>
  )
}
