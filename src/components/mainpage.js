import React, { Component } from "react";
import "./mainpage.css";
class Mainpage extends Component {
  render() {
    return (
      <div class="header">
        <div class="bg"></div>
        <div class="header-contents">
          <div class="main">
            <h2 style={{ fontVariant: "small-caps", marginTop: "175px", fontSize: "50px" }}>EAT.MEET.GREET</h2>
          </div>
        </div>
      </div>
    );
  }
}
export default Mainpage;