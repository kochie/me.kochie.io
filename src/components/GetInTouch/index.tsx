import React from 'react'
import Image from 'next/image'

import XPS from '@/images/xps-6uneKLGrJPs-unsplash.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const GetInTouch = () => {
  return (
    <div className="group rounded-xl overflow-hidden dark:bg-cool-gray-700 lg:h-64 shadow-lg bg-cool-gray-300 my-6 flex flex-col lg:flex-row">
      <div className="relative h-48 lg:h-full w-full lg:w-48 filter grayscale-35 group-hover:grayscale-0">
        <Image
          src={XPS}
          alt="XPS laptop on bench"
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          className="group-hover:scale-110 transition transform-gpu duration-100"
        />
      </div>
      <div className="ml-6">
        <h2 className="text-gray-900 dark:text-white font-bold text-2xl mt-6 mb-4">
          Get In Touch
        </h2>
        <p className="text-gray-700 my-6 leading-relaxed dark:text-gray-300">
          Please shoot me an email at{' '}
          <a
            className="underline hover:text-gray-900 font-semibold dark:hover:text-gray-300"
            href="mailto:robert@kochie.io"
          >
            robert@kochie.io
          </a>
        </p>
        <div className="flex gap-7 dark:text-white mb-4 justify-center lg:justify-start">
          <div className="transform-gpu hover:scale-125 duration-100 cursor-pointer">
            <a
              href="/Robert_Koch.pdf"
              download="resume_robert_koch.pdf"
              className="hover:text-yellow-600"
              aria-label="resume"
              title="My Resume"
            >
              <FontAwesomeIcon
                icon={['fad', 'file-user']}
                size="2x"
                fixedWidth
              />
            </a>
          </div>
          <div className="transform-gpu hover:scale-125 duration-100 cursor-pointer">
            <a
              href="https://cottonbureau.com/people/robert-koch"
              className="hover:text-cottonBureau"
              aria-label="cotton bureau"
              title="Cotton Bureau"
            >
              <FontAwesomeIcon
                icon={['fab', 'cotton-bureau']}
                size="2x"
                fixedWidth
              />
            </a>
          </div>
          <div className="transform-gpu hover:scale-125 duration-100 cursor-pointer">
            <a
              href="https://buymeacoffee.com/kochie"
              className="hover:text-amber-900"
              aria-label="buy me a coffee"
              title="Buy Me A Coffee"
            >
              <FontAwesomeIcon icon={['fad', 'coffee']} size="2x" fixedWidth />
            </a>
          </div>
          <div className="transform-gpu hover:scale-125 duration-100 cursor-pointer">
            <a
              href="https://blog.kochie.io/feed/rss.xml"
              className="hover:text-orange-600"
              aria-label="rss"
              title="Article RSS Feed"
            >
              <FontAwesomeIcon icon={['fad', 'rss']} size="2x" fixedWidth />
            </a>
          </div>
          <div className="transform-gpu hover:scale-125 duration-100 cursor-pointer">
            <a
              href="https://blog.kochie.io"
              className="hover:text-green-600"
              aria-label="blog"
              title="My Blog"
            >
              <FontAwesomeIcon icon={['fad', 'blog']} size="2x" fixedWidth />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GetInTouch
