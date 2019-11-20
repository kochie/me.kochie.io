import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faFileDownload,
  faFileUpload
} from "@fortawesome/free-solid-svg-icons";

import { buttonRow, iconCenter } from "./contact-button.css";

const emailAddress = "robert@kochie.io";

interface Props {
  name: string;
  message: string;
}

export default ({ name, message }: Props) => (
  <div className={buttonRow}>
    <a>
      <button type="submit" className="button">
        <FontAwesomeIcon icon={faFileUpload} size="2x" className={iconCenter} />
        <span>Send Message</span>
      </button>
    </a>
    <a
      href={encodeURI(
        `mailto:${emailAddress}?Subject=Hi I'm ${name}&body=${message}`
      )}
    >
      <button className="button" type="button">
        <FontAwesomeIcon icon={faEnvelope} size="2x" className={iconCenter} />
        <span>Email</span>
      </button>
    </a>
    <a href={"/Robert_Koch.pdf"} download="Robert_Koch">
      <button className="button" type="button">
        <FontAwesomeIcon
          icon={faFileDownload}
          size="2x"
          className={iconCenter}
        />
        <span>Download Resume</span>
      </button>
    </a>
  </div>
);
