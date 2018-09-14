import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faFileDownload, faFileUpload } from "@fortawesome/free-solid-svg-icons";

import Resume from "./Robert_Koch.pdf";

import './ContactButton.scss'

const emailAddress = "robert@kochie.io";

interface Props {
  name: string,
  email: string,
  message: string
}

export default class ContactButton extends React.Component<Props, {}> {
  render() {
    const {name, message} = this.props
    return (
      <div>
        <a>
          <button type="submit "className="button">
            <FontAwesomeIcon
              icon={faFileUpload}
              size="2x"
              className="icon-center"
            />
            <span>Send Message</span>
          </button>
        </a>
        <a href={encodeURI(`mailto:${emailAddress}?Subject=Hi I'm ${name}&body=${message}`)}>
          <button className="button" type="button">
            <FontAwesomeIcon
              icon={faEnvelope}
              size="2x"
              className="icon-center"
            />
            <span>Email</span>
          </button>
        </a>
        <a href={Resume} download="Robert_Koch.pdf">
          <button className="button" type="button">
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
