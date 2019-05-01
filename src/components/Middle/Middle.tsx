import * as React from "react";

import { Portfolio, RecentArticles, Contact, BuyMeACoffee } from "..";

import Hello from "./intro.mdx";
import Head from "next/head";

export default class Middle extends React.Component {
  render() {
    return (
      <>
        <Head>
          <link rel="stylesheet" href="/static/styles/middle.css" />
        </Head>
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
      </>
    );
  }
}
