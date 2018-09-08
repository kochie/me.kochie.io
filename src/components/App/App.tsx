import * as React from "react";

import { Sidebar, Main } from "..";

import "./styles/App.scss";

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Sidebar />
        <Main />
      </div>
    );
  }
}
