import * as React from "react";

import { ContactButton } from "..";

import ContactInfo from "./contact.mdx";
import Head from "next/head";

interface State {
  name: string;
  email: string;
  message: string;
}

export default class Contact extends React.Component<{}, State> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      name: "",
      email: "",
      message: ""
    };
  }

  email(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ email: event.target.value });
  }

  name(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ name: event.target.value });
  }

  message(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ message: event.target.value });
  }

  render() {
    return (
      <>
        <Head>
          <link rel="stylesheet" href="/static/styles/contact.css" />
        </Head>
        <div>
          <h2>Contact</h2>
          <ContactInfo />
          <div id="map" />
          <form action="https://formspree.io/robert@kochie.io" method="POST">
            <div className="form">
              <div className="contact-info">
                <input
                  className="name"
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={e => this.name(e)}
                />
                <input
                  className="email"
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={e => this.email(e)}
                />
              </div>
              <div className="message">
                <textarea
                  placeholder="Message"
                  name="message"
                  rows={4}
                  value={this.state.message}
                  onChange={e => this.message(e)}
                />
              </div>
            </div>
            <ContactButton
              message={this.state.message}
              name={this.state.name}
              email={this.state.email}
            />
          </form>
        </div>
      </>
    );
  }
}
