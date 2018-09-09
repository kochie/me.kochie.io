import * as React from "react";

import { Connections } from "..";

import "./Sidebar.scss";
import avatar from "./images/me.jpg";

export default class Sidebar extends React.Component {
  backgroundDiv: React.RefObject<HTMLDivElement>
  jumbotronDiv: React.RefObject<HTMLDivElement>
  containerDiv: React.RefObject<HTMLDivElement>
  constructor(props) {
    super(props)
    this.backgroundDiv = React.createRef()
    this.containerDiv = React.createRef()
    this.jumbotronDiv = React.createRef()
    this.parallax = this.parallax.bind(this)
  }

  componentDidMount() {
    console.log("HEllo")
    window.addEventListener("scroll", this.parallax);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.parallax);
  }
  
  parallax() {
    console.log("HEllo")
    const jumboHeight = this.jumbotronDiv.current.offsetHeight;
    const imageHeight = this.backgroundDiv.current.offsetHeight;
    const m = (jumboHeight-imageHeight)/((window.innerHeight+jumboHeight));
    const parallaxAmount = (this.containerDiv.current.getBoundingClientRect().top-window.innerHeight)*m;
    console.log(parallaxAmount)
    this.backgroundDiv.current.style.transform = `translate3d(0, ${-parallaxAmount}px, 0)`;
  }

  render() {
    const quote =
      "I build things, write the code for them, and run from the resulting explosion.";
    return (
      <div className="sidebar" ref={this.containerDiv}>
        <div className="image" ref={this.backgroundDiv}>
          <div className="blur" />
        </div>
        <div className="sidebar-header" ref={this.jumbotronDiv}>
          <div className="avatar">
            <img src={avatar} />
          </div>
          <div className="quote">{quote}</div>
          <Connections />
        </div>
      </div>
    );
  }
}
