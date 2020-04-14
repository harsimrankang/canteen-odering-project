import React, { Component } from "react";
import { Link } from "react-router-dom";
class NewOrdercomp extends Component {
    render() {
        return (
            <div class="card">
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
}

class neworders extends Component {
    constructor(props) {
        super(props);
    }
    func = () => {
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
                            <a className="dropdown-item" href={this.func}>Vendors</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" >Menu Categories</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" >Price</a>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-4" style={{ top: "15px", visibility: "hidden" }} >
                        <div class="card" id="vendorscard">
                            <div class="card-header">
                                Featured
                        </div>
                            <div class="card-body">
                                <h5 class="card-title">Special title treatment</h5>
                                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-4" style={{ top: "15px", visibility: "hidden" }} >
                        <div class="card" id="menucategoriescard">
                            <div class="card-header">
                                Featured
                        </div>
                            <div class="card-body">
                                <h5 class="card-title">Special title treatment</h5>
                                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-4" style={{ top: "15px", visibility: "hidden" }} >
                        <div class="card" id="pricecard">
                            <div class="card-header">
                                Featured
                        </div>
                            <div class="card-body">
                                <h5 class="card-title">Special title treatment</h5>
                                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        );
    }
}
export default neworders;