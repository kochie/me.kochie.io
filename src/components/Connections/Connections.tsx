import React, { ReactElement } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faBluesky,
  faGithub,
  faInstagram,
  faLinkedin,
  faMastodon,
  faThreads,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons'

interface Connection {
  icon: IconDefinition
  href: string
  name: string
  color: string
}

const connections: Connection[] = [
  {
    icon: faBluesky,
    href: 'https://bsky.app/profile/kochie.bsky.social',
    name: 'kochie',
    color: 'hover:text-bluesky',
  },
  {
    icon: faLinkedin,
    href: 'https://linkedin.com/in/rkkochie',
    name: 'rkkochie',
    color: 'hover:text-linkedin',
  },
  {
    icon: faXTwitter,
    href: 'https://x.com/kochie',
    name: 'kochie',
    color: 'hover:text-x',
  },
  {
    icon: faThreads,
    href: 'https://www.threads.net/@rkkochie',
    name: 'rkkochie',
    color: 'hover:text-threads',
  },
  {
    icon: faInstagram,
    href: 'https://instagram.com/rkkochie',
    name: 'rkkochie',
    color: 'hover:text-instagram',
  },
  {
    icon: faGithub,
    href: 'https://github.com/kochie',
    name: 'kochie',
    color: 'hover:text-github',
  },
  {
    icon: faMastodon,
    href: 'https://melb.social/@kochie',
    name: 'kochie',
    color: 'hover:text-mastodon',
  },
]

export default function Connections(): ReactElement {
  return (
    <div className="text-cream/65 flex xl:flex-row flex-row flex-wrap items-center justify-center gap-x-4 gap-y-3">
      {connections.map((connection) => {
        const iconDefinition = connection.icon
        return (
          <div
            className="w-7 transform-gpu transition duration-200 ease-in-out hover:scale-110"
            key={connection.href}
          >
            <a
              href={connection.href}
              className={connection.color}
              aria-label={connection.name}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={iconDefinition}
                size="lg"
                className="align-middle"
              />
            </a>
          </div>
        )
      })}
    </div>
  )
}
