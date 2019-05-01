import * as React from "react";
import Head from "next/head";

const recentArticles = [
  {
    name: "Why build an app when you can build a phone?",
    id: "1",
    image:
      "https://cdn-images-1.medium.com/max/800/1*ijymAR61qIf690CHOV3Hcw.jpeg",
    link:
      "https://medium.com/unihack-blog/why-build-an-app-when-you-can-build-a-phone-88b5ce7d0104",
    first:
      "Over the last 5 years, UNIHACK has been predominantly focused on software and design. It is not well known that some of UNIHACK’s most creative entires have been in the field of hardware."
  }
];

export default class RecentArticles extends React.Component {
  render() {
    return (
      <>
        <Head>
          <link rel="stylesheet" href="/static/styles/recent-articles.css" />
        </Head>
        <div>
          <h2>Recent Articles</h2>
          <div className="card">
            {recentArticles.map(article => (
              <React.Fragment key={article.id}>
                <div>
                  <a href={article.link}>
                    <img src={article.image} />
                  </a>
                </div>
                <div>
                  <h3>{article.name}</h3>
                  <p>
                    {article.first.substr(0, 150)}
                    ... <a href={article.link}>more</a>
                  </p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </>
    );
  }
}
