import React, { ReactElement } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconLookup, IconName } from '@fortawesome/fontawesome-common-types'
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core'

import style from './connections.module.css'

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
    color: style.linkedin,
  },
  {
    icon: 'twitter',
    href: 'https://twitter.com/kochie',
    name: 'kochie',
    color: style.twitter,
  },
  {
    icon: 'instagram',
    href: 'https://instagram.com/rkkochie',
    name: 'rkkochie',
    color: style.instagram,
  },
  {
    icon: 'github',
    href: 'https://github.com/kochie',
    name: 'kochie',
    color: style.github,
  },
  {
    icon: 'medium-m',
    href: 'https://medium.com/@kochie',
    name: 'kochie',
    color: style.medium,
  },
  {
    icon: 'gitlab',
    href: 'https://gitlab.com/kochie',
    name: 'kochie',
    color: style.gitlab,
  },
  {
    icon: 'mastodon',
    href: 'https://melb.social/@kochie',
    name: 'kochie',
    color: style.mastodon,
  },
]

export default function Connections(): ReactElement {
  return (
    <div className={style.connections}>
      {connections.map((connection) => {
        const lookup: IconLookup = {
          prefix: 'fab',
          iconName: connection.icon,
        }
        const iconDefinition = findIconDefinition(lookup)
        return (
          <div className={style.grow} key={connection.color}>
            <a
              href={connection.href}
              className={`${connection.color}`}
              aria-label={connection.icon}
            >
              <FontAwesomeIcon
                icon={iconDefinition}
                size="2x"
                // listItem
                // fixedWidth
                className={style['vertical-middle']}
              />
            </a>
          </div>
        )
      })}
    </div>
  )
}
