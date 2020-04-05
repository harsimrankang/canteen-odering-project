import React, { Component } from "react";
//import "./addItems.css";

/**
 * @summary
 * AddItems is a Component to edit Items in database on firebase.
 *
 * @description
 * AddItems Component is used to easily insert and modify data in the firebase realtime database without requiring to work in JSON.
 *
 *
 */
class AddItems extends Component {
  /**
   * @summary
   * This is the state of the component.
   *
   * @description
   * state contains data about.
   *
   */
  state = {
    fetchedData: null,
    vendors: [],
    sizes: [],
    selectedCategories: [],
    searchedCategories: [],
    selectedSizes: []
  };
  addToCategory = item => {
    var i = 0;
    let categories = this.state.selectedCategories;
    for (i = 0; i < categories.length; i++) {
      if (categories[i] == item) {
        return;
      }
    }
    categories.push(item);
    this.setState({ menuCategories: categories });
  };
  changeVendor = vendor => {
    //change vendor here
    this.setState({ selectedVendor: vendor });
    //var vendors = this.state.vendors;
    //if (this.state.selectedVendor != null) {
    //  vendors.push(this.state.selectedVendor);
    // }
    //this.setState({ selectedVendor: vendor, vendors: vendors });
  };
  componentDidMount() {
    this.fetchData();
  }
  fetchData = () => {
    fetch("https://canteen-ordering-3d30c.firebaseio.com/public.json")
      .then(res => res.json())
      .then(res => {
        var searchedCat = [];
        Object.values(res["menuCategories"]).forEach(obj => {
          searchedCat.push(obj);
        });

        var vend = [];
        Object.values(res["vendors"]).forEach(obj => {
          vend.push(obj);
        });
        this.setState({
          fetchedData: res,
          searchedCategories: searchedCat,
          vendors: vend
        });
      });
  };
  processCategoryInput = () => {
    var input = document.getElementById("categoryInput").value;
    var flag = false;
    var categories = [];
    //console.log(this.state.fetchedData["menuCategories"].length);
    //for (var i = 0; i < this.state.fetchedData["menuCategories"].length; i++) {
    Object.values(this.state.fetchedData["menuCategories"]).forEach(obj => {
      //var obj = this.state.fetchedData["menuCategories"][i];
      var value = obj;
      //console.log("debug");
      console.log(value);
      for (var j = 0; j < value.length; j++) {
        console.log(input);
        if (input[0] == value[j]) {
          flag = true;
          console.log("debug");
          for (var l = 0; l < input.length; l++) {
            if (value[j + l] != input[l]) {
              flag = false;
              break;
            }
          }
          if (flag == true) {
            categories.push(value);
            console.log("debug");
          }
        }
      }
    });
    this.setState({ searchedCategories: categories });
  };
  removeFromCategory = item => {
    var i = 0;
    let categories = this.state.selectedCategories;
    for (i = 0; i < categories.length; i++) {
      if (categories[i] == item) {
        categories.splice(i, 1);
        break;
      }
    }
    this.setState({ menuCategories: categories });
  };
  showData = () => {
    if (this.state.fetchedData == null) {
      return <div>Fetching Data</div>;
    } else {
      return (
        <div>
          {Object.keys(this.state.fetchedData).map(menuCategories => {
            //console.log(this.state.fetchedData[menuCategories]);
            if (menuCategories == "items")
              return (
                <div className="card bg-light shadow">
                  <div className="card-body px-2 text-dark">
                    <h3 className="card-title py-0 my-0">Menu Items</h3>
                    <div
                      className="py-0 my-0 my-auto border-top"
                      //style={{ borderTop: "solid" }}
                    >
                      {this.state.fetchedData["NumberOfItems"]} Items
                    </div>
                    {Object.keys(this.state.fetchedData[menuCategories]).map(
                      items => {
                        return (
                          <div className="card ">
                            <div className="card-body bg-white text-dark border-top py-1">
                              {
                                this.state.fetchedData[menuCategories][items]
                                  .name
                              }
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              );
          })}
        </div>
      );
    }
  };
  showSelectedCategories = () => {
    if (this.state.selectedCategories.length == 0) {
      return <div className="text-muted">No selected Categories</div>;
    } else {
      return (
        <div className="row px-3">
          {this.state.selectedCategories.map((item, key) => (
            <button
              className="px-2 border rounded-pill mx-1 bg-primary text-light"
              key={key}
              onClick={() => {
                this.removeFromCategory(item);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      );
    }
  };
  showSelectedVendor = () => {
    if (this.state.selectedVendor != null) {
      return (
        <button className="btn btn-primary m-1">
          {this.state.selectedVendor["name"]}
        </button>
      );
    }
  };
  showVendors = () => {
    if (this.state.fetchedData == null) {
      return <div>Loading Vendors</div>;
    } else
      return (
        <div>
          {Object.values(this.state.fetchedData["vendors"]).forEach(value => (
            <div>{value}</div>
          ))}
        </div>
      );
  };

  render() {
    return (
      <div className="row col-12">
        {/**
         * Showing current items here
         */}
        <div className="col-6" id="databaseItems">
          {/*Object.keys(this.state.fetchedData).map(menuCategories => {
            console.log(this.state.fetchedData);
            return <div>data</div>;
          })*/
          this.showData()}
        </div>
        {/**
         * entering new items here
         */}
        <div className="col-4 card bg-light shadow">
          <div className="card-body px-2 " id="addItemInterface">
            <div>Name</div>
            <input id="name" type="text"></input>
            <div>Vendor{this.showSelectedVendor()}</div>

            {//this.showVendors()
            this.state.vendors.map((item, key) => (
              <button
                className="btn btn-secondary m-1"
                onClick={() => {
                  this.changeVendor(item);
                }}
              >
                {item["name"]}
              </button>
            ))}
            <div>
              <input id="veg" type="checkbox" name="veg"></input>
              <label for="veg"> Veg</label>
            </div>
            <div>Select Category</div>
            <div id="selectedCategories">{this.showSelectedCategories()}</div>
            <div id="addCategories" class="dropdown">
              <input
                className="col-12 mt-1"
                type="text"
                placeholder="Search for Categories..."
                id="categoryInput"
                onKeyUp={() => {
                  this.processCategoryInput();
                }}
              ></input>
              <div className="col-12">
                <div className="dropdown-content row">
                  {this.state.searchedCategories.map((item, key) => (
                    <button
                      className="col-6  border bg-primary text-light"
                      key={key}
                      onClick={() => {
                        this.addToCategory(item);
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <div className="col-4" id="addOtherInterface"></div>
      </div>
    );
  }
}

export default AddItems;
