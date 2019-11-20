import React, { useEffect } from "react";
import ReactGA from "react-ga";

import { app, container } from "./app.css";
import { Sidebar, Main } from "..";

export default () => {
  useEffect(() => {
    ReactGA.initialize("UA-59674915-3");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <div className={app}>
      <Sidebar />
      <div className={container}>
        <Main />
      </div>
    </div>
  );
};
