import * as React from "react";

import { Footer } from "..";
import { Middle } from "..";

import "./Main.css";

export default class Main extends React.Component<{}, {}> {
  render() {
    return (
      <div className="main">
        <Middle />
        <Footer />
      </div>
    );
  }
}
