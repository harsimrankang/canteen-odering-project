import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./navbar";
import Orders from "./orders";
import Home from "./home";
import Menu from "./menu";
function App() {
  return (
    <Router basename="/">
      <div>
        <Navbar />
        <div>
          <Switch>
            <Route path="/menu">
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
}

export default App;
