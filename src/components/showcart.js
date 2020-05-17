import React, { Component } from "react";
import "./atc.css";
class Addtocart extends Component {
    render() {
        return (
            <div class="container ">
                <h2 class="section-header">CART</h2>
                <div class="cart-row">
                    <div class="cart-item cart-header cart-column">ITEM</div>
                    <div class="cart-item cart-header cart-column">VENDOR</div>
                    <div class="cart-price cart-header cart-column">PRICE</div>
                    <div class="cart-quantity cart-header cart-column">QUANTITY</div>
                </div>
                <div class="cart-items">
                    .. this is where i will add items
                </div>
                <div class="cart-total">
                    <div class="cart-total-title">Total</div>
                    <span class="cart-total-price">0</span>
                </div>
                <button type="button" class="btn btn-info btn-purchase ">PURCHASE</button>
            </div>
        );
    }
}

export default Addtocart;