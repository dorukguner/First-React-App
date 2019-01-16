import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ToDoList from './toDoList';
import Scores from "./scores";
import Weather from "./weather";
import "./App.css";

const App = () => (
  <div className="App">
  <Router>
    <div>
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/toDoList" component={ToDoList} />
      <Route path="/scores" compoment={Scores} />
      <Route path="/weather" component={Weather} />
    </div>
  </Router>
  </div>
);

const Home = () => <h2>Home</h2>;
const Topic = ({ match }) => <h3>Requested Param: {match.params.id}</h3>;
const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>

    <ul>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.path}/:id`} component={Topic} />
    <Route
      exact
      path={match.path}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);
const Header = () => (
  <ul id="navbar">
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/toDoList">To Do List</Link>
    </li>
    <li>
      <Link to="/scores">Soccer Scores</Link>
    </li>
    <li>
      <Link to="/weather">Weather</Link>
    </li>
  </ul>
);

export default App;