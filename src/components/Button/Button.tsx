import React, { ReactElement } from 'react'

import { button } from './button.module.css'

interface Props {
  children: ReactElement
}

export default function Button({ children }: Props): ReactElement {
  return <div className={button}>{children}</div>
}
