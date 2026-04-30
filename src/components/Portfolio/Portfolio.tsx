import React, { ReactElement } from 'react'
import Image from 'next/image'

import Space from '@/images/space.png'
import Particlez from '@/images/particlez.png'
import Tensorflow from '@/images/tensorflow.jpeg'
import Stocks from '@/images/clay-banks-3IFYE6UHFBo-unsplash.jpg'
import CT from '@/images/markus-winkler-zYBR4TN46EE-unsplash.jpg'
import BenchTop from '@/images/brett-garwood-asZVvgMGshc-unsplash.jpg'
import TouchTyper from '@/images/demo.jpg'
import MetaFixer from '@/images/metafixer.png'
import { SectionHeader } from '@/components/SectionHeader/SectionHeader'

const projects = [
  {
    image: MetaFixer,
    title: 'MetaFixer',
    description:
      'Adds missing metadata to photos exported from Facebook so they import into photo apps with the correct date and location.',
    link: 'https://metafixer.kochie.io',
    id: '8',
  },
  {
    image: TouchTyper,
    title: 'Touch Typer',
    description:
      "Open-source typing tutor for Linux, Windows, and macOS — improves your typing skills without nagging you.",
    link: 'https://touch-typer.kochie.io',
    id: '1',
  },
  {
    image: CT,
    title: 'Contact Tracing',
    description:
      'Technology demonstration of a contact-tracing application built on the AWS Cloud Development Kit.',
    link: 'https://ct.vercel.app',
    id: '2',
  },
  {
    image: Space,
    title: 'Space',
    description: 'A small webapp that follows the mouse.',
    link: 'https://kochie.space',
    id: '3',
  },
  {
    image: Particlez,
    title: 'Particlez',
    description: 'A real-time n-body particle simulator for the web.',
    link: 'https://3body.vercel.app',
    id: '4',
  },
  {
    image: Tensorflow,
    title: 'Optimising Neural Networks for Embedded Systems',
    description:
      'Final-year project — modifying the activation layers of CNNs to run better on embedded devices.',
    link: 'https://bitbucket.org/kochie/fyp',
    id: '5',
  },
  {
    image: Stocks,
    title: 'Stonks',
    description: 'A trading platform for crypto-currencies.',
    link: 'https://stonks.kochie.io',
    id: '6',
  },
  {
    image: BenchTop,
    title: 'benchtop-js',
    description: 'A benchmarking tool for JavaScript projects.',
    link: 'https://github.com/BenchTop/benchtop-js',
    id: '7',
  },
]

export default function Portfolio(): ReactElement {
  return (
    <section className="my-16 lg:my-24">
      <SectionHeader
        number="05"
        department="Selected Work"
        title="Some recent things I've built."
        note="A handful of projects, some shipped, some still warm."
      />
      <ol className="grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 grid-flow-row gap-8 lg:gap-10">
        {projects.map((project, i) => (
          <li
            key={project.id}
            className="group flex flex-col gap-3 transition-transform duration-300 hover:-translate-y-0.5"
          >
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="relative overflow-hidden rounded-md border border-border bg-muted aspect-[4/3] filter grayscale-25 group-hover:grayscale-0 transition-[filter] duration-500">
                <Image
                  src={project.image}
                  alt={project.title}
                  placeholder="blur"
                  className="absolute inset-0 w-full h-full group-hover:scale-[1.03] transform-gpu transition duration-700"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-3 text-[11px] uppercase tracking-[0.22em] font-mono text-muted-foreground">
                <span>{`No. ${String(i + 1).padStart(2, '0')}`}</span>
                <span aria-hidden="true">↗</span>
              </div>
              <h3 className="mt-2 text-2xl text-foreground group-hover:text-wheat transition-colors">
                {project.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                {project.description}
              </p>
            </a>
          </li>
        ))}
      </ol>
    </section>
  )
}
