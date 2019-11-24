import React from "react";

import { Portfolio, RecentArticles, Divider, BuyMeACoffee, Button } from "..";

import Hello from "./intro.mdx";
import { middle, content } from "./middle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconLookup,
  findIconDefinition
} from "@fortawesome/fontawesome-svg-core";
// import { faFileUser } from "@fortawesome/pro-duotone-svg-icons"
// import ChatButton from "../ChatButton/ChatButton";

export default () => {
  const fileUser: IconLookup = { prefix: "fad", iconName: "file-user" };

  return (
    <div className={middle}>
      <div className={content}>
        <Hello />
      </div>
      <BuyMeACoffee username="kochie" />
      <Button>
        <>
          <FontAwesomeIcon
            size="1x"
            style={{ "--fa-primary-color": "red" } as any}
            icon={findIconDefinition(fileUser)}
          />
          <span>Download Resume</span>
        </>
      </Button>
      <Divider />
      <div className={content}>
        <Portfolio />
      </div>
      <Divider />
      <div className={content}>
        <RecentArticles />
      </div>
      {/* <ChatButton /> */}
      {/* <hr /> */}
      {/* <Contact /> */}
    </div>
  );
};
