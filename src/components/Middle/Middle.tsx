import React from "react";

import { Portfolio, RecentArticles, Contact, BuyMeACoffee } from "..";

import Hello from "./intro.mdx";
import { middle } from "./middle.css";

export default () => (
  <div className={middle}>
    <Hello />
    <BuyMeACoffee username="kochie" />
    <hr />
    <Portfolio />
    <hr />
    <RecentArticles />
    <hr />
    <Contact />
  </div>
);
