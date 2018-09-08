import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ReactGA from 'react-ga';

import App from './App'

ReactGA.initialize('UA-59674915-3');
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(<App />, document.getElementById("app"))