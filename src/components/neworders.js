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
        fetch("https://canteen-ordering-3d30c.firebaseio.com/public.json")
            .then((res) => res.json())
            .then((res) => this.setState({ menu: res }));
    }
    showvendorscard() {
        if (this.state.showVendor)
            return (
                <div className="col-4" style={{ top: "15px" }}>
                    <div class="card">
                        <div class="card-header">Vendors</div>
                        <div class="card-body">

                            {Object.keys(this.state.menu["vendors"]).map(menuCat => {

                                return (
                                    <button type="button" class="btn btn-primary m-1">
                                        <div>{this.state.menu["vendors"][menuCat]["name"]}</div>
                                    </button>
                                );

                            }
                            )}

                        </div>
                    </div>
                </div>
            );
    }
    showmenucategoriescard() {
        {
            if (this.state.showmenucategories)
                return (
                    <div className="col-4" style={{ top: "15px" }}>
                        <div class="card">
                            <div class="card-header">Menu Categories</div>
                            <div class="card-body">
                                {Object.keys(this.state.menu["menuCategories"]).map(menuCat => {
                                    return (
                                        <button type="button" class="btn btn-primary m-1">
                                            <div>{this.state.menu["menuCategories"][menuCat]["name"]}</div>
                                        </button>
                                    );


                                }
                                )}

                            </div>
                        </div>
                    </div>
                );
        }


    }
    showpricecard() {
        if (this.state.showprice)
            return (
                <div className="col-4" style={{ top: "15px" }}>
                    <div class="card ">
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
                                    showmenucategories: !this.state.showmenucategories
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
                <div className="row">
                    {this.showvendorscard()}
                    {this.showmenucategoriescard()}
                    {this.showpricecard()}
                </div>
            </div>
        );
    }
}
export default neworders;

