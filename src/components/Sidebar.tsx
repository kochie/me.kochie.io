import * as React from "react";

import Connections from './Connections'

import "../styles/Sidebar.scss";
import avatar from "../images/me.jpg";

export default class Sidebar extends React.Component {
  render() {
    const quote = "I build things, write the code for them, and run from the resulting explosion."
    return (
      <div className="sidebar">
        <div className="image">
          <div className="blur" />
        </div>
        <div className="sidebar-header">
          <div className="avatar">
            <img src={avatar} />
          </div>
          <div className="quote">{quote}</div>
          <Connections />
        </div>
      </div>
    );
  }
}
