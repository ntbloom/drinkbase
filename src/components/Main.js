/** @format */

// Main.js -- mainpage for loading drinkbase

import React, { Component } from "react";
import Navbar from "./navbar/Navbar";

class Main extends Component {
  render() {
    return (
      <div className="siteWrapper">
        <Navbar />
      </div>
    );
  }
}

export default Main;
