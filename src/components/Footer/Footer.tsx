import React from "react";

import { footer } from "./footer.css";

export default () => {
  const updateTime = process.env.buildTime;
  return (
    <nav className={footer}>
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
};
