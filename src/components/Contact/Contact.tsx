import React, { useState } from "react";

import { ContactButton } from "..";

import ContactInfo from "./contact.mdx";
import {
  contactInfo,
  name as nameStyle,
  email as emailStyle
} from "./contact.module.css";

export default () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div>
      <h2>Contact</h2>
      <ContactInfo />
      <div id="map" />
      <form action="https://formspree.io/robert@kochie.io" method="POST">
        <div>
          <div className={contactInfo}>
            <input
              className={nameStyle}
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              className={emailStyle}
              type="text"
              placeholder="Email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="message">
            <textarea
              placeholder="Message"
              name="message"
              rows={4}
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </div>
        </div>
        <ContactButton message={message} name={name} />
      </form>
    </div>
  );
};
