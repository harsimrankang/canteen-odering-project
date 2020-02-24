import React, { Component } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Firebase from "../Firebase";
import { Link } from 'react-router-dom';
import SignOut from '../SignOut';
import Orders from '../orders';

class NavAuth extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>

                <SignOut />

            </div>
        );
    }
}
export default NavAuth;