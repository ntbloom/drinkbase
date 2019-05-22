/** @format */

// Welcome.js -- First page you see when you get here

import React, { Component } from "react";

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <img
          className="bigLogo"
          src={require("../../images/drinkBaseWhite.png")}
          alt="drinkBase"
          height="125"
        />
        <h1>Welcome to drinkBase, click a button below to get started</h1>
        <button>Show me drinks that match what's in my bar</button>
        <button>I want to find a recipe for a drink I already know</button>
        <button>Uggh, too many choices. You pick one</button>
      </div>
    );
  }
}

export default Welcome;
