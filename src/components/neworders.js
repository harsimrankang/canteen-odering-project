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
        menu: {},
        vendors: [],
        menucategories: [],
        selected: false,
        selectvendor: true,
        selectmenucategory: true,
        addpricerange: true,
        minimum: undefined,
        maximum: undefined
    };
    componentDidMount() {
        fetch("https://canteen-ordering-3d30c.firebaseio.com/public.json")
            .then((res) => res.json())
            .then((res) => this.setState({ menu: res }))
            .then((res) => this.setState({ selectedVendors: res }));
    }
    arrayOfSelectedVendors(x) {
        var vendors = this.state.vendors;
        vendors.push(x)
        this.setState({ vendors: vendors })
        console.log(this.state.vendors)
    }
    removeFromArrayOfSelectedVendors(x) {
        var vendors = this.state.vendors
        for (var i = 0; i < vendors.length; i++) {
            if (vendors[i] === x) {
                vendors.splice(i, 1);
            }
        }
        this.setState({
            vendors: vendors
        }
        )
        console.log(this.state.vendors)
    }
    arrayOfSelectedMenuCategories(x) {
        var menucategories = this.state.menucategories;
        menucategories.push(x)
        this.setState({ menucategories: menucategories })
        console.log(this.state.menucategories)
    }
    removeFromArrayOfSelectedMenuCategories(x) {
        var menucategories = this.state.menucategories
        for (var i = 0; i < menucategories.length; i++) {
            if (menucategories[i] === x) {
                menucategories.splice(i, 1);
            }
        }
        this.setState({
            menucategories: menucategories
        }
        )
        console.log(this.state.menucategories)
    }
    showvendorscard() {
        if (this.state.showVendor)
            return (
                <div className="col-4" style={{ top: "15px" }}>
                    <div class="card" style={{ height: "14.3rem" }}>
                        <div class="card-header">Vendors</div>
                        <div class="card-body">

                            {Object.keys(this.state.menu["vendors"]).map(menuCat => {
                                if (this.state.menu["vendors"][menuCat].selected == undefined)
                                    return (
                                        <button type="button" class="btn btn-primary m-1" onClick={() => {
                                            var menu = this.state.menu
                                            menu["vendors"][menuCat].selected = true
                                            this.arrayOfSelectedVendors(menu["vendors"][menuCat])
                                            this.setState({
                                                menu: menu
                                            })

                                        }
                                        }>
                                            {this.state.menu["vendors"][menuCat]["name"]}
                                        </button>

                                    );

                                else return (
                                    <button type="button" class="btn btn-secondary m-1" onClick={() => {
                                        var menu = this.state.menu
                                        menu["vendors"][menuCat].selected = undefined
                                        this.removeFromArrayOfSelectedVendors(menu["vendors"][menuCat])
                                        this.setState({
                                            menu: menu
                                        })
                                    }
                                    }>

                                        {this.state.menu["vendors"][menuCat]["name"]}
                                    </button>
                                );
                            }
                            )}

                        </div>
                    </div>
                </div >
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
                                    if (this.state.menu["menuCategories"][menuCat].selected == undefined)
                                        return (
                                            <button type="button" className="btn btn-primary m-1" onClick={() => {
                                                var menu = this.state.menu
                                                menu["menuCategories"][menuCat].selected = true
                                                this.arrayOfSelectedMenuCategories(menu["menuCategories"][menuCat])
                                                this.setState({
                                                    menu: menu
                                                })

                                            }
                                            }>
                                                {this.state.menu["menuCategories"][menuCat]["name"]}
                                            </button>
                                        );
                                    else return (
                                        <button type="button" className="btn btn-secondary m-1" onClick={() => {
                                            var menu = this.state.menu
                                            menu["menuCategories"][menuCat].selected = undefined
                                            this.removeFromArrayOfSelectedMenuCategories(menu["menuCategories"][menuCat])
                                            this.setState({
                                                menu: menu
                                            })

                                        }
                                        }>
                                            {this.state.menu["menuCategories"][menuCat]["name"]}
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
                    <div class="card " style={{ height: "14.3rem" }}>
                        <div class="card-header">Price Range</div>
                        <div class="card-body">
                            <input placeholder="min" size="7" id="min"></input>
                            <a> - </a>
                            <input placeholder="max" size="7" id="max"></input>

                        </div>
                    </div>
                </div>
            );
    }
    showitems() {
        if (this.state.selectvendor || this.state.selectmenucategory || this.state.addpricerange)
            return (
                <div>
                    <button type="button" class="btn btn-secondary" onClick={() => {
                        this.setState({
                            minimum: document.getElementById('min').value
                        });
                        this.setState({
                            maximum: document.getElementById('max').value
                        });
                        console.log(this.state.minimum)
                        console.log(this.state.maximum)
                    }}
                    >Show Items</button>
                </div>
            );
    }
    render() {
        return (
            <div>
                <div className="col">
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
                <div className=" m-5" >
                    {this.showitems()}
                </div>

            </div >
        );
    }
}
export default neworders;

