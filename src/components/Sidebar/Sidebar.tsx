import * as React from "react";
import Head from "next/head";

import { Connections } from "..";

const avatar = "/static/images/me.jpeg";
const background = "/static/images/background-2.jpeg";

export default class Sidebar extends React.Component {
  canvas: React.RefObject<HTMLCanvasElement>;
  image?: HTMLImageElement;
  imageY: number;
  constructor(props: Readonly<{}>) {
    super(props);
    this.canvas = React.createRef();
    this.parallax = this.parallax.bind(this);
    this.vsyncParallax = this.vsyncParallax.bind(this);
    this.imageY = 0;
  }

  componentDidMount() {
    this.image = new Image();
    this.image.src = background;
    window.requestAnimationFrame(this.parallax);
    this.image.onload = () => {
      this.parallax();
    };
  }

  componentWillUnmount() {
    // window.removeEventListener("scroll", this.parallax);
    // window.removeEventListener("resize", this.parallax);
  }

  vsyncParallax() {
    window.requestAnimationFrame(this.parallax);
  }

  parallax() {
    if (this.image === undefined) return;
    if (this.canvas.current === null) return;
    const ctx = this.canvas.current.getContext("2d");
    if (ctx === null) return;
    const blurSize = 2 * window.devicePixelRatio;

    const imgHeight = this.image.naturalHeight;
    const imgWidth = this.image.naturalWidth;

    const innerHeight = document.documentElement.clientHeight;
    const innerWidth = this.canvas.current.clientWidth;

    const docHeight = document.body.scrollHeight;

    let scale = imgHeight / (innerHeight * 1.1 * window.devicePixelRatio);

    const m = (imgHeight - innerHeight * scale) / (docHeight - innerHeight);
    const displacement = window.scrollY - this.imageY;
    this.imageY += displacement * 0.01;
    const sy = m * Math.min(Math.max(this.imageY, 0), docHeight - innerHeight);
    ctx.restore();
    ctx.save();
    this.canvas.current.height = this.canvas.current.clientHeight;
    this.canvas.current.width = this.canvas.current.clientWidth;
    ctx.fillRect(0, 0, innerWidth, innerHeight);
    ctx.filter = `blur(${blurSize}px)`;
    ctx.globalAlpha = 0.7;
    ctx.drawImage(
      this.image,
      Math.round((imgWidth - innerWidth * scale) * 0.5),
      Math.round(sy),
      Math.round(scale * innerWidth),
      Math.round(scale * innerHeight),
      -blurSize,
      -blurSize,
      Math.round(innerWidth) + blurSize * 2,
      Math.round(innerHeight) + blurSize * 2
    );
    window.requestAnimationFrame(this.parallax);
  }

  render() {
    const quote =
      "I build things, write the code for them, and run from the resulting explosion.";
    return (
      <>
        <Head>
          <link rel="stylesheet" href="/static/styles/sidebar.css" />
        </Head>
        <div className="sidebar">
          <div className="sidebar-header">
            <div className="avatar">
              <img src={avatar} />
            </div>
            <div className="quote">{quote}</div>
            <Connections />
          </div>
          <canvas className="canvas" ref={this.canvas} />
          <div className="bg-image" />
        </div>
      </>
    );
  }
}
