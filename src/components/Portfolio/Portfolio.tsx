import React, { ReactElement } from 'react'
import Image from 'next/image'

import Space from '@/images/space.png'
import Particlez from '@/images/particlez.png'
import Tensorflow from '@/images/tensorflow.jpeg'
import Stocks from '@/images/clay-banks-3IFYE6UHFBo-unsplash.jpg'
import CT from '@/images/markus-winkler-zYBR4TN46EE-unsplash.jpg'
import BenchTop from '@/images/brett-garwood-asZVvgMGshc-unsplash.jpg'
import TouchTyper from '@/images/demo.jpg'
import Link from 'next/link'

const projects = [
  {
    image: TouchTyper,
    title: 'Touch Typer',
    description:
      "Touch Typer is your tutor that helps you improve your typing skills. Open source and free to use it's available on Linux, Windows and macOS.",
    link: 'https://touch-typer.kochie.io',
    id: '1',
  },
  {
    image: CT,
    title: 'Contact Tracing',
    description:
      'A technology demonstration website to showcase a proof of concept contact tracing application using the AWS Cloud Development Kit.',
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
    description: 'A real time n-body particle simulator for the web.',
    link: 'https://3body.now.sh',
    id: '4',
  },
  {
    image: Tensorflow,
    title: 'Optimising Neural Networks for Embedded Systems',
    description:
      'My final year project - focusing on modifying the activation layers of convolutional neural networks to work better on embedded devices.',
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
    <div>
      <h2 className="text-gray-900 dark:text-white font-bold text-2xl mt-8 mb-6">
        Recent Work
      </h2>
      <div className="grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 grid-flow-row gap-4 lg:gap-10 auto-cols-max">
        {projects.map((project) => (
          <div
            className="group rounded-xl bg-gray-300 dark:bg-gray-700 hover:shadow-2xl shadow-xl transition duration-300"
            key={project.id}
          >
            <Link href={project.link}>
              <div
                className="relative rounded-t-xl overflow-hidden filter grayscale-35 group-hover:grayscale-0"
                style={{ padding: '30% 0' }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  placeholder="blur"
                  className="absolute top-0 left-0 w-full h-full group-hover:scale-110 transform-gpu transition duration-100"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{
                    objectFit: 'cover',
                  }}
                />
                {/* <span className="portfolio-text">View</span> */}
              </div>
            </Link>
            <div className="px-5 ">
              <h3 className="text-lg font-medium my-3 text-gray-900 dark:text-white">
                <a className="hover:underline" href={project.link}>
                  {project.title}
                </a>
              </h3>
              <p className="text-sm mb-3 text-gray-700 dark:text-gray-300">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
