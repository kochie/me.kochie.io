import React, { ReactElement } from 'react'

import style from './button.module.css'

interface Props {
  children: ReactElement
}

export default function Button({ children }: Props): ReactElement {
  return <div className={style.button}>{children}</div>
}
