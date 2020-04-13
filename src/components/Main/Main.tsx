import React, { ReactElement } from 'react'

import { Footer, Middle } from '..'

import { main } from './main.module.css'

export default function Main(): ReactElement {
  return (
    <div className={main}>
      <Middle />
      <Footer />
    </div>
  )
}
