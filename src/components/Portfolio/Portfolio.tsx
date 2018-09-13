import * as React from "react";

import "./Portfolio.scss";

import Space from "./images/space.png";

const projects = [
  {
    image: Space,
    title: "Space",
    description: "A small webapp that follows the mouse.",
    link: "https://kochie.space"
  },
  {
    image: Space,
    title: "Space",
    description: "A small webapp that follows the mouse.",
    link: "https://kochie.space"
  },
  {
    image: Space,
    title: "Space",
    description: "A small webapp that follows the mouse.",
    link: "https://kochie.space"
  }
];

export default class Portfolio extends React.Component {
  render() {
    return (
      <div>
        <h2>Recent Work</h2>
        <div className="portfolio">
          {projects.map(project => (
            <div className="portfolio-item">
              <figure className="portfolio-image-wrapper">
                <a href={project.link}>
                  <img src={project.image} className="portfolio-image" />
                  {/* <span className="portfolio-text">View</span> */}
                </a>
              </figure>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
