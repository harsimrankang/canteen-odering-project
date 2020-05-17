import React, { Component } from "react";
import { withFirebase } from "./Firebase";
import VendorImg from "./vendorImg";
import Loading from "./loading";
import AddToCart from "./addtocart"
class UltraMenuPage extends Component {
  state = {
    loaded: false,
    popupVisibility: false,
    popupItem: null,
    items: null,
    selectedVendors: [],
    selectedCategories: [],
    selectedItem: null
  };
  componentDidUpdate() { }

  filter = () => {
    if (this.state.items == null) {
      const vendors =
        this.state.selectedVendors.length == 0
          ? null
          : this.state.selectedVendors;
      const categories =
        this.state.selectedCategories.length == 0
          ? null
          : this.state.selectedCategories;
      //this.setState({ items: null });
      this.props.firebase
        .filterMenu(
          JSON.stringify({
            vendors: vendors,
            categories: categories,
            MinPrice: null,
            MaxPrice: null,
          })
        )
        .then((result) => {
          // Read result of the Cloud Function.
          console.log(result);
          this.setState({ items: result.data });
          // ...
        });
    }
  };

  addToSelectedCategories = (id) => {
    var flag = true;
    for (var i = 0; i < this.state.selectedCategories.length; i++) {
      if (this.state.selectedCategories[i] == id) {
        flag = false;
        break;
      }
    }
    if (flag) {
      var categories = this.state.selectedCategories;
      categories.push(id);
      this.setState({ selectedCategories: categories, items: null });
    }
  };
  removeFromSelectedCategories = (id) => {
    var flag = false;
    var i = 0;
    for (i = 0; i < this.state.selectedCategories.length; i++) {
      if (this.state.selectedCategories[i] == id) {
        flag = true;
        break;
      }
    }
    if (flag) {
      var categories = this.state.selectedCategories;
      categories.splice(i, 1);
      //vendors.push(id);
      this.setState({ selectedCategories: categories, items: null });
    }
  };
  showCategories = () => {
    if (Object.keys(this.props.categories).length == 0) {
      /*
       * If categories have not been loaded
       * Display Loading
       */
      return (
        <div className="card bg-dark text-light shadow">
          <div className="card-body">
            <div className="card-title h5">Select Categories</div>
            <Loading text="loading Categories" />
          </div>
        </div>
      );
    } else
      /*
       * If categories have been loaded
       * Display Categories
       */
      return (
        <div className="card bg-dark text-light shadow">
          <div className="card-body">
            <div className="card-title h5">Select Categories</div>
            <div id="categories" className="container-fluid p-0">
              {Object.keys(this.props.categories).map((key) => {
                let flag = false;
                for (var i = 0; i < this.state.selectedCategories.length; i++) {
                  if (key == this.state.selectedCategories[i]) {
                    flag = true;
                    break;
                  }
                }
                if (flag)
                  return (
                    <button
                      className="btn btn-danger mt-1 mr-1"
                      onClick={() => {
                        this.removeFromSelectedCategories(key);
                      }}
                    >
                      {this.props.categories[key].name}
                    </button>
                  );
                else {
                  return (
                    <button
                      className="btn btn-dark shadow-lg mt-1 mr-1"
                      onClick={() => {
                        this.addToSelectedCategories(key);
                      }}
                    >
                      {this.props.categories[key].name}
                    </button>
                  );
                }
              })}
            </div>
          </div>
        </div>
      );
  };

