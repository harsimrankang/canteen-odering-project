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
        minimum: null,
        maximum: null,
        buttonClicked: false,
        arrayForSelected: {},
        itemSelected: false
    };
    componentDidMount() {
        fetch("https://canteen-ordering-3d30c.firebaseio.com/public.json")
            .then((res) => res.json())
            .then((res) => this.setState({ menu: res }))

        // .then((res) => this.setState({ arrayForSelected: res }));
    }
    componentDidUpdate() {
        console.log("MINIMUM")
        console.log(this.state.minimum)
        console.log("MAXIMUM")
        console.log(this.state.maximum)
        console.log("MENU")
        console.log(this.state.menu)
        console.log("ITEMS FROM APP.js")
        console.log(this.props.items)
        console.log("ITEMARRAY FROM APP.js")
        console.log(this.props.itemArray)
        console.log("VENDORS")
        console.log(this.state.vendors)
        console.log("MENU CATEGORIES")
        console.log(this.state.menucategories)
    }
    fetchDataFromFirebase() {
        var k = 0;
        if (this.state.vendors.length != 0)
            Object.keys(this.props.items).map(itemId => {
                var flag = 0;
                for (var i = 0; i < this.state.vendors.length; i++) {
                    if (this.props.items[itemId]["vendor"] == this.state.vendors[i].name) {
                        flag = 1;
                        break;
                    }
                }
                if (flag == 0) {
                    this.props.itemArray.splice(k, 1);
                    k--;
                }
                k++;
            })
        if (this.state.menucategories.length != 0) {
            var k = 0, flag = 0;
            for (var i = 0; i < this.props.itemArray.length; i++) {
                flag = 0;
                for (var j = 0; j < this.state.menucategories.length; j++) {
                    Object.keys(this.props.items[this.props.itemArray[i]]["menuCategories"]).map(menuCat => {
                        if (this.props.items[this.props.itemArray[i]]["menuCategories"][menuCat]["name"] == this.state.menucategories[j].name) {
                            flag = 1;

                        }
                    })
                }
                if (flag == 0) {
                    this.props.itemArray.splice(k, 1);
                    k--;
                }
                k++;
            }
        }







        /*this.setState({
            arrayForSelected
                : this.state.menu
        })
        for (var i = 0; i < this.state.vendors.length; i++) {
            {
                Object.key(this.state.arrayForSelected["items"]).map(itemId => {
                    if (this.state.arrayForSelected["items"][itemId]["vendor"] === this.state.vendors[i].name) {
                        var x = this.state.arrayForSelected["items"][itemId]["vendor"].itemSelected
                        this.setState({
                            x: true
                        })
                    }
                }
                )
            }
        }
        for (var i = 0; i < this.state.menucategories.length; i++) {
            {
                Object.key(this.state.arrayForSelected["items"].map(itemsId => {
                    if (this.state.arrayForSelected["items"][itemsId]["vendor"].itemSelected === true) {
                        {
                            Object.key(this.state.arrayForSelected["items"][itemsId][menuCategories]).map(catId => {
                                if (this.state.arrayForSelected["items"][itemsId][menuCategories][catId]["name"] != this.state.menucategories[i].name) {
                                    var x = this.state.arrayForSelected["items"][itemId]["vendor"].itemSelected
                                    this.setState({
                                        x: false
                                    })
                                }
                            })
                        }
                    }
                }))
            }
        }*/


        //arrayGForSelected

        /* for (var i = 0; i < this.state.vendors.length; i++) {
             for (var j = 0; j < this.state.menucategories.length; j++) {
                 for (var k = this.state.minimum; k <= this.state.maximum; k++) {
                     {
                         Object.keys(this.state.menu["items"]).map(itemId => {
                             if (this.state.menu["items"][itemId]["vendor"] === this.state.vendors[i].name) {
                                 Object.keys(this.state.menu["items"][itemId]["menuCategories"]).map(menuCategoryId => {
                                     if (this.state.menu["items"][itemId]["menuCategories"][menuCategoryId]["name"] === this.state.menucategories[i].name) {
                                         {
 
                                         }
                                     }
                                 })
                             }
                             {
                                 if (this.state.minimum != null && this.state.maximum != null)
                                     Object.keys(this.state.menu["items"][itemId]["price"]).map(priceId => {
                                         if ((this.state.menu["items"][itemId]["price"][priceId]["price"] > parseInt(this.state.minimum)) && (this.state.menu["items"][itemId]["price"][priceId]["price"] < parseInt(this.state.maximum))) {
                                             {
 
                                             }
                                         }
                                     })
                             }
 
                         })
                     }
                 }
             }
         }*/
    }
    showData() {
        if (this.state.buttonClicked == true)
            return (
                <div className="card bg-light">
                    <div className="card-body ">
                        <div className="d-flex">
                            <div className="col-3">Name</div>
                            <div className="col-3">Vendor</div>
                            <div className="col-3">Category</div>
                            <div className="col-3">size and price</div>
                        </div>
                        <div> {this.fetchDataFromFirebase()}</div>
                        {/* <div className="card my-1">
                            <div className="card-body d-flex">
                                <div className="col-3">Name</div>
                                <div className="col-3">Vendor</div>
                                <div className="col-3">Category</div>
                                <div className="col-3">size and price</div>
                            </div>
                        </div>*/}
                    </div>
                </div>

            );
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
    onChange = event => {
        if (event.target.id == 'min') {
            this.setState({
                minimum: event.target.value
            })
        }
        if (event.target.id == 'max') {
            this.setState({
                maximum: event.target.value
            })
        }
    }
    showpricecard() {
        if (this.state.showprice)
            return (
                <div className="col-4" style={{ top: "15px" }}>
                    <div class="card " style={{ height: "14.3rem" }}>
                        <div class="card-header">Price Range</div>
                        <div class="card-body">
                            <input placeholder="min" type="number" size="7" id="min" onChange={this.onChange}></input>
                            <a> - </a>
                            <input placeholder="max" type="number" size="7" id="max" onChange={this.onChange}></input>

                        </div>
                    </div>
                </div>
            );
    }
    showitems() {
        if (this.state.vendors.length != 0 || this.state.menucategories.length != 0 || (parseInt(this.state.minimum) < parseInt(this.state.maximum)))
            return (
                <div>
                    <button type="button" class="btn btn-secondary" onClick={() => { this.setState({ buttonClicked: !this.state.buttonClicked }) }}>Show Items</button>
                </div >
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
                <div className=" m-5" >
                    {this.showData()}
                </div>
            </div >
        );
    }
}
export default neworders;
