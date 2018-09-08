import * as React from "react";
import { isMobile } from "react-device-detect";

import Header from "./Header";
import Footer from "./Footer";
import Middle from "./Middle";

import "../styles/Main.scss";

export default class Main extends React.Component<{}, {}> {
  render() {
    return (
      <div className="main">
        {/* {isMobile || (window.innerWidth <= 1920 && window.devicePixelRatio > 2) ? null : <Header />} */}
        <Middle />
        <Footer />
      </div>
    );
  }
}
