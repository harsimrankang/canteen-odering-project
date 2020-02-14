import React, { Component } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Navbar from "./navbar";
import Orders from "./orders";
import Burgrill from "./Burgrill";
import SignUp from "./SignUp";
import Login from "./Login";
class App extends Component {
  render() {
    return (
      <Router basename='/'>
        <div>
          <Navbar />
          <Switch>
            <Route path="/Burgrill">
              <Burgrill />
            </Route>
            <Route path="/Orders">
              <Orders />
            </Route>
            <Route path="/Login">
              <Login />
            </Route>
            <Route path="/SignUp">
              <SignUp />
            </Route>


          </Switch>


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
