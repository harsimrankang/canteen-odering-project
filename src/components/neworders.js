import React, { Component } from "react";
import { Link } from "react-router-dom";

class neworders extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        activeItem: null,
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
        itemSelected: false,
        itemsInCart: [],
        itemAdded: false
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
        console.log("ACTIVE ITEM")
        //this.setState({ itemArray: this.props.itemArray })
        console.log(this.state.activeItem)
    }
    fetchDataFromFirebase() {
        var itemArray = [... this.props.itemArray]
        var k = 0;
        if (this.state.vendors.length != 0)
            for (var j = 0; j < itemArray.length; j++) {
                var flag = 0;
                for (var i = 0; i < this.state.vendors.length; i++) {
                    if (this.props.items[itemArray[j]]["vendor"] == this.state.vendors[i].name) {
                        flag = 1;
                        //break;
                    }
                }
                if (flag == 0) {
                    itemArray.splice(j, 1);
                    j--;
                }
            }
        if (this.state.menucategories.length != 0) {
            // var k = 0, 
            var flag = 0;
            for (var i = 0; i < itemArray.length; i++) {
                flag = 0;
                for (var j = 0; j < this.state.menucategories.length; j++) {
                    Object.keys(this.props.items[itemArray[i]]["menuCategories"]).map(menuCat => {
                        if (this.props.items[itemArray[i]]["menuCategories"][menuCat]["name"] == this.state.menucategories[j].name) {
                            flag = 1;

                        }
                    })
                }
                if (flag == 0) {
                    itemArray.splice(i, 1);
                    i--;
                }
                //k++;
            }
        }
        var flag = 0;
        //console.log(itemArray)
        if (this.state.minimum != null && this.state.maximum != null)
            for (var i = 0; i < itemArray.length; i++) {
                flag = 0;
                Object.keys(this.props.items[itemArray[i]]["price"]).map(menuCat => {
                    if (parseInt(this.state.minimum) < this.props.items[itemArray[i]]["price"][menuCat]["price"] && parseInt(this.state.maximum) > this.props.items[itemArray[i]]["price"][menuCat]["price"]) {
                        flag = 1;

                    }
                })
                if (flag == 0) {
                    itemArray.splice(i, 1);
                    i--;
                }
            }
        console.log("RESULT")
        console.log(itemArray)
        return (
            <div>
                <div className="card bg-light">
                    <div className="card-body ">
                        <div className="d-flex">
                            <div className="col">Name</div>
                            <div className="col">Vendor</div>
                            <div className="col">Category</div>
                            <div className="col">size and price</div>
                            <div className="">Add To Cart</div>
                        </div>
                    </div>

                    {itemArray.map((value, index) => (
                        <div className="card my-1 mx-1">
                            <div className="card-body">

                                <div className="d-flex">
                                    <div className="col"> {this.props.items[itemArray[index]].name}</div>
                                    <div className="col"> {this.props.items[itemArray[index]].vendor}</div>
                                    <div className="col">{
                                        Object.keys(this.props.items[itemArray[index]].menuCategories).map(menuId => (
                                            <div>{this.props.items[itemArray[index]].menuCategories[menuId].name}</div>
                                        ))
                                    }</div>
                                    <div className="col">{Object.keys(this.props.items[itemArray[index]].price).map(priceId => (
                                        <div>
                                            <div className="btn btn-primary">
                                                {this.props.items[itemArray[index]]["price"][priceId]["size"]}
                                            </div>
                                            {this.props.items[itemArray[index]]["price"][priceId]["price"]}
                                        </div>

                                    ))
                                    }
                                    </div>

                                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop" style={{ height: 40 }} onClick={() => { this.addItem(itemArray[index]) }}>Add item</button>
                                </div>
                            </div>
                        </div>

                    ))

                    }
                </div>
                <div>
                    {this.addToCartButton()}
                </div>
            </div>
        );
    }

    addToCartButton() {
        if (this.state.itemAdded)
            return (
                <div className="btn btn-primary">
                    Add To Cart
                </div>
            );
    }
    addItem(x) {
        this.setState({ activeItem: x }) //Chall reha, mgr jdo tak oh update hunda state ch ohto pehla aapa print kara taa print nhi hoya
        //addItem kr ki reha, cart ch add kr reha? yesss
    }
    showData() {
        if (this.state.buttonClicked == true)
            return (

                <div> {this.fetchDataFromFirebase()}</div>


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
    modalhead() {
        if (this.state.activeItem != null) {
            var a = this.state.activeItem
            return (
                <div>
                    {this.props.items[a].name}
                </div>
            )
        }
    }
    showModal() {
        {
            return (
                <div class="modal fade" id="staticBackdrop" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">{this.modalhead()}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Add item</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
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
                <div >
                    {this.showModal()}
                </div>

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
