import * as React from "react";

import "./Portfolio.scss";

import Space from "./images/space.png";
import Particlez from "./images/particlez.png";
import Guardian from "./images/guardian.png"
import Tensorflow from "./images/tensorflow.jpeg"
import Juice from "./images/juice.png"
import Keyboard from "./images/keyboard.png"
import { createHash } from "crypto";

const projects = [
  {
    image: Space,
    title: "Space",
    description: "A small webapp that follows the mouse.",
    link: "https://kochie.space"
  },
  {
    image: Particlez,
    title: "Particlez",
    description: "A real time n-body particle simulator for the web.",
    link: "https://3body.now.sh"
  },
  {
    image: Guardian,
    title: "Guardian",
    description: "An experiment in transferring cyptographic keys between devices without the user needing to copy keys themselves.",
    link: "https://github.com/kochie/guardian-server"
  },
  {
    image: Tensorflow,
    title: "Optimising Neural Networks for Embedded Systems",
    description: "My final year project - focusing on modifying the activation layers of convolutional neural networks to work better on embedded devices.",
    link: "https://bitbucket.org/kochie/fyp"
  },
  {
    image: Juice,
    title: "Juice",
    description: "A Json-Web-Token analyser.",
    link: "https://github.com/kochie/juice"
  },
  {
    image: Keyboard,
    title: "McGurrin",
    description: "A tool to help with learning to touch type.",
    link: "https://github.com/kochie/mcgurrin"
  }
];

export default class Portfolio extends React.Component {
  render() {
    return (
      <div>
        <h2>Recent Work</h2>
        <div className="portfolio">
          {projects.map(project => (
            <div className="portfolio-item" key={createHash('md5').update(project.link).digest("base64")}>
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
