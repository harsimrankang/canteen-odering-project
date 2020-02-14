import React, { Component } from "react";
import Firebase from "../Firebase";
import { Link } from 'react-router-dom';
import SignOut from '../SignOut';

class NavAuth extends Component {

    render() {
        return (
            <div>
                <Link className="btn btn-dark" to='/userData'>
                    {this.props.username}
                </Link>
                <SignOut />
            </div>
        );
    }
}
export default NavAuth;