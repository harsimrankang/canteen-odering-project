import React, { Component } from 'react';
import Login from '../Login';
import SignUp from '../SignUp';
import NavAuth from './NavAuth';
import { Link } from 'react-router-dom';

const Navigation = ({ user, username }) => (
    <div className="row justify-content-center justify-content-sm-end">
        {user ? <NavAuth authUser={user} username={username} /> :
            <NonAuth />}
    </div>
)
class NonAuth extends Component {
    render() {
        return (
            <div>
                <Link className="btn btn-dark" to="Login">LOGIN</Link>
                <Link className="btn btn-dark" to="SignUp">SIGNUP</Link>
            </div>
        );
    }
}
export default Navigation;