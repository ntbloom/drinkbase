/** @format */

// IndexResults.js -- serves results components

import React, { Component } from "react";
import Results from "./Results";

const allDrinksURL = "http://165.227.142.105:5000/api/v1.1/allDrinks/";

class IndexResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vizReady: false,
      allDrinks: {},
    };
    this.getAllDrinks = this.getAllDrinks.bind(this);
  }

  getAllDrinks() {
    //gets all drinks for Viz
    fetch(allDrinksURL)
      .then(response => {
        return response.json();
      })
      .then(data => {
        // put all data into cleaner JSON
        const d = data.Drinks;
        let allDrinks = {};
        for (let i = 0; i < d.length; i++) {
          let tempObj = {};
          const name = d[i].Name;
          const data = d[i].Data;
          const recipe = d[i].Recipe;

          tempObj["Data"] = data;
          tempObj["Recipe"] = recipe;
          allDrinks[name] = tempObj;
        }
        this.setState({
          allDrinks: { Drinks: allDrinks },
          vizReady: true,
        });
      })
      .catch(error => {
        console.log("Fetch error in IndexResults.js:", error);
      });
  }

  componentDidMount() {
    this.getAllDrinks();
  }

  render() {
    return (
      <div>
        <Results
          query={this.props.query}
          url={this.props.url}
          allDrinks={this.state.allDrinks}
          viz={this.props.viz}
        />
      </div>
    );
  }
}

export default IndexResults;
