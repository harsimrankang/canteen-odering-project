import React, { Component } from "react";
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Navbar from "./navbar";
import Orders from "./orders";
import Burgrill from "./Burgrill";
class App extends Component {
  render() {
    return (
      <Router basename='/'>
        <div>
          <Switch>
            <Route exactpath="/Burgrill"><Burgrill /></Route>
          </Switch>
          <Navbar />
          <Orders />
        </div>
      </Router>
    );
  }
}
/*function App() {
  return (
    <Router basename="/">
      <div>
        <Navbar />
        <div>
          <Switch>
            <Route path="/contact">
              <Menu />
            </Route>
            <Route path="/orders">
              <Orders />
            </Route>
            <Route exactpath="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}*/

export default App;
