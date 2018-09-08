import * as React from "react";

import Sidebar from "./components/Sidebar";

import Main from "./components/Main";

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
