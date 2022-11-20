import React, { ReactElement } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faGithub,
  faGitlab,
  faInstagram,
  faLinkedin,
  faMastodon,
  faMediumM,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'

interface Connection {
  icon: IconDefinition
  href: string
  name: string
  color: string
}

const connections: Connection[] = [
  {
    icon: faLinkedin,
    href: 'https://linkedin.com/in/rkkochie',
    name: 'rkkochie',
    color: 'hover:text-linkedin',
  },
  {
    icon: faTwitter,
    href: 'https://twitter.com/kochie',
    name: 'kochie',
    color: 'hover:text-twitter',
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
    icon: faMediumM,
    href: 'https://medium.com/@kochie',
    name: 'kochie',
    color: 'hover:text-medium',
  },
  {
    icon: faGitlab,
    href: 'https://gitlab.com/kochie',
    name: 'kochie',
    color: 'hover:text-gitlab',
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
    <div className="text-wheat pt-12 flex xl:flex-col flex-row items-center gap-3">
      {connections.map((connection) => {
        const iconDefinition = connection.icon
        return (
          <div
            className="w-9 transform-gpu transition duration-200 ease-in-out hover:scale-110"
            key={connection.name}
          >
            <a
              href={connection.href}
              className={connection.color}
              aria-label={connection.name}
            >
              <FontAwesomeIcon
                icon={iconDefinition}
                size="2x"
                className="align-middle"
              />
            </a>
          </div>
        )
      })}
    </div>
  )
}
