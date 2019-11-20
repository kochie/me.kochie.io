import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faTwitter,
  faInstagram,
  faGithub,
  faMediumM,
  faGitlab,
  faMastodon
} from "@fortawesome/free-brands-svg-icons";

import {
  connections as connectionContainer,
  verticalMiddle,
  grow,
  linkedin,
  twitter,
  instagram,
  github,
  medium,
  gitlab,
  mastodon
} from "./connections.css";

const connections = [
  {
    icon: faLinkedin,
    href: "https://linkedin.com/in/rkkochie",
    name: "rkkochie",
    color: linkedin
  },
  {
    icon: faTwitter,
    href: "https://twitter.com/kochie",
    name: "kochie",
    color: twitter
  },
  {
    icon: faInstagram,
    href: "https://instagram.com/rkkochie",
    name: "rkkochie",
    color: instagram
  },
  {
    icon: faGithub,
    href: "https://github.com/kochie",
    name: "kochie",
    color: github
  },
  {
    icon: faMediumM,
    href: "https://medium.com/@kochie",
    name: "kochie",
    color: medium
  },
  {
    icon: faGitlab,
    href: "https://gitlab.com/kochie",
    name: "kochie",
    color: gitlab
  },
  {
    icon: faMastodon,
    href: "https://melb.social/@kochie",
    name: "kochie",
    color: mastodon
  }
];

export default () => (
  <div className={connectionContainer}>
    {connections.map(connection => (
      <div className={grow} key={connection.color}>
        <a href={connection.href} className={`${connection.color} ${grow}`}>
          <FontAwesomeIcon
            icon={connection.icon}
            size="2x"
            fixedWidth
            className={verticalMiddle}
          />
        </a>
      </div>
    ))}
  </div>
);
