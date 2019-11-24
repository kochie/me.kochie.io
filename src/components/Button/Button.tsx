import React from "react";

import { button } from "./button.module.css";

export default ({ children }) => {
  return <div className={button}>{children}</div>;
};
