import React, { useRef, useEffect } from "react";

import { Connections } from "..";

import {
  sidebar,
  sidebarHeader,
  avatar as avatarStyle,
  quote as quoteStyle,
  canvas as canvasStyle,
  bgImage
} from "./sidebar.css";

const avatar = "/images/me.jpeg";
const background = "/images/background-2.jpeg";

export default () => {
  const canvas = useRef<HTMLCanvasElement>(null);
  let image: HTMLImageElement;
  let imageY = 0;

  useEffect(() => {
    image = new Image();
    image.src = background;
    image.onload = () => {
      window.requestAnimationFrame(parallax);
    };
  }, []);

  const parallax = () => {
    if (!image) return;
    if (canvas.current === null) return;
    const ctx = canvas.current.getContext("2d");
    if (ctx === null) return;
    const blurSize = 2 * window.devicePixelRatio;

    const imgHeight = image.naturalHeight;
    const imgWidth = image.naturalWidth;

    const innerHeight = document.documentElement.clientHeight;
    const innerWidth = canvas.current.clientWidth;
    if (innerWidth === 0) return

    const docHeight = document.body.scrollHeight;

    let scale = imgHeight / (innerHeight * 1.1 * window.devicePixelRatio);

    const m = (imgHeight - innerHeight * scale) / (docHeight - innerHeight);
    const displacement = window.scrollY - imageY;
    imageY += displacement * 0.01;
    const sy = m * Math.min(Math.max(imageY, 0), docHeight - innerHeight);
    ctx.restore();
    ctx.save();
    canvas.current.height = canvas.current.clientHeight;
    canvas.current.width = canvas.current.clientWidth;
    ctx.fillRect(0, 0, innerWidth, innerHeight);
    ctx.filter = `blur(${blurSize}px)`;
    ctx.globalAlpha = 0.7;
    const sx = (imgWidth - innerWidth * scale) * 0.5;
    // if (sy === 0) return;
    ctx.drawImage(
      image,
      Math.round(sx),
      Math.round(sy),
      Math.round(scale * innerWidth),
      Math.round(scale * innerHeight),
      -blurSize,
      -blurSize,
      Math.round(innerWidth) + blurSize * 2,
      Math.round(innerHeight) + blurSize * 2
    );
    window.requestAnimationFrame(parallax);
  };

  const quote =
    "I build things, write the code for them, and run from the resulting explosion.";

  return (
    <div className={sidebar}>
      <div className={sidebarHeader}>
        <div className={avatarStyle}>
          <img src={avatar} />
        </div>
        <div className={quoteStyle}>{quote}</div>
        <Connections />
      </div>
      <canvas className={canvasStyle} ref={canvas} />
      <div className={bgImage} />
    </div>
  );
};
