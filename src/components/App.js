import React, { Component } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { withFirebase } from './Firebase'

import Navbar from "./navbar";
import Orders from "./orders";
import Mainpage from "./mainpage";
import SignUp from "./SignUp";
import Login from "./Login";

class App extends Component {
  state = {
    user: null,
    username: null
  }

  componentDidUpdate() {
    /*if (this.state.user != null) {
      this.props.firebase.db.ref("users/" + this.state.user.uid).once('value').then(function (snapshot) {
        const user = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        if (this.state.username != user) { this.setState({ username: user }) }
      })
    }*/
  }
  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        if (authUser != this.state.user)
          authUser
            ? this.setState({ user: authUser })
            : this.setState({ user: null });
      });



  }
  render() {
    return (
      <Router basename='/'>
        <div>
          <Navbar user={this.state.user} username={this.state.username} />
          <Switch>

            <Route path="/Mainpage">
              <Mainpage />
            </Route>
            <Route path="/Orders">
              <Orders />
            </Route>
            <Route path="/Login">
              <Login />
            </Route>
            <Route path="/SignUp">
              <SignUp />
            </Route>


          </Switch>


        </div>
      </Router>
    );
  }
}
/*function App() {
  return (
    <Router basename="/">
      <div>
        <Navbar />
        <div>
          <Switch>
            <Route path="/contact">
              <Menu />
            </Route>
            <Route path="/orders">
              <Orders />
            </Route>
            <Route exactpath="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}*/

export default withFirebase(App);
