/** @format */

// Main.js -- mainpage for loading drinkbase

import React, { Component } from "react";
import IndexSearch from "../searchforms/IndexSearch";

const allDrinksURL = "http://165.227.142.105:5000/api/v1.1/allDrinks/";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingSearch: false,
      nameSearch: true,
      viz: true,
    };
    this.setIngSearch = this.setIngSearch.bind(this);
    this.setNameSearch = this.setNameSearch.bind(this);
    this.vizClick = this.vizClick.bind(this);
    this.getAllDrinks = this.getAllDrinks.bind(this);
  }

  componentDidMount() {
    this.getAllDrinks()
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

  setIngSearch() {
    // renders "Ingredient Search" page
    this.setState({ ingSearch: true, nameSearch: false });
    let element1 = document.getElementById("ingButton");
    element1.style.borderBottom = "3px solid var(--main-accent-color)";
    let element2 = document.getElementById("nameButton");
    element2.style.borderBottom = "none";
  }

  setNameSearch() {
    // renders "Name Search" page
    this.setState({ nameSearch: true, ingSearch: false });
    let element1 = document.getElementById("nameButton");
    element1.style.borderBottom = "3px solid var(--main-accent-color)";
    let element2 = document.getElementById("ingButton");
    element2.style.borderBottom = "none";
  }

  vizClick() {
    // toggles drinkViz on/off
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
        </div>
        <img
          className="bigLogo"
          src={require("../../images/drinkBaseWhite.png")}
          alt="drinkBase"
          height="125"
        />
        <IndexSearch
          allDrinks={this.state.allDrinks}
          drinkList={this.state.drinkList}
          vizReady={this.state.vizReady}
          ingSearch={this.state.ingSearch}
          nameSearch={this.state.nameSearch}
          viz={this.state.viz}
        />
      </div>
    );
  }
}

export default Navbar;
