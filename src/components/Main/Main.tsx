import React, { ReactElement } from 'react'

import Footer from '@/components/Footer/Footer'
import Middle from '@/components/Middle/Middle'

export default function Main(): ReactElement {
  return (
    <div
      id="main"
      className="flex flex-col flex-1 overflow-y-auto lg:overflow-y-scroll lg:h-screen"
    >
      <Middle />
      <Footer />
    </div>
  )
}
