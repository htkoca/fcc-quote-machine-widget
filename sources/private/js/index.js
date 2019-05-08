// libraries
import React from 'react';
import ReactDom from 'react-dom';

// components
import Button from 'react-bootstrap/Button';
import App from "./components/App.jsx";

// css
import "../css/index.scss";

// render app
ReactDom.render(<App /> ,document.getElementById('react-root'));