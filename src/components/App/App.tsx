import * as React from "react";

import { Sidebar, Main } from "..";

import "./App.scss";

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Sidebar />  
        <div className="container"> 
          <Main />
        </div>
      </div>
    );
  }
}