  addToSelectedVendors = (id) => {
    var flag = true;
    for (var i = 0; i < this.state.selectedVendors.length; i++) {
      if (this.state.selectedVendors[i] == id) {
        flag = false;
        break;
      }
    }
    if (flag) {
      var vendors = this.state.selectedVendors;
      vendors.push(id);
      this.setState({ selectedVendors: vendors, items: null });
    }
  };
  removeFromSelectedVendors = (id) => {
    var flag = false;
    var i = 0;
    for (i = 0; i < this.state.selectedVendors.length; i++) {
      if (this.state.selectedVendors[i] == id) {
        flag = true;
        break;
      }
    }
    if (flag) {
      var vendors = this.state.selectedVendors;
      vendors.splice(i, 1);
      //vendors.push(id);
      this.setState({ selectedVendors: vendors, items: null });
    }
  };
  showVendors = () => {
    if (Object.keys(this.props.vendors).length == 0) return <Loading />;
    else
      return (
        <div className="d-flex flex-wrap flex-lg-nowrap">
          {Object.keys(this.props.vendors).map((key) => {
            let flag = false;
            for (var i = 0; i < this.state.selectedVendors.length; i++) {
              if (
                this.props.vendors[key].name == this.state.selectedVendors[i]
              ) {
                flag = true;
                break;
              }
            }
            if (flag)
              return (
                <div
                  className="media-body shadow mx-2 justify-content-center text-white"
                  style={{
                    overflow: "hidden",
                    flexBasis: "0",
                    borderColor: "red",
                    borderWidth: "1px",
                  }}
                >
                  <div className="card">
                    <VendorImg img={this.props.vendors[key].image} />
                    <button
                      className="btn btn-outline-danger card-img-overlay d-flex p-1 text-center align-items-center justify-content-center"
                      onClick={() => {
                        this.removeFromSelectedVendors(
                          this.props.vendors[key].name
                        );
                      }}
                      style={{
                        borderWidth: "5px",
                      }}
                    >
                      <div
                        className="h4 text-white"
                        style={{ textShadow: "0 1px gray" }}
                      >
                        {this.props.vendors[key].name}
                      </div>
                    </button>
                  </div>
                </div>
              );
            else {
              return (
                <div
                  className="media-body mx-2  justify-content-center text-white "
                  style={{ overflow: "hidden", flexBasis: "0" }}
                >
                  <div className="card p-0">
                    <VendorImg img={this.props.vendors[key].image} />
                    <button
                      className="btn btn-outline-dark card-img-overlay d-flex p-1 text-center align-items-center justify-content-center"
                      onClick={() => {
                        this.addToSelectedVendors(this.props.vendors[key].name);
                      }}
                      style={{ borderWidth: "2px" }}
                    >
                      <div
                        className="h4 text-white"
                        style={{ textShadow: "0 1px gray" }}
                      >
                        {this.props.vendors[key].name}
                      </div>
                    </button>
                  </div>
                </div>
              );
            }
          })}
        </div>
      );
  };
  addToCart = (item) => { this.setState({ selectedItem: item }) }
  showItems = () => {
    if (this.state.items == null) {
      //loading
      this.filter();
      return <Loading />;
    } else {
      return (
        <div className="card bg-dark text-light shadow">
          <div className="card-body">
            {Object.keys(this.state.items).map((itemKey) => {
              return (
                <div className="card bg-dark shadow">
                  <div className="d-flex px-2">
                    <div className="flex-grow-1">{this.state.items[itemKey].name}</div>
                    <button className="btn btn-danger col-2" data-toggle="modal" data-target="#exampleModal" onClick={() => { this.addToCart(itemKey) }}>Add</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  };
  render() {
    if (Object.keys(this.props.vendors).length == 0)
      return (
        <div
          className="bg-dark text-light"
          style={{
            minHeight: "1080px",
          }}
        >
          <Loading text="Loading" />
        </div>
      );
    else
      return (
        <div>
          <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Add To Cart</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={() => { this.setState({ selectedItem: null }) }}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">

                  {this.state.selectedItem ? <AddToCart item={this.state.items[this.state.selectedItem]} selectedid={this.state.selectedItem} /> : <Loading />}
                </div>
              </div>
            </div>
          </div>
          <div
            className="container-fluid"
            style={{ background: "black", minHeight: "1080px" }}
          >
            <div className="row py-3" id="VendorSelectorStrip">
              {this.showVendors()}
            </div>
            <div className="row">
              <div className="col-12 col-md-3 p-2">{this.showCategories()}</div>
              <div className="col-12 col-md-9 p-2">
                {
                  //this.showItems()
                  this.showItems()
                }
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default withFirebase(UltraMenuPage);
