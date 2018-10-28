import * as React from "react";
// import mapboxgl from 'mapbox-gl';

import { ContactButton } from "..";

import "./Contact.scss";

// import contact from "./contact.md";

interface State {
  name: string;
  email: string;
  message: string;
}

export default class Contact extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      message: ""
    };
  }
  // componentDidMount() {
  //   mapboxgl.accessToken = 'pk.eyJ1Ijoia29jaGllIiwiYSI6ImNpcDEyOGQwNTAyaXN0d204M2NtczFjNG0ifQ.Lury99L3kpSfR_HHrZ_ooA';
  //   const map = new mapboxgl.Map({
  //     container: 'map',
  //     style: 'mapbox://styles/mapbox/streets-v10'
  //   });
  // }

  email(event) {
    this.setState({ email: event.target.value });
  }

  name(event) {
    this.setState({ name: event.target.value });
  }

  message(event) {
    this.setState({ message: event.target.value });
  }

  render() {
    return (
      <div>
        <h2>Contact</h2>
        {/* <div dangerouslySetInnerHTML={{ __html: contact }} /> */}
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
    );
  }
}
