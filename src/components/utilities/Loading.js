/** @format */

// Loading.js -- loading spinner

import React, { Component } from "react";

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 40,
    };
  }

  render() {
    return (
      <div>
        <p id="loading">loading drinks...</p>
        <img
          id="flute1"
          width={this.state.size}
          alt="clinking flute"
          src={require("../../images/flutes.png")}
        />
        <img
          id="flute2"
          width={this.state.size}
          alt="clinking flute"
          src={require("../../images/flutes.png")}
        />
      </div>
    );
  }
}

export default Loading;
