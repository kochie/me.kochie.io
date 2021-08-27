import React, { ReactElement } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  findIconDefinition,
  IconLookup,
  IconName,
} from '@fortawesome/fontawesome-svg-core'

interface Connection {
  icon: IconName
  href: string
  name: string
  color: string
}

const connections: Connection[] = [
  {
    icon: 'linkedin',
    href: 'https://linkedin.com/in/rkkochie',
    name: 'rkkochie',
    color: 'hover:text-linkedin',
  },
  {
    icon: 'twitter',
    href: 'https://twitter.com/kochie',
    name: 'kochie',
    color: 'hover:text-twitter',
  },
  {
    icon: 'instagram',
    href: 'https://instagram.com/rkkochie',
    name: 'rkkochie',
    color: 'hover:text-instagram',
  },
  {
    icon: 'github',
    href: 'https://github.com/kochie',
    name: 'kochie',
    color: 'hover:text-github',
  },
  {
    icon: 'medium-m',
    href: 'https://medium.com/@kochie',
    name: 'kochie',
    color: 'hover:text-medium',
  },
  {
    icon: 'gitlab',
    href: 'https://gitlab.com/kochie',
    name: 'kochie',
    color: 'hover:text-gitlab',
  },
  {
    icon: 'mastodon',
    href: 'https://melb.social/@kochie',
    name: 'kochie',
    color: 'hover:text-mastodon',
  },
]

export default function Connections(): ReactElement {
  return (
    <div className="text-wheat pt-12 flex xl:flex-col flex-row items-center gap-3">
      {connections.map((connection) => {
        const lookup: IconLookup = {
          prefix: 'fab',
          iconName: connection.icon,
        }
        const iconDefinition = findIconDefinition(lookup)
        return (
          <div
            className="w-9 transform-gpu transition duration-200 ease-in-out hover:scale-110"
            key={connection.icon}
          >
            <a
              href={connection.href}
              className={connection.color}
              aria-label={connection.icon}
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
