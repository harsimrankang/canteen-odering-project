import React, { Component } from 'react';
import Login from '../Login';
import SignUp from '../SignUp';
import NavAuth from './NavAuth';

const Navigation = ({ authUser, username }) => (
    <div className="row justify-content-center justify-content-sm-end">
        {authUser ? <NavAuth authUser={authUser} username={username} /> :
            <NonAuth />}
    </div>
)
class NonAuth extends Component {
    render() {
        return (
            <div>
                <div className="btn-group">
                    <button type="button" className="btn btn-dark" data-toggle="dropdown">LOGIN</button>
                    <div className="dropdown-menu dropdown-menu-right">
                        <div className="dropdown-item">
                            <Login />
                            <div id="firebaseui-auth-container"></div>
                        </div>
                    </div>
                </div>
                <div className="btn-group">
                    <button type="button" className="btn btn-dark" data-toggle="dropdown">SIGNUP</button>
                    <div className="dropdown-menu dropdown-menu-right p-0">
                        <div className="dropdown-item">
                            <SignUp />
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default Navigation;