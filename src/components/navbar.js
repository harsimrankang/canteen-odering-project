import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navbar extends Component {
  render() {
    return (
      <div style={{ backgroundColor: "white", width: "100%" }}>
        <Link to="/">home </Link>
        <Link to="/orders">orders </Link>
        <Link to="/menu">menu </Link>
      </div>
    );
  }
}

export default Navbar;
