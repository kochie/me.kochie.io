import React from "react";

import {
  bmcButtonContainer,
  bmcButton,
  bmcSpan
} from "./buy-me-a-coffee.module.css";

interface Props {
  username: String;
}

const coffee = "https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg";

export default ({ username }: Props) => (
  <div className={bmcButtonContainer}>
    <a
      className={bmcButton}
      target="_blank"
      rel="noopener"
      href={`https://www.buymeacoffee.com/${username}`}
    >
      <img src={coffee} alt="Buy me a coffee" />
      <span className={bmcSpan}>Buy me a coffee</span>
    </a>
  </div>
);
