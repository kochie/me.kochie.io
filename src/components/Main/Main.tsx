import * as React from "react";

import { Footer } from "..";
import { Middle } from "..";
import Head from "next/head";

export default class Main extends React.Component<{}, {}> {
  render() {
    return (
      <>
        <Head>
          <link rel="stylesheet" href="/static/styles/main.css" />
        </Head>
        <div className="main">
          <Middle />
          <Footer />
        </div>
      </>
    );
  }
}
