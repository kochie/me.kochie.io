import React, { ReactElement } from 'react'
// import ReactGA from "react-ga";

import style from './app.module.css'
import { Sidebar, Main } from '..'

export default function App(): ReactElement {
  // useEffect(() => {
  //   ReactGA.initialize("UA-59674915-3");
  //   ReactGA.pageview(window.location.pathname + window.location.search);
  // }, []);

  return (
    <div className={style.app}>
      <div className={style.container}>
        <Sidebar />
        <Main />
      </div>
    </div>
  )
}
