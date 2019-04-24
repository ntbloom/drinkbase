/** @format */

// Main.js -- mainpage for loading drinkbase

import React, { Component } from "react";
import { Route, NavLink, HashRouter } from "react-router-dom";
import Ingredientsearch from "../searchforms/Ingredientsearch";
import Namesearch from "../searchforms/Namesearch";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.ingSearch = this.ingSearch.bind(this);
    this.nameSearch = this.nameSearch.bind(this);
  }
  ingSearch() {
    this.setState({ ingSearch: true, nameSearch: false });
  }
  nameSearch() {
    this.setState({ nameSearch: true, ingSearch: false });
  }

  render() {
    return (
      <HashRouter>
        <div>
          <button className="navbutton">
            <NavLink exact to="/Ingredientsearch">
              search by
              <br />
              ingredient
            </NavLink>
          </button>
          <button className="navbutton">
            <NavLink to="/Namesearch">
              search by
              <br />
              drink name
            </NavLink>
          </button>
          <div className="content">
            <Route
              exact
              path="/Ingredientsearch"
              component={Ingredientsearch}
            />
            <Route path="/Namesearch" component={Namesearch} />
          </div>
          {/*TODO: get this above the search terms but below the searchforms*/}
          <img
            src={require("../../images/drinkBaseWhite.png")}
            alt="drinkBase"
            height="125"
          />
        </div>
      </HashRouter>
    );
  }
}

export default Navbar;
