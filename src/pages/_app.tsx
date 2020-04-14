import React, { ReactElement } from 'react'
import App from 'next/app'

import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas, faComment } from '@fortawesome/free-solid-svg-icons'

import { library, config } from '@fortawesome/fontawesome-svg-core'
import { fad } from '@fortawesome/pro-duotone-svg-icons'

import '@fortawesome/fontawesome-svg-core/styles.css'

import '../assets/styles/global.css'

config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

library.add(fab, fas, fad, faComment)

class MyApp extends App {
  render(): ReactElement {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }
}

export default MyApp
