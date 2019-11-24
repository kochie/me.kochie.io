import React from "react";

import { Footer } from "..";
import { Middle } from "..";

import { main } from "./main.module.css";

export default () => (
  <div className={main}>
    <Middle />
    <Footer />
  </div>
);
