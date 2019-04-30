import * as React from "react";
import Head from 'next/head';

import ReactGA from "react-ga";

import { Sidebar, Main } from "..";

import "./App.css";

ReactGA.initialize("UA-59674915-3");

export default class App extends React.Component {
  componentDidMount() {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
  
  render() {
    return (
      <div className="app">
        <Head>
          <title>Robert Koch</title>
          
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="UTF-8" />
          <meta name="keywords" content="Robert Koch, Robert, Koch, Portfolio, Student, Melbourne, Australia" />
          <meta name="description" content="Hi, I'm Robert. This is my site, click through to see some of the content I've worked on. I'm an electrical and software engineer, based in Melbourne, Australia." />
          <meta name="author" content="Robert Koch" />
          <meta name="theme-color" content="#333144" />
          <meta name="google-site-verification" content="I6EWS0ziNrDQdDV1TNtuF1fWq9IFHR767zb6YIFu9wk" />
          
          <link rel="icon" sizes="192x192" href="/static/images/favicon.png" />
          <link href='https://api.mapbox.com/mapbox-gl-js/v0.49.0/mapbox-gl.css' rel='stylesheet' />
          <link href="https://fonts.googleapis.com/css?family=Bowlby+One+SC|Bungee|Source+Sans+Pro|Lato&subset=latin,latin-ext" rel="stylesheet" /> 
        </Head>
        <Sidebar />
        <div className="container">
          <Main />
        </div>
      </div>
    );
  }
}
