import React, { Component } from "react";
import { withFirebase } from "./Firebase";
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
    selectedVendor: null,
    sizes: [],
    selectedCategories: [],
    searchedCategories: [],
    selectedSizes: [],
    unselectedSizes: []
  };
  addToSelectedPrices = item => {
    var unselSizes = this.state.unselectedSizes;
    for (var i = 0; i < unselSizes.length; i++) {
      if (item == unselSizes[i]) {
        unselSizes.splice(i, 1);
      }
    }
    var selectedSizes = this.state.selectedSizes;
    console.log(item);
    selectedSizes.push(item);
    this.setState({
      selectedSizes: selectedSizes,
      unselectedSizes: unselSizes
    });
  };

  addToCategory = item => {
    var i = 0;
    let categories = this.state.selectedCategories;
    console.log(categories);
    for (i = 0; i < categories.length; i++) {
      if (categories[i] == item) {
        return;
      }
    }
    categories.push(item);
    this.setState({ selectedCategories: categories });
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
  dataListener = () => {
    this.props.firebase.db.ref("public").on("value", snapshot => {
      console.log("updated");
      var res = snapshot.val();
      console.log(res);
      var allCategories = [];
      Object.values(res["menuCategories"]).forEach(value => {
        allCategories.push(value);
      });

      var vendors = [];
      Object.values(res["vendors"]).forEach(value => {
        vendors.push(value);
      });

      var unselectedSizes = [];
      Object.values(res["sizeCategories"]).forEach(value => {
        unselectedSizes.push(value);
      });

      this.setState({
        fetchedData: res,
        searchedCategories: allCategories,
        allCategories: allCategories,
        vendors: vendors,
        unselectedSizes: unselectedSizes,
        selectedSizes: []
      });
    });
  };
  fetchData = () => {
    this.dataListener();
    /*fetch("https://canteen-ordering-3d30c.firebaseio.com/public.json")
      .then(res => res.json())
      .then(res => {
        var searchedCategories = [];
        Object.values(res["menuCategories"]).forEach(value => {
          searchedCategories.push(value);
        });

        var vendors = [];
        Object.values(res["vendors"]).forEach(value => {
          vendors.push(value);
        });

        var unselectedSizes = [];
        Object.values(res["sizeCategories"]).forEach(value => {
          unselectedSizes.push(value);
        });

        this.setState({
          fetchedData: res,
          searchedCategories: searchedCategories,
          vendors: vendors,
          unselectedSizes: unselectedSizes
        });
      });*/
  };
  processCategoryInput = () => {
    var input = document.getElementById("categoryInput").value;
    input = input.toUpperCase();
    var flag = false;
    var categories = [];
    //if (input.length != 0) {
    Object.values(this.state.fetchedData["menuCategories"]).forEach(obj => {
      var value = obj.toUpperCase();
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
            categories.push(obj);
            console.log("debug");
            break;
          }
        }
        if (input.length == 0) {
          categories.push(obj);
          console.log("debug");
          break;
        }
      }
    });
    //} else {
    //categories = allCategories;
    // }
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
    this.setState({ selectedCategories: categories });
  };
  removeFromSelectedSizes = item => {
    var selectedSizes = this.state.selectedSizes;
    var unselectedSizes = this.state.unselectedSizes;
    unselectedSizes.push(item);
    for (var i = 0; i < selectedSizes.length; i++) {
      if (selectedSizes[i] == item) {
        selectedSizes.splice(i, 1);
        break;
      }
    }
    this.setState({
      selectedSizes: selectedSizes,
      unselectedSizes: unselectedSizes
    });
  };
  validateData = (name, vendor, categories, sizes) => {
    if (name == "") {
      return false;
    }
    if (vendor == null) {
      return false;
    }
    if (categories.length == 0) {
      return false;
    }
    for (var i = 0; i < sizes.length; i++) {
      if (document.getElementById(sizes[i]).value == "") {
        return false;
      }
    }
    return true;
  };
  sendItem = () => {
    var name = document.getElementById("itemName").value;
    var vendor = this.state.selectedVendor;
    var veg = document.getElementById("veg").checked;
    var categories = this.state.selectedCategories;
    var sizes = this.state.selectedSizes;
    if (this.validateData(name, vendor, categories, sizes)) {
      var prices = {};
      for (var i = 0; i < sizes.length; i++) {
        prices[i] = {
          size: sizes[i],
          price: document.getElementById(sizes[i]).value
        };
      }
      var menuCategories = {};
      for (var i = 0; i < categories.length; i++) {
        menuCategories[i] = categories[i];
      }
      var itemData = {
        name: name,
        veg: veg,
        vendor: vendor["name"],
        price: prices,
        menuCategories: menuCategories
      };
      console.log(itemData);
      var key = this.props.firebase.db
        .ref()
        .child("public/items")
        .push().key;
      console.log(key);
      var updates = {};
      updates["public/items/" + key] = itemData;
      return this.props.firebase.db.ref().update(updates);
    } else {
      alert("check data");
    }
  };
  showData = () => {
    if (this.state.fetchedData == null) {
      return <div>Fetching Data</div>;
    } else {
      return (
        <div>
          {Object.keys(this.state.fetchedData).map(data => {
            //console.log(this.state.fetchedData[menuCategories]);
            if (data == "items")
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
                    {Object.keys(this.state.fetchedData[data]).map(items => {
                      return (
                        <div className="card ">
                          <div className="card-body bg-white text-dark border-top py-1">
                            <div className="font-weight-bold">
                              {this.state.fetchedData[data][items].name}
                            </div>
                          </div>
                        </div>
                      );
                    })}
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
              className="btn  mx-1 btn-primary text-light"
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
      <div className="row col-12 my-2">
        {/**
         * Showing current items here
         */}
        <div className="col-8" id="databaseItems">
          {/*Object.keys(this.state.fetchedData).map(menuCategories => {
            console.log(this.state.fetchedData);
            return <div>data</div>;
          })*/
          this.showData()}
        </div>
        {/**
         * entering new items here
         */}
        <div className="col-4 bg-light shadow">
          <div className="card my-2">
            <div className="card-body px-2 " id="addItemInterface">
              <div className="d-flex">
                <h3>Insert Items</h3>
              </div>
              {/* -----Name here----- */}
              <div className="border-top mt-2">
                <div className="font-weight-bold">Name</div>
                <input id="itemName" type="text"></input>
              </div>
              {/* -----vendors here----- */}
              <div className="border-top mt-2">
                <div className="font-weight-bold">
                  Vendor{this.showSelectedVendor()}
                </div>
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
              </div>
              {/* -----Veg/Non Veg here----- */}
              <div className="border-top mt-2">
                <div className="font-weight-bold">Veg/Non-Veg</div>
                <input id="veg" type="checkbox" name="veg"></input>
                <label for="veg"> Veg</label>
              </div>
              {/* -----categories here----- */}
              <div className="border-top mt-2">
                <div className="font-weight-bold">Select Categories</div>
                <div id="selectedCategories">
                  {this.showSelectedCategories()}
                </div>
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
                    <div className="dropdown-content row mt-1">
                      {this.state.searchedCategories.map((item, key) => (
                        <button
                          className="btn bg-secondary text-light mx-1 mt-1"
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
              </div>
              {/* -----Sizes Here----- */}
              <div className="border-top mt-2">
                <div className="font-weight-bold">Sizes</div>
                <div>
                  {this.state.selectedSizes.map(item => (
                    <div className="btn-group col-12">
                      <button
                        className="btn col-4 btn-primary"
                        onClick={() => {
                          this.removeFromSelectedSizes(item);
                        }}
                      >
                        {item}
                      </button>
                      <input
                        className="flex-grow-1"
                        id={item}
                        type="number"
                      ></input>
                    </div>
                  ))}
                  {this.state.unselectedSizes.map((item, key) => (
                    <button
                      className="btn btn-secondary m-1"
                      onClick={() => {
                        this.addToSelectedPrices(item);
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <div className="d-flex justify-content-center border-top mt-2 pt-2">
                <button
                  className="btn btn-primary font-weight-bold"
                  onClick={() => {
                    this.sendItem();
                  }}
                >
                  Insert Item
                </button>
              </div>
            </div>
          </div>
          <div className="card my-2">
            <div className="card-body">Add Categories Here</div>
          </div>
        </div>
        <div className="col-4" id="addOtherInterface"></div>
      </div>
    );
  }
}

export default withFirebase(AddItems);
