import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faFileDownload } from "@fortawesome/free-solid-svg-icons"

import Resume from '../Robert_Koch.pdf'
import Portfolio from './Portfolio'

import "../styles/Middle.scss";

const email = "mailto:robert@kochie.io?Subject=Hello"

export default class Middle extends React.Component {
  render() {
    const hello =
      "I’m Rob, a university student from Melbourne, Australia. I currently study Electrical Engineering, Computer Science, and Mathematics at Monash University where I’m also the president of the IT society wired. Apart from uni, I love gaming, karate, bike riding, and electronics and try to do at least one of these things every day. I’m always looking for something new and interesting to do, so feel free to browse my portfolio or view my resume if you want to see some of the cool things I’ve done.";
    return (
      <div className="middle">
        <h1 className="heading">
          Hey There
        </h1>
        <p>{hello}</p>
        <div className="email-resume">
          <a href={email}>
            <button>
              <FontAwesomeIcon icon={faEnvelope} size="2x" className="icon-center"/>
              <span>Email</span>
            </button>
          </a>
          <a href={Resume} download="Robert_Koch.pdf">
            <button>
              <FontAwesomeIcon icon={faFileDownload} size="2x" className="icon-center"/>
              <span>Download Resume</span>
            </button>
          </a>
        </div>
        <hr/>
        <h2>
          Recent Work
        </h2>
        <Portfolio />
      </div>
    )
  }
}
