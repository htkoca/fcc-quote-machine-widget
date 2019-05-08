// vendor libraries
import $ from 'jquery'
import Popper from 'popper.js'
import 'bootstrap';
import React from 'react';
import ReactDom from 'react-dom';

// set up window variables
window.jQuery = $;
window.$ = $
window.Popper = Popper

// css
import "../css/variables.scss";
import 'bootstrap/scss/bootstrap.scss';
import "../css/index.scss";

// components
import App from "./components/App.js";

// render app
ReactDom.render(<App /> ,document.getElementById('react-root'));