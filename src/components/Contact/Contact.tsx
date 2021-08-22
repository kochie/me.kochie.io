import React, { useState, ReactElement } from 'react'

import { ContactButton } from '..'

import ContactInfo from './contact.mdx'
import style from './contact.module.css'

export default function Contact(): ReactElement {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  
  console.log(ContactInfo)

  return (
    <div>
      <h2>Contact</h2>
      {/* <ContactInfo /> */}
      <div id="map" />
      <form action="https://formspree.io/robert@kochie.io" method="POST">
        <div>
          <div className={style['contact-info']}>
            <input
              className={style.name}
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e): void => setName(e.target.value)}
            />
            <input
              className={style.email}
              type="text"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e): void => setEmail(e.target.value)}
            />
          </div>
          <div className="message">
            <textarea
              placeholder="Message"
              name="message"
              rows={4}
              value={message}
              onChange={(e): void => setMessage(e.target.value)}
            />
          </div>
        </div>
        <ContactButton message={message} name={name} />
      </form>
    </div>
  )
}
