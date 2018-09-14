import * as React from "react";

import { Connections } from "..";

import "./Sidebar.scss";
import avatar from "./images/me.jpg";
import background from "./images/background-2.jpg"

export default class Sidebar extends React.Component {
  canvas: React.RefObject<HTMLCanvasElement>
  image: HTMLImageElement
  constructor(props) {
    super(props)
    this.canvas = React.createRef()
    this.parallax = this.parallax.bind(this)
    this.vsyncParallax = this.vsyncParallax.bind(this)
    this.image = new Image()
    this.image.src = background
    window.addEventListener("scroll", this.vsyncParallax);
    window.addEventListener("resize", this.vsyncParallax);
    // window.requestAnimationFrame(this.parallax)
  }

  componentDidMount() {
    // console.log("HEllo")
    this.image.onload = () => {
      this.parallax()
    }
  }

  componentWillUnmount() {
    // window.removeEventListener("scroll", this.parallax);
    // window.removeEventListener("resize", this.parallax);
  }

  vsyncParallax() {
    window.requestAnimationFrame(this.parallax)
  }
  
  parallax() {
    // console.log("HEllo")
    // const jumboHeight = this.jumbotronDiv.current.offsetHeight;
    // const imageHeight = 1080 // this.backgroundDiv.current.offsetHeight;
    // console.log(jumboHeight, imageHeight, document.body.scrollTop)
    // const m = (jumboHeight-imageHeight)/((window.innerHeight+jumboHeight));
    // const parallaxAmount = (this.containerDiv.current.getBoundingClientRect().top-window.innerHeight)*m;
    // console.log(parallaxAmount)
    // this.backgroundDiv.current.style.transform = `translate3d(0, ${-parallaxAmount}px, 0)`;
    // this.backgroundDiv.current.style.top = `${-parallaxAmount}px`;
    const blurSize = 2*window.devicePixelRatio;
    // let scale = 2/window.devicePixelRatio
    
    const imgHeight = this.image.naturalHeight;
    const imgWidth = this.image.naturalWidth;
    
    const innerHeight = document.documentElement.clientHeight;
    const innerWidth = this.canvas.current.clientWidth;
    
    const docHeight = document.body.scrollHeight;

    let scale = (imgHeight)/(innerHeight*1.1*window.devicePixelRatio)

    // if (imgHeight <= innerHeight) {
    //   scale = 1/scale
    // }
    
    const m = (imgHeight - innerHeight*scale)/(docHeight - innerHeight)
    const sy = m*Math.min(Math.max(window.scrollY,0), docHeight - innerHeight)
    const ctx = this.canvas.current.getContext('2d')
    ctx.restore()
    ctx.save()
    this.canvas.current.height = this.canvas.current.clientHeight
    this.canvas.current.width = this.canvas.current.clientWidth
    // console.log()
    ctx.fillRect(0, 0, innerWidth, innerHeight);
    ctx.filter = `blur(${blurSize}px)`;
    ctx.globalAlpha = 0.7;
    ctx.drawImage(
      this.image, 
      Math.round((imgWidth-innerWidth*scale)*0.5), 
      Math.round(sy), 
      Math.round(scale*innerWidth), 
      Math.round(scale*innerHeight), 
      -blurSize, 
      -blurSize, 
      Math.round(innerWidth)+blurSize*2, 
      Math.round(innerHeight)+blurSize*2
    )
  }

  render() {
    const quote =
      "I build things, write the code for them, and run from the resulting explosion.";
    return (
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="avatar">
            <img src={avatar} />
          </div>
          <div className="quote">{quote}</div>
          <Connections />
        </div>
        <canvas className="canvas" ref={this.canvas}/>
        <div className="bg-image" />
      </div>
    );
  }
}