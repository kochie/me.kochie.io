import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconLookup, IconName } from "@fortawesome/free-brands-svg-icons";
import { findIconDefinition } from "@fortawesome/fontawesome-svg-core";

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

interface Connection {
  icon: IconName;
  href: string;
  name: string;
  color: string;
}

const connections: Connection[] = [
  {
    icon: "linkedin",
    href: "https://linkedin.com/in/rkkochie",
    name: "rkkochie",
    color: linkedin
  },
  {
    icon: "twitter",
    href: "https://twitter.com/kochie",
    name: "kochie",
    color: twitter
  },
  {
    icon: "instagram",
    href: "https://instagram.com/rkkochie",
    name: "rkkochie",
    color: instagram
  },
  {
    icon: "github",
    href: "https://github.com/kochie",
    name: "kochie",
    color: github
  },
  {
    icon: "medium-m",
    href: "https://medium.com/@kochie",
    name: "kochie",
    color: medium
  },
  {
    icon: "gitlab",
    href: "https://gitlab.com/kochie",
    name: "kochie",
    color: gitlab
  },
  {
    icon: "mastodon",
    href: "https://melb.social/@kochie",
    name: "kochie",
    color: mastodon
  }
];

export default () => (
  <div className={connectionContainer}>
    {connections.map(connection => {
      const lookup: IconLookup = { prefix: "fab", iconName: connection.icon };
      const iconDefinition = findIconDefinition(lookup);
      return (
        <div className={grow} key={connection.color}>
          <a href={connection.href} className={`${connection.color}`}>
            <FontAwesomeIcon
              icon={iconDefinition}
              size="2x"
              // listItem
              // fixedWidth
              className={verticalMiddle}
            />
          </a>
        </div>
      );
    })}
  </div>
);
