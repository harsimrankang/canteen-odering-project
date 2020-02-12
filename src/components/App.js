import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";



import Navbar from "./navbar";
import Orders from "./orders";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Orders />

      </div>
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
