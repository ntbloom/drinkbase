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
    let element1 = document.getElementById("ingButton");
    element1.style.borderBottom = "3px solid var(--main-accent-color)";
    let element2 = document.getElementById("nameButton");
    element2.style.borderBottom = "none";
  }
  setNameSearch() {
    this.setState({ nameSearch: true, ingSearch: false });
    let element1 = document.getElementById("nameButton");
    element1.style.borderBottom = "3px solid var(--main-accent-color)";
    let element2 = document.getElementById("ingButton");
    element2.style.borderBottom = "none";
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
          <button
            title="query the database by individual ingredients"
            className="navbutton"
            id="ingButton"
            onClick={this.setIngSearch}
          >
            search by
            <br />
            ingredient
          </button>
          <button
            title="query the database by drink name"
            className="navbutton"
            id="nameButton"
            onClick={this.setNameSearch}
          >
            search by
            <br />
            drink name
          </button>
          {/*
          <input type="checkbox" id="enableViz" />
          <label for="enableViz" id="vizCheck">
            enable drinkViz (experimental)
          </label>
            <input type="checkbox" id="enableDark" />
            <label for="enableDark">enable dark mode</label>
            */}
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
