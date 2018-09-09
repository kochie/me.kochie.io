import * as React from "react";

import { Portfolio, RecentArticles, ContactButton } from "..";

import "./Middle.scss";

export default class Middle extends React.Component {
  render() {
    const hello =
      "I’m Rob, a university student from Melbourne, Australia. I currently study Electrical Engineering, Computer Science, and Mathematics at Monash University where I’m also the president of the IT society wired. Apart from uni, I love gaming, karate, bike riding, and electronics and try to do at least one of these things every day. I’m always looking for something new and interesting to do, so feel free to browse my portfolio or view my resume if you want to see some of the cool things I’ve done.";
    return (
      <div className="middle">
        <h1 className="heading">Hey There</h1>
        <p>{hello}</p>
        <ContactButton />
        <hr />
        <Portfolio />
        <hr />
        <RecentArticles />
      </div>
    );
  }
}
