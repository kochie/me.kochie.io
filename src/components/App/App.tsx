import React, { ReactElement } from 'react'
// import ReactGA from "react-ga";

import { app, container } from './app.module.css'
import { Sidebar, Main } from '..'

export default function App(): ReactElement {
  // useEffect(() => {
  //   ReactGA.initialize("UA-59674915-3");
  //   ReactGA.pageview(window.location.pathname + window.location.search);
  // }, []);

  return (
    <div className={app}>
      <div className={container}>
        <Sidebar />
        <Main />
      </div>
    </div>
  )
}
