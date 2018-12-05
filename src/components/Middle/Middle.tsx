import * as React from "react";

import { Portfolio, RecentArticles, Contact, BuyMeACoffee } from "..";

import "./Middle.scss";
// import {_, hello} from "./intro.md";

export default class Middle extends React.Component {
  render() {
    return (
      <div className="middle">
        {/* <div dangerouslySetInnerHTML={{ __html: hello }} /> */}
        <div>
          <h1>
            I’m Rob, a university student from Melbourne, Australia. 
          </h1>
          <p>
            I currently study Electrical Engineering, Computer Science, and Mathematics at Monash University where I was the president of the IT society <a href="http://wired.org.au">wired</a> in 2017.
          </p>
          <p>
            I'm also apart of the <a href="https://unihack.net">Unihack</a> team based in Melbourne, we run hackathons for students around Australia. 
          </p>
          <p>
            Apart from that, I love gaming, karate, bike riding, and electronics and try to do at least one of these things every day. I’m always looking for something new and interesting to do, so feel free to browse my portfolio or view my resume if you want to see some of the cool things I’ve done.
          </p>
        </div>
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
