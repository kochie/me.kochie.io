import React, { ReactElement } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  findIconDefinition,
  IconLookup,
} from '@fortawesome/fontawesome-svg-core'

import { Portfolio, RecentArticles, Divider, Button } from '..'

import Hello from './intro.mdx'
import style from './middle.module.css'

// import { faFileUser } from "@fortawesome/pro-duotone-svg-icons"
// import ChatButton from "../ChatButton/ChatButton";

export default function Middle(): ReactElement {
  const fileUser: IconLookup = { prefix: 'fad', iconName: 'file-user' }

  return (
    <div className={style.middle}>
      <div className={style.content}>
        <Hello />
      </div>
      {/* <BuyMeACoffee username="kochie" /> */}
      <Divider />
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
      <Divider />
      <div className={style.content}>
        <Portfolio />
      </div>
      <Divider />
      <div className={style.content}>
        <RecentArticles />
      </div>
      {/* <ChatButton /> */}
      {/* <hr /> */}
      {/* <Contact /> */}
    </div>
  )
}
