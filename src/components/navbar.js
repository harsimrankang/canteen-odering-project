import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navbar extends Component {
  render() {
    return (
      <div
        className="container-fluid bg-dark text-light"
        style={{ width: "100%" }}
      >
        <div className="row">
          <div className="col-4">LA PINOZ MENU</div>
          <Link to="Burgrill">Burgrill</Link>
        </div>
      </div>
    );
  }
}

export default Navbar;
