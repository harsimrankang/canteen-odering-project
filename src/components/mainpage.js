import React, { Component } from "react";
import "./mainpage.css";
class Mainpage extends Component {
  render() {
    return (
      <div class="header">
        <div class="bg">
          <div class="header-contents">
            <div class="main">
              <h2 style={{ fontVariant: "small-caps", top: "50%", fontSize: "50px" }}>EAT.MEET.GREET</h2>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-6 col-xl-6">

            <div
              className="menutitlecard card bg-secondary m-1 embed-responsive embed-responsive-16by9"
              style={{ overflow: "hidden" }}
            >
              <div class="card-body">
                <div> <h5 class="card-title d-inline-flex" >LA PINOZ</h5></div>
                <p class="card-text">All the taste and toppings you want on a pizza, straight from our oven to your door!</p>
                <a href="#" class="btn btn-primary">EXPLORE</a>
              </div>
            </div>
          </div>



          <div className=" col-xs-12 col-md-6 col-xl-6">

            <div
              className="menutitlecard card bg-secondary m-1 embed-responsive embed-responsive-16by9"
              style={{ overflow: "hidden" }}
            >
              <div class="card-body">
                <div> <h5 class="card-title d-inline-flex" >BURGRILL</h5></div>
                <p class="card-text">Liscensed to grill.</p>
                <a href="#" class="btn btn-primary">EXPLORE</a>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-6 col-xl-6">

            <div
              className="menutitlecard card bg-secondary m-1 embed-responsive embed-responsive-16by9"
              style={{ overflow: "hidden" }}
            >
              <div class="card-body">
                <div> <h5 class="card-title d-inline-flex" >TEA Q</h5></div>
                <p class="card-text">Adding Moments of Perfect Sip.</p>
                <a href="#" class="btn btn-primary">EXPLORE</a>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-6 col-xl-6">

            <div
              className="menutitlecard card bg-secondary m-1 embed-responsive embed-responsive-16by9"
              style={{ overflow: "hidden" }}
            >
              <div class="card-body">

                <h5 class="card-title d-inline-flex" >SQUARE ONE</h5>


                <p class="card-text"> It's good mood food.</p>
                <a href="#" class="btn btn-primary">EXPLORE</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Mainpage;