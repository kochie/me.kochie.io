import React, { ReactElement } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  findIconDefinition,
  IconLookup,
} from '@fortawesome/fontawesome-svg-core'

import Button from '@/components/Button/Button'
import Divider from '@/components/Divider/Divider'
import RecentArticles from '@/components/RecentArticles/RecentArticles'
import Portfolio from '@/components/Portfolio/Portfolio'

import Hello from './intro.mdx'
import style from './middle.module.css'

export default function Middle(): ReactElement {
  const fileUser: IconLookup = { prefix: 'fad', iconName: 'file-user' }

  return (
    <div className="py-24 px-24 inline-grid bg-gray-200 dark:bg-gray-800 transform-gpu transition duration-700 prose dark:prose-light max-w-none">
      <div className="">
        <Hello />
      </div>
      <Button>
        <a
          href={'/Robert_Koch.pdf'}
          download="Robert_Koch.pdf"
          style={{
            textDecoration: 'none',
            margin: 'auto',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <FontAwesomeIcon
            size="1x"
            style={{
              ...{
                '--fa-primary-color': 'white',
                '--fa-secondary-color': '#ffdd00',
                '--fa-secondary-opacity': '1',
              },
              strokeWidth: '20px',
              stroke: 'black',
            }}
            icon={findIconDefinition(fileUser)}
          />
          <span
            style={{
              color: 'white',
              margin: '0 10px',
              letterSpacing: '-0.6px',
              fontSize: '25px',
            }}
          >
            Download Resume
          </span>
        </a>
      </Button>
      <div className="">
        <Portfolio />
      </div>
      <div className="">
        <RecentArticles />
      </div>
    </div>
  )
}
