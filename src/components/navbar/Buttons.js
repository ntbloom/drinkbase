/* @format */

// Buttons.js -- navbuttons for Welcome.js

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { setIngSearch, setNameSearch } from "./Navbar";

class Buttons extends Component {
  constructor(props) {
    super(props);

    this.clickIng = this.clickIng.bind(this);
    this.clickName = this.clickName.bind(this);
    this.clickRand = this.clickRand.bind(this);
    this.clearNavbar = this.clearNavbar.bind(this);
  }

  componentDidMount() {
    this.clearNavbar();
  }

  clickIng() {
    //click handler for ingredient button
    setIngSearch();
  }

  clickName() {
    // click handler for name button
    setNameSearch();
  }

  clickRand() {
    // click handler for random button
    window.alert("coming soon!");
  }

  clearNavbar() {
    // removes underlines from navbar when page is shown on screen
    const name = document.getElementById("nameButton");
    name.style.borderBottom = "none";
    const ing = document.getElementById("ingButton");
    ing.style.borderBottom = "none";
  }

  render() {
    return (
      <div id="welcome">
        <img
          id="bigLogo"
          src={require("../../images/drinkBaseWhite.png")}
          alt="drinkBase"
          height="125"
        />
        <div id="buttonWrapper">
          <button type="button" id="welcomeIng" onClick={this.clickIng}>
            <Link to="/ingredientsearch">
              Show me drinks that
              <br /> match what's in my bar
            </Link>
          </button>
          <button type="button" id="welcomeName" onClick={this.clickName}>
            <Link to="/namesearch">
              Let me search
              <br /> by drink names
            </Link>
          </button>
          {/*
          <button type="button" id="welcomeRand" onClick={this.clickRand}>
            Uggh, can <i>you </i>just
            <br />
            pick a drink?
          </button>
          */}
        </div>
      </div>
    );
  }
}

export default Buttons;
