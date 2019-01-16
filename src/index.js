import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './index.css';
import App from './App';

ReactDOM.render(
  <Router>
    <div id="wrapper">
    <App />
    </div>
  </Router>, document.getElementById('root'));