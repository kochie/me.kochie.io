import React, { ReactElement } from 'react'

import { Footer, Middle } from '..'

import style from './main.module.css'

export default function Main(): ReactElement {
  return (
    <div className={style.main}>
      <Middle />
      <Footer />
    </div>
  )
}
