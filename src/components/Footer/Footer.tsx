import * as React from "react";

import "./Footer.css";

export default class Footer extends React.Component {
  render() {
    const updateTime = new Date().toDateString();
    return (
      <nav className="footer">
        <ul>
          <li>Robert Koch</li>
          <li>
            <span>
              Updated on <time dateTime={updateTime}>{updateTime}</time>
            </span>
          </li>
        </ul>
      </nav>
    );
  }
}
