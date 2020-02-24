import React, { Component } from "react";
import "./mainpage.css";
import { Link } from "react-router-dom";

class CardItems extends Component {
  render() {
    return (
     
      <div className="col-xs-12 col-md-6 col-xl-6">
        
        <div
          className="card bg-secondary m-1 my-2 embed-responsive embed-responsive-16by9"
          style={{ overflow: "hidden" }}
        >
          <Link to={this.props.page} style={{textDecoration:"none",color: "black"}}>
          <div class="card-body">
            <div>
              <h5 class="card-title d-inline-flex">{this.props.title}</h5>
            </div>
            <p class="card-text" style={{ height: "48px" }}>
              {this.props.para}
            </p>
           
          </div>
          </Link>
        </div>
        
      </div>
      
    );
  }
}

class Mainpage extends Component {
  render() {
    return (
      <div class="header">
        <div class="bg">
          <div class="header-contents">
            <div class="main">
              <h2
                style={{
                  fontVariant: "small-caps",
                  top: "50%",
                  fontSize: "50px"
                }}
              >
                EAT.MEET.GREET
              </h2>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
                
            <CardItems
              title="LA PINOZ"
              para="All the taste and toppings you want on a pizza, straight from
                  our oven to your door!" page="orders"
            />
           
            <CardItems title="BURGRILL" para="Liscensed to grill."  />
           
            <CardItems title="TEA Q" para="Adding Moments of Perfect Sip." />
            <CardItems title="SQUARE ONE" para="It's good mood food." />
           
          </div>
        </div>
      </div>
    );
  }
}
export default Mainpage;
