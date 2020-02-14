import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withFirebase } from "./Firebase";
import Navigation from "./Navigation";
class Navbar extends Component {
  render() {
    return (
      <div
        className="container-fluid bg-dark text-light"
        style={{ width: "100%" }}
      >
        <div className="row">
          <div className="col-3">LA PINOZ MENU</div>
          <div className="col-6">
            <Link to="Burgrill">Burgrill</Link>
          </div>


          {/*<Navigation />*/}

          <div className="col-1">
            <Link to="Login">SignIn</Link>
          </div>
          <div className="col-1">
            <Link to="SignUp">SignUp</Link>
          </div>

        </div>
      </div>
    );
  }
}

export default withFirebase(Navbar);
