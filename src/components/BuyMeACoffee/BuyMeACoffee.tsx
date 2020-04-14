import React, { ReactElement } from 'react'

import styles from './buy-me-a-coffee.module.css'

interface Props {
  username: string
}

const coffee = 'https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg'

export default function BuyMeACoffee({ username }: Props): ReactElement {
  return (
    <div className={styles['bmc-button-container']}>
      <a
        className={styles['bmc-button']}
        target="_blank"
        rel="noopener noreferrer"
        href={`https://www.buymeacoffee.com/${username}`}
      >
        <img src={coffee} alt="Buy me a coffee" />
        <span className={styles['bmc-span']}>Buy me a coffee</span>
      </a>
    </div>
  )
}
