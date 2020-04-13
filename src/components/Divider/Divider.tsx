import React, { ReactElement } from 'react'

import { divider } from './divider.module.css'

export default function Divider(): ReactElement {
  return <hr className={divider} />
}
