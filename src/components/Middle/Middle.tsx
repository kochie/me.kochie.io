import * as React from "react";

import { Portfolio, RecentArticles, Contact, BuyMeACoffee } from "..";

import "./Middle.scss";
import hello from "./intro.md";

export default class Middle extends React.Component {
  render() {
    return (
      <div className="middle">
        <div dangerouslySetInnerHTML={{ __html: hello }} />
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
