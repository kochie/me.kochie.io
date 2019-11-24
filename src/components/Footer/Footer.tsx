import React, { useRef } from "react";

import { footer, guitar, jello } from "./footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { findIconDefinition } from "@fortawesome/fontawesome-svg-core";

import "animate.css"

export default () => {
  const playSound = () => {
    const g = document.getElementById('guitar') 
    g.classList.add(jello)
    g.addEventListener('animationend', () => {
      g.classList.remove(jello)
    })

    const sound = new Audio("/audio/AcousticPopMelody.mp3")
    sound.play()
  }
  const updateTime = process.env.buildTime;
  return (
    <nav className={footer}>
      <ul>
        <li>
          <FontAwesomeIcon
            style={{paddingRight: '5px'}}
            icon={findIconDefinition({ prefix: "fad", iconName: "copyright" })}
          />
          Robert Koch</li>
        <li id="guitar">
          <FontAwesomeIcon
          onClick={playSound}
          className={guitar}
            icon={findIconDefinition({ prefix: "fad", iconName: "guitar" })}
          />
        </li>
        <li>
          <span>
            Updated on <time dateTime={updateTime}>{updateTime}</time>
          </span>
        </li>
      </ul>
    </nav>
  );
};
