import React, { Component } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { withFirebase } from "./Firebase";

import Navbar from "./navbar";
import Orders from "./orders";
import NewOrders from "./neworders";
import Mainpage from "./mainpage";
import SignUp from "./SignUp";
import Login from "./Login";
import AddItems from "./AddItems";
import UltraMenuPage from "./ultraMenuPage";

class App extends Component {
  state = {
    userData: null,
    username: null,
    items: {},
    vendors: {},
    categories: {},
    sizes: {}
  };
  /**
   * @summary
   * This function will fetch data fron realtime database and provide that data to other components.
   */
  fetchMenuData = () => {
    this.props.firebase.db.ref("public").on("value", (snapshot) => {
      var response = snapshot.val();
      var items = response.items;
      var vendors = response.vendors;
      var categories = response.menuCategories;
      var sizes = response.sizeCategories;
    });
  };
  fetchUserData = () => {
    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser != this.state.userData)
        authUser
          ? this.setState({ userData: authUser })
          : this.setState({ userData: null });
    });
  };
  fetchUserName = () => {
    if (this.state.userData != null) {
      this.props.firebase.db
        .ref("users/" + this.state.userData.uid)
        .once("value")
        .then((snapshot) => {
          const user =
            (snapshot.val() && snapshot.val().username) || "Anonymous";
          if (this.state.username != user) {
            this.setState({ username: user });
          }
        });
    }
  };
  componentDidUpdate() {
    console.log(this.state.userData.email);
    this.fetchUserName();
  }
  componentDidMount() {
    this.fetchMenuData();
    this.fetchUserData();
  }
  render() {
    return (
      <Router basename="/">
        <div>
          <Navbar user={this.state.userData} username={this.state.username} />
          <Switch>
            <Route path="/Mainpage">
              <Mainpage />
            </Route>
            <Route path="/Orders">
              <Orders />
            </Route>
            <Route path="/neworders">
              <NewOrders />
            </Route>
            <Route path="/Login">
              <Login />
            </Route>
            <Route path="/SignUp">
              <SignUp />
            </Route>
            <Route path="/AddItems">
              <AddItems />
            </Route>
            <Route path="/ultramenu">
              <UltraMenuPage />
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
