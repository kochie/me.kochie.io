import * as React from "react";

import './RecentArticles.scss'
import { createHash } from "crypto";

const recentArticles = [
    {
        name: "Why build an app when you can build a phone?",
        image: "https://cdn-images-1.medium.com/max/800/1*ijymAR61qIf690CHOV3Hcw.jpeg",
        link: "https://medium.com/unihack-blog/why-build-an-app-when-you-can-build-a-phone-88b5ce7d0104",
        first: "Over the last 5 years, UNIHACK has been predominantly focused on software and design. It is not well known that some of UNIHACK’s most creative entires have been in the field of hardware."
    }
]

export default class RecentArticles extends React.Component {
    render() {
        return(
            <div>
                <h2>Recent Articles</h2>
                <div className="card">
                    {recentArticles.map(article => (
                        <React.Fragment key={createHash('md5').update(article.name).digest("base64")}> 
                            <div>
                                <a href={article.link}>
                                    <img src={article.image}/>
                                </a>
                            </div>
                            <div>
                                <h3>{article.name}</h3>
                                <p>{article.first.substr(0,150)}... <a href={article.link}>more</a></p>
                            </div>
                        </React.Fragment>
                        ))}
                </div>
            </div>
        )
    }
}