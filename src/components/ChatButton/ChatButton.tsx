import React from "react";

import { button } from "./chat-button.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default () => {
  return (
    <div className={button}>
      <FontAwesomeIcon icon="comment" />
    </div>
  );
};
