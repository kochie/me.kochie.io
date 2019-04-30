import * as React from "react";

import { Portfolio, RecentArticles, Contact, BuyMeACoffee } from "..";

import "./Middle.css";
import Hello from "./intro.mdx";

export default class Middle extends React.Component {
  render() {
    return (
      <div className="middle">
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
  }
}
