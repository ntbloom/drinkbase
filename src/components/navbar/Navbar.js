/** @format */

// Main.js -- mainpage for loading drinkbase

import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Welcome from "./Welcome";
import Ingredientsearch from "../searchforms/Ingredientsearch";
import Namesearch from "../searchforms/Namesearch";

export function setIngSearch() {
  // styles ingredient search button when active
  let element1 = document.getElementById("ingButton");
  element1.style.borderBottom = "3px solid var(--main-accent-color)";
  let element2 = document.getElementById("nameButton");
  element2.style.borderBottom = "none";
}

export function setNameSearch() {
  // styles name search button when active
  let element1 = document.getElementById("nameButton");
  element1.style.borderBottom = "3px solid var(--main-accent-color)";
  let element2 = document.getElementById("ingButton");
  element2.style.borderBottom = "none";
}

const allDrinksURL = "http://165.227.142.105:5000/api/v1.1/allDrinks/";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viz: false,
    };
    this.vizClick = this.vizClick.bind(this);
    this.getAllDrinks = this.getAllDrinks.bind(this);
  }

  componentDidMount() {
    this.getAllDrinks();
  }

  getAllDrinks() {
    //gets all drinks for Viz
    fetch(allDrinksURL)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          allDrinks: data,
        });
        const drinkList = {};
        for (let i = 0; i < data.Drinks.length; i++) {
          const tempObj = {};
          const name = data.Drinks[i].Name;
          const info = data.Drinks[i].Data;
          const recipe = data.Drinks[i].Recipe;
          tempObj["Data"] = info;
          tempObj["Recipe"] = recipe;
          drinkList[name] = tempObj;
        }
        this.setState({
          drinkList: drinkList,
          vizReady: true,
        });
      })
      .catch(error => {
        console.log("Fetch error in IndexResults.js:", error);
      });
  }

  vizClick() {
    // toggles drinkViz on/off and styles button accordingly
    let element = document.getElementById("vizButton");
    if (this.state.viz) {
      this.setState({ viz: false });
      element.innerHTML = "enable drinkViz <br/> (experimental)";
      element.style.borderBottom = "none";
    } else {
      this.setState({ viz: true });
      element.innerHTML = "disable drinkViz <br/> (experimental)";
      element.style.borderBottom = "3px solid var(--main-accent-color)";
    }
  }

  render() {
    return (
      <>
        <BrowserRouter>
          <div>
            <nav className="navbar">
              <div id="smallLogoDiv">
                <Link to="/drinkbase">
                  <img
                    id="smallLogo"
                    src={require("../../images/smallLogo.png")}
                    alt="drinkBase small logo"
                    height="25"
                  />
                </Link>
              </div>
              <button
                title="query the database by individual ingredients"
                className="navbutton"
                id="ingButton"
                onClick={setIngSearch}
              >
                <Link to="/ingredientsearch">
                  search by
                  <br />
                  ingredient
                </Link>
              </button>
              <button
                title="query the database by drink name"
                className="navbutton"
                id="nameButton"
                onClick={setNameSearch}
              >
                <Link to="/namesearch">
                  search by
                  <br />
                  drink name
                </Link>
              </button>
              <button
                title="enable visualization aid (experimental)"
                className="navbutton"
                id="vizButton"
                onClick={this.vizClick}
              >
                enable drinkViz
                <br />
                (experimental)
              </button>
            </nav>
            <Route
              path="/drinkbase"
              render={props => (
                <Welcome
                  {...props}
                  viz={this.state.viz}
                  allDrinks={this.state.allDrinks}
                  drinkList={this.state.drinkList}
                  vizReady={this.state.vizReady}
                />
              )}
            />
            <Route
              path="/ingredientsearch"
              render={props => (
                <Ingredientsearch
                  {...props}
                  viz={this.state.viz}
                  allDrinks={this.state.allDrinks}
                  drinkList={this.state.drinkList}
                  vizReady={this.state.vizReady}
                />
              )}
            />
            <Route
              path="/namesearch"
              render={props => (
                <Namesearch
                  {...props}
                  viz={this.state.viz}
                  allDrinks={this.state.allDrinks}
                  drinkList={this.state.drinkList}
                  vizReady={this.state.vizReady}
                />
              )}
            />
          </div>
        </BrowserRouter>
      </>
    );
  }
}

export default Navbar;
