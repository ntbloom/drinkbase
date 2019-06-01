/** @format */

// Welcome.js -- First page you see when you get here

import React, { Component } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import Ingredientsearch from "./Ingredientsearch";
import Namesearch from "./Namesearch";
import { setIngSearch, setNameSearch } from "../navbar/Navbar";

function hideWelcome() {
  // removes welcome banner
  const welcome = document.querySelector(".welcome");
  welcome.style.display = "none";
}

class Welcome extends Component {
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

  clearNavbar() {
    // removes underlines from navbar when page is shown on screen
    const name = document.getElementById("nameButton");
    name.style.borderBottom = "none";
    const ing = document.getElementById("ingButton");
    ing.style.borderBottom = "none";
  }

  clickIng() {
    //click handler for ingredient button
    hideWelcome();
    setIngSearch();
  }

  clickName() {
    // click handler for name button
    hideWelcome();
    setNameSearch();
  }

  clickRand() {
    // click handler for random button
    window.alert("coming soon!");
  }

  render() {
    return (
      <BrowserRouter>
        <div>
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
              <button type="button" id="welcomeRand" onClick={this.clickRand}>
                Uggh, can <i>you </i>just
                <br />
                pick a drink?
              </button>
            </div>
          </div>
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
    );
  }
}

export default Welcome;
