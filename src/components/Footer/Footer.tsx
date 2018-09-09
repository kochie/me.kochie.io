import * as React from "react";

import "./Footer.scss";

export default class Footer extends React.Component {
  render() {
    const updateTime = new Date().toDateString()
    return (
      <div className="footer">
        <span>Updated on <time dateTime={updateTime}>{updateTime}</time></span>
      </div>
    );
  }
}
