import React, { Component } from "react";
//import "./addItems.css";

class AddItems extends Component {
  state = {
    fetchedData: null,
    selectedCategories: ["food", "hello", "what"],
    searchedCategories: [],
    vendors: []
  };
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
  componentDidMount() {
    this.fetchData();
  }
  render() {
    return (
      <div className="row col-12">
        <div className="col-6" id="databaseItems">
          {/*Object.keys(this.state.fetchedData).map(menuCategories => {
            console.log(this.state.fetchedData);
            return <div>data</div>;
          })*/
          this.showData()}
        </div>
        <div className="col-4 card bg-light shadow">
          <div className="card-body px-2 " id="addItemInterface">
            <div>Name</div>
            <input id="name" type="text"></input>
            <div>Vendor</div>
            <input id="vendor" type="text"></input>
            {//this.showVendors()
            this.state.vendors.map((item, key) => (
              <div>{item["name"]}</div>
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
