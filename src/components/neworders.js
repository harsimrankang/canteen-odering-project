import React, { Component } from "react";
import { Link } from "react-router-dom";



class neworders extends Component {
    constructor(props) {
        super(props);
    }
    showvendorscard() {
        return (<div class="card">
            <div class="card-header">
                Featured
     </div>
            <div class="card-body">
                <h5 class="card-title">Special title treatment</h5>
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
        );
    }
    showmenucategoriescard = () => {
        return (<div class="card">
            <div class="card-header">
                Featured
     </div>
            <div class="card-body">
                <h5 class="card-title">Special title treatment</h5>
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
        );
    }
    showpricecard = () => {
        return (<div class="card">
            <div class="card-header">
                Featured
     </div>
            <div class="card-body">
                <h5 class="card-title">Special title treatment</h5>
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
        );
    }
    render() {

        return (
            <div>
                <div className="col-4">
                    <div className="btn-group " style={{ top: "10px" }}>
                        <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Filter By
                    </button>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" onClick={() => this.showvendorscard}>Vendors</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" onClick={this.showmenucategoriescard}>Menu Categories</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" onClick={this.showpricecard}>Price</a>
                        </div>
                    </div>
                </div>
            </div >

        );
    }
}
export default neworders;