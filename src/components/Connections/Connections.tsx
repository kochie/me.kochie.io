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
  /** Screen-reader label, e.g. "Robert Koch on LinkedIn". */
  label: string
  /** Tailwind hover-color utility (matches a `--color-{x}` token). */
  color: string
}

const connections: Connection[] = [
  {
    icon: faBluesky,
    href: 'https://bsky.app/profile/kochie.bsky.social',
    label: 'Robert Koch on Bluesky',
    color: 'hover:text-bluesky',
  },
  {
    icon: faLinkedin,
    href: 'https://linkedin.com/in/rkkochie',
    label: 'Robert Koch on LinkedIn',
    color: 'hover:text-linkedin',
  },
  {
    icon: faXTwitter,
    href: 'https://x.com/kochie',
    label: 'Robert Koch on X',
    color: 'hover:text-x',
  },
  {
    icon: faThreads,
    href: 'https://www.threads.net/@rkkochie',
    label: 'Robert Koch on Threads',
    color: 'hover:text-threads',
  },
  {
    icon: faInstagram,
    href: 'https://instagram.com/rkkochie',
    label: 'Robert Koch on Instagram',
    color: 'hover:text-instagram',
  },
  {
    icon: faGithub,
    href: 'https://github.com/kochie',
    label: 'Robert Koch on GitHub',
    color: 'hover:text-github',
  },
  {
    icon: faMastodon,
    href: 'https://melb.social/@kochie',
    label: 'Robert Koch on Mastodon',
    color: 'hover:text-mastodon',
  },
]

export default function Connections(): ReactElement {
  return (
    <div className="text-cream/75 flex flex-row flex-wrap items-center justify-center gap-x-4 gap-y-3">
      {connections.map((connection) => {
        const iconDefinition = connection.icon
        return (
          <div
            className="w-8 transform-gpu transition duration-200 ease-in-out hover:scale-110"
            key={connection.href}
          >
            <a
              href={connection.href}
              className={connection.color}
              aria-label={connection.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={iconDefinition}
                size="xl"
                className="align-middle"
              />
            </a>
          </div>
        )
      })}
    </div>
  )
}
