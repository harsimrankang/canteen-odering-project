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
          <div className="col-6"></div>

          {/*<Navigation />*/}
          <Navigation user={this.props.user} username={this.props.username} />
        </div>
      </div>
    );
  }
}

export default withFirebase(Navbar);
