import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faFileDownload } from "@fortawesome/free-solid-svg-icons";

import Resume from "./Robert_Koch.pdf";

import './ContactButton.scss'

const email = "mailto:robert@kochie.io?Subject=Hello";

export default class ContactButton extends React.Component {
  render() {
    return (
      <div className="email-resume">
        <a href={email}>
          <button>
            <FontAwesomeIcon
              icon={faEnvelope}
              size="2x"
              className="icon-center"
            />
            <span>Email</span>
          </button>
        </a>
        <a href={Resume} download="Robert_Koch.pdf">
          <button>
            <FontAwesomeIcon
              icon={faFileDownload}
              size="2x"
              className="icon-center"
            />
            <span>Download Resume</span>
          </button>
        </a>
      </div>
    );
  }
}
