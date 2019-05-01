import * as React from "react";

import Head from "next/head";

export default class Footer extends React.Component {
  render() {
    const updateTime = new Date().toDateString();
    return (
      <>
        <Head>
          <link rel="stylesheet" href="/static/styles/footer.css" />
        </Head>
        <nav className="footer">
          <ul>
            <li>Robert Koch</li>
            <li>
              <span>
                Updated on <time dateTime={updateTime}>{updateTime}</time>
              </span>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}
