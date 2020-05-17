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
import Profile from "./profile";
import Addtocart from "./addtocart";
import Showcart from "./showcart";
class App extends Component {
  state = {
    userData: null,
    username: null,
    items: {},
    vendors: {},
    categories: {},
    sizes: {},
    itemArray: []
  };
  /**
   * @summary
   * This function will fetch data fron realtime database and provide that data to other components.
   */
  fetchMenuData = () => {
    this.props.firebase.db.ref("public").on("value", (snapshot) => {
      var response = snapshot.val();
      console.log("RESPONSE")
      console.log(response)
      var items = response.items;
      var vendors = response.vendors;
      var categories = response.menuCategories;
      var sizes = response.sizeCategories;
      var itemArray = []
      //console.log(response.items)
      // var xyz = {}
      //xyz["key"] = value

      Object.keys(items).map(itemId => {
        //var dictionary = { key: itemId, value: items[itemId] } //<- edda bndi dictionary okkk
        itemArray.push(itemId) //<- these 2 lines eh theek aa pr aapa pass kida kru key values dictionary ch
        //jidda aapa setState krde dsde ik vaari likh k
      });
      //console.log(itemArray)
      /* meri gl sunn 
      jess
      dekh 
      apna itemArray khali c starting ch
      ode ch aapa values pa rhe aa ik index de corresponding ik 
      item da data 
      jess
      and hun aapa ode ch dictionary push kr rhe aa with keys values
      key apni item id hai? jess
      and value?
      oh item da data
      and aapa onu itemArray[i].value..... krke access krange? jess
      and j aapa hun true false value set krni aa jida 
      aapa nu hun true false karan di lor nhi
      oh aapa taa krna si je aapa dictionary hi lainde
      aapa array leya, hun taa aapa siddha splice krna
      acha suppose j apne vala jede vendors[] ch nhi aa oh aapa itemArray vicho splice kr dena bs sidha
      jess, magar ohdi copy cho, aapa jitthe use krna othe 
      var itemArray = this.props.itemArray
      te fer itemArray cho splice
      achaa
      ikk vaari console dekh ok
      acha hun aapa mtlb key values set krtiya 
      menu aagya smjh
      jess
      ehnu state ch v bhej di
      
      hainnnn
      */

      /* Object.keys(items).map(itemId => {
         for (var i = 0; i < itemArray.length; i++) {
           if (itemArray[i])
         }
       })*/

      /**
       * [ {name:, vendors:, key:} , {key: , value:{name:, vendor:}} ]
       
 
      itemArray[i].key
      itemArray[i].name
 
      itemArray[i].key
      itemArray[i].value.name*/

      this.setState({
        items: response.items,
        vendors: response.vendors,
        categories: response.menuCategories,
        sizes: response.sizeCategories,
        itemArray: itemArray
      })
      console.log("ITEMS")
      console.log(this.state.items)
      console.log("VENDORS")
      console.log(this.state.vendors)
      console.log("CATEGORIES")
      console.log(this.state.categories)
      console.log("SIZES")
      console.log(this.state.sizes)
      console.log("ITEMARRAY")
      console.log(this.state.itemArray)
      /** harman, vaise hun main soch reha, v aapa nu object pass karan di zroorat hi nhi aa
       * kyuki aapa items pass taa krna hi aa
       * te ohde ch har key de corresponding data taa haiga hi aa
       * aapa bss key pass kr diye apna sar ju kyuki fer aapa bss items ch access krna
       * eve kr liye? bilkul
       * jess, kyuki eh saara data taa apne vste redundant hi aa, apni keys da koi taa fayda hove😂😂😂
       * bilkul😂😂😂😂😂
       * hun bss aapa this.props.items[itemArray[i]] krna, and we have the item
       * and splice v use kra skde
       * aapa nu value pass krn di zroort ni?
       * nopezz
       * smart
       * jesss😏
       * chl mai dekhdi aa krke 
       * tu leave na kri 
       * koi hor km krna krla
       * jdo help chahidi hou ta mai puch lau ok
       * comments delete na kri😂😂😂😂
       */


    });
  }
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
    //console.log(this.state.userData.email);
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
            <Route path="/neworders" >
              <NewOrders items={this.state.items} vendors={this.state.vendors} categories={this.state.categories} sizes={this.state.sizes} itemArray={this.state.itemArray} />
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
              <UltraMenuPage vendors={this.state.vendors}
                categories={this.state.categories}
                sizes={this.state.sizes} />
            </Route>
            <Route path="/addtocart">
              <Addtocart />
            </Route>
            <Route path="/showcart">
              <Showcart />
            </Route>
            <Route path="/profile">
              <Profile userdata={this.state.userData} username={this.state.username} />
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
