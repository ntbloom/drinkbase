/** @format */

// Main.js -- mainpage for loading drinkbase

import React, { Component } from "react";
import Index from "../searchforms/Index";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingSearch: false,
      nameSearch: false,
    };
    this.setIngSearch = this.setIngSearch.bind(this);
    this.setNameSearch = this.setNameSearch.bind(this);
  }
  setIngSearch() {
    this.setState({ ingSearch: true, nameSearch: false });
  }
  setNameSearch() {
    this.setState({ nameSearch: true, ingSearch: false });
  }

  render() {
    return (
      <div>
        <div className="navbar">
          <img
            id="smallLogo"
            src={require("../../images/smallLogo.png")}
            alt="drinkBase small logo"
            height="25"
          />
          <button className="navbutton" onClick={this.setIngSearch}>
            search by
            <br />
            ingredient
          </button>
          <button className="navbutton" onClick={this.setNameSearch}>
            search by
            <br />
            drink name
          </button>
          <div className="navcheck">
            <input type="checkbox" id="enableDark" />
            <label for="enableDark">enable dark mode</label>
            <input type="checkbox" id="enableViz" />
            <label for="enableViz">enable drinkViz (experimental)</label>
          </div>
        </div>
        <img
          className="bigLogo"
          src={require("../../images/drinkBaseWhite.png")}
          alt="drinkBase"
          height="125"
        />
        <Index
          ingSearch={this.state.ingSearch}
          nameSearch={this.state.nameSearch}
        />
      </div>
    );
  }
}

export default Navbar;
