import React, { Component } from "react";
import "./menu.css";
class Burgrill extends Component {
    state = { menu: [] };
    componentDidMount() {
        fetch(
            "https://canteen-ordering-3d30c.firebaseio.com/public/Burgrill.json"
        )
            .then(res => res.json())
            .then(res => this.setState({ menu: res }));
    }
    componentDidUpdate() {
        console.log("updated");
        console.log(this.state.menu);
    }
    render() {
        return (
            <div
                className="container-fluid bg-light text-dark justify-content-center"
                style={{ width: "100%" }}
            >
                <div className="row">
                    {Object.keys(this.state.menu).map(menuItem => {
                        return (
                            <div key={menuItem} className=" col-xs-12 col-md-6 col-lg-4">
                                <div
                                    className="card bg-danger m-1 embed-responsive embed-responsive-16by9"
                                    style={{ overflow: "hidden" }}
                                >
                                    <img
                                        className="card-img embed-responsive-item"
                                        src={this.state.menu[menuItem].image}
                                        style={{ objectFit: "cover" }}
                                    ></img>
                                    <div className="card-img-overlay mx-1">
                                        <h5 className="card-title d-inline-flex text-white">
                                            {menuItem}
                                        </h5>
                                        <button
                                            className="btn customButton ml-auto"
                                            style={{
                                                position: "absolute",
                                                right: "1rem",
                                                bottom: "1rem"
                                            }}
                                        >
                                            Add
                          </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );

    }
}
export default Burgrill;