/** @format */

// Welcome.js -- First page you see when you get here

import React, { Component } from "react";

function interim(name) {
  // interim function while I figure out routing
  const string = name.concat(
    " not working yet but I'm glad you thought I was capable enough that you tried clicking it anyway.",
  );
  window.alert(string);
}

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.clickIng = this.clickIng.bind(this);
    this.clickName = this.clickName.bind(this);
    this.clickRand = this.clickRand.bind(this);
  }

  clickIng() {
    //click handler for ingredient button
    interim("Ingredient search");
  }

  clickName() {
    // click handler for name button
    interim("Name search");
  }

  clickRand() {
    // click handler for random button
    interim("Random drink finder");
  }

  render() {
    return (
      <>
        <img
          className="bigLogo"
          src={require("../../images/drinkBaseWhite.png")}
          alt="drinkBase"
          height="125"
        />
        <div className="welcome">
          <button type="button" id="welcomeIng" onClick={this.clickIng}>
            Show me drinks that
            <br /> match what's in my bar
          </button>
          <button type="button" id="welcomeName" onClick={this.clickName}>
            Let me search
            <br /> by drink names
          </button>
          <button type="button" id="welcomeRand" onClick={this.clickRand}>
            Uggh, can <i>you </i>just
            <br />
            pick a drink?
          </button>
        </div>
      </>
    );
  }
}

export default Welcome;
