import React, { ReactElement } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope,
  faFileDownload,
  faFileUpload,
} from '@fortawesome/free-solid-svg-icons'

import style from './contact-button.module.css'

const emailAddress = 'robert@kochie.io'

interface Props {
  name: string
  message: string
}

export default function ContactButton({ name, message }: Props): ReactElement {
  return (
    <div className={style['button-row']}>
      <a>
        <button type="submit" className="button">
          <FontAwesomeIcon
            icon={faFileUpload}
            size="2x"
            className={style['icon-center']}
          />
          <span>Send Message</span>
        </button>
      </a>
      <a
        href={encodeURI(
          `mailto:${emailAddress}?Subject=Hi I'm ${name}&body=${message}`
        )}
      >
        <button className="button" type="button">
          <FontAwesomeIcon
            icon={faEnvelope}
            size="2x"
            className={style['icon-center']}
          />
          <span>Email</span>
        </button>
      </a>
      <a href={'/Robert_Koch.pdf'} download="Robert_Koch">
        <button className="button" type="button">
          <FontAwesomeIcon
            icon={faFileDownload}
            size="2x"
            className={style['icon-center']}
          />
          <span>Download Resume</span>
        </button>
      </a>
    </div>
  )
}
