/** @format */

// Welcome.js -- First page you see when you get here

import React, { Component } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import Ingredientsearch from "./Ingredientsearch";
import Namesearch from "./Namesearch";

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.clickIng = this.clickIng.bind(this);
    this.clickName = this.clickName.bind(this);
    this.clickRand = this.clickRand.bind(this);
  }

  clickIng() {
    //click handler for ingredient button
  }

  clickName() {
    // click handler for name button
  }

  clickRand() {
    // click handler for random button
    window.alert("coming soon!");
  }

  render() {
    return (
      <div id="welcomewrapper">
        <img
          className="bigLogo"
          src={require("../../images/drinkBaseWhite.png")}
          alt="drinkBase"
          height="125"
        />
        <BrowserRouter>
          <div className="welcome">
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
            <button type="button" id="welcomeRand" onClick={this.clickRand}>
              Uggh, can <i>you </i>just
              <br />
              pick a drink?
            </button>
            <Route
              path="/ingredientsearch"
              render={props => (
                <Ingredientsearch
                  {...props}
                  viz={this.props.viz}
                  allDrinks={this.props.allDrinks}
                  drinkList={this.props.drinkList}
                  vizReady={this.props.vizReady}
                />
              )}
            />
            <Route
              path="/namesearch"
              render={props => (
                <Namesearch
                  {...props}
                  viz={this.props.viz}
                  allDrinks={this.props.allDrinks}
                  drinkList={this.props.drinkList}
                  vizReady={this.props.vizReady}
                />
              )}
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default Welcome;
