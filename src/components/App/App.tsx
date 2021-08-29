import React, { ReactElement } from 'react'

import Sidebar from '@/components/Sidebar/Sidebar'
import Main from '@/components/Main/Main'

export default function App(): ReactElement {
  return (
    <div className="flex flex-col xl:flex-row">
      <Sidebar />
      <Main />
    </div>
  )
}
