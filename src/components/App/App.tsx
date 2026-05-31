import React, { ReactElement } from 'react'

import Sidebar from '@/components/Sidebar/Sidebar'
import Main from '@/components/Main/Main'
import MobileTopBar from '@/components/MobileTopBar/MobileTopBar'

export default function App(): ReactElement {
  return (
    <>
      <MobileTopBar />
      <div className="flex flex-col xl:flex-row">
        <Sidebar />
        <Main />
      </div>
    </>
  )
}
