import React, { Component } from "react";
import {
  HashRouter as Router,
  withRouter
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { withFirebase } from "./Firebase";
import Navigation from "./Navigation";
class Navbar extends Component {
  render() {
    return (
      <div
        className="container-fluid bg-dark text-light"
        style={{ width: "100%" }} >
        <div className="row">
          <Router basename="/">
            <div>
              <Navbar user={this.state.user} username={this.state.username} />
              if(this.props.location=="/Mainpage")
            <div className="col-3">Mainpage</div>

              <Route path="/Orders">

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


        {/*<Navigation />*/}
        {/* <Navigation user={this.props.user} username={this.props.username} />*/}

      </div>
      </div >
    );
  }
}

export default withRouter(Navbar);
