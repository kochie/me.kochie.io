import React, { ReactElement } from 'react'

import { Footer, Middle } from '..'

import style from './main.module.css'

export default function Main(): ReactElement {
  return (
    <div
      id="main"
      className="flex flex-col flex-1 lg:overflow-y-scroll lg:h-screen"
    >
      <Middle />
      <Footer />
    </div>
  )
}
