import React, { Component } from "react";
import { withFirebase } from "./Firebase";
import lapinoz from "./lapinoz.jpg";
import VendorImg from "./vendorImg";
class UltraMenuPage extends Component {
  state = {
    loaded: false,
    itemsReady: false,
    popupVisibility: false,
    popupItem: null,
    allItems: [],
    selectedVendors: [],
    allVendors: [],
    selectedCategories: [],
    allCategories: [],
    categorisedItems: {},
  };
  componentDidMount() {
    this.getData();
  }
  getData = () => {
    this.props.firebase.db.ref("public").on("value", (snapshot) => {
      console.log("updated");
      var res = snapshot.val();
      //console.log(res);

      var allItems = [];
      Object.keys(res["items"]).forEach((key) => {
        allItems.push({ id: key, value: res["items"][key] });
      });
      var sortedItems = {};
      Object.keys(res["vendors"]).forEach((key1) => {
        sortedItems[res["vendors"][key1]["name"]] = {};
        Object.keys(res["menuCategories"]).forEach((key2) => {
          sortedItems[res["vendors"][key1]["name"]][
            res["menuCategories"][key2]["name"]
          ] = {};
          Object.keys(res["items"]).forEach((key3) => {
            if (res["items"][key3]["vendor"] == res["vendors"][key1]["name"]) {
              //check category
              Object.keys(res["items"][key3]["menuCategories"]).forEach(
                (key4) => {
                  if (
                    res["items"][key3]["menuCategories"][key4]["name"] ==
                    res["menuCategories"][key2]["name"]
                  ) {
                    sortedItems[res["vendors"][key1]["name"]][
                      res["menuCategories"][key2]["name"]
                    ][key3] = res["items"][key3];
                  }
                }
              );
            }
            //allItems.push({ id: key, value: res["items"][key] });
          });
        });
      });
      console.log(sortedItems);
      var allCategories = [];
      Object.keys(res["menuCategories"]).forEach((key) => {
        //allCategories.push({ key: res["menuCategories"][key] });
        //allCategories[key] = res["menuCategories"][key];
        allCategories.push({ id: key, value: res["menuCategories"][key] });
      });

      var vendors = [];
      Object.keys(res["vendors"]).forEach((key) => {
        //vendors.push(value);
        //vendors[key] = res["vendors"][key];
        vendors.push({ id: key, value: res["vendors"][key] });
      });

      var allSizes = [];
      Object.keys(res["sizeCategories"]).forEach((key) => {
        allSizes.push({ id: key, value: res["sizeCategories"][key] });
      });

      console.log(vendors);

      this.setState({
        fetchedData: res,
        allItems: allItems,
        searchedCategories: allCategories,
        allCategories: allCategories,
        allVendors: vendors,
        unselectedSizes: allSizes,
        allSizes: allSizes,
        selectedSizes: [],
        loaded: true,
        categorisedItems: sortedItems,
      });
    });
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
      this.setState({ selectedCategories: categories, itemsReady: false });
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
      this.setState({ selectedCategories: categories, itemsReady: false });
    }
  };
  showSecondaryOptions = () => {
    if (this.state.loaded)
      return (
        <div className="card bg-dark text-light shadow">
          <div className="card-body">
            <div className="card-title h5">Select Categories</div>
            <div id="categories" className="container-fluid p-0">
              {this.state.allCategories.map((object, index) => {
                let flag = false;
                for (var i = 0; i < this.state.selectedCategories.length; i++) {
                  if (object.id == this.state.selectedCategories[i]) {
                    flag = true;
                    break;
                  }
                }
                if (flag)
                  return (
                    <button
                      className="btn btn-danger mt-1 mr-1"
                      onClick={() => {
                        this.removeFromSelectedCategories(object.id);
                      }}
                    >
                      {object.value.name}
                    </button>
                  );
                else {
                  return (
                    <button
                      className="btn btn-dark shadow-lg mt-1 mr-1"
                      onClick={() => {
                        this.addToSelectedCategories(object.id);
                      }}
                    >
                      {object.value.name}
                    </button>
                  );
                }
              })}
            </div>
          </div>
        </div>
      );
  };

  showItems = () => {
    if (this.state.loaded) {
      if (!this.state.itemsReady) {
        var flag = false;
        var items = [];

        if (this.state.selectedVendors.length > 0) {
          console.log(
            this.state.fetchedData["vendors"][this.state.selectedVendors[0]][
              "name"
            ]
          );
          console.log(this.state.allItems[0].value.vendor);
          for (var i = 0; i < this.state.allItems.length; i++) {
            for (var j = 0; j < this.state.selectedVendors.length; j++) {
              if (
                this.state.allItems[i].value.vendor ==
                this.state.fetchedData["vendors"][
                  this.state.selectedVendors[j]
                ]["name"]
              ) {
                items.push(this.state.allItems[i]);
                break;
              }
            }
          }
        } else items = this.state.allItems;
        if (this.state.selectedCategories.length > 0)
          for (var i = items.length; i > 0; i--) {
            flag = false;
            for (var j = 0; j < this.state.selectedCategories; j++) {
              if (
                items[i].value.categories[this.state.selectedCategories] !=
                undefined
              ) {
                flag = true;
                break;
              }
            }
            if (flag) {
              items.splice(i, 1);
            }
          }
        console.log(items);
        this.setState({ visibleItems: items, itemsReady: true });
      } else {
        return (
          <div className="card bg-dark shadow text-light">
            <div className="card-body">
              {this.state.visibleItems.map((obj, index) => {
                return (
                  <div className="card bg-dark shadow">{obj.value.name}</div>
                );
              })}
            </div>
          </div>
        );
      }
    }
  };
  addItemPopup = (itemId) => {
    //show Popup
    document.getElementById("popup").style.visibility = "visible";
    this.setState({ popupVisibility: true, popupItem: itemId });
  };
  hidePopup = () => {
    //hide Popup
    this.setState({ popupVisibility: false });
  };
  popupInterface = () => {
    if (this.state.popupItem != null)
      return (
        <div className="mx-5 flex-grow-1 card bg-dark text-light">
          <div className="card-header d-flex">
            <div className="h2 flex-grow-1">
              {this.state.fetchedData["items"][this.state.popupItem]["name"]}
            </div>
            <button
              className="btn btn-danger"
              onClick={() => {
                this.hidePopup();
              }}
            >
              Close
            </button>
          </div>
          <div className="card-body">
            <div id="popupPrices">
              <div className="btn-group col-12">
                <button className="btn btn-secondary disabled col-3">
                  Size
                </button>
                <button className="btn btn-secondary disabled col-3">
                  Price
                </button>
                <button className="btn btn-secondary disabled col-3">
                  Quantity
                </button>
                <button className="btn btn-secondary disabled col-3">
                  Total
                </button>
              </div>
              {Object.keys(
                this.state.fetchedData["items"][this.state.popupItem]["price"]
              ).map((key) => (
                <div className="btn-group col-12">
                  <button className="btn btn-primary col-3 disabled">
                    {
                      this.state.fetchedData["items"][this.state.popupItem][
                        "price"
                      ][key]["size"]
                    }
                  </button>
                  <button className="btn btn-primary col-3 disabled">
                    {
                      this.state.fetchedData["items"][this.state.popupItem][
                        "price"
                      ][key]["price"]
                    }
                  </button>
                  <button
                    className="btn btn-primary col-1"
                    id={"increase" + key}
                  >
                    -
                  </button>
                  <input
                    className="btn btn-primary col-1 disabled"
                    id={key}
                    type="number"
                  ></input>
                  <button
                    className="btn btn-primary col-1"
                    id={"decrease" + key}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-primary disabled col-3"
                    id={"total" + key}
                  >
                    0
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
  };
  showCategorisedItems = () => {
    var vendors = [];
    if (this.state.selectedVendors.length > 0) {
      for (var i = 0; i < this.state.selectedVendors.length; i++) {
        for (var j = 0; j < this.state.allVendors.length; j++) {
          if (this.state.selectedVendors[i] == this.state.allVendors[j]["id"]) {
            vendors.push(this.state.allVendors[j]);
          }
        }
      }
    } else {
      vendors = this.state.allVendors;
    }
    var categories = [];
    if (this.state.selectedCategories.length > 0) {
      for (var i = 0; i < this.state.selectedCategories.length; i++) {
        for (var j = 0; j < this.state.allCategories.length; j++) {
          if (
            this.state.selectedCategories[i] ==
            this.state.allCategories[j]["id"]
          ) {
            categories.push(this.state.allCategories[j]);
          }
        }
      }
    } else {
      categories = this.state.allCategories;
    }
    var categorisedItems = {};
    if (this.state.loaded)
      for (var i = 0; i < vendors.length; i++) {
        let vendor = {};
        var flag1 = false;
        for (var j = 0; j < categories.length; j++) {
          var flag2 = false;
          console.log(this.state.categorisedItems);
          console.log(vendors[i]);
          Object.keys(
            this.state.categorisedItems[vendors[i]["value"]["name"]][
              categories[j]["value"]["name"]
            ]
          ).forEach((key) => {
            flag2 = true;
            flag1 = true;
          });
          if (flag2) {
            vendor[
              categories[j]["value"]["name"]
            ] = this.state.categorisedItems[vendors[i]["value"]["name"]][
              categories[j]["value"]["name"]
            ];
          }
        }
        if (flag1) categorisedItems[vendors[i]["value"]["name"]] = vendor;
      }
    console.log(categorisedItems);
    return (
      <div>
        {Object.keys(categorisedItems).map((key1) => (
          <div className="card bg-dark text-light shadow mb-3">
            <div className="card-header h2">{key1}</div>
            <div className="card-body">
              {Object.keys(categorisedItems[key1]).map((key2) => (
                <div className="card bg-light text-dark shadow my-2">
                  <div className="card-header h4">{key2}</div>
                  <div className="card-body p-0">
                    {Object.keys(categorisedItems[key1][key2]).map((key3) => (
                      <div className="card text-dark my-1">
                        <div className="card-body row py-0 pl-4">
                          <div className="flex-grow-1">
                            <div className="btn btn-disabled">
                              {categorisedItems[key1][key2][key3]["name"]}
                            </div>
                          </div>
                          <div className="d-flex">
                            {Object.keys(
                              categorisedItems[key1][key2][key3]["price"]
                            ).map((key4) => (
                              <div className="btn-group ml-1">
                                <div className="d-inline-flex btn btn-dark disabled">
                                  {
                                    categorisedItems[key1][key2][key3]["price"][
                                      key4
                                    ]["size"]
                                  }
                                </div>
                                <div className="d-inline-flex btn btn-dark disabled">
                                  {
                                    categorisedItems[key1][key2][key3]["price"][
                                      key4
                                    ]["price"]
                                  }
                                </div>
                              </div>
                            ))}
                            <button
                              className="btn btn-danger ml-1"
                              onClick={() => {
                                this.addItemPopup(key3);
                              }}
                            >
                              ADD
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
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
      this.setState({ selectedVendors: vendors, itemsReady: false });
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
      this.setState({ selectedVendors: vendors, itemsReady: false });
    }
  };
  showVendors = () => {
    return (
      <div className="d-flex flex-wrap flex-lg-nowrap">
        {this.state.allVendors.map((object, index) => {
          let flag = false;
          for (var i = 0; i < this.state.selectedVendors.length; i++) {
            if (object.id == this.state.selectedVendors[i]) {
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
                  <VendorImg img={object.value.image} />
                  <button
                    className="btn btn-outline-danger card-img-overlay d-flex p-1 text-center align-items-center justify-content-center"
                    onClick={() => {
                      this.removeFromSelectedVendors(object.id);
                    }}
                    style={{
                      borderWidth: "5px",
                    }}
                  >
                    <div
                      className="h4 text-white"
                      style={{ textShadow: "0 1px gray" }}
                    >
                      {object.value.name}
                    </div>
                  </button>
                </div>
              </div>
            );
          else {
            return (
              <div
                className="media-body mx-2 bg-dark justify-content-center text-white"
                style={{ overflow: "hidden", flexBasis: "0" }}
              >
                <div className="card">
                  <VendorImg img={object.value.image} />
                  <button
                    className="btn btn-outline-dark card-img-overlay d-flex p-1 text-center align-items-center justify-content-center"
                    onClick={() => {
                      this.addToSelectedVendors(object.id);
                    }}
                    style={{ borderWidth: "2px", borderStyle: "outset" }}
                  >
                    <div
                      className="h4 text-white"
                      style={{ textShadow: "0 1px gray" }}
                    >
                      {object.value.name}
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
  render() {
    if (!this.state.loaded)
      return (
        <div
          className="bg-dark text-light"
          style={{
            minHeight: "1080px",
          }}
        >
          Loading Data
        </div>
      );
    else
      return (
        <div>
          <div
            id="popup"
            className="d-flex align-items-center"
            style={{
              position: "fixed",
              top: "0px",
              minHeight: "100%",
              minWidth: "100%",
              visibility: this.state.popupVisibility,
              zIndex: this.state.popupVisibility ? 2 : -1,
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            {this.popupInterface()}
          </div>
          <div
            className="container-fluid"
            style={{ background: "black", minHeight: "1080px" }}
          >
            <div className="row py-3" id="VendorSelectorStrip">
              {this.showVendors()}
            </div>
            <div className="row">
              <div className="col-12 col-md-3 p-2">
                {this.showSecondaryOptions()}
              </div>
              <div className="col-12 col-md-9 p-2">
                {
                  //this.showItems()
                  this.showCategorisedItems()
                }
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default withFirebase(UltraMenuPage);
