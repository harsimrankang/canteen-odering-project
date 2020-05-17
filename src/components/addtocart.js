import React, { Component } from "react";
import { withFirebase } from "./Firebase"
class Addtocart extends Component {
    componentDidMount() {
        console.log(this.props.item)
        //console.log(this.props.key)
    }
    add = () => {
        let value = {}
        Object.keys(this.props.item.price).map((key) => {
            value[key] = parseInt(document.getElementById('number' + key).value, 10)
        })
        console.log(JSON.stringify({
            id: this.props.selectedid,
            value: value
        }))
        this.props.firebase.addToCart1(
            JSON.stringify({
                id: this.props.selectedid,
                value: value
            })
        ).then((result) => { console.log(result) })
    }
    increaseValue = (key) => {
        var value = parseInt(document.getElementById('number' + key).value, 10);
        value = isNaN(value) ? 0 : value;
        value++;
        document.getElementById('number' + key).value = value;
    }
    decreaseValue = (key) => {
        var value = parseInt(document.getElementById('number' + key).value, 10);
        value = isNaN(value) ? 0 : value;
        value = value > 1 ? value : 1;
        value--;
        document.getElementById('number' + key).value = value;
    }
    render() {
        return (
            <div>
                <div>{this.props.item.name}</div>
                {/*<div>{this.props.item.price}</div>*/}

                {Object.keys(this.props.item.price).map((key) => (
                    <div className="row col-12">
                        <div className="col-4">{this.props.item.price[key].size}</div>

                        <div class="col-4">
                            <div>{this.props.item.price[key].price}</div>
                        </div>
                        <div class="col-4">
                            <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                                <button type="button" class="col-3 btn btn-secondary" id="decrease" onClick={() => this.decreaseValue(key)}>-</button>
                                <input type="number" class="col-6 btn btn-secondary disabled" id={"number" + key} value="0" />
                                <button type="button" class="col-3 btn btn-secondary" id="increase" onClick={() => this.increaseValue(key)}>+</button>
                            </div>
                        </div>

                    </div>))}

                <button className="btn btn-primary" onClick={() => { this.add() }}>Add</button>

            </div >
        );
    }
}

export default withFirebase(Addtocart);
