import React, { ReactElement } from 'react'

import style from './divider.module.css'

export default function Divider(): ReactElement {
  return <hr className={style.divider} />
}
