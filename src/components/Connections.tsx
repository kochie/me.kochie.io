import * as React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faTwitter,
  faInstagram,
  faGithub,
  faMediumM,
  faGitlab
} from "@fortawesome/free-brands-svg-icons";

import "../styles/Connections.scss";

const connections = [
  {
    icon: faLinkedin,
    href: "https://linkedin.com/in/rkkochie",
    name: "rkkochie",
    color: "linkedin"
  },
  {
    icon: faTwitter,
    href: "https://twitter.com/rkkochie",
    name: "rkkochie",
    color: "twitter"
  },
  {
    icon: faInstagram,
    href: "https://instagram.com/rkkochie",
    name: "rkkochie",
    color: "instagram"
  },
  {
    icon: faGithub,
    href: "https://github.com/kochie",
    name: "kochie",
    color: "github"
  },
  {
    icon: faMediumM,
    href: "https://medium.com/@kochie",
    name: "kochie",
    color: "medium"
  },
  {
    icon: faGitlab,
    href: "https://gitlab.com/kochie",
    name: "kochie",
    color: "gitlab"
  }
];

export default class Connections extends React.Component {
  render() {
    return (
      <div className="connections">
        {connections.map(connection => (
          <div className="grow">
            <a href={connection.href} className={`${connection.color} grow`}>
              <FontAwesomeIcon
                icon={connection.icon}
                //color={connection.color}
                size="2x"
                fixedWidth
                className="vertical-middle"
              />
              {/* <span>{connection.name}</span> */}
            </a>
          </div>
        ))}
      </div>
    );
  }
}
