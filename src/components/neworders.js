import React, { Component } from "react";
import { Link } from "react-router-dom";

class neworders extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    showVendor: false,
    showmenucategories: false,
    showprice: false,
    menu: [],
    vendors: [],
    menucategories: [],
  };
  componentDidMount() {
    fetch("https://canteen-ordering-3d30c.firebaseio.com/public")
      .then((res) => res.json())
      .then((res) => this.setState({ menu: res }));
  }
  showvendorscard() {
    if (this.state.showVendor)
      return (
        <div className="flex-fill px-2">
          <div class="card ">
            <div class="card-header">Vendors</div>
            <div class="card-body">
              <h5 class="card-title">Special title treatment</h5>
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#" class="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
      );
  }
  showmenucategoriescard() {
    if (this.state.showmenucategories)
      return (
        <div className="flex-fill px-2">
          <div class="card ">
            <div class="card-header">Menu Categories</div>
            <div class="card-body">
              {
                {
                  /*<h5 class="card-title">Special title treatment</h5>
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#" class="btn btn-primary">
                Go somewhere
             </a>*/
                }
              }
              <div className="col">
                {/* dekh object.keys aapa odod use krde jdo aapa object traverse karauna hove poora
                 * jihnu aapa traverse karauna oh keys di input jaugi
                 * ohi loop hi
                 * hun menucategories ch aapa nu kalla menucategories diya items chahidiya
                 *
                 
                ok pr aapa loop hi ta chlani aa ohhh achaaaaaaa hun aapa
                menuItem di jgah koi v variable use kr skde? jess okzzzz thank
                juuuuu :) ikk hor cheej map aapa arrays ch use krde aa eh apna
                object type ya fer dictionary type aa gya ,ethe aapa map nhi use
                kra ge ethe for each use hona okzzzzzz hun agge na dssi 
                 ok
                 mai aape try krdi pehla fr doubt puchu tere to
                bilkul bilkul*/}

                {Object.keys(this.state.menu.menuCategories).forEach(
                  (menuCat) => {
                    return <div></div>;
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      );
  }
  showpricecard() {
    if (this.state.showprice)
      return (
        <div className="flex-fill px-2">
          <div class="card">
            <div class="card-header">Price Range</div>
            <div class="card-body">
              <input placeholder="min" size="5"></input>
              <a> - </a>
              <input placeholder="max" size="5"></input>
            </div>
          </div>
        </div>
      );
  }
  render() {
    return (
      <div>
        <div className="btn-group " style={{ top: "10px" }}>
          <button
            type="button"
            className="btn btn-danger dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Filter By
          </button>
          <div className="dropdown-menu">
            <a
              className="dropdown-item"
              onClick={() =>
                this.setState({ showVendor: !this.state.showVendor })
              }
            >
              Vendors
            </a>
            <div className="dropdown-divider"></div>
            <a
              className="dropdown-item"
              onClick={() =>
                this.setState({
                  showmenucategories: !this.state.showmenucategories,
                })
              }
            >
              Menu Categories
            </a>
            <div className="dropdown-divider"></div>
            <a
              className="dropdown-item"
              onClick={() =>
                this.setState({ showprice: !this.state.showprice })
              }
            >
              Price
            </a>
          </div>
        </div>
        <div className="d-flex pt-3">
          {this.showvendorscard()}
          {this.showmenucategoriescard()}
          {this.showpricecard()}
        </div>
      </div>
    );
  }
}
export default neworders;
//ki?
