import React, { Component } from "react";
import { withFirebase } from "./Firebase";
import lapinoz from "./lapinoz.jpg";
class UltraMenuPage extends Component {
  state = {
    selectedVendors: [],
    unselectedVendors: [],
    selectedCategories: [],
    unselectedCategories: [],
  };
  componentDidMount() {
    this.getData();
  }
  getData = () => {
    this.props.firebase.db.ref("public").on("value", (snapshot) => {
      console.log("updated");
      var res = snapshot.val();
      //console.log(res);

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

      var items = [];
      Object.keys(res["items"]).forEach((key) => {
        //allCategories.push({ key: res["menuCategories"][key] });
        //allCategories[key] = res["menuCategories"][key];
        items.push({ id: key, value: res["items"][key] });
      });
      console.log(vendors);

      this.setState({
        fetchedData: res,
        items: items,
        searchedCategories: allCategories,
        allCategories: allCategories,
        unselectedVendors: vendors,
        unselectedSizes: allSizes,
        allSizes: allSizes,
        selectedSizes: [],
      });
    });
  };
  showUnselectedVendors = () => {
    return (
      <div className="col-12 d-flex">
        {this.state.unselectedVendors.map((value, index) => {
          return (
            <div className="flex-fill mx-2 shadow bg-light card justify-content-center">
              <img src={this.state.unselectedVendors[index].value.image}></img>
              {this.state.unselectedVendors[index].value.name}
            </div>
          );
        })}
      </div>
    );
  };
  render() {
    return (
      <div className="col-12">
        ULTRAMENU
        <div className="col-12" id="">
          {this.showUnselectedVendors()}
        </div>
      </div>
    );
  }
}
export default withFirebase(UltraMenuPage);
